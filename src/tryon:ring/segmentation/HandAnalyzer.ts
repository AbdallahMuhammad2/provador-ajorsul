import { OneEuroFilter } from "1eurofilter";
import { EventDispatcher, MathUtils } from "webgi";
import { debug } from "../../../shared/debug/DebugHelper";
import { WebCameraVideoFeed } from "../../../webcam/WebCameraPlugin";
import { Hand } from "../hand/MPHand";
import { Finger, getNormalizedFingerWidth, mapFromVideoTextureViewToVideo, mapLinearClamped } from "../utils/handLandmarkUtils";
import { Segmenter } from "./FingerSegmenter";

interface HandAnalysisEvent {
    'handAnalysisProgress': {
        detail: {
            progress: number;
        }
    }
    'handAnalysisReject': {
        detail: {
            reason: 'tooClose' | 'tooFar' | 'moving' | 'notSpread';
        }
    }
    'handAnalysisComplete': {
        detail: Record<string, never>
    }
}

export class HandAnalyzer extends EventDispatcher<HandAnalysisEvent> {
    private mpHand: Hand;
    private videoFeed: WebCameraVideoFeed;
    private fingerWidthDetectionMode: "segmenter" | "landmarks";
    private segmenter: Segmenter | undefined;

    private lastProgress = 0;
    private lastSegmenterProgress = 0;
    private done = false;
    private readonly minHandDistance = 15;
    private readonly maxHandDistance = 150;

    // Cooldown timers
    private lastRejectTime = 0;
    private readonly rejectCooldown = 500; // 500ms cooldown for reject messages
    private lastRejectReason: string | null = null;

    // Hand movement detection
    private readonly requiredStillTime = 1000; // 1000ms of stillness required
    private readonly movementThreshold = 0.5;
    private readonly gracePeriod = 1000; // 1000ms grace period before showing warnings
    private readonly minTimeSinceFirstSample = 2000; // 2000ms minimum time since first sample

    private lastUpdateTime = 0;
    private stillStartTime = -1;
    private firstSampleTime = -1;

    private smoothedFingerWidth = 0
    private smoothedFingerWidthFilter = new OneEuroFilter(0.025, 0.025, 0.025)
    private knucklesFingerWidth = 0
    private knucklesFingerWidthFilter = new OneEuroFilter(0.025, 0.025, 0.025)
    private knucklesFingerWidthSamples = 0

    constructor(mpHand: Hand, videoFeed: WebCameraVideoFeed, fingerWidthDetectionMode: "segmenter" | "landmarks", segmenter?: Segmenter) {
        super();

        if (!segmenter && fingerWidthDetectionMode === "segmenter") {
            throw new Error("Error: HandAnalyzer requires segmenter when fingerWidthDetectionMode is 'segmenter'");
        }

        this.mpHand = mpHand;
        this.videoFeed = videoFeed;
        this.segmenter = segmenter;
        this.fingerWidthDetectionMode = fingerWidthDetectionMode;
        this.lastUpdateTime = performance.now();
    }

    private canDispatchReject(reason: string): boolean {
        const now = performance.now();
        if (now - this.lastRejectTime >= this.rejectCooldown || reason === this.lastRejectReason) {
            this.lastRejectTime = now;
            this.lastRejectReason = reason;
            return true;
        }
        return false;
    }

    private shouldShowWarning(): boolean {
        const now = performance.now();
        return now - this.lastUpdateTime > this.gracePeriod && now - this.firstSampleTime > this.minTimeSinceFirstSample;
    }

    analyzeHand() {
        // even if we run on segmenter mode, this will be used as the initial guess for the finger width
        this.analyzeKnuckles()

        if (this.fingerWidthDetectionMode === "segmenter") {
            if (this.done) return;

            this.analyzeSegmenter()

            this.smoothedFingerWidth = this.segmenter ? this.smoothedFingerWidthFilter.filter(
                this.segmenter!.getFingerWidth(Finger.Ring),
                performance.now() / 1000
            ) : 1
        }
    }

    private analyzeKnuckles() {
        // as an initial guess, we use the distance between the middle and ring finger knuckle
        // they are roughly the finger width of the ring finger

        // we can use the knuckle of the middle and ring finger as we'll scale that later for an individual finger
        let knucklesFingerWidth = 0.875 * this.mpHand.landmarks3D[9].distanceTo(this.mpHand.landmarks3D[13])

        let frontFacingConfidence = mapLinearClamped(this.mpHand.getSidewaysFactor(), 0.33, 0, 0, 1) ** 0.5
        const startFactor = Math.min(this.knucklesFingerWidthSamples / 8, 1)
        frontFacingConfidence = MathUtils.lerp(1, frontFacingConfidence, startFactor)

        debug("knucklesFingerWidth confidence", frontFacingConfidence)
        knucklesFingerWidth = MathUtils.lerp(this.knucklesFingerWidth, knucklesFingerWidth, frontFacingConfidence)

        this.knucklesFingerWidthSamples++

        let movementFactor = 0.5 * (this.mpHand.getLandmarkMovementFactor(9) + this.mpHand.getLandmarkMovementFactor(13))
        movementFactor *= frontFacingConfidence
        movementFactor = MathUtils.lerp(0, movementFactor, startFactor)

        this.knucklesFingerWidthFilter.setMinCutoff(mapLinearClamped(movementFactor, 0, 1, 2, 0.025))
        this.knucklesFingerWidth = this.knucklesFingerWidthFilter.filter(knucklesFingerWidth, performance.now() / 1000)

        debug("knucklesFingerWidth", this.knucklesFingerWidth)

        // we want to draw the guessed finger width on the screen
        // const oldPos = this.modelRoot!.position.clone()
        // this.modelRoot!.translateY(0.5)
        // const p1 = this.modelRoot!.translateX(0.5 * this.knucklesFingerWidth).position.clone()
        // const p2 = this.modelRoot!.translateX(-1 * this.knucklesFingerWidth).position.clone()
        // this.modelRoot!.position.copy(oldPos)

        // const camera = this._viewer!.scene.activeCamera.cameraObject as PerspectiveCamera

        // const p1_2D = to2D(p1, camera)
        // const p2_2D = to2D(p2, camera)

        // this.debugHelper?.drawLine(p1_2D, p2_2D, { color: "orange", mirror: true })

        // const lm9_2D = to2D(this.mpHand.landmarks3D[9], camera)
        // const lm13_2D = to2D(this.mpHand.landmarks3D[13], camera)
        // this.debugHelper?.drawLine(lm9_2D, lm13_2D, { color: "violet", mirror: true })
    }

    private analyzeSegmenter() {
        if (!this.segmenter) throw new Error("Error: Segmenter not initialized");

        const now = performance.now();

        // Check hand distance
        if (this.mpHand.distance < this.minHandDistance) {
            if (this.canDispatchReject('tooClose')) {
                this.dispatchEvent({ type: 'handAnalysisReject', detail: { reason: 'tooClose' } });
            }
            this.stillStartTime = -1;
            this.lastUpdateTime = now;
            return;
        }
        if (this.mpHand.distance > this.maxHandDistance) {
            if (this.canDispatchReject('tooFar')) {
                this.dispatchEvent({ type: 'handAnalysisReject', detail: { reason: 'tooFar' } });
            }
            this.stillStartTime = -1;
            this.lastUpdateTime = now;
            return;
        }

        if (this.firstSampleTime === -1) {
            this.firstSampleTime = now;
        }

        // Check hand movement
        if (this.mpHand.ringFingerMovementFactor < this.movementThreshold) {
            this.stillStartTime = -1;
        } else if (this.stillStartTime === -1) {
            this.stillStartTime = now;
        }

        // Only proceed with analysis if hand has been still for required time
        const timeStill = this.stillStartTime === -1 ? 0 : now - this.stillStartTime;
        if (timeStill < this.requiredStillTime) {
            // Only show movement warning after grace period
            if (this.shouldShowWarning()) {
                if (this.canDispatchReject('moving')) {
                    this.dispatchEvent({ type: 'handAnalysisReject', detail: { reason: 'moving' } });
                }
            }

            if (this.mpHand.ringFingerMovementFactor < this.movementThreshold) return;
        }

        const normalizedLandmarks = this.mpHand.landmarks.map(lm => {
            lm = lm.clone();
            mapFromVideoTextureViewToVideo(lm, this.videoFeed!);
            return lm;
        });

        // Run segmentation
        if (this.segmenter.isAsync()) {
            this.segmenter.detectAsync({ landmarks: normalizedLandmarks });
        } else {
            this.segmenter.detect({ landmarks: normalizedLandmarks });
        }

        if (this.segmenter.isDoneSampling()) {
            this.done = true;
            this.dispatchEvent({ type: 'handAnalysisComplete', detail: {} });
            return;
        }

        const didProgress = this.segmenter.getProgress() > this.lastSegmenterProgress;

        let progress = this.segmenter.getProgress();
        // Ensure progress only moves forward by taking the maximum of current and last progress
        progress = Math.max(this.lastProgress, MathUtils.lerp(this.lastProgress, progress, 0.05));

        // Reset time since no progress if we're making progress
        if (didProgress) {
            this.lastUpdateTime = now;
        }

        this.lastProgress = progress;
        this.lastSegmenterProgress = this.segmenter.getProgress();

        // Check for overstepping
        const last4Samples = this.segmenter.last10Samples.slice(0, 4);
        const last4SamplesOverstepped = last4Samples.length > 3 && last4Samples.every((res) => (res.overstep));

        if (!didProgress && last4SamplesOverstepped) {
            // Only show notSpread warning after grace period
            if (this.shouldShowWarning()) {
                if (this.canDispatchReject('notSpread')) {
                    this.dispatchEvent({ type: 'handAnalysisReject', detail: { reason: 'notSpread' } });
                }
            }

            return;
        }

        // Only dispatch progress if we haven't detected any issues
        this.dispatchEvent({ type: 'handAnalysisProgress', detail: { progress } });
    }

    getFingerWidth(finger: Finger) {
        let w = this.knucklesFingerWidth
        if (this.segmenter) {
            const p = this.segmenter.getProgress()
            w = MathUtils.lerp(this.knucklesFingerWidth, this.smoothedFingerWidth * this.videoFeed!.view.scale, p)
        }

        const f = getNormalizedFingerWidth(finger)
        return w * f
    }

    isDone() {
        return this.done;
    }

    setHand(hand: Hand) {
        this.mpHand = hand;
    }

    restart() {
        this.lastProgress = 0;
        this.lastRejectTime = 0;
        this.lastRejectReason = null;
        this.stillStartTime = -1;
        this.lastUpdateTime = performance.now();
        this.firstSampleTime = -1;
        this.done = false;
        this.segmenter?.restart();
    }
} 