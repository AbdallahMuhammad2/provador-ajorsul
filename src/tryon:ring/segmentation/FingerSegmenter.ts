import { OneEuroFilter } from "1eurofilter";
import { ImageSegmenter } from "@mediapipe/tasks-vision";
import { MathUtils, PerspectiveCamera, Vector2, Vector3 } from "webgi";
import { Finger, mapFromVideoToVideoTextureView, preloadFromUrl, transformTo3DWithZ } from "../utils/handLandmarkUtils";
import { FingerWidthAnalyzer } from "./FingerWidthAnalyzer";
import "./FullSegmenter.js";

// import { createOffscreenCanvasFromVideo } from "../../camera/utils";
import { FingerWidthInterface } from "../instore/center/FingerCenterWidthCalculator";
import { performSegmentation } from "./FullSegmenter.js";
import { WebCameraVideoFeed } from "../../../webcam/WebCameraPlugin";
import { Hand } from "../hand/MPHand";
import { BaseDetector } from "../../../detection/BaseDetector";
import { createOffscreenCanvasFromVideo } from "../../../webcam/utils";
import { isAppleMobileDevice } from "../../../shared/utils/utils";
// import SegmentationWorker from "./worker/SegmentationWorker.ts?worker&inline";

type SegmenterOptions = {
    async?: boolean,
    multiClass?: boolean,
    smoothFingerWidth?: boolean
    debug?: boolean
    maxWeight?: number
    runForever?: boolean
}

const defaultSegmenterOptions: SegmenterOptions = {
    async: false,
    multiClass: false,
    smoothFingerWidth: true,
    debug: false,
    maxWeight: Infinity, // will run forever
    runForever: false
}

export type SegmenterResult = {
    detectionTime: number,
    ringFingerMovementFactor: number,
    timestamp: number,
    roi: { x: number, y: number, width: number, height: number },
    edgeLeft: { x: number, y: number } | null,
    edgeRight: { x: number, y: number } | null
    overstep: boolean
    distance?: number
    writeBuffer?: Uint8ClampedArray;
    landmarks: { x: number, y: number }[]
    landmarks3D: { x: number, y: number, z: number }[]
}
export class Segmenter extends BaseDetector implements FingerWidthInterface {
    private mpHand: Hand;
    private camera: PerspectiveCamera;
    private options: SegmenterOptions;

    private segmentationBuffer: Uint8Array | null = null
    private imageSegmenter: ImageSegmenter | null = null;
    public result: SegmenterResult | null = null;

    private fingerWidthFilter = new OneEuroFilter(60, 0.5, 0.5, 0.5)

    public edgeMovement = 0

    public fingerWidthAnalyzer: FingerWidthAnalyzer | null = null;

    public edgeLeft: Vector2 | null = new Vector2()
    public edgeRight: Vector2 | null = new Vector2()
    public targetPos: Vector3 | null = new Vector3()

    public confidenceValue = 0
    public confidenceFilter = new OneEuroFilter(60, 0.0375, 0.0375, 0.0375)

    public lastFingerWidth = 0
    private lastSuccessfulSampleTime = 0
    private readonly nextSampleWaitTime = 100
    public currentSamples = 0
    public last10Samples: SegmenterResult[] = []

    private firstSampleTime = -1
    static modelAssetPromise: Promise<string>
    static wasmBinaryPromise: Promise<string>
    static wasmLoaderPromise: Promise<string>

    static preload() {
        const urls = {
            modelAssetPath: "https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_multiclass_256x256/float32/latest/selfie_multiclass_256x256.tflite",
            wasmBinaryPath: "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.21/wasm/vision_wasm_internal.wasm",
            wasmLoaderPath: "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.21/wasm/vision_wasm_internal.js",
        }

        this.modelAssetPromise = preloadFromUrl(urls.modelAssetPath)
        this.wasmBinaryPromise = preloadFromUrl(urls.wasmBinaryPath)
        this.wasmLoaderPromise = preloadFromUrl(urls.wasmLoaderPath)
    }

    constructor(mpHand: Hand, camera: PerspectiveCamera, videoFeed?: WebCameraVideoFeed, options: SegmenterOptions = defaultSegmenterOptions) {
        super(videoFeed);

        console.log("Segmenter initialized with options", options);

        this.mpHand = mpHand;
        this.camera = camera;
        this.videoFeed = videoFeed;
        options = { ...defaultSegmenterOptions, ...options }
        this.options = options

        if (this.options.smoothFingerWidth) {
            this.fingerWidthAnalyzer = new FingerWidthAnalyzer();
        }
    }

    setHand(mpHand: Hand) {
        this.mpHand = mpHand;
    }

    private modelMinConfidence = 0.5
    setModelMinConfidence(modelMinConfidence: number) {
        this.modelMinConfidence = modelMinConfidence
    }

    public async init() {
        console.log("Segmenter: init()");
        if (this.options.async) {
            throw new Error("Async mode is not supported yet")

            // todo: there are older browsers that neither support OffscreenCanvas nor ImageBitmap
            // revert to sync mode in that case

            // this.worker = new SegmentationWorker()
            // console.log("Async Segmenter: created worker", this.worker);
            // await this.waitForWorkerInit()
            // console.log("Async Segmenter: worker initialized");

            // this.worker!.onmessage = this.processWorkerMessage.bind(this);
        } else {
            const [wasmBinaryPath, wasmLoaderPath, modelAssetPath] = await Promise.all([Segmenter.wasmBinaryPromise, Segmenter.wasmLoaderPromise, Segmenter.modelAssetPromise])

            const wasmFileset = {
                wasmBinaryPath,
                wasmLoaderPath,
            } as any

            console.log("Sync Segmenter: creating from options");

            const delegate = isAppleMobileDevice() ? "CPU" : "GPU"

            this.imageSegmenter = await ImageSegmenter.createFromOptions(wasmFileset, {
                baseOptions: {
                    modelAssetPath,
                    delegate
                },
                runningMode: "VIDEO",
                outputCategoryMask: false,
                outputConfidenceMasks: true,
            });

            console.log("Sync Segmenter fully initialized");
        }
    }

    public async dryrun() {
        return new Promise<void>((resolve) => {
            if (this.options.async) {
                console.log("Segmenter: doing dry run in async mode");
                this.worker!.postMessage("dryrun");
                this.worker!.onmessage = () => {
                    this.worker!.onmessage = this.processWorkerMessage.bind(this);
                    resolve();
                }
            } else {
                const imgData = new ImageData(1, 1);
                const res = this.imageSegmenter!.segmentForVideo(imgData, performance.now());
                res.close();
                resolve();
            }
        })
    }

    isInitialized() {
        return this.isAsync() || this.imageSegmenter !== null;
    }

    private canSample() {
        return this.mpHand && this.isInitialized() && (this.options.runForever || !this.isDoneSampling());
    }

    isDoneSampling() {
        return this.getProgress() > 0.99;
    }

    detect({ landmarks = this.mpHand.landmarks, landmarks3D = this.mpHand.landmarks3D }: { landmarks?: Vector3[], landmarks3D?: Vector3[] } = {}) {
        if (!this.videoFeed) throw new Error(this.constructor.name + ": videoFeed is not set. Please call setVideoFeed() before calling this method.")

        if (this.options.async) {
            throw new Error("This method is not available in async mode");
        }

        if (!this.canSample()) return;

        if (this.firstSampleTime === -1) {
            this.firstSampleTime = performance.now();
        }

        if (performance.now() - this.lastSuccessfulSampleTime < this.nextSampleWaitTime) return;

        this.currentSamples++;

        this.lastDetectionTime = performance.now()

        const res = performSegmentation(
            this.imageSegmenter!,
            this.videoFeed.video,
            this.lastDetectionTime,
            this.videoFeed.video.videoWidth,
            this.videoFeed.video.videoHeight,
            landmarks.map(({ x, y, z }) => ({ x, y, z })),
            this.getSegmentationMovementConfidence(),
            this.modelMinConfidence
        ) as SegmenterResult;

        res.landmarks = landmarks.map(({ x, y }) => ({ x, y }));
        res.landmarks3D = landmarks3D.map(({ x, y, z }) => ({ x, y, z }));

        this.processResult(res);
    }

    detectAsync({ landmarks = this.mpHand.landmarks, landmarks3D = this.mpHand.landmarks3D }: { landmarks?: Vector3[], landmarks3D?: Vector3[] } = {}) {
        if (!this.videoFeed) throw new Error(this.constructor.name + ": videoFeed is not set. Please call setVideoFeed() before calling this method.")
        if (!this.options.async) {
            throw new Error("This method is not available in sync mode");
        }

        if (this.waitingOnResult || !this.canSample()) return;
        if (performance.now() - this.lastSuccessfulSampleTime < 250) return;
        if (this.firstSampleTime === -1) {
            this.firstSampleTime = performance.now();
        }

        this.currentSamples++;

        super.detectAsync();

        const offscreenCanvas = createOffscreenCanvasFromVideo(this.videoFeed.video)

        // create image bitmap from offscreen canvas
        const offscreenCanvasBitmap = offscreenCanvas.transferToImageBitmap();

        this.worker!.postMessage({
            bitmap: offscreenCanvasBitmap,
            landmarks: landmarks.map(({ x, y, z }) => ({ x, y, z })),
            landmarks3D: landmarks3D.map(({ x, y, z }) => ({ x, y, z })),
            ringFingerMovementFactor: this.getSegmentationMovementConfidence(),
            modelMinConfidence: this.modelMinConfidence,
        }, [offscreenCanvasBitmap]);


        this.waitingOnResult = true;
    }

    restart() {
        this.currentSamples = 0;
        this.last10Samples = [];
        this.confidenceValue = 0;
        this.lastDetectionTime = 0;
        this.fingerWidthAnalyzer?.reset();
        this.firstSampleTime = -1;
        this.result = null;
        console.log("Segmenter: restarted");
    }

    private getSegmentationMovementConfidence() {
        let confidence = MathUtils.mapLinear(this.mpHand.getLandmarkMovementFactor(14), 0.05, 0.25, 0, 1)
        confidence = MathUtils.clamp(confidence, 0, 1)

        return confidence
    }

    isAsync() {
        return this.options.async
    }

    protected processResult(resultData: SegmenterResult) {
        if (!this.videoFeed) throw new Error(this.constructor.name + ": videoFeed is not set. Please call setVideoFeed() before calling this method.")
        if (resultData === null) return;

        this.lastSuccessfulSampleTime = performance.now();

        const hasBothEdges = resultData.edgeLeft && resultData.edgeRight;

        if (hasBothEdges) this.addSuccessfulSample(resultData.detectionTime);

        this.last10Samples.push({ ...resultData });
        if (this.last10Samples.length > 10) this.last10Samples.shift();

        // eslint-disable-next-line prefer-const
        let { edgeLeft, edgeRight } = resultData;

        const anyEdge = Boolean(edgeLeft ?? edgeRight);
        const curConfidence = anyEdge ? 1 : 0

        this.confidenceValue = this.confidenceFilter.filter(curConfidence, performance.now() / 1000);

        if (this.options.smoothFingerWidth && edgeLeft && edgeRight) {
            const edgeLeftVec2 = new Vector2(edgeLeft.x, edgeLeft.y);
            const edgeRightVec2 = new Vector2(edgeRight.x, edgeRight.y);

            mapFromVideoToVideoTextureView(edgeLeftVec2, this.videoFeed);
            mapFromVideoToVideoTextureView(edgeRightVec2, this.videoFeed);

            // todo: don't use the current distance for async
            const distance = resultData.distance ?? this.mpHand.distance

            const edgeLeft3D = transformTo3DWithZ(edgeLeftVec2, -distance, this.camera);
            const edgeRight3D = transformTo3DWithZ(edgeRightVec2, -distance, this.camera);

            const width = edgeLeft3D.distanceTo(edgeRight3D);
            this.lastFingerWidth = width;

            let w = resultData.ringFingerMovementFactor
            w /= this.videoFeed.view.scale

            const isValidSample = this.fingerWidthAnalyzer!.addMeasurement(width, w);

            if (!isValidSample) {
                resultData.edgeLeft = null;
                resultData.edgeRight = null;
            }
        }

        if (resultData.edgeLeft) {
            this.edgeLeft = new Vector2(resultData.edgeLeft.x, resultData.edgeLeft.y);
            mapFromVideoToVideoTextureView(this.edgeLeft, this.videoFeed);
        } else {
            this.edgeLeft = null
        }

        if (resultData.edgeRight) {
            this.edgeRight = new Vector2(resultData.edgeRight.x, resultData.edgeRight.y);
            mapFromVideoToVideoTextureView(this.edgeRight, this.videoFeed);
        } else {
            this.edgeRight = null
        }

        const sampleLm13 = new Vector3(resultData.landmarks3D[13].x, resultData.landmarks3D[13].y, resultData.landmarks3D[13].z);
        const sampleLm14 = new Vector3(resultData.landmarks3D[14].x, resultData.landmarks3D[14].y, resultData.landmarks3D[14].z);

        this.targetPos = sampleLm13.clone().lerp(sampleLm14, 0.666);

        this.result = resultData;
        if (this.options.debug) this.segmentationBuffer = (new Uint8Array(this.result.writeBuffer!));
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getFingerWidth(finger: Finger): number {
        if (!this.options.smoothFingerWidth) return this.lastFingerWidth;

        // todo: use a better/cleaner way than a constant factor
        // since segmentation from Mediapipe is not perfect, we need to add a factor to the finger width as it is usually a little too small
        const width = this.fingerWidthAnalyzer!.getAverageFingerWidth()

        const filteredWidth = this.fingerWidthFilter.filter(width, undefined)
        return filteredWidth
    }

    get maxWeight() {
        return this.options.maxWeight!;
    }

    get confidence() {
        return MathUtils.clamp(this.confidenceValue, 0, 1);
    }

    getProgress() {
        const currentWeight = this.fingerWidthAnalyzer?.currentWeight ?? 0;
        const progress = currentWeight / this.options.maxWeight!;

        // in case segmentation just won't work, we can use a sample time progress
        // if (this.firstSampleTime !== -1) {
        //     const timeSinceFirstSample = performance.now() - this.firstSampleTime;
        //     const sampleTimeProgress = mapLinearClamped(timeSinceFirstSample, 3000, 4000, 0, 1);

        //     progress = Math.max(progress, sampleTimeProgress);
        // }

        return progress;
    }

    getDebugSegmentationImageData() {
        if (!this.options.debug || !this.result) return null

        // create a new ImageData object from the buffer
        const imgData = new ImageData(this.result.roi.width, this.result.roi.height)
        imgData.data.set(this.segmentationBuffer!.slice(0, this.result.roi.width * this.result.roi.height * 4))

        return imgData
    }

    reset() {
        this.fingerWidthAnalyzer?.reset();
    }

    dispose(): void {
        this.worker?.terminate();
        this.imageSegmenter?.close();
        this.imageSegmenter = null;
        this.worker = null;
        this.segmentationBuffer = null;
        this.result = null;
    }
}