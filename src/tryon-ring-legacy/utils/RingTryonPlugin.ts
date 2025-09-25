import {
    BloomPlugin,
    CombinedPostPlugin,
    DoubleSide,
    Mesh,
    MeshBasicMaterial2,
    Object3D,
    Object3DModel,
    onChange2,
    PerspectiveCamera,
    Quaternion,
    serialize,
    SphereGeometry,
    SSAOPlugin,
    SSRPlugin,
    TonemapPlugin,
    uiButton,
    uiFolder,
    uiSlider,
    uiToggle,
    uiVector,
    Vector2,
    Vector3,
    VelocityBufferPlugin,
    ViewerApp
} from 'webgi'
import { BaseTryonPlugin } from '../../core/BaseTryonPlugin'
import { debug, DebugHelper } from '../../shared/debug/DebugHelper'
import { CopyPass } from '../../shared/pass/CopyPass'
import { MotionBlurPass } from '../../shared/pass/MotionBlurPass'
import { HandDetector } from './detection/HandDetector'
import { FadeShaderExtension } from './occlusion/extension/FadeShaderExtension'
import { FingerCylinderOcclusion } from './occlusion/FingerCylinderOcclusion'
import { SSSFingerCylinderShadow } from './occlusion/SSSFingerCylinderShadow'
import { Segmenter } from './segmentation/FingerSegmenter'
import { HandAnalyzer } from './segmentation/HandAnalyzer'
import { RingTryonSetupMode } from './setup/RingTryonSetupMode'
import { Finger, getFingerFromUserData } from './utils/handLandmarkUtils'

const isDebug = location.search.includes('debug')

type RingTryonPluginEvents =
    | 'initializationStart'
    | 'initializationProgress'
    | 'initialized'
    | 'handAnalysisProgress'
    | 'handAnalysisReject'
    | 'handAnalysisComplete'

@uiFolder('Ring Try-On')
export class RingTryonPlugin extends BaseTryonPlugin<RingTryonPluginEvents> {
    public static readonly PluginType = 'RingTryonPlugin'

    protected get mediaSettings(): MediaTrackSettings & { label?: string } {
        return {
            ...super.mediaSettings,
            facingMode: "user"
        }
    }

    @uiSlider('modelScaleFactor', [0.01, 10], 0.001)
    @onChange2(RingTryonPlugin.prototype.setDirty)
    @serialize()
    modelScaleFactor: number | undefined = 1

    @uiVector('modelRotation', [-Math.PI, Math.PI], 0.001)
    @onChange2(RingTryonPlugin.prototype.setDirty)
    @serialize()
    modelRotation: Vector3 | undefined = new Vector3(0, 0, 0)

    @uiVector('modelPosition', [-1000, 1000], 0.001)
    @onChange2(RingTryonPlugin.prototype.setDirty)
    @serialize()
    modelPosition: Vector3 | undefined = new Vector3(0, 0, 0)

    @serialize()
    ssr = { enabled: true, intensity: 1.5, radius: 2 }

    @serialize()
    ssao = { enabled: true, intensity: 0.2, radius: 1.83, falloff: 1.5, bias: 0.00001 }

    @uiButton('Front View')
    frontView = () => this.setupMode?.frontView()

    @uiButton('Top View')
    topView = () => this.setupMode?.topView()

    @uiButton('Side View')
    sideView = () => this.setupMode?.sideView()

    @uiButton('Rotate X 90°')
    rotateX90 = () => this.setupMode?.rotateX90()

    @uiButton('Rotate Y 90°')
    rotateY90 = () => this.setupMode?.rotateY90()

    @uiButton('Rotate Z 90°')
    rotateZ90 = () => this.setupMode?.rotateZ90()

    @uiButton('Download ring config')
    downloadRingConfig = () => this.setupMode?.downloadRingConfig()

    public setupMode: RingTryonSetupMode | null = null
    @uiButton('Enter Setup Mode')
    enterSetupMode(): boolean {
        if (this.inSetupMode || !this._viewer || this.running || this._starting) return false
        this.inSetupMode = true
        this._savePluginSettings()
        this._saveModelRootState()

        this.setupMode = new RingTryonSetupMode(this._viewer)

        // Enter setup mode
        this.setupMode.enterSetupMode()
        return true
    }

    @uiButton('Exit Setup Mode')
    exitSetupMode(): boolean {
        if (!this.inSetupMode || !this._viewer || this.running || this._starting) return false
        this.inSetupMode = false

        this.setupMode?.exitSetupMode()
        this.setupMode = null

        this._resetModelRootState()
        this._setPluginSettings(this._lastPluginsState)
        return true
    }

    @uiSlider('segmenterModelMinConfidence', [0.01, 1], 0.01)
    @serialize()
    segmenterModelMinConfidence = 0.25

    @uiToggle("Background Reflections")
    backgroundReflections = true

    @uiSlider("backgroundPlaneScale", [0.1, 10], 0.01)
    @onChange2(RingTryonPlugin.prototype.setDirty)
    @serialize()
    backgroundPlaneScale = 2

    @uiSlider("backgroundPlaneStretch", [0.1, 10], 0.01)
    @onChange2(RingTryonPlugin.prototype.setDirty)
    @serialize()
    backgroundPlaneStretch = 2

    @uiToggle("Freeze")
    protected freeze = false

    // Core detection and segmentation
    protected handDetector: HandDetector | undefined
    protected segmenter: Segmenter | undefined
    protected fingerWidthDetectionMode: "segmenter" | "landmarks" = "landmarks"
    protected frameNumber = 0

    // Occlusion and shadow handling
    protected occlusionModule: FingerCylinderOcclusion | null = null
    protected shadowModule: SSSFingerCylinderShadow | null = null
    private _occlusionRoot?: Object3DModel
    private _shadowRoot?: Object3DModel

    // Rendering and effects
    protected copyPass: CopyPass | null = null
    protected fadeShaderExtension: FadeShaderExtension | undefined
    private backgroundPlane: Mesh | null = null
    protected lastPosition = new Vector3()
    protected lastQuaternion = new Quaternion()

    // Event listeners
    private onCanvasDoubleClickListener!: (e: MouseEvent) => void
    private onCanvasResizeListener!: (e: Event) => void

    // Debug
    protected debugHelper: DebugHelper | undefined

    protected readonly frameDelay: number = 1
    protected readonly minHandDistance: number = 15

    protected handAnalyzer: HandAnalyzer | undefined;

    protected readonly useMotionBlur: boolean = false // todo: enable it in the future once it works consistently
    protected motionBlurPass: MotionBlurPass | null = null

    onAdded(viewer: ViewerApp): Promise<void> {
        HandDetector.preload()
        if (this.fingerWidthDetectionMode === "segmenter") Segmenter.preload()

        return super.onAdded(viewer)
    }

    async onRemove(viewer: ViewerApp): Promise<void> {
        this._occlusionRoot?.modelObject.clear()
        this._occlusionRoot?.dispose()
        this._occlusionRoot = undefined
        this._shadowRoot?.modelObject.clear()

        const canvasParent = viewer.canvas.parentElement
        if (!canvasParent) throw new Error('WebGi-Canvas has no parent node')

        this.handDetector?.dispose()
        this.segmenter?.dispose()

        canvasParent.removeEventListener("click", this.onCanvasDoubleClickListener)
        window.removeEventListener('resize', this.onCanvasResizeListener)

        this.setupMode?.dispose()
        this.setupMode = null

        return super.onRemove(viewer);
    }

    private get delayedVideoTexture() {
        return this.copyPass?.texture ?? this._videoFeed!.texture
    }

    async start() {
        if (this.canStart() && this.inSetupMode) {
            this.exitSetupMode()
        }

        await super.start()
    }

    protected async _start() {
        let loadMilestones = 0;
        const totalMilestones = 5;

        this.dispatchEvent({ type: 'initializationProgress', detail: { progress: ++loadMilestones / totalMilestones } });

        await this.initializeShadowModule();
        await this.setupEventListeners();
        await this.initializeBackgroundPlane();
        await this.initializeHandDetection(loadMilestones, totalMilestones);
        await this.initializeOcclusionAndFadeEffects();
    }

    private async initializeShadowModule() {
        this.shadowModule = new SSSFingerCylinderShadow();

        const v = ViewerApp.VERSION.split('.').map(v => parseInt(v));
        if (v[0] > 0 || v[1] > 9 || (v[1] === 9 && v[2] >= 9)) {
            this._shadowRoot = (await this._viewer!.createObject3D(undefined, true))!;
            this.shadowModule.init(this._viewer!);
            this.shadowModule.shadowRoot.visible = true;
            this._shadowRoot.modelObject.add(this.shadowModule.shadowRoot);
        } else {
            console.error('WebGi version is too old, update to use shadows in the virtual ring try-on');
        }
    }

    private async setupEventListeners() {
        let lastClickTime = 0;
        this.onCanvasDoubleClickListener = () => {
            if (Date.now() - lastClickTime < 300) {
                if (this.segmenter) {
                    this.segmenter.restart();
                    this.handAnalyzer?.restart();
                    this.dispatchEvent({ type: 'handAnalysisProgress', detail: { progress: 0 } });
                }
                lastClickTime = 0;
            } else {
                lastClickTime = Date.now();
            }
        };

        const canvasParent = this._viewer!.canvas.parentElement;
        if (!canvasParent) throw new Error('WebGi-Canvas has no parent node');
        canvasParent.addEventListener('click', this.onCanvasDoubleClickListener);

        this.onCanvasResizeListener = () => {
            if (this.segmenter) {
                this.segmenter.restart();
                this.handAnalyzer?.restart();
                this.dispatchEvent({ type: 'handAnalysisProgress', detail: { progress: 0 } });
            }
        };
        window.addEventListener('resize', this.onCanvasResizeListener);
    }

    private async initializeBackgroundPlane() {
        const backgroundGeo = new SphereGeometry(1, 32, 32, 0, Math.PI, 0, Math.PI);
        const backgroundMat = new MeshBasicMaterial2({
            color: 0x00ff00,
            colorWrite: false,
            side: DoubleSide
        });

        this.backgroundPlane = new Mesh(backgroundGeo, backgroundMat);
        this._viewer!.scene.add(this.backgroundPlane);

        // Configure material properties
        this.configureBackgroundMaterial(backgroundMat);
    }

    private configureBackgroundMaterial(material: MeshBasicMaterial2) {
        material.userData.pluginsDisabled = true;
        material.userData[VelocityBufferPlugin.PluginType] = { disabled: true };
        material.userData[BloomPlugin.PluginType] = { disabled: true };
        material.userData.renderToDepth = true;
        material.userData.ssaoCastDisabled = true;
    }

    private async initializeHandDetection(loadMilestones: number, totalMilestones: number) {
        if (!this._videoFeed) throw new Error("Error starting plugin: No video feed");

        const camera = this._viewer!.scene.activeCamera.cameraObject as PerspectiveCamera;
        const initPromises = [];

        // Initialize hand detector
        this.handDetector = new HandDetector(camera, this._videoFeed!);
        initPromises.push(this.handDetector.init());

        // Handle initialization progress
        Promise.any(initPromises).then(() => {
            this.dispatchEvent({ type: 'initializationProgress', detail: { progress: ++loadMilestones / totalMilestones } });
        });

        await Promise.allSettled(initPromises);
        this.dispatchEvent({ type: 'initializationProgress', detail: { progress: ++loadMilestones / totalMilestones } });

        if (this.fingerWidthDetectionMode === "segmenter") {
            await this.initializeSegmenter(camera);
        }

        // Run dry runs
        await this.runDryRuns(loadMilestones, totalMilestones);

        this.handAnalyzer = new HandAnalyzer(this.mpHand, this._videoFeed!, this.fingerWidthDetectionMode, this.segmenter);

        // Initialize segmenter if needed
        if (this.fingerWidthDetectionMode === "segmenter") {
            // Set up event listeners for HandAnalyzer
            this.handAnalyzer.addEventListener('handAnalysisProgress', (e) => this.dispatchEvent({ type: 'handAnalysisProgress', detail: e.detail }));
            this.handAnalyzer.addEventListener('handAnalysisReject', (e) => this.dispatchEvent({ type: 'handAnalysisReject', detail: e.detail }));
            this.handAnalyzer.addEventListener('handAnalysisComplete', () => this.dispatchEvent({ type: 'handAnalysisComplete', detail: {} }));

            this.dispatchEvent({ type: "handAnalysisProgress", detail: { progress: 0 } })
        } else if (this.fingerWidthDetectionMode === "landmarks") {
            this.dispatchEvent({ type: "handAnalysisComplete", detail: {} })
        }
    }

    private async initializeSegmenter(camera: PerspectiveCamera) {
        console.log("Loading segmenter...");
        this.segmenter = new Segmenter(this.mpHand, camera, this._videoFeed!, {
            async: false,
            maxWeight: 6,
            smoothFingerWidth: true,
            multiClass: true,
            debug: isDebug,
            runForever: true,
        });

        await this.segmenter.init()
    }

    private async runDryRuns(loadMilestones: number, totalMilestones: number) {
        if (this.segmenter) {
            console.time("Segmenter dryrun");
            await this.segmenter.dryrun();
            console.timeEnd("Segmenter dryrun");
        }

        this.dispatchEvent({ type: 'initializationProgress', detail: { progress: ++loadMilestones / totalMilestones } });

        console.time("HandDetector dryrun");
        await this.handDetector!.dryrun();
        console.timeEnd("HandDetector dryrun");
        this.dispatchEvent({ type: 'initializationProgress', detail: { progress: ++loadMilestones / totalMilestones } });
    }

    private async initializeOcclusionAndFadeEffects() {
        this.initDebugHelper();

        // Initialize copy pass for delayed video
        this.copyPass = this.frameDelay > 0 ? new CopyPass(this._videoFeed!.texture, this.frameDelay) : null;
        this.copyPass?.render(this._viewer!.renderer.rendererObject);

        // Set up video texture and effects
        this._viewer!.scene.setBackground(this.delayedVideoTexture);
        this.shadowModule?.setVideoTexture(this.delayedVideoTexture);
        this.occlusionModule = new FingerCylinderOcclusion(this.delayedVideoTexture);

        // Create occlusion root
        this._occlusionRoot = (await this._viewer!.createObject3D(undefined, true))!;
        this._occlusionRoot.modelObject.add(this.occlusionModule.occlusionRoot);

        await this.patchFadeShader()
    }

    protected async patchFadeShader() {
        if (this.useMotionBlur) {
            // todo: turn this into a proper plugin
            this.motionBlurPass = new MotionBlurPass()

            // todo: find a way where we can insert the motion blur pass last but still have tonemapping done in the compose post pass
            const composer = this._viewer!.renderer.composer
            composer.addPass(this.motionBlurPass)
            composer.insertPass(this.motionBlurPass, composer.passes.length - 1)
        }

        const camera = this._viewer!.scene.activeCamera.cameraObject as PerspectiveCamera

        const mpHand = this.mpHand
        const fingerWidthInterface = this.segmenter ?? { getFingerWidth: () => this.getFingerWidth(Finger.Ring) }

        const combinedPost = this._viewer!.getPlugin(CombinedPostPlugin)!;

        const combinedPostMat = combinedPost.pass!.passObject.material

        this.fadeShaderExtension = new FadeShaderExtension(
            camera,
            mpHand,
            fingerWidthInterface,
            Finger.Ring,
            this.delayedVideoTexture,
            0.5,
            0.375
        )

        combinedPostMat.registerMaterialExtensions([this.fadeShaderExtension]);
        combinedPostMat.needsUpdate = true;
        combinedPostMat.setDirty();
    }

    get mpHand() {
        return this.handDetector!.hand
    }

    protected initDebugHelper() {
        if (isDebug) this.debugHelper = new DebugHelper(this._viewer!)
    }

    protected async _stop() {
        console.log("Stopping RingTryonPlugin");

        await this.cleanupHandDetection();
        await this.cleanupEffects();
        await this.cleanupEventListeners();
        await this.cleanupBackground();
        await this.cleanupDebug();

        this.frameNumber = 0;
        console.log("Stopped RingTryonPlugin");
    }

    private async cleanupHandDetection() {
        this.handDetector?.dispose();
        this.handDetector = undefined;

        this.segmenter?.dispose();
        this.segmenter = undefined;

        this.handAnalyzer = undefined;
    }

    private async cleanupEffects() {
        this.shadowModule?.dispose();
        this.shadowModule = null;

        this.occlusionModule?.dispose();
        this.copyPass?.dispose();
        // remove motion blur pass from composer
        const composer = this._viewer!.renderer.composer
        if (this.motionBlurPass) {
            composer.removePass(this.motionBlurPass!)
        }
        this.motionBlurPass?.dispose()
        this.motionBlurPass = null

        // Clean up fade shader extension
        const combinedPost = this._viewer!.getPlugin(CombinedPostPlugin)!;
        const combinedPostMat = combinedPost.pass!.passObject.material;
        const ext = combinedPostMat.materialExtensions.find(e => e instanceof FadeShaderExtension) as FadeShaderExtension;

        if (ext) {
            combinedPostMat.unregisterMaterialExtensions([ext]);
            combinedPostMat.materialExtensions = combinedPostMat.materialExtensions.filter(e => !(e instanceof FadeShaderExtension));
            combinedPostMat.needsUpdate = true;
            combinedPostMat.setDirty();
            this.fadeShaderExtension = undefined;
        }
    }

    private async cleanupEventListeners() {
        window.removeEventListener('dblclick', this.onCanvasDoubleClickListener);
        window.removeEventListener('resize', this.onCanvasResizeListener);
    }

    private async cleanupBackground() {
        if (this.backgroundPlane) {
            this.backgroundPlane.geometry.dispose();
            typeof (this.backgroundPlane.material as any).dispose === "function" &&
                (this.backgroundPlane.material as any).dispose();
            this.backgroundPlane.removeFromParent();
            this.backgroundPlane = null;
        }
    }

    private async cleanupDebug() {
        this.debugHelper?.dispose();
    }

    // TODO: fix delayed video feed being visible after user zoomed in using either of the two zoom modes of the tryon UI

    async flipCamera(): Promise<boolean | undefined> {
        const res = super.flipCamera()
        if (!res) return res

        this._hideAll(true)
        this._viewer!.renderEnabled = false

        await res

        this._viewer!.renderEnabled = true

        return res
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected getFingerWidth(finger: Finger) {
        return this.handAnalyzer!.getFingerWidth(finger);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected _sync3DWithResult(time: number) {
        if (this._starting || !this.running) return;

        this.frameNumber++;

        // Update debug information
        this.updateDebugInfo();

        // Validate hand detection
        if (this.segmenter && !this.segmenter.isInitialized()) {
            this._hideAll(true);
            return;
        }

        if (this.freeze) {
            this._showAll();
            return;
        }

        // Update hand detection
        if (this.handDetector!.isAsync()) {
            this.handDetector!.setNeedsSendNewFrame();
            this.handDetector!.detectAsync();
        } else {
            this.handDetector!.detect(this.frameNumber++);
        }

        if (!this.handDetector!.success) {
            this._hideAll(true);
            return;
        }

        const camera = this._viewer!.scene.activeCamera.cameraObject as PerspectiveCamera;
        if (!camera.isPerspectiveCamera) throw new Error('Camera is not perspective camera');

        const handCameraLookAtFactor = this.mpHand.getCameraLookAtFactor();
        debug("handCameraLookAtFactor", handCameraLookAtFactor);
        this.debugHelper?.update(this.mpHand.landmarks, this.mpHand.landmarks3D, this.mpHand.distance);

        if (this.mpHand.distance < this.minHandDistance) {
            this._hideAll();
            return;
        }

        // Update hand detection and analysis
        this.segmenter?.setModelMinConfidence(this.segmenterModelMinConfidence);

        this.updateHandAnalysis();

        // Update ring position and effects
        this.updateRingAndEffects();
    }

    private updateHandAnalysis() {
        if (!this.handDetector!.success) return;
        this.handAnalyzer?.analyzeHand();
        if (this.segmenter) this.debugHelper?.drawSegmenter(this.segmenter);
    }

    private updateRingAndEffects() {
        if (!this.modelRoot || this.modelRoot.children.length === 0) return;

        const f = 0.3 + 0.25 * this.mpHand.getMappedBackHandFactor()

        const cylinderWidth = this.getFingerWidth(this.getCurrentFinger()) * f
        this.fadeShaderExtension?.setFingerWidthMultiplier(f);

        this.occlusionModule!.connectCylinders(
            this.mpHand.landmarks3D,
            cylinderWidth * 0.9 // leave room for fading
        );

        const obj = this.modelRoot!;
        const finger = this.getCurrentFinger();
        const fingerWidth = this.getFingerWidth(finger);

        obj.position.copy(this.mpHand.getRingAttachPositionForFinger(finger));
        obj.scale.setScalar(fingerWidth);
        obj.quaternion.copy(this.mpHand.getRingAttachQuaternionForFinger(finger));

        this.fadeShaderExtension?.setFinger(finger);

        this.updateFingerCylinder(finger);
        this.updateCameraNearFar();
        this.updateBackgroundPlane();
    }

    private lastTime = 0
    protected updateMotionBlur(obj: Object3D) {
        if (!this.motionBlurPass) return

        const now = performance.now()
        let delta = now - this.lastTime
        if (delta < 0.1) delta = 0.1
        this.lastTime = now

        const camera = this._viewer!.scene.activeCamera.cameraObject as PerspectiveCamera;
        const objPositionProjected = obj.position.clone().project(camera);
        objPositionProjected.x = (objPositionProjected.x + 1) / 2;
        objPositionProjected.y = (-objPositionProjected.y + 1) / 2;

        const lastPositionProjected = this.lastPosition.clone().project(camera);
        lastPositionProjected.x = (lastPositionProjected.x + 1) / 2;
        lastPositionProjected.y = (-lastPositionProjected.y + 1) / 2;

        const movementVelocity = objPositionProjected.clone().sub(lastPositionProjected);
        if (this.lastPosition.length() === 0) movementVelocity.set(0, 0, 0);

        const vel = new Vector2(movementVelocity.x, movementVelocity.y)
        vel.divideScalar(delta / 16.666)
        this.motionBlurPass?.setManualVelocity(vel);

        this.motionBlurPass?.setMotionBlurCenterAndRadius(
            new Vector2(objPositionProjected.x, objPositionProjected.y),
            8 / camera.position.distanceTo(obj.position)
        );

        this.motionBlurPass.setIntensity(0.75 * (this.fadeShaderExtension?.opacity ?? 1))
    }

    private getCurrentFinger(): Finger {
        if (!this.modelRoot) return Finger.Ring;
        return "finger" in this.modelRoot.userData ?
            getFingerFromUserData(this.modelRoot.userData) :
            getFingerFromUserData(this.modelRoot.children[0].userData);
    }

    private updateFingerCylinder(finger: Finger) {
        if (this.shadowModule) {
            // the shadow module will already be used for reflections so the cylinders/spheres on the finger are trivial and mess with SSAO, so we hide them
            const fingerCylinders = this.occlusionModule!.getCylindersByFinger(finger)
            const fingerSpheres = this.occlusionModule!.getSpheresByFinger(finger)
            fingerCylinders.forEach(c => c.visible = false)
            fingerSpheres.forEach(s => s.visible = false)

            const shadowRoot = this.shadowModule.shadowRoot
            shadowRoot.visible = true;

            const fingerCylinder = fingerCylinders[0]
            shadowRoot.position.copy(fingerCylinder.position);
            shadowRoot.quaternion.copy(fingerCylinder.quaternion);

            const cylinderWidth = this.getFingerWidth(finger) * 0.5 * 0.975

            shadowRoot.scale.copy(fingerCylinder.scale)
            shadowRoot.scale.x = cylinderWidth
            shadowRoot.scale.y = cylinderWidth
            shadowRoot.scale.z *= 2 // so that blurrier SSAO (i.e. higher radius) will not be cut off
        }
    }

    private updateDebugInfo() {
        debug("lm14 3D", this.mpHand.landmarks3D[14].toArray().map(v => v.toFixed(1)).join(", "));
        debug("lm14 m", this.mpHand.getLandmarkMovementFactor(14));
        debug("handedness", this.mpHand.handedness);
        debug("front hand", this.mpHand.isShowingFrontHand());
        debug("hand detector averageDetectionTime", this.handDetector!.averageDetectionTime);
        debug("hand detector samples", this.handDetector!.samples);
        debug("hand detector samples per second", this.handDetector!.samplesPerSecond);
        debug("distance", this.mpHand.distance);
        debug("cameraLookAtFactor", this.mpHand.getCameraLookAtFactor());
        debug('fingerWidth', this.getFingerWidth(Finger.Ring));

        if (this.segmenter) {
            debug("segmenter detection time", this.segmenter.averageDetectionTime);
            debug("segmenter samples", this.segmenter.samples);
            debug("fingerWidth weight", this.segmenter.fingerWidthAnalyzer!.currentWeight);
            const fingerWidthStdDev = this.segmenter.fingerWidthAnalyzer!.getStandardDeviation();
            debug("fingerWidth std dev", fingerWidthStdDev);
        }

        for (const [key, value] of this.mpHand.currentDebugEntries) {
            debug(key, value);
        }
    }

    protected _postSync3DWithResult(): void {
        super._postSync3DWithResult()
        this.fadeShaderExtension?.setVisible(this.visible, !this.hideImmediatelyFlag)
        if (this.modelRoot) this.fadeShaderExtension?.updateRingPosition(this.modelRoot.position)
        this.updateMotionBlur(this.modelRoot!)

        debug("visible", this.visible)
    }

    protected updateBackgroundPlane() {
        if (!this.backgroundPlane || !this.modelRoot) return

        if (this.backgroundReflections) {
            this.backgroundPlane.position.copy(this.modelRoot.position)

            const camera = this._viewer!.scene.activeCamera.cameraObject as PerspectiveCamera

            this.backgroundPlane.lookAt(camera.position)
            this.backgroundPlane.scale.setScalar(this.backgroundPlaneScale * this.getFingerWidth(Finger.Ring))
            this.backgroundPlane.scale.z = this.backgroundPlaneStretch * this.getFingerWidth(Finger.Ring)
            this.backgroundPlane.translateZ(this.backgroundPlaneStretch * this.getFingerWidth(Finger.Ring) / 2)
            this.backgroundPlane.rotateX(Math.PI)

            const tonemapPlugin = this._viewer!.getPlugin(TonemapPlugin) as TonemapPlugin;
            // @ts-expect-error private property
            (this.backgroundPlane.material as MeshBasicMaterial2).userData.postTonemap = tonemapPlugin?._extension?.tonemapBackground
        }

        this.backgroundPlane.visible = this.backgroundReflections
    }

    protected updateCameraNearFar() {
        if (!this.modelRoot) return

        const dist = Math.abs(this.modelRoot.position.z)
        const depthRange = 25
        const near = Math.max(dist - depthRange, 0.01)
        const far = dist + depthRange

        this._viewer!.scene.activeCamera.near = near
        this._viewer!.scene.activeCamera.far = far
        this._viewer!.scene.activeCamera.cameraObject.near = near
        this._viewer!.scene.activeCamera.cameraObject.far = far

        this._viewer!.scene.activeCamera.cameraObject.updateProjectionMatrix()
    }

    protected _preFrame() {
        super._preFrame();

        if (this.running || this.inSetupMode) {
            this.modelRoot?.children.forEach(c => {
                if (this.modelPosition) c.position.copy(this.modelPosition)
                if (this.modelRotation) c.rotation.setFromVector3(this.modelRotation)
                if (this.modelScaleFactor) c.scale.setScalar(this.modelScaleFactor)
            });

            const ssr = this._viewer?.getPlugin(SSRPlugin) as SSRPlugin
            const ssao = this._viewer?.getPlugin(SSAOPlugin) as SSAOPlugin

            if (this.ssr && ssr) {
                ssr.enabled = this.ssr.enabled
                ssr.passes.ssr.passObject.intensity = this.ssr.intensity
                ssr.passes.ssr.passObject.objectRadius = this.ssr.radius
            }

            if (this.ssao && ssao) {
                ssao.enabled = this.ssao.enabled
                ssao.passes.ssao.passObject.parameters.intensity = this.ssao.intensity
                ssao.passes.ssao.passObject.parameters.occlusionWorldRadius = this.ssao.radius
                ssao.passes.ssao.passObject.parameters.falloff = this.ssao.falloff
                ssao.passes.ssao.passObject.parameters.bias = this.ssao.bias
            }
        }
    }

    protected _postFrame(): void {
        super._postFrame()

        if (!this.running) return

        // check if the srcTexture from the copyPass is the same as the video feed texture
        if (this.copyPass) {
            if (this.copyPass.srcTexture !== this._videoFeed!.texture) {
                this.segmenter?.restart()
                this.handAnalyzer?.restart()
                this.dispatchEvent({ type: 'initialized', detail: {} });

                this.copyPass?.setTexture(this._videoFeed!.texture)
                this._viewer!.scene.setBackground(this.delayedVideoTexture)
                this.shadowModule?.setVideoTexture(this.delayedVideoTexture)
                this.fadeShaderExtension?.setVideoTexture(this.delayedVideoTexture)
            }

            // todo: do it instantaneously when the background is set to the scene in WebCameraBackgroundPlugin._refreshStateValues
            if (this._viewer!.scene.background !== this.delayedVideoTexture) {
                this._viewer!.scene.setBackground(this.delayedVideoTexture)
            }
        }

        if (!this.freeze) this.copyPass?.render(this._viewer!.renderer.rendererObject)

        const isVisible = !this.fadeShaderExtension || this.fadeShaderExtension.opacity > 0

        const obj = this.modelRoot

        if (obj) {
            this.lastPosition.copy(isVisible ? obj.position : new Vector3(0, 0, 0))
            this.lastQuaternion.copy(isVisible ? obj.quaternion : new Quaternion(0, 0, 0, 1))
        }
    }

    setDirty() {
        this._viewer?.setDirty()
    }

    assignMainRingToFinger(fingerAssignment: number | string) {
        if (!this.modelRoot) return

        const finger = getFingerFromUserData({ finger: fingerAssignment })
        this.mpHand.setFinger(finger)

        this.modelRoot.userData.finger = finger
    }
}
