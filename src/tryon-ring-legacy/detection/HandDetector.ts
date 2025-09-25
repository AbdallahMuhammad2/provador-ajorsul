import { HandLandmarker, HandLandmarkerResult } from "@mediapipe/tasks-vision";
import { PerspectiveCamera, Vector3 } from "webgi";
import { MPHand } from "../hand/MPHand";
import { BaseDetector } from "../../../detection/BaseDetector";
import { Hand } from "../hand/MPHand";
import { preloadFromUrl } from "../utils/handLandmarkUtils";
import { WebCameraVideoFeed } from "../../../webcam/WebCameraPlugin";
import { createOffscreenCanvasFromVideo } from "../../../webcam/utils";
import { debug } from "../../../shared/debug/DebugHelper";

// import HandDetectionWorker from "./worker/HandDetectionWorker.ts?worker&inline";

export interface HandLandmarkerResult2 extends HandLandmarkerResult {
    normalizedLandmarks: Vector3[][]
}

type HandDetectorOptions = {
    async?: boolean
}

type HandDetectorWorkerMessage = {
    handLandmarkerResult: HandLandmarkerResult,
    detectionTime: number
    videoFrameNumber: number
}

export class HandDetector extends BaseDetector {
    public hand: Hand
    public lastResult?: HandLandmarkerResult
    private options: HandDetectorOptions = {}
    private handLandmarker?: HandLandmarker
    private needsSendNewFrame = false
    private videoFrameNumber = 0

    static modelAssetPromise: Promise<string>
    static wasmBinaryPromise: Promise<string>
    static wasmLoaderPromise: Promise<string>

    static preload() {
        const urls = {
            modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/latest/hand_landmarker.task",
            wasmBinaryPath: "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.21/wasm/vision_wasm_internal.wasm",
            wasmLoaderPath: "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.21/wasm/vision_wasm_internal.js",
        }

        HandDetector.modelAssetPromise = preloadFromUrl(urls.modelAssetPath)
        HandDetector.wasmBinaryPromise = preloadFromUrl(urls.wasmBinaryPath)
        HandDetector.wasmLoaderPromise = preloadFromUrl(urls.wasmLoaderPath)
    }

    constructor(camera: PerspectiveCamera, videoFeed: WebCameraVideoFeed, options?: HandDetectorOptions) {
        super(videoFeed)

        this.options = { async: false, ...options }
        this.hand = new MPHand(camera, videoFeed);
    }

    setHand(hand: Hand) {
        this.hand = hand
    }

    async init() {
        if (this.options.async) {
            throw new Error("Async Hand Detector is not implemented yet")

            // todo: there are older browsers that neither support OffscreenCanvas nor ImageBitmap
            // revert to sync mode in that case

            // console.log("Async Hand Detector: Initializing HandDetectionWorker");
            // this.worker = new HandDetectionWorker()
            // await this.waitForWorkerInit()

            // this.worker!.onmessage = this.processWorkerMessage.bind(this);

            // console.log("Async Hand Detector: fully loaded, ready to process frames");
        } else {
            const [wasmBinaryPath, wasmLoaderPath, modelAssetPath] = await Promise.all([HandDetector.wasmBinaryPromise, HandDetector.wasmLoaderPromise, HandDetector.modelAssetPromise])

            const wasmFileset = {
                wasmBinaryPath,
                wasmLoaderPath,
            } as any

            console.log("Sync HandLandmarker: Initializing HandLandmarker...");

            // eslint-disable-next-line no-undef
            this.handLandmarker = await HandLandmarker.createFromOptions(wasmFileset, {
                baseOptions: {
                    modelAssetPath,
                    delegate: "GPU",
                },
                runningMode: "VIDEO",
                numHands: 1,
                minHandDetectionConfidence: 0.5,
                minTrackingConfidence: 0.5,
                minHandPresenceConfidence: 0.5,
            });

            console.log("Sync HandLandmarker fully loaded, ready to process frames");
        }
    }

    public async dryrun(): Promise<void> {
        await new Promise<void>((resolve) => setTimeout(() => resolve(), 1));

        return new Promise((resolve) => {
            if (this.options.async) {
                this.worker!.postMessage("dryrun");
                this.worker!.onmessage = () => {
                    this.worker!.onmessage = this.processWorkerMessage.bind(this);
                    resolve();
                }
            } else {
                const imgData = new ImageData(1, 1);
                this.handLandmarker!.detectForVideo(imgData, performance.now());
                resolve();
            }
        })
    }

    isAsync() {
        return this.options.async;
    }

    detect(frameNumber: number = -1) {
        if (!this.videoFeed) throw new Error(this.constructor.name + ": videoFeed is not set. Please call setVideoFeed() before calling this method.")

        if (frameNumber === -1) frameNumber = this.videoFrameNumber++
        this.lastDetectionTime = performance.now();

        if (!this.videoFeed.usable) return;

        const res = this.handLandmarker!.detectForVideo(this.videoFeed.video, performance.now());
        // console.log(JSON.stringify(res, null, 2))
        const detectionTime = performance.now() - this.lastDetectionTime;

        this.processResult({
            handLandmarkerResult: res,
            detectionTime,
            videoFrameNumber: frameNumber
        });
    }

    setNeedsSendNewFrame() {
        this.needsSendNewFrame = true
    }

    detectAsync() {
        if (!this.videoFeed) throw new Error(this.constructor.name + ": videoFeed is not set. Please call setVideoFeed() before calling this method.")

        if (this.waitingOnResult || !this.videoFeed.usable) return;
        super.detectAsync();

        if (this.needsSendNewFrame) {
            const offscreenCanvas = createOffscreenCanvasFromVideo(this.videoFeed.video);
            const imageBitmap = offscreenCanvas.transferToImageBitmap();

            // const imageBitmap = new VideoFrame(this.videoFeed.video, {
            //     displayWidth: this.videoFeed.video.videoWidth,
            //     displayHeight: this.videoFeed.video.videoHeight,
            //     timestamp: performance.now()
            // })

            this.worker!.postMessage({
                imageBitmap,
                videoFrameNumber: this.videoFrameNumber++,
            }, [imageBitmap]);

            this.needsSendNewFrame = false;
        } else {
            this.worker!.postMessage(null);
        }
    }

    protected processResult(result: HandDetectorWorkerMessage) {
        if (!this.videoFeed) throw new Error(this.constructor.name + ": videoFeed is not set. Please call setVideoFeed() before calling this method.")

        // we're ready to detect for the next time, it can still be the same frame
        if (this.options.async) {
            this.detectAsync();
        }

        this.addSuccessfulSample(result.detectionTime)

        const mpResult = result.handLandmarkerResult as HandLandmarkerResult2;

        //scale and offset the landmarks to match the video texture
        if (mpResult.landmarks[0]) mpResult.normalizedLandmarks = [mpResult.landmarks[0].map(l => new Vector3(l.x, l.y, l.z))]
        const isFail = !result.handLandmarkerResult || result.handLandmarkerResult.landmarks.length === 0
        if (isFail && this.lastResult) this.dispatchEvent({ type: "trackingFail" })
        if (!isFail && !this.lastResult) this.dispatchEvent({ type: "trackingSuccess" })

        debug("success", this.success)

        this.hand.processResult(mpResult, this.samplesPerSecond);
        this.lastResult = isFail ? undefined : result.handLandmarkerResult
    }

    get success(): boolean {
        return this.lastResult !== undefined
    }

    dispose(): void {
        if (this.worker) {
            this.worker.terminate();
        }

        this.handLandmarker?.close();
    }
}