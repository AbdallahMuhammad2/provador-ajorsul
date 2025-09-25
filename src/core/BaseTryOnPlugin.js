import {
    BloomPlugin,
    CameraController,
    CombinedPostPlugin,
    DepthOfFieldPlugin, downloadBlob,
    FrameFadePlugin,
    GroundPlugin,
    IEvent,
    InteractionPromptPlugin,
    LUTPlugin,
    MaterialExtension,
    MathUtils,
    now,
    onChange2,
    OutlinePlugin,
    ParallaxCameraControllerPlugin, PerspectiveCamera,
    PickingPlugin,
    ShaderLib,
    shaderReplaceString,
    SSAOPlugin,
    SSContactShadows,
    SSGIPlugin,
    SSRPlugin,
    TonemapPlugin,
    uiButton,
    uiSlider,
    uiVector,
    Vector2,
    VelocityBufferPlugin,
    ViewerApp
} from 'webgi';
import { BaseIJewel3DKeyPlugin } from '../license/plugin';
import { WebCameraBackgroundPlugin } from '../webcam/WebCameraBackgroundPlugin';
import { WebCameraPlugin } from '../webcam/WebCameraPlugin';
import { WebCameraVideoFeed } from '../webcam/WebCameraPlugin';
// Generic parameter adds to BaseEvents
type BaseEvents =
    | 'start'
    | 'initialized'
    | 'stop'
    | 'error'

export abstract class BaseTryonPlugin<AdditionalEvents extends string = never> extends BaseIJewel3DKeyPlugin<BaseEvents | AdditionalEvents> {
    enabled = true
    dependencies = [WebCameraBackgroundPlugin]
    protected get mediaSettings(): MediaTrackSettings & { label?: string } {
        return {}
    }

    get modelRoot() {
        return this._viewer?.scene.modelRoot
    }

    // rootObject = new Object3D()

    constructor() {
        super()
        this._preFrame = this._preFrame.bind(this)
        this._postFrame = this._postFrame.bind(this)
    }

    @uiSlider('videoScale', [0.5, 4], 0.01)
    @onChange2(BaseTryonPlugin.prototype._setWebcamState)
    videoScale = 1.
    @uiSlider('cameraZoom', [0.5, 4], 0.01)
    @onChange2(BaseTryonPlugin.prototype._setWebcamState)
    cameraZoom = 1.
    @uiVector('videoSize', [100, 4096], 1, (t: BaseTryonPlugin) => ({ onChange: () => t._setWebcamState() }))
    @onChange2(BaseTryonPlugin.prototype._setWebcamState)
    videoSize = new Vector2()

    private _cameraBackgroundPlugin?: WebCameraBackgroundPlugin

    private wakeLock: WakeLockSentinel | null = null

    async onAdded(viewer: ViewerApp): Promise<void> {
        await super.onAdded(viewer);
        this._cameraBackgroundPlugin = viewer.getPlugin(WebCameraBackgroundPlugin)!
        this._hideAll(false)
        this._flipAndTransparentHack()
        this._refreshWebcamState()
        this._cameraBackgroundPlugin.addEventListener('refreshState', this._refreshWebcamState)
        viewer.addEventListener('preFrame', this._preFrame)
        viewer.addEventListener('postFrame', this._postFrame)
    }

    async onRemove(viewer: ViewerApp): Promise<void> {
        this._cameraBackgroundPlugin?.removeEventListener('refreshState', this._refreshWebcamState)
        this._cameraBackgroundPlugin = undefined
        viewer.removeEventListener('preFrame', this._preFrame)
        viewer.removeEventListener('postFrame', this._postFrame)
        return super.onRemove(viewer);
    }


    /**
     * These plugin settings are used when entering in AR mode.
     * Change them before entering AR to change the experience.
     */
    readonly pluginStateSettings = {
        ground: false,
        frameFade: false,
        interactionPrompt: false,
        outline: false,
        dof: false,
        tonemapBackground: false,
        clipBackground: false,
        lut: false,
        ssgi: false,
        ssao: {
            enabled: true,
            intensity: 0.25,
            radius: 1,
        },
        sscs: false,
        parallaxCamera: false,
        velocityBuffer: true,
        ssr: {
            enabled: true,
            objectRadius: 2,
            autoRadius: false,
            maskFrontFactor: 1,
            intensity: 1,
        },
        bloom: true,

    }
    /**
     * These camera settings are used when entering in AR mode.
     * Change them before entering AR to change the experience.
     */
    readonly cameraSettings = {
        interactionsEnabled: false,
        position: [0, 0, 5], // todo: set to 0 without breaking changes
        target: [0, 0, 0],
        autoNearFar: false,
        minNear: 0.5,
        maxFar: 50,
        fov: 25
    }

    protected _videoFeed?: WebCameraVideoFeed

    /**
     * When running is true, we have both handlandmarker and webcam video feed started
     * @private
     */
    protected _running = false
    // private _paused = false
    protected _starting = false

    public inSetupMode = false

    private _webCameraPluginErrorListeners: Array<(e: IEvent<string>) => void> = []
    private readonly webCameraPluginErrors = [
        'noCameraSupport',
        'permissionDenied',
        'mediaDevicesError',
    ] as Array<'noCameraSupport' | 'permissionDenied' | 'mediaDevicesError'>

    /**
     * Register error listeners for the web camera plugin
     */
    private _registerCameraErrorListeners() {
        const webCameraPlugin = this._viewer!.getPlugin(WebCameraPlugin)! as WebCameraPlugin

        for (const errorType of this.webCameraPluginErrors) {
            const errListener: (e: IEvent<string>) => void = (e) => {
                console.error("BaseTryonPlugin: Camera error", e)
                this.dispatchEvent({ type: "error", detail: { reason: errorType, error: e.error } });
            }

            webCameraPlugin.addEventListener(errorType, errListener)
            this._webCameraPluginErrorListeners.push(errListener)
        }
    }

    private _unregisterCameraErrorListeners() {
        const webCameraPlugin = this._viewer!.getPlugin(WebCameraPlugin)! as WebCameraPlugin

        for (const errorType of this.webCameraPluginErrors) {
            const errListener = this._webCameraPluginErrorListeners.shift()
            webCameraPlugin.removeEventListener(errorType, errListener!)
        }
    }

    protected canStart() {
        if (!this.enabled) return false
        if (this._running) return false
        if (this._starting) return false
        if (this._cameraBackgroundPlugin?.paused) return false

        return true
    }

    @uiButton()
    async start() {
        if (!this.enabled) return
        if (this._running) return
        if (this._starting) {
            console.warn('BaseTryonPlugin: Already starting')
            return
        }

        // resume paused
        if (this._cameraBackgroundPlugin?.paused) {
            await this._cameraBackgroundPlugin.start(true, this.mediaSettings)
            return
        }

        this.dispatchEvent({ type: 'start', detail: {} })

        this._starting = true

        console.time("BaseTryonPlugin: start")

        this.dispatchEvent({ type: 'start', detail: {} })

        this._registerCameraErrorListeners()
        this._viewer!.renderEnabled = false

        if (this._videoFeed) {
            console.error('BaseTryonPlugin: Video feed already set, ignoring...')
            this._cameraBackgroundPlugin?.videoFeed && await this._cameraBackgroundPlugin?.stop()
            this._videoFeed = undefined
        }
        try {
            this._initPluginsState()
            this._initCameraSettings()
            this._setCameraSettings(this._viewer!.scene.activeCamera!, this.cameraSettings)
            this._saveModelRootState()
            console.time("Create video feed")
            this._videoFeed = await this._cameraBackgroundPlugin!.start(true, this.mediaSettings)
            console.timeEnd("Create video feed")
            this._refreshWebcamState()
            await this._setInitialVideoSize()

            if ("wakeLock" in navigator) {
                try {
                    this.wakeLock = await navigator.wakeLock.request('screen')
                    console.log("Wake lock is active")
                } catch (e) {
                    console.warn("Wake lock request failed:", e)
                }
            }

            await this._start()
            this._running = true
            this._hideAll(true)
            super.use()
        } catch (e) {
            // dispatch a startup failed error due to possibly reasons other than the web camera plugin
            console.error("BaseTryonPlugin: Startup failed", e)
            this.dispatchEvent({ type: 'error', detail: { reason: 'startupFailed', error: e } })

            await this.stop(true)
        } finally {
            this._unregisterCameraErrorListeners()
            this._viewer!.renderEnabled = true
            this._starting = false
            console.timeEnd("BaseTryonPlugin: start")
        }

        this.dispatchEvent({ type: 'initialized', detail: {} })
    }

    @uiButton()
    async pause() {
        if (!this._running) return
        if (this._starting) return
        if (!this._cameraBackgroundPlugin) return
        await this._cameraBackgroundPlugin.pause()
    }

    @uiButton()
    async stop(force = false) {
        if (!this._running && !force) return
        if (this._starting && !force) {
            console.warn('RingTryonPlugin: Startup in progress, cannot stop yet')
            return
        }

        const promises = []
        await this._stop()
        this._videoFeed = undefined
        this._running = false
        this._resetModelRootState()
        this._resetCamera()
        this._restorePluginsState()
        this._cameraBackgroundPlugin?.videoFeed && promises.push(this._cameraBackgroundPlugin.stop())

        await this.wakeLock?.release()
        this.wakeLock = null

        this._hideAll(false)
        super.unuse()
        this._starting = false
        this._running = false
        this.dispatchEvent({ type: 'stop', detail: {} })
        return Promise.allSettled(promises)
    }

    get running() {
        return this._running
    }

    protected abstract _start(): Promise<void>

    protected abstract _stop(): Promise<void>

    private _lastResultTime = 0
    protected delta = 1 / 60 // 60 fps

    protected _preFrame() {
        if (!this._running) return
        if (!this._viewer) return
        if (document.hidden) return
        if (!this.modelRoot?.children.length) {
            console.warn('BaseTryonPlugin: No object in scene')
            return;
        }

        const time = now()
        this.delta = time - this._lastResultTime
        this._lastResultTime = time
        this.delta = MathUtils.clamp(this.delta, 0.001, 1000) // clamp to 1 second
        // if(delta > 1000){
        //     console.warn('Model result is too old')
        //     return
        // }
        // if (delta > 100) {
        //     console.warn('BaseTryonPlugin: Model result is old')
        // }
        this.visible = true
        this.hideImmediatelyFlag = false

        this._sync3DWithResult(time)
        this._postSync3DWithResult()
    }

    protected _postFrame() { }

    protected abstract _sync3DWithResult(time: number): void
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected _postSync3DWithResult(): void { }

    protected visible = false
    protected hideImmediatelyFlag = false

    // todo pick better name
    protected _hideAll(immediate = false) {
        if (!this.running) return
        this.visible = false
        this.hideImmediatelyFlag ||= immediate
    }

    // todo pick better name
    protected _showAll() {
        this.visible = true
    }

    async setVideoSize(x: number, y: number) {
        this.videoSize.set(x, y)
        return this._setWebcamState()
    }
    private async _setWebcamState() {
        return this._cameraBackgroundPlugin?.setState({
            width: this.videoSize.x,
            height: this.videoSize.y,
            zoom: this.cameraZoom,
            scale: this.videoScale
        })
    }

    private _refreshWebcamState = () => {
        const state = this._cameraBackgroundPlugin?.state
        if (!state) return
        this.videoSize.set(state.width, state.height)
        this.cameraZoom = state.zoom
        this.videoScale = state.scale
    }
    private _pluginStateSet = false // not needed since its private
    protected _lastPluginsState = JSON.parse(JSON.stringify(this.pluginStateSettings)) as typeof this.pluginStateSettings
    private _lastCameraParams = JSON.parse(JSON.stringify(this.cameraSettings)) as typeof this.cameraSettings

    private _modelParamsSet = false
    private _cameraParamsSet = false

    private _initPluginsState() {
        if (!this.enabled || !this._viewer) return

        this._savePluginSettings()

        this._setPluginSettings(this.pluginStateSettings)

        this._pluginStateSet = true
    }

    private _restorePluginsState() {
        if (/*!this.enabled || */!this._viewer) return
        if (!this._pluginStateSet) return

        this._setPluginSettings(this._lastPluginsState)

        this._pluginStateSet = false
    }

    protected _initCameraSettings() {
        if (!this.enabled) return
        const cam = this._viewer!.scene.activeCamera!
        this._lastCameraParams.interactionsEnabled = cam.interactionsEnabled
        this._lastCameraParams.position = cam.position.toArray()
        this._lastCameraParams.target = cam.target.toArray()
        this._lastCameraParams.autoNearFar = cam.cameraObject.userData.autoNearFar
        this._lastCameraParams.minNear = cam.cameraObject.userData.minNearPlane
        this._lastCameraParams.maxFar = cam.cameraObject.userData.maxFarPlane
        this._lastCameraParams.fov = (cam.cameraObject as PerspectiveCamera).fov

        this._cameraParamsSet = true
    }

    protected _resetCamera() {
        if (!this.enabled) return
        if (!this._cameraParamsSet) return
        const cam = this._viewer!.scene.activeCamera!
        this._setCameraSettings(cam, this._lastCameraParams)
        this._cameraParamsSet = false
    }

    protected _setCameraSettings(cam: CameraController, settings: typeof this.cameraSettings) {
        // todo: fix this race condition, presumably from the orbit controller
        cam.interactionsEnabled = settings.interactionsEnabled

        cam.position.fromArray(settings.position)
        cam.target.fromArray(settings.target)
        cam.positionUpdated(true)

        const camObject = cam.cameraObject as PerspectiveCamera

        camObject.userData.autoNearFar = settings.autoNearFar
        this._setCameraNearFar(cam, settings.minNear, settings.maxFar)

        // todo match camera fov with video feed camara fov somehow
        camObject.fov = settings.fov
        cam.setCameraOptions({ fov: settings.fov })
        camObject.updateProjectionMatrix()

        // sometimes after abruptly stopping at initialization (e.g. due to no camera permission error), the near/far plane is off, resulting in clipping
        // so we call this to fix it
        cam.controls?.update()
    }

    protected _setCameraNearFar(cam: CameraController, near: number, far: number) {
        cam.cameraObject.userData.minNearPlane = near
        cam.cameraObject.userData.maxFarPlane = far

        cam.near = near
        cam.far = far
        cam.cameraObject.near = near
        cam.cameraObject.far = far
        cam.cameraObject.updateProjectionMatrix()
    }

    private _lastModelState = {
        position: [0, 0, 0],
        rotation: [0, 0, 0, 1],
        scale: [1, 1, 1],
        visible: true,
        children: [
            {
                position: [0, 0, 0],
                rotation: [0, 0, 0, 1],
                scale: [1, 1, 1],
                visible: true,
            }
        ]
    }

    protected _saveModelRootState() {
        if (!this.enabled) return
        const obj = this.modelRoot
        if (!obj) {
            console.warn('BaseTryonPlugin: Model root not set')
            return
        }
        this._lastModelState.position = obj.position.toArray()
        this._lastModelState.rotation = obj.quaternion.toArray()
        this._lastModelState.scale = obj.scale.toArray()
        this._lastModelState.visible = obj.visible
        this._lastModelState.children = obj.children.map(c => ({
            position: c.position.toArray(),
            rotation: c.quaternion.toArray(),
            scale: c.scale.toArray(),
            visible: c.visible,
        }))
        this._modelParamsSet = true

    }
    protected _resetModelRootState() {
        if (!this.enabled) return
        if (!this._modelParamsSet) return
        const obj = this.modelRoot
        if (!obj) {
            console.warn('BaseTryonPlugin: Model root not set')
            return
        }
        obj.position.fromArray(this._lastModelState.position)
        obj.quaternion.fromArray(this._lastModelState.rotation)
        obj.scale.fromArray(this._lastModelState.scale)
        obj.visible = this._lastModelState.visible
        for (let i = 0; i < obj.children.length; i++) {
            const c = obj.children[i]
            if (i >= this._lastModelState.children.length) break
            const s = this._lastModelState.children[i]
            c.position.fromArray(s.position)
            c.quaternion.fromArray(s.rotation)
            c.scale.fromArray(s.scale)
            c.visible = s.visible
        }
        obj.setDirty?.({ sceneUpdate: true })
        this._modelParamsSet = false
    }

    protected _savePluginSettings() {
        const viewer = this._viewer
        if (!viewer) throw new Error('RingTryonPlugin: Viewer not set')

        const ground = viewer.getPlugin(GroundPlugin)
        const frameFade = viewer.getPlugin(FrameFadePlugin)
        const interactionPrompt = viewer.getPlugin(InteractionPromptPlugin)
        const outline = viewer.getPlugin(OutlinePlugin)
        const dof = viewer.getPlugin(DepthOfFieldPlugin)
        const tonemap = viewer.getPlugin(TonemapPlugin)
        const lut = viewer.getPlugin(LUTPlugin)
        const ssgi = viewer.getPlugin(SSGIPlugin)
        const ssao = viewer.getPlugin(SSAOPlugin)
        const sscs = viewer.getPlugin(SSContactShadows)
        const parallaxCamera = viewer.getPlugin(ParallaxCameraControllerPlugin)
        const velocityBuffer = viewer.getPlugin(VelocityBufferPlugin)
        const ssr = viewer.getPlugin(SSRPlugin)
        const bloom = viewer.getPlugin(BloomPlugin)

        this._lastPluginsState.ground = ground?.visible ?? false
        this._lastPluginsState.frameFade = frameFade?.enabled ?? false
        this._lastPluginsState.interactionPrompt = interactionPrompt?.enabled ?? false
        this._lastPluginsState.outline = outline?.enabled ?? false
        this._lastPluginsState.dof = dof?.enabled ?? false
        this._lastPluginsState.tonemapBackground = tonemap?.config?.tonemapBackground ?? false
        this._lastPluginsState.clipBackground = tonemap?.config?.clipBackground ?? false
        this._lastPluginsState.lut = lut?.enabled ?? false
        this._lastPluginsState.ssgi = ssgi?.enabled ?? false
        this._lastPluginsState.ssao.enabled = ssao?.enabled ?? false
        this._lastPluginsState.ssao.intensity = ssao?.passes.ssao.passObject.parameters.intensity ?? 0.25
        this._lastPluginsState.ssao.radius = ssao?.passes.ssao.passObject.parameters.occlusionWorldRadius ?? 1


        this._lastPluginsState.sscs = sscs?.enabled ?? false
        this._lastPluginsState.parallaxCamera = parallaxCamera?.enabled ?? false
        this._lastPluginsState.velocityBuffer = velocityBuffer?.enabled ?? false

        const ssrPass = ssr?.passes.ssr.passObject

        this._lastPluginsState.ssr = {
            enabled: ssr?.enabled ?? false,
            intensity: ssrPass?.intensity ?? 1,
            objectRadius: ssrPass?.objectRadius ?? 1,
            autoRadius: ssrPass?.autoRadius ?? false,
            maskFrontFactor: ssrPass?.maskFrontFactor ?? 1,
        }
        this._lastPluginsState.bloom = bloom?.enabled ?? false
    }

    protected _setPluginSettings(settings: typeof this.pluginStateSettings) {
        const viewer = this._viewer
        if (!viewer) throw new Error('RingTryonPlugin: Viewer not set')

        const ground = viewer.getPlugin(GroundPlugin)
        const frameFade = viewer.getPlugin(FrameFadePlugin)
        const interactionPrompt = viewer.getPlugin(InteractionPromptPlugin)
        const outline = viewer.getPlugin(OutlinePlugin)
        const dof = viewer.getPlugin(DepthOfFieldPlugin)
        const tonemap = viewer.getPlugin(TonemapPlugin)
        const lut = viewer.getPlugin(LUTPlugin)
        const ssgi = viewer.getPlugin(SSGIPlugin)
        const ssao = viewer.getPlugin(SSAOPlugin)
        const sscs = viewer.getPlugin(SSContactShadows)
        const parallaxCamera = viewer.getPlugin(ParallaxCameraControllerPlugin)
        const velocityBuffer = viewer.getPlugin(VelocityBufferPlugin)
        const ssr = viewer.getPlugin(SSRPlugin)
        const bloom = viewer.getPlugin(BloomPlugin)
        const picking = viewer.getPlugin(PickingPlugin)

        if (ground) {
            ground.visible = settings.ground

            // we need to hide the ground mesh as well otherwise there is a shader error
            if (ground.mesh) ground.mesh.visible = settings.ground
        }
        if (frameFade) frameFade.enabled = settings.frameFade
        if (interactionPrompt) {
            interactionPrompt.enabled = settings.interactionPrompt

            if (!interactionPrompt.enabled) {
                // this has to be run as otherwise the camera position will be updated by this plugin in the next frame although the plugin is disabled
                // this will result in the camera position being invalid causing issues with the try-on as it's not at the cameraSettings position origin
                interactionPrompt.stopAnimation({ reset: false })
            }
        }
        if (outline) outline.enabled = settings.outline
        if (dof) dof.enabled = settings.dof
        if (tonemap) {
            tonemap.config!.tonemapBackground = settings.tonemapBackground
            tonemap.config!.clipBackground = settings.clipBackground
        }
        if (lut) lut.enabled = settings.lut
        if (ssgi) ssgi.enabled = settings.ssgi
        if (ssao) {
            ssao.enabled = settings.ssao.enabled
            ssao.passes.ssao.passObject.parameters.intensity = settings.ssao.intensity
            ssao.passes.ssao.passObject.parameters.occlusionWorldRadius = settings.ssao.radius
        }
        if (sscs) sscs.enabled = settings.sscs
        if (parallaxCamera) parallaxCamera.enabled = settings.parallaxCamera
        if (velocityBuffer) velocityBuffer.enabled = settings.velocityBuffer
        if (ssr) {
            ssr.enabled = settings.ssr.enabled

            const ssrPass = ssr.passes.ssr.passObject
            ssrPass.intensity = settings.ssr.intensity
            ssrPass.objectRadius = settings.ssr.objectRadius
            ssrPass.autoRadius = settings.ssr.autoRadius
            ssrPass.maskFrontFactor = settings.ssr.maskFrontFactor
            ssrPass.material.needsUpdate = true
        }
        if (bloom) bloom.enabled = settings.bloom
        if (picking) {
            if (picking.picker) picking.picker.selectedObject = null
        }
    }

    private _flipAndTransparentHack() {
        // flip and transparent hack.
        const postHackExt = {
            isCompatible: () => true,
            extraUniforms: {
                flip: { value: false },
            },
            parsVertexSnippet: `
            uniform bool flip;
            `,
            shaderExtender: (shader: any) => {
                // shader.fragmentShader = shaderReplaceString(shader.fragmentShader, 'gl_FragColor = tDiffuseTexelToLinear (texture2D(tDiffuse, vUv));', 'vUv = vUv + 1.0;\n', {prepend: true})
                // shader.fragmentShader = shaderReplaceString(shader.fragmentShader, 'texture2D(tDiffuse, vUv)', 'texture2D(tDiffuse, vec2(1.-vUv.x * zoomLevel, vUv.y*0.5))')
                shader.vertexShader = shaderReplaceString(shader.vertexShader, "vUv = uv;", "vUv = flip ? vec2(1.-uv.x, uv.y) : uv;");
                // console.log(shader.fragmentShader)

                // remove check for transparent. hack for now because of the shadow material interfering with tonemap background = false
                // this disables tonemapping for transparent objects basically that are over the background
                shader.fragmentShader = shaderReplaceString(shader.fragmentShader, "bool isBackground=depth>0.99&&transparentCol.a<0.001", "bool isBackground=depth>0.99")

                // shader.fragmentShader = shaderReplaceString(shader.fragmentShader, "return outColor;", /* glsl */`
                //     return vec4(vec3(transparentCol.a), 1.0);
                // `)

                // shader.fragmentShader = shaderReplaceString(shader.fragmentShader, "outColor.rgb=toneMapping(outColor.rgb);", /* glsl */`
                // outColor.rgb = vec3(transparentCol.a);
                // `)

                // hack for ios because srgb doesnt work. todo fix in webgi by upgrading three.js
                // const base = '#if TRANSPARENT_BACKGROUND > 0\n' +
                //     'if(isBackground)outColor.a=0.;if(depth>0.99&&transparentCol.a>=0.001)outColor.a=transparentCol.a;\n' +
                //     '#endif\n'
                // const replace = 'if(isBackground||!doTonemap) outColor.rgba = sRGBToLinear(outColor.rgba);'
                // shader.fragmentShader = shaderReplaceString(shader.fragmentShader, base, replace, { append: true });

            },
        } as MaterialExtension;
        const shaderMat = this._viewer!.renderer.rendererObject.background.getPlaneMesh()?.material
        if (shaderMat) {
            shaderMat.fragmentShader = shaderReplaceString(shaderMat.fragmentShader,
                `gl_FragColor = texColor;`,
                `gl_FragColor = sRGBToLinear(texColor);`, // make sure backgroundIntensity is 1
            )
            // shaderMat.fragmentShader = shaderReplaceString(shaderMat.fragmentShader, "vec4 texColor = texture2D( t2D, vUv );", /* glsl */`
            //     vec4 texColor = texture2D( t2D, vUv );

            //     vec2 colorResolution = vec2(textureSize(t2D, 0));
            //     vec2 colorOffset = vec2(1. / colorResolution.x, 1. / colorResolution.y);

            //     vec3 colorA = texture2D(t2D, vec2(vUv.x - colorOffset.x, vUv.y - colorOffset.y)).rgb;
            //     vec3 colorB = texture2D(t2D, vec2(vUv.x + colorOffset.x, vUv.y + colorOffset.y)).rgb;
            //     vec3 colorC = texture2D(t2D, vec2(vUv.x - colorOffset.x, vUv.y + colorOffset.y)).rgb;
            //     vec3 colorD = texture2D(t2D, vec2(vUv.x + colorOffset.x, vUv.y - colorOffset.y)).rgb;

            //     vec3 aroundColor = (colorA + colorB + colorC + colorD) * 0.25;
            //     texColor.rgb = texColor.rgb + (texColor.rgb - aroundColor) * 2.0;
            // `)

            shaderMat.needsUpdate = true
        }
        ShaderLib.background.fragmentShader = shaderReplaceString(ShaderLib.background.fragmentShader,
            `gl_FragColor = texColor;`,
            `gl_FragColor = sRGBToLinear(texColor);`, // make sure backgroundIntensity is 1
        )
        const combinedPost = this._viewer!.getPlugin(CombinedPostPlugin)!;
        combinedPost.pass!.passObject.material.registerMaterialExtensions([postHackExt]);
    }

    @uiButton()
    selectNextCamera() {
        if (!this._cameraBackgroundPlugin) return
        const devices = this._cameraBackgroundPlugin?.getCameraDevices() ?? []
        const current = this._cameraBackgroundPlugin.state.camera
        const index = devices.findIndex(d => d.label === current || d.deviceId === current)
        if (index === -1) {
            this.flipCamera()
            return
        }
        const next = devices[(index + 1) % devices.length]
        if (next.label === current || next.deviceId === current) {
            this.flipCamera()
            return
        }
        this._cameraBackgroundPlugin.state.camera = next.label
        return this._cameraBackgroundPlugin.refreshState()
    }

    @uiButton()
    flipCamera() {
        if (!this._cameraBackgroundPlugin) return
        if (!this._cameraBackgroundPlugin.state.cameraFacing) return // not possible on this device.
        this._cameraBackgroundPlugin.state.camera = ''
        this._cameraBackgroundPlugin.state.cameraFacing = this._cameraBackgroundPlugin.state.cameraFacing === 'user' ? 'environment' : 'user'
        return this._cameraBackgroundPlugin.refreshState()
    }

    private _setInitialVideoSize() {
        if (!this._viewer) throw new Error('Viewer not set')
        // this._refreshWebcamState() // called just before this function
        const videoResolutionScale = 1 // todo make parameter.
        const canvasSize = new Vector2(this._viewer.canvas.clientWidth, this._viewer.canvas.clientHeight)
        const dpr = this._viewer.renderer.displayCanvasScaling
        canvasSize.multiplyScalar(dpr * videoResolutionScale)

        // match the aspect ratio of the current video feed todo.
        // const asp = this._videoFeed!.settings.width/this._videoFeed!.settings.height
        // // const asp = this.videoSize.width/this.videoSize.height
        // if(asp > 1) canvasSize.x = canvasSize.y * asp
        // else canvasSize.y = canvasSize.x / asp

        // match a fixed aspect ratio. or clamp it? todo. this is required for android bug, but keeping since mediapipe model also accepts square image only
        const targetAspect = 1
        const asp = canvasSize.x / canvasSize.y
        if (asp > targetAspect) canvasSize.y = canvasSize.x / targetAspect
        else canvasSize.x = canvasSize.y * targetAspect

        return this.setVideoSize(canvasSize.x, canvasSize.y)
    }

    getImage() {
        return this._viewer?.canvas.toDataURL('image/png')
    }
    async saveImage(name = 'ijewel3d_tryon.png') {
        const img = this.getImage()
        if (!img) return img
        const blob = await fetch(img).then(r => r.blob())
        downloadBlob(blob, name)
    }
}
