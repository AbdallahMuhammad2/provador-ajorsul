import { MathUtils, PerspectiveCamera, uiFolder, uiToggle } from "webgi";
import { debug } from "../../../shared/debug/DebugHelper";
import { ScreenBordersPlugin } from "../../../shared/pass/ScreenBordersPlugin";
import { WebCameraPlugin } from "../../../webcam/WebCameraPlugin";
import { MPHand } from "../hand/MPHand";
import { RingTryonPlugin } from "../RingTryonPlugin";
import { Finger, getFingerFromUserData, mapFromVideoTextureViewToVideo, to2D } from "../utils/handLandmarkUtils";
import { FingerCenterWidthCalculator } from "./center/FingerCenterWidthCalculator";
import { Config } from "./config/Config";
import { CombinedHand } from "./hand/CombinedHand";
import { LeapDebugHelper } from "./leap/debug/LeapDebugHelper";
import { LeapMPHand } from "./leap/LeapMPHand";
import { RTCManager } from "./network/RTCManager";
import { ServerManager } from "./network/ServerManager";
import { ExposureBarUI } from "./ui/ExposureBarUI";
import { InstoreInitUI } from "./ui/InstoreInitUI";

const isDebug = location.search.includes('debug')

@uiFolder('In-Store Ring Tryon')
export class InstoreRingTryonPlugin extends RingTryonPlugin {
    public static readonly PluginType = 'RingTryonPlugin'
    private serverManager: ServerManager | null = null;
    private fingerCenterWidthCalculator!: FingerCenterWidthCalculator
    private instoreInitUI: InstoreInitUI = new InstoreInitUI()
    private exposureBarUI: ExposureBarUI | null = null
    protected get mediaSettings(): MediaTrackSettings & { label?: string } {
        return {
            ...super.mediaSettings,
            label: "Luxonis"
        }
    }
    private changeDebounceTimeout: ReturnType<typeof setTimeout> | null = null

    @uiToggle("Close Range Zoom-In")
    private closeRangeZoomIn: boolean = false

    protected readonly useMotionBlur = true
    protected readonly frameDelay: number = 2 // todo: determine it dynamically or use delay in milliseconds
    protected readonly minHandDistance: number = 0

    segmenterModelMinConfidence = 0.5
    protected useSegmenter = false
    protected scanFingerWidthAtStart = false
    backgroundReflections = true

    private combinedHand!: CombinedHand
    private leapMpHand!: LeapMPHand

    backgroundPlaneScale = 3.29
    backgroundPlaneStretch = 1.35

    @uiToggle('Center Ring')
    private centerRing = true

    constructor() {
        super();

        this.onServerClose = this.onServerClose.bind(this)
        this.onFullyHidden = this.onFullyHidden.bind(this)
    }

    protected initDebugHelper(): void {
        if (!isDebug) return
        this.debugHelper = new LeapDebugHelper(this._viewer!);
    }

    private onServerClose = () => {
        // dispatch a run time error
        this.dispatchEvent({
            type: "error",
            reason: "runtimeError",
            message: "Connection to back-end server application lost.\nPlease check if the server application is still running and try again later.",
        })
        console.error("InstoreRingTryonPlugin: Server closed")
        this.stop(true)
    }

    private onFullyHidden = () => {
        const fullReset = performance.now() - this.mpHand.lastSuccessTime > 1000
        this.fingerCenterWidthCalculator?.reset(fullReset)
    }

    private hasLuxonisCamera(): boolean {
        const webCameraPlugin = this._viewer!.getPlugin(WebCameraPlugin.PluginType) as WebCameraPlugin;
        return webCameraPlugin?.devicesData?.some(d => d.label.startsWith("Luxonis")) ?? false;
    }

    async start(): Promise<void> {
        if (this.canStart()) {
            this.instoreInitUI.show();
            this.instoreInitUI.setStatusText("Loading...");
        }
        await super.start();
    }

    protected async _start(): Promise<void> {
        await super._start();
        this.instoreInitUI.updateStatus("Loaded assets", 25);

        await this.initializeServerConnection();
        await this.initializeCameraAndHandDetection();
        await this.initializeEffects();

        this.instoreInitUI.updateStatus("Loaded all dependencies, ready to start", 100);
        this.instoreInitUI.dispose();

        if (this.serverManager && this.serverManager.connected && this.hasLuxonisCamera()) {
            Config.sendUpdatedColorCameraSettings()
            this.serverManager.lockAutoExposure(false);
            this.exposureBarUI = new ExposureBarUI(this.fingerCenterWidthCalculator);
            this.exposureBarUI.addEventListener("start", () => {
                this.serverManager!.lockAutoExposure(true);
            });
            setTimeout(() => this.exposureBarUI!.show(), 150);
        }

        this.setupDebugControls();
    }

    private async initializeServerConnection() {
        try {
            this.serverManager = new ServerManager();
            Config.init(this.serverManager)

            await this.serverManager.connectToServer();
            this.serverManager.addEventListener("close", this.onServerClose);
            this.handDetector?.addEventListener("trackingFail", () => {
                this.serverManager!.updateTrackingFail();
            });
            this.handDetector!.addEventListener("trackingSuccess", () => {
                this.serverManager!.updateTrackingSuccess();
            });
            this.instoreInitUI.updateStatus("Connected", 50);
        } catch (e) {
            console.error("Error connecting to server", e);
            this.instoreInitUI.updateStatus("Could not connect to back-end server. Proceeding without it...", 50, true);
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
    }

    private async initializeCameraAndHandDetection() {
        if (!this.hasLuxonisCamera()) {
            // todo: write this as subtext
            this.instoreInitUI.updateStatus(`
                Target camera not found. Please make sure the back-end server application is running and the camera is connected.
                Proceeding with the default camera...`, 50, true);
            await new Promise(resolve => setTimeout(resolve, 5000));
        }

        this.instoreInitUI.updateStatus("Playing video", 75);

        const camera = this._viewer!.scene.activeCamera.cameraObject as PerspectiveCamera;
        this.fingerCenterWidthCalculator = new FingerCenterWidthCalculator(
            this._viewer!,
            this.copyPass!.texture,
            this._videoFeed!,
            this.debugHelper
        );

        this.leapMpHand = new LeapMPHand(camera, this._videoFeed!);
        this.combinedHand = new CombinedHand(this.handDetector!.hand as MPHand, this.leapMpHand, camera);

        this.handDetector!.setHand(this.combinedHand);
        this.fingerCenterWidthCalculator.setMPHand(this.combinedHand);
        this.segmenter?.setHand(this.combinedHand);
        this.handAnalyzer?.setHand(this.combinedHand);
    }

    private async initializeEffects() {
        this.fadeShaderExtension?.setMPHand(this.combinedHand);
        this.fadeShaderExtension?.setUseSegmentation(this.fingerCenterWidthCalculator!.getEdgeDetectorTexture());
        this.fadeShaderExtension?.setFingerWidthMultiplier(0.5);
        this.fadeShaderExtension?.setFadeDistance(0.125);
        this.fadeShaderExtension?.addEventListener("fullyHidden", this.onFullyHidden.bind(this));

        // const screenBordersPlugin = await this._viewer!.addPlugin(ScreenBordersPlugin)
        // screenBordersPlugin.width = 0.5
        // screenBordersPlugin.color.set("white")

        // const uiPlugin = this._viewer!.getPlugin(TweakpaneUiPlugin)
        // uiPlugin?.setupPlugins<IViewerPlugin>(ScreenBordersPlugin)
        // this._viewer!.setEnvironmentMap("hdr/test_setup.hdr");
    }

    private setupDebugControls() {
        window.addEventListener("keydown", (e) => {
            if (e.code === "KeyF") {
                console.log(`(${this.mpHand.distance}, ${Config.focus}})`);
            }
        });
    }

    protected getFingerWidth(finger: Finger): number {
        const samples = this.fingerCenterWidthCalculator!.getFingerWidthSamples(finger)
        const confidence = Math.min(samples / 10, 1)

        const estimatedWidth = super.getFingerWidth(finger)

        return MathUtils.lerp(estimatedWidth, this.fingerCenterWidthCalculator!.getFingerWidth(finger), confidence)
    }

    get mpHand() {
        return this.combinedHand
    }

    protected _sync3DWithResult(time: number): void {
        if (this._starting || !this.running) return;

        this.serverManager?.update();
        this.updateLeapHand();

        super._sync3DWithResult(time);

        if (this.centerRing && !this.fingerCenterWidthCalculator.isReady()) {
            this._hideAll();
            return;
        }

        this.fadeShaderExtension?.setVisible(false, false);
        this._viewer!.scene.setBackground(Config.showHandMask ? this.fingerCenterWidthCalculator!.getEdgeDetectorTexture() : this.copyPass!.texture);

        if (this.freeze || !this.visible) return;

        this.updateCameraSettings();
        this.updateHandedness();
        this.updateFocus();

        if (this.leapMpHand.confidence > 0.5) {
            (this.debugHelper as LeapDebugHelper)?.drawLeap(this.leapMpHand.rawLeapLandmarks3D);
        }

        if (!this.modelRoot || this.modelRoot.children.length === 0) return;

        debug("lm13 z", this.mpHand.landmarks3D[13].z.toFixed(2));

        const obj = this.modelRoot;
        const finger = getFingerFromUserData(obj.userData);

        if (this.centerRing) {
            this.centerRingOnFinger(finger);

            // if (!this.fingerCenterWidthCalculator.hasEnoughData()) {
            //     this._hideAll();
            //     return;
            // }
        }

        if (!this.validateModelTransform(finger)) {
            this._hideAll();
            return;
        }

        this.updateOcclusionAndShadow(finger);
        this.updateCameraNearFar();
        this.updateBackgroundPlane();

        this._showAll();
    }

    private updateLeapHand() {
        const leapHand = Config.useUltraleap ? this.serverManager!.leapHand : null;
        const realTimeLeapHand = Config.useUltraleap ? this.serverManager!.realTimeLeapHand : null;
        const hasLeapHand = leapHand !== null && realTimeLeapHand !== null;
        debug("hasLeapHand", hasLeapHand);

        this.leapMpHand.setLeapHand(leapHand);
        this.leapMpHand.setRealTimeLeapHand(realTimeLeapHand);
    }

    private updateCameraSettings() {
        const camera = this._viewer!.scene.activeCamera.cameraObject as PerspectiveCamera;
        camera.fov = Config.fov;
        camera.updateProjectionMatrix();
    }

    private updateHandedness() {
        if (Config.useUltraleap) {
            const invertedHandedness = this.mpHand.handedness === "Left" ? "Right" : "Left";
            this.serverManager!.updateHandedness(invertedHandedness);
        }
    }

    private updateFocus() {
        if (Config.autoFocus && this.leapMpHand.confidence < 0.5) {
            let mappedLeapConfidence = MathUtils.mapLinear(this.leapMpHand.confidence, 0, 0.5, 0, 1);
            mappedLeapConfidence = MathUtils.clamp(mappedLeapConfidence, 0, 1);

            const dist = MathUtils.lerp(this.mpHand.distance, this.leapMpHand.distance, mappedLeapConfidence);
            this.serverManager!.updateFocusFromHandDistance(dist - Config.mpZ);
        }
    }

    private centerRingOnFinger(finger: Finger) {
        const parallelPos = [
            this.mpHand.landmarks3D[3],
            this.mpHand.landmarks3D[6],
            this.mpHand.landmarks3D[10],
            this.mpHand.landmarks3D[14],
            this.mpHand.landmarks3D[18],
        ][finger];

        if (this.segmenter) {
            const normalizedLandmarks = (this.segmenter!.isAsync() ? this.mpHand.targetLandmarks : this.mpHand.landmarks).map(lm => {
                lm = lm.clone();
                mapFromVideoTextureViewToVideo(lm, this._videoFeed!);
                return lm;
            });

            this.segmenter?.isAsync() ?
                this.segmenter?.detectAsync({ landmarks: normalizedLandmarks, landmarks3D: this.mpHand.landmarks3D }) :
                this.segmenter?.detect({ landmarks: normalizedLandmarks, landmarks3D: this.mpHand.landmarks3D });
        }

        const camera = this._viewer!.scene.activeCamera.cameraObject as PerspectiveCamera;
        this.fingerCenterWidthCalculator!.alignToFinger(this.modelRoot!, parallelPos, camera, finger, this.segmenter);
        debug("objPosZ", this.modelRoot!.position.z);
    }

    private updateOcclusionAndShadow(finger: Finger) {
        const cylinder = this.occlusionModule!.getCylinderByFinger(finger);
        cylinder!.position.copy(this.modelRoot!.position);
        this.shadowModule?.shadowRoot.position.copy(this.modelRoot!.position);
    }

    /**
     * Validates the transformation of the model based on the provided finger data.
     * Ensures that the model meets specific conditions such as proximity, orientation,
     * and alignment with the finger.
     *
     * @param finger - The finger data used for validation.
     * @returns `true` if the model transformation is valid, otherwise `false`.
     */
    private validateModelTransform(finger: Finger): boolean {
        if (!this.modelRoot) return false

        if (this.mpHand.distance < Config.minHandDistance) return false

        const fingerLookAtFactor = this.mpHand.getFingerLookAtFactor(finger)
        debug("fingerLookAtFactor", fingerLookAtFactor)

        const handLookAtFactor = Math.abs(this.mpHand.getCameraLookAtFactor())

        const minLookAtFactor = 0.333

        if (fingerLookAtFactor < minLookAtFactor || handLookAtFactor < minLookAtFactor) return false

        const roll = this.modelRoot.rotation.z
        const rollNormalized = Math.abs(MathUtils.radToDeg(roll)) % 360
        debug("roll", MathUtils.radToDeg(roll).toFixed(2))

        if (!this.mpHand.isShowingFrontHand() && rollNormalized > 110) return false
        if (this.mpHand.isShowingFrontHand() && rollNormalized < 70) return false

        // we want to check that the relative distance to the screen edges is more than 0.1
        const camera = this._viewer!.scene.activeCamera.cameraObject as PerspectiveCamera
        const modelRootPos2D = to2D(this.modelRoot.position, camera)

        if (modelRootPos2D.x < 0.1 || modelRootPos2D.x > 0.9 || modelRootPos2D.y < 0.1 || modelRootPos2D.y > 0.9) {
            return false
        }

        return true
    }

    /**
     * Checks if the Instore Ring Try-on Plugin is available by pinging the server.
     *
     * @returns A promise that resolves to a boolean indicating whether the server is reachable.
     */
    public static async isAvailable() {
        return await RTCManager.pingServer()
    }

    protected _hideAll(immediate = false) {
        if (Config.showHandMask) return
        super._hideAll(immediate)

        this.debugHelper?.hide()
        this.lastPosition.set(0, 0, 0)
        this.lastQuaternion.set(0, 0, 0, 1)
    }

    protected _showAll() {
        super._showAll()

        this.debugHelper?.show()
    }

    private zoom = 1

    protected _postFrame(): void {
        super._postFrame()
        if (this._starting || !this.running) return

        if (this.closeRangeZoomIn) {
            let zoom = 1
            if (this.handDetector!.success || this.leapMpHand.confidence > 0.5) {
                const zoomFullDist = 15
                zoom = MathUtils.mapLinear(this.mpHand.distance, zoomFullDist, zoomFullDist + 10, 1, 0)
                zoom = (MathUtils.clamp(zoom, 0, 1) ** 2) * 0.375 + 1
            }

            debug("delta", this.delta.toFixed(2))
            this.zoom = MathUtils.lerp(this.zoom, zoom, Math.min(0.225 * this.delta / 10, 1))

            // this._webCameraBackgroundPlugin?.setState({
            //     scale: zoom
            // })

            // todo: fix setting the scale using the webcamera plugin without affecting the FPS (due to width/height changes)

            const vidTexture = this._videoFeed!.texture
            const view = this._videoFeed!.view
            view.scale = this.zoom

            const videoHeight = ~~(vidTexture.image.height);
            const videoWidth = ~~(vidTexture.image.width);
            const canvasWidth = ~~(view.width);
            const canvasHeight = ~~(view.height);

            const videoAspect = videoWidth / videoHeight;
            const canvasAspect = canvasWidth / canvasHeight;

            let newWidth = canvasWidth;
            let newHeight = canvasHeight;

            if (videoAspect > canvasAspect) newWidth = ~~(canvasHeight * videoAspect);
            else newHeight = ~~(canvasWidth / videoAspect);

            // Modify the scale factors for the texture by zoom level.
            const textureScaleX = 1 / (newWidth / canvasWidth) / (view.scale || 1);
            const textureScaleY = 1 / (newHeight / canvasHeight) / (view.scale || 1);

            this._videoFeed!.textureScale = [textureScaleX, textureScaleY]

            // Offset values to ensure the texture is centered on the canvas.
            const offsetX = (1 - textureScaleX) / 2;
            const offsetY = (1 - textureScaleY) / 2;

            vidTexture.repeat.set(textureScaleX, textureScaleY);
            vidTexture.offset.set(offsetX, offsetY);
        }
    }

    protected async _stop() {
        await super._stop()

        this.instoreInitUI.dispose()
        this.serverManager?.dispose()
        this.exposureBarUI?.dispose()

        // remove screen borders plugin
        const screenBordersPlugin = this._viewer!.getPlugin(ScreenBordersPlugin)!
        this._viewer!.removePlugin(screenBordersPlugin)

        this.fingerCenterWidthCalculator?.dispose()

        this.serverManager?.removeEventListener("close", this.onServerClose);
        this.fadeShaderExtension?.removeEventListener("fullyHidden", this.onFullyHidden);

        if (this.changeDebounceTimeout) {
            clearTimeout(this.changeDebounceTimeout);
            this.changeDebounceTimeout = null;
        }
    }
}