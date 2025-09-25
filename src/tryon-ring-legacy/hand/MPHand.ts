import { OneEuroFilter } from "1eurofilter";
import { HandLandmarkerResult } from "@mediapipe/tasks-vision";
import { Euler, MathUtils, Object3D, PerspectiveCamera, Quaternion, Vector3 } from "webgi";
import { correctZPosition, Finger, getLandmarkIndicesFromFinger, isShowingBackHand, landmarkTo3D, lookAtFrom3Points, mapLandmark3DFromVideoToVideoTextureView, mapLinearClamped } from "../utils/handLandmarkUtils";
import { WebCameraVideoFeed } from "../../../webcam/WebCameraPlugin";
import { QuaternionFilter } from "../../../shared/filters/QuaternionFilter";
import { debug } from "../../../shared/debug/DebugHelper";
import { Config } from "../instore/config/Config";
// import { Config } from "../instore/Config";


const tmpObj = new Object3D()

const landmarks3DCorrection = {
    13: 0.15,
    14: 0.15,
    15: 0.15,
} as Record<number, number>

export interface Hand {
    landmarks: Vector3[]
    targetLandmarks: Vector3[]
    landmarks3D: Vector3[]
    distance: number
    currentDebugEntries: [string, string | number][]
    lastSuccessTime: number
    getRingAttachPositionForFinger(finger: Finger): Vector3
    getRingAttachQuaternionForFinger(finger: Finger): Quaternion
    getLandmarkMovementFactor(landmarkIndex: number): number
    getCameraLookAtFactor(): number
    getSidewaysFactor(): number
    getFingerLookAtFactor(finger: Finger): number
    isShowingFrontHand(): boolean
    getMappedBackHandFactor(): number
    refresh(): void
    processResult(result: HandLandmarkerResult | undefined, samplesPerSecond: number): void
    setFinger(finger: Finger): void
    get handedness(): "Right" | "Left"
    get ringFingerMovementFactor(): number
}

export class MPHand implements Hand {
    protected camera: PerspectiveCamera
    private videoFeed: WebCameraVideoFeed

    protected static readonly zScalingFactor: number = 1.25
    protected readonly filterLandmarks3D: boolean = true

    public landmarks: Vector3[] = new Array(21).fill(null).map(() => new Vector3())
    public landmarks3D: Vector3[] = new Array(21).fill(null).map(() => new Vector3())
    public distance = 0

    protected worldLandmarks: Vector3[] = new Array(21).fill(null).map(() => new Vector3())
    protected targetWorldLandmarks: Vector3[] = new Array(21).fill(null).map(() => new Vector3())
    protected rotationLandmarks3D: Vector3[] = new Array(21).fill(null).map(() => new Vector3())

    public targetLandmarks: Vector3[] = new Array(21).fill(null).map(() => new Vector3())
    protected targetLandmarks3D: Vector3[] = new Array(21).fill(null).map(() => new Vector3())

    // handedness
    private handednessValue = 0.5;
    private handednessWeight = 1;

    // stats
    protected samplesPerSecond = 1
    public lastSuccessTime = 0

    protected landmarksFilters = new Array(21 * 3).fill(null).map(() => new OneEuroFilter(60, 1.0, 0.1, 1.0))
    protected worldLandmarksFilters = new Array(21 * 3).fill(null).map(() => new OneEuroFilter(60, 1.0, 0.1, 1.0))
    protected landmarks3DFilters = new Array(21 * 3).fill(null).map(() => new OneEuroFilter(60, 1.0, 4.0, 1.0))
    protected distanceFilter = new OneEuroFilter(60, 1.0, 1.0, 1.0)

    protected landmarkMovement = Array(21).fill(0)
    protected landmarkMovementFilters = Array(21).fill(null).map(() => new OneEuroFilter(60, 1, 3, 1))
    protected movementLandmarks = new Array(21).fill(null).map(() => new Vector3(-1, -1, -1))
    protected lastMovementLandmarks = new Array(21).fill(null).map(() => new Vector3())
    protected movementLandmarksFilters = new Array(21 * 3).fill(null).map(() => new OneEuroFilter(60, 1, 3, 1))

    // quaternion for the ring positions of the 5 fingers
    protected quaternions = Array(5).fill(null).map(() => new Quaternion())
    protected quaternionFilters = Array(5).fill(null).map(() => new QuaternionFilter(60, 4, 12))

    protected finger: Finger = Finger.Ring

    // entries of [key, value] pairs for debugging
    public currentDebugEntries: [string, string | number][] = []

    constructor(camera: PerspectiveCamera, videoFeed: WebCameraVideoFeed) {
        this.camera = camera
        this.videoFeed = videoFeed
    }

    protected getMovementFactorFromLandmarkMovement(landmarkMovement: number) {
        const clampedMovement = Math.max(landmarkMovement, 1e-4);

        // 
        const exponent = mapLinearClamped(this.samplesPerSecond, 10, 100, 2, 1.5);
        let factor = mapLinearClamped(this.samplesPerSecond, 10, 100, 20, 80);
        factor *= Config.mpSnappiness;

        const expValue = Math.exp(-factor * clampedMovement ** exponent);

        return expValue
    }

    getLandmarkMovementFactor(landmarkIndex: number) {
        return this.getMovementFactorFromLandmarkMovement(this.landmarkMovement[landmarkIndex])
    }

    getLandmarkMovement(landmarkIndex: number) {
        return this.landmarkMovement[landmarkIndex]
    }

    processResult(result: HandLandmarkerResult | undefined, samplesPerSecond: number) {
        if (!result || result.landmarks.length === 0) {
            this.reset()
            return
        }

        const { categoryName, score } = result.handedness[0][0];

        if (score < 0.5) {
            // consider this a failure and reset the handedness
            this.reset()
            return
        }

        this.lastSuccessTime = performance.now()
        this.samplesPerSecond = samplesPerSecond

        const landmarks = result.landmarks[0].map(({ x, y, z }) => new Vector3(x, y, z * MPHand.zScalingFactor));
        const worldLandmarks = result.worldLandmarks[0].map(({ x, y, z }) => new Vector3(x, y, z));

        // set targetLandmarks as the average of landmarks for the same video frame
        this.targetLandmarks.forEach((lm, i) => lm.copy(landmarks[i]))
        this.targetWorldLandmarks.forEach((lm, i) => lm.copy(worldLandmarks[i]))

        // accumulate handedness for better confidence
        const value = categoryName === "Right" ? 1 : 0

        this.handednessWeight += score
        debug("handedness score", score)
        this.handednessValue = MathUtils.lerp(this.handednessValue, value, 1 / this.handednessWeight)

        const dist = this.getDistance(this.targetLandmarks)

        this.targetLandmarks3D = this.targetLandmarks.map((lm, i) => {
            const offsetZ = landmarks3DCorrection[i] ?? 0
            const lm3D = lm.clone()
            return landmarkTo3D(lm3D, this.camera, dist - offsetZ)
        })

        this.refresh()
    }

    setFinger(finger: Finger) {
        this.finger = finger
    }

    protected reset() {
        this.handednessValue = 0.5
        this.handednessWeight = 1

        // also reset all filters
        this.landmarksFilters.forEach(filter => filter.reset())
        this.worldLandmarksFilters.forEach(filter => filter.reset())
        this.landmarks3DFilters.forEach(filter => filter.reset())
        this.movementLandmarksFilters.forEach(filter => filter.reset())
        this.distanceFilter.reset()
        this.quaternionFilters.forEach(filter => filter.reset())
    }

    protected calculateLandmarkMovement() {
        const timeStamp = performance.now() / 1000;

        // Determine the current landmarks movement
        this.targetLandmarks3D.forEach((targetLandmark, i) => {
            const movementLandmark = this.movementLandmarks[i];
            movementLandmark.copy(targetLandmark);

            movementLandmark.x = this.movementLandmarksFilters[i * 3].filter(targetLandmark.x, timeStamp);
            movementLandmark.y = this.movementLandmarksFilters[i * 3 + 1].filter(targetLandmark.y, timeStamp);
            movementLandmark.z = this.movementLandmarksFilters[i * 3 + 2].filter(targetLandmark.z, timeStamp);
        });

        this.landmarkMovement = this.movementLandmarks.map((landmark, i) => {
            // const z1 = landmark.z * 0.15
            // const z2 = this.lastMovementLandmarks[i].z * 0.15

            let movement = landmark.clone().setZ(0).distanceTo(this.lastMovementLandmarks[i].clone().setZ(0))
            movement *= 3
            // movement = (2.5 * movement + 1) ** 2 - 1
            return this.landmarkMovementFilters[i].filter(movement, timeStamp)
        })

        this.movementLandmarks.forEach((landmark, i) => this.lastMovementLandmarks[i].copy(landmark))

        debug("lm14 movement", this.landmarkMovement[14])
    }

    protected updateLandmarks() {
        this.landmarks.forEach((landmark, i) => {
            const targetLandmark = this.targetLandmarks[i]

            // we do not filter here as in the next stage the landmarks3D will be filtered and projected to 2D to get filtered 2D landmarks

            landmark.copy(targetLandmark)
        });
    }

    protected getDistance(landmarks: Vector3[]) {
        const lmsDist = landmarks.map((lm, i) => {
            lm = lm.clone()
            const z = this.worldLandmarks[i].z
            lm.setZ(z)
            return lm
        })

        // Get the hand scale
        let scale = lmsDist[5].distanceTo(lmsDist[9])
            + lmsDist[9].distanceTo(lmsDist[13])
            + lmsDist[13].distanceTo(lmsDist[17]);
        scale *= 2.5;

        scale += lmsDist[0].distanceTo(lmsDist[5]) + lmsDist[0].distanceTo(lmsDist[17]);
        scale = Math.max(scale, 0.00001);
        let dist = 1 / scale * 0.5
        dist *= 5 / 6

        const distFixed = dist * 1.1
        dist = MathUtils.lerp(dist, distFixed, this.getMappedBackHandFactor())

        return dist * 100 + Config.mpZ  // meters to cm
    }

    protected calculateDistance() {
        const timeStamp = performance.now() / 1000;

        let movementPalm = this.landmarkMovement[0] + this.landmarkMovement[5]
            + this.landmarkMovement[9] + this.landmarkMovement[13]
            + this.landmarkMovement[17];

        movementPalm /= 5;

        const m = this.getMovementFactorFromLandmarkMovement(movementPalm)

        this.distanceFilter.setMinCutoff(MathUtils.lerp(4, 0.1, m));
        this.distanceFilter.setBeta(0.001);
        this.distanceFilter.setDerivateCutoff(0.001);

        const dist = this.getDistance(this.landmarks)

        this.distance = this.distanceFilter.filter(dist, timeStamp);
    }

    protected updateLandmarks3D() {
        const timeStamp = performance.now() / 1000;
        const curFingerLandmarkIndices = getLandmarkIndicesFromFinger(this.finger)

        this.landmarks3D.forEach((lm3D, i) => {
            // we'll use the target landmarks here to get non-filtered landmarks
            // we have to scale them by 0.01 to bring them into a good range for filtering
            // otherwise there is an issue where the landmarks lag too much after some time
            const offsetZ = landmarks3DCorrection[i] ?? 0
            const targetLm3D = landmarkTo3D(this.targetLandmarks[i], this.camera, this.distance - offsetZ).multiplyScalar(0.001)

            // filter 3D landmar0ks
            if (this.filterLandmarks3D) {
                const targetWorldLandmark = this.targetWorldLandmarks[i]

                const m = this.getLandmarkMovementFactor(i)

                // let maxFilterValue = MathUtils.clamp(MathUtils.mapLinear(this.samplesPerSecond, 10, 100, 6, 12), 6, 12)
                let minFilterValue = MathUtils.lerp(1, 0.5, Config.mpSnappiness)
                let maxFilterValue = MathUtils.lerp(6, 12, Config.mpSnappiness)

                const mincutoff = MathUtils.lerp(maxFilterValue, minFilterValue, m)
                if (!curFingerLandmarkIndices.includes(i)) {
                    minFilterValue = MathUtils.lerp(2, 4, Config.mpSnappiness)
                    maxFilterValue = MathUtils.lerp(24, 32, Config.mpSnappiness)
                }

                // if (i !== 13 && i !== 14) {
                //     mincutoff = MathUtils.lerp(32, 8, m)
                // }

                const beta = 0.0001
                const dcutoff = 0.0001

                const mincutoffWorld = MathUtils.lerp(6, 0.25, m);
                const betaWorld = 0.0001
                const dcutoffWorld = 0.0001;

                // if (i === 14) {
                //     this.currentDebugEntries.push(["lm14 movement", this.landmarkMovement[i]])
                //     this.currentDebugEntries.push(["lm14 m", m])
                //     this.currentDebugEntries.push(["lm14 mincutoff", mincutoff])
                //     this.currentDebugEntries.push(["lm14 beta", beta])
                //     this.currentDebugEntries.push(["lm14 dcutoff", dcutoff])
                // }

                [0, 1, 2].forEach(j => {
                    this.landmarks3DFilters[i * 3 + j].setMinCutoff(mincutoff)
                    this.landmarks3DFilters[i * 3 + j].setBeta(beta);
                    this.landmarks3DFilters[i * 3 + j].setDerivateCutoff(dcutoff);

                    this.worldLandmarksFilters[i * 3 + j].setMinCutoff(mincutoffWorld)
                    this.worldLandmarksFilters[i * 3 + j].setBeta(betaWorld);
                    this.worldLandmarksFilters[i * 3 + j].setDerivateCutoff(dcutoffWorld);
                });

                lm3D.x = this.landmarks3DFilters[i * 3].filter(targetLm3D.x, timeStamp)
                lm3D.y = this.landmarks3DFilters[i * 3 + 1].filter(targetLm3D.y, timeStamp)
                lm3D.z = this.landmarks3DFilters[i * 3 + 2].filter(targetLm3D.z, timeStamp)

                this.worldLandmarks[i].x = this.worldLandmarksFilters[i * 3].filter(targetWorldLandmark.x, timeStamp);
                this.worldLandmarks[i].y = this.worldLandmarksFilters[i * 3 + 1].filter(targetWorldLandmark.y, timeStamp);
                this.worldLandmarks[i].z = this.worldLandmarksFilters[i * 3 + 2].filter(targetWorldLandmark.z, timeStamp);
            } else {
                lm3D.copy(targetLm3D)
            }

            lm3D.multiplyScalar(1000)
        })

        const mappedBackwardsHandFactor = this.getMappedBackHandFactor()

        this.landmarks3D.forEach((l, i) => {
            let z = -(this.distance + this.worldLandmarks[i].z * this.worldLandmarksFactor)

            // when the user shows the inner palm the ring is mostly facing downwards/to the palm, so we correct for it here
            if ([2, 3, 4, // thumb
                6, 7, 8, // index
                10, 11, 12, // middle
                14, 15, 16, // ring
                18, 19, 20, // pinky
            ].includes(i)) {
                z -= 0.01 * mappedBackwardsHandFactor * this.worldLandmarksFactor
            }

            correctZPosition(l, z, this.camera)
        })

        debug("sidewaysFactor", this.getSidewaysFactor())
    }

    // 1 for backwards, 0 for forwards
    getMappedBackHandFactor() {
        // 1 for looking at camera, -1 for looking away (showing back of hand)
        const lookAtFactor = this.getCameraLookAtFactor()
        const lookAtFactorMapped = lookAtFactor * 0.5 + 0.5
        const backwardsHandFactor = MathUtils.clamp(MathUtils.mapLinear(lookAtFactorMapped, 0.25, 0.75, 1, 0), 0, 1)
        debug("backwardsHandFactor", backwardsHandFactor)

        return backwardsHandFactor
    }

    protected getRotationLandmarksIndicesFromFinger(finger: Finger) {
        return [
            [2, 3, 5], // thumb
            [5, 6, 17], // index
            [9, 10, 17], // middle
            [13, 14, 5], // ring
            [17, 18, 5], // pinky
        ][finger]
    }

    protected calculateFingerQuaternions() {
        // go through quat data and calculate quaternions for each finger
        for (let i: Finger = 0; i < 5; i++) {
            const landmarks = this.getRotationLandmarksIndicesFromFinger(i).map(i => this.landmarks3D[i])

            const adjustedPitchOffset = Config.pitchOffset * (1 - this.getMappedBackHandFactor())
            debug("adjustedPitchOffset", adjustedPitchOffset)

            const offsetRotation = i === Finger.Ring ?
                [adjustedPitchOffset, Config.yawOffset, Config.rollOffset].map(MathUtils.degToRad)
                :
                [0, 0, 0]

            this.calculateQuaternion(this.quaternions[i], landmarks, i, this.quaternionFilters[i], offsetRotation as [number, number, number])

            if ([Finger.Middle, Finger.Index, Finger.Thumb].includes(i)) {
                const euler = new Euler().setFromQuaternion(this.quaternions[i])
                euler.y += Math.PI
                euler.z *= -1

                this.quaternions[i].setFromEuler(euler)
            }
        }
    }

    protected matchLandmarksToLandmarks3D() {
        this.landmarks3D = this.landmarks3D.map(lm3D => mapLandmark3DFromVideoToVideoTextureView(lm3D, this.camera, this.videoFeed))

        // to be consistent we'll calculate the landmarks here as well by projecting the 3D landmarks to 2D
        this.landmarks = this.landmarks3D.map((lm3D) => {
            const lm = lm3D.clone().project(this.camera)

            // convert from [-1, 1] to [0, 1]
            lm.x = (-lm.x + 1) / 2
            lm.y = (-lm.y + 1) / 2

            return lm
        })
    }

    public refresh() {
        this.currentDebugEntries = []

        this.calculateLandmarkMovement()
        this.updateLandmarks()
        this.calculateDistance()
        this.updateLandmarks3D()
        this.matchLandmarksToLandmarks3D()
        this.calculateFingerQuaternions()
    }

    protected calculateQuaternion(quaternion: Quaternion, rotationLandmarks: Vector3[], finger: Finger,
        filter?: QuaternionFilter | null, offsetRotation?: [number, number, number]) {
        const timeStamp = performance.now() / 1000;

        const handednessFactor = this.handedness === "Right" ? -1 : 1

        // rotation
        lookAtFrom3Points(tmpObj, this.handedness, rotationLandmarks[0], rotationLandmarks[1], rotationLandmarks[2]);

        tmpObj.rotateOnAxis(new Vector3(0, 0, 1), Math.PI)

        if (offsetRotation) {
            const [pitch, yaw, roll] = offsetRotation
            tmpObj.rotateOnAxis(new Vector3(1, 0, 0), pitch)
            tmpObj.rotateOnAxis(new Vector3(0, 1, 0), yaw)
            tmpObj.rotateOnAxis(new Vector3(0, 0, 1), roll * handednessFactor)
        }

        quaternion.copy(tmpObj.quaternion);

        const lmIndex = this.getRotationLandmarksIndicesFromFinger(finger)[1]
        const m = this.getLandmarkMovementFactor(lmIndex)
        filter?.filter(quaternion, timeStamp, m)
    }

    getCameraLookAtFactor() {
        const center = new Vector3()
        center.add(this.landmarks3D[0])
        center.add(this.landmarks3D[5])
        center.add(this.landmarks3D[17])
        center.divideScalar(3)
        tmpObj.position.copy(center)

        lookAtFrom3Points(tmpObj, this.handedness, this.landmarks3D[0], this.landmarks3D[5], this.landmarks3D[17])

        // get how much tmpObj is looking at the camera taking position and quaternion into account
        const tmpObjToCamera = tmpObj.position.clone().sub(this.camera.position).normalize()
        const tmpObjForward = tmpObj.getWorldDirection(new Vector3())
        const tmpObjToCameraDot = tmpObjToCamera.dot(tmpObjForward)

        return tmpObjToCameraDot
    }

    getFingerLookAtFactor(finger: Finger) {
        const lmA = this.getRotationLandmarksIndicesFromFinger(finger)[0]
        const lmB = this.getRotationLandmarksIndicesFromFinger(finger)[1]

        const pos = this.landmarks3D[lmA].clone().lerp(this.landmarks3D[lmB], 0.5)
        tmpObj.position.copy(pos)

        const quat = this.quaternions[finger]
        tmpObj.quaternion.copy(quat)

        // get how much tmpObj is looking at the camera taking position and quaternion into account
        const tmpObjToCamera = tmpObj.position.clone().sub(this.camera.position).normalize()
        const tmpObjForward = tmpObj.getWorldDirection(new Vector3())
        const tmpObjToCameraDot = tmpObjToCamera.dot(tmpObjForward)

        return Math.abs(tmpObjToCameraDot)
    }

    getSidewaysFactor() {
        let cameraLookAtFactor = this.getCameraLookAtFactor()

        // map from [-1, 1] to [0, 1]
        cameraLookAtFactor = (cameraLookAtFactor + 1) / 2

        const sidewaysFactor = 1 - Math.abs(cameraLookAtFactor - 0.5) * 2
        return MathUtils.clamp(sidewaysFactor, 0, 1)
    }

    get ringFingerMovementFactor() {
        return this.getMovementFactorFromLandmarkMovement(this.landmarkMovement[14])
    }

    get handedness() {
        return this.handednessValue > 0.5 ? "Right" : "Left"
    }

    private get worldLandmarksFactor() {
        return 75 * Config.mpWorldZFactor
    }

    isShowingFrontHand() {
        return isShowingBackHand(this.landmarks, this.handedness)
    }

    getRingAttachPositionForFinger(finger: Finger = Finger.Ring) {
        const t = Config.ringOnFingerOffset

        const landmarks3D = this.landmarks3D

        switch (finger) {
            case Finger.Thumb:
                return landmarks3D[2].clone().lerp(landmarks3D[3], t)
            case Finger.Index:
                return landmarks3D[5].clone().lerp(landmarks3D[6], t)
            case Finger.Middle:
                return landmarks3D[9].clone().lerp(landmarks3D[10], t)
            case Finger.Ring:
                return landmarks3D[13].clone().lerp(landmarks3D[14], t)
            case Finger.Pinky:
                return landmarks3D[17].clone().lerp(landmarks3D[18], t)
        }
    }

    getRingAttachQuaternionForFinger(finger: Finger = Finger.Ring) {
        switch (finger) {
            case Finger.Thumb:
                return this.quaternions[0]
            case Finger.Index:
                return this.quaternions[1]
            case Finger.Middle:
                return this.quaternions[2]
            case Finger.Ring:
                return this.quaternions[3]
            case Finger.Pinky:
                return this.quaternions[4]
        }
    }
}