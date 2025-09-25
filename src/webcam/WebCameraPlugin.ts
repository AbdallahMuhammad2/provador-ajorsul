import {
    AViewerPlugin,
    CanvasTexture,
    generateUiConfig,
    onChange2, timeout,
    uiButton,
    UiObjectConfig,
    VideoTexture,
    ViewerApp
} from 'webgi'
import { HTMLVideoElement2, videoElementCancelCallbackPolyfill } from './utils'
import { isAppleMobileDevice } from '../shared/utils/utils'

declare global {
    // extra properties added from iphone, see DummyWebCameraPlugin
    interface MediaTrackSettings {
        facingMode?: 'user' | 'environment' | string
        zoom?: number
        resizeMode?: 'none' | 'crop-and-scale'
        whiteBalanceMode?: 'manual' | 'continuous' | string
        torch?: boolean
    }
    // extra properties added from iphone, see DummyWebCameraPlugin
    interface MediaTrackCapabilities {
        zoom?: { max: number, min: number }
        focusDistance?: { min: number }
        resizeMode?: string[]
        whiteBalanceMode?: ('manual' | 'continuous')[]
        torch?: boolean
    }
}

export interface WebCameraDeviceInfo {
    deviceId: string
    label: string
    groupId: string
    capabilities: MediaTrackCapabilities
    constraints: MediaTrackConstraints
    settings: MediaTrackSettings // default settings
}
export interface WebCameraVideoFeed {
    id: string
    deviceId: string
    video: HTMLVideoElement2
    usable: boolean // can the video and texture be used.
    stream: MediaStream
    track: MediaStreamTrack
    settings: MediaTrackSettings
    texture: VideoTexture | CanvasTexture
    deviceInfo: WebCameraDeviceInfo
    view: {
        mode: 'viewer' | 'auto' | 'manual' | 'screen'
        width: number
        height: number
        scale: number
    }
    textureScale: [number, number], // x,y
}

export class WebCameraPlugin extends AViewerPlugin<'startVideo' | 'stopVideo' | 'initialized' | 'noCameraSupport' | 'permissionDenied' | 'mediaDevicesError'> {
    public static readonly PluginType = 'WebCameraPlugin'

    /**
     * Dont set this from outside
     */
    @onChange2(WebCameraPlugin.prototype._enabledChange)
    enabled = false // todo make it protected maybe

    toJSON: any = null

    private _enabledChange() {
        if (this.enabled) this.initialise()
    }
    private _checkSupport() {
        // navigator can be undefined if the website is using HTTP for example
        return !!navigator?.mediaDevices?.getUserMedia;
    }

    constructor(enabled: boolean = false) {
        super()
        this.enabled = enabled
    }

    async onAdded(viewer: ViewerApp): Promise<void> {
        await super.onAdded(viewer);
        if (this.enabled) await this.initialise()
    }

    enableLog = true
    private _consoleLog(...data: any[]) {
        if (!this.enableLog) return
        this._viewer?.console.log(...data)
    }

    streams: Record<string, MediaStream> = {}
    devicesData: WebCameraDeviceInfo[] = []
    supportedConstraints: MediaTrackSupportedConstraints = {}

    readonly initDeviceList = true

    protected _initialized = false
    protected _initializing = undefined as Promise<boolean> | undefined
    async initialise(autoEnable = true) {
        if (this._initialized) return true
        if (this._initializing) return this._initializing

        // eslint-disable-next-line no-async-promise-executor
        this._initializing = new Promise<boolean>(async (resolve) => {
            if (!this._checkSupport()) {
                this._viewer?.console.error('getUserMedia not supported')
                this.dispatchEvent({ type: 'noCameraSupport', error: new Error('getUserMedia not supported on device') })
                return resolve(false)
            }
            if (!this.initDeviceList) return resolve(true)

            // get device for permission prompt
            const res = await navigator.mediaDevices.getUserMedia({ video: true }).catch(e => {
                if (e.name === 'NotAllowedError') {
                    this.dispatchEvent({ type: 'permissionDenied', error: e })
                } else {
                    this._viewer?.console.error('Failed to get user media', e)
                    this.dispatchEvent({ type: 'mediaDevicesError', error: e })
                }
                return null
            })
            res?.getTracks().forEach(t => t.stop())
            if (!res) return resolve(false)

            if (!this.devicesData.length) {
                const ref = await this.refreshDeviceList(true)
                if (!ref) return resolve(false)
            }
            resolve(true)
        })

        if (!this.enabled) {
            if (autoEnable)
                this.enabled = true
            else {
                this._viewer?.console.warn('WebCameraPlugin not enabled')
                return false
            }
        }

        const res = await this._initializing
        this._initializing = undefined
        if (!res) return false
        this._initialized = true
        this.dispatchEvent({ type: 'initialized' })
        this.refreshUi()
        return true
    }

    protected _refreshDeviceList = undefined as Promise<boolean> | undefined
    @uiButton('Refresh Device List')
    async refreshDeviceList(force = false) {
        if (!this._initialized && !force) {
            this._viewer?.console.warn('WebCameraPlugin not initialized')
            return this.initialise()
        }
        if (this._refreshDeviceList) return await this._refreshDeviceList
        // eslint-disable-next-line no-async-promise-executor
        this._refreshDeviceList = new Promise<boolean>(async (resolve) => {
            // Enumerate the available video input devices
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter(device => device.kind === 'videoinput');
            const supportedConstraints = await navigator.mediaDevices.getSupportedConstraints();

            // Create basic device info without starting streams
            const deviceList: WebCameraDeviceInfo[] = videoDevices.map(device => ({
                deviceId: device.deviceId,
                label: device.label,
                groupId: device.groupId,
                capabilities: {},
                constraints: {},
                settings: {}
            }))

            this.devicesData = deviceList
            this.supportedConstraints = supportedConstraints
            resolve(true)
        }).catch(e => {
            this._viewer?.console.error('Failed to refresh device list', e)
            this.dispatchEvent({ type: 'mediaDevicesError', error: e })
            return false
        })
        return await this._refreshDeviceList
    }

    private async startStream(deviceId: string, settings?: MediaTrackSettings, refreshUi = true) {
        if (this.streams[deviceId]) return this.streams[deviceId]
        // const defaultSettings = true
        const defaultSettings = { facingMode: 'environment' }

        const userMediaConstraints: MediaStreamConstraints = {
            video: deviceId?.length
                ? { ...settings, deviceId: { exact: deviceId } }
                : (settings ?? defaultSettings)
        }

        const stream = await navigator.mediaDevices.getUserMedia(userMediaConstraints).catch(e => {
            this._viewer?.console.error('Failed to get user media', e)
            this.dispatchEvent({ type: 'mediaDevicesError', error: e })
            return null
        })
        if (!stream) return null
        const streamDeviceId = stream.getVideoTracks()[0].getSettings().deviceId
        if (streamDeviceId && deviceId && streamDeviceId !== deviceId) {
            this._viewer?.console.error('Stream deviceId mismatch:', streamDeviceId, deviceId)
            deviceId = streamDeviceId
        }
        if (!deviceId?.length) {
            if (streamDeviceId) deviceId = streamDeviceId
            else {
                this._viewer?.console.error('Failed to get deviceId from stream:', streamDeviceId)
                throw new Error('Failed to get deviceId from stream')
            }
        }
        this.streams[deviceId] = stream
        refreshUi && this.refreshUi()
        return stream
    }
    private async stopStream(deviceId: string, refreshUi = true) {
        if (!this.streams[deviceId]) return
        this.streams[deviceId].getTracks().forEach(t => t.stop())
        delete this.streams[deviceId]
        refreshUi && this.refreshUi()
    }
    refreshUi() {
        this.uiConfig?.uiRefresh?.('postFrame', true, 1)
    }

    uiConfig: UiObjectConfig = {
        type: 'folder',
        label: 'Web Camera',
        children: [
            {
                type: 'folder',
                label: 'Devices',
                children: [
                    () => this.devicesData.map(d => {
                        const video = this.videos[d.deviceId]
                        return {
                            type: 'folder',
                            children: [...generateUiConfig(d),
                            {
                                type: 'button',
                                label: !video ? 'Start Video' : 'Stop Video',
                                value: !video ? () => this.startVideo(d.label, { deviceId: d.deviceId }) : () => this.stopVideo(d.label),
                            }
                            ],
                            label: d.label,
                        }
                    })
                ]
            },
            {
                type: 'folder',
                label: 'Videos',
                children: [
                    () => Object.values(this.videos).map(d => {
                        const settingsUi = generateUiConfig(d.settings)
                        settingsUi.forEach(s => s.onChange = async () => this.setVideoSettings(d.id))
                        return {
                            type: 'folder',
                            children: [...settingsUi,
                            {
                                type: 'button',
                                label: 'Stop Video',
                                value: () => this.stopVideo(d.id),
                            },
                            ],
                            label: d.deviceInfo.label || d.id,
                        }
                    })
                ]
            },
            ...generateUiConfig(this)
        ]
    }

    readonly videos: Record<string, WebCameraVideoFeed> = {}

    async setVideoSettings(id: string, settings?: MediaTrackSettings) {
        const videoFeed = this.videos[id]
        if (!videoFeed) {
            this._viewer?.console.error('Video feed not found:', id)
            return null
        }
        if (!settings) settings = videoFeed.settings

        if (settings) {
            settings = { ...settings }
            const keys = Object.keys(settings) as (keyof MediaTrackSettings)[]
            for (const k of keys) {
                if (k === 'deviceId') continue
                const capabilities = videoFeed.deviceInfo.capabilities
                const cap = capabilities[k] as MediaTrackCapabilities['width']
                if (!cap) {
                    // this._viewer?.console.error('Setting not supported:', k)
                    delete settings[k]
                    continue
                } else {
                    if (cap.min && settings[k] && (settings[k] as any) < cap.min) {
                        // console.log('Setting below min:', k, settings[k], cap.min)
                        settings[k] = cap.min as any
                    }
                    if (cap.max && settings[k] && (settings[k] as any) > cap.max) {
                        // console.log('Setting above max:', k, settings[k], cap.max)
                        settings[k] = cap.max as any
                    }
                }
                // dont do this for width and height and maybe some more. so keeping
                // if(videoFeed.settings[k] === settings[k]) delete settings[k]
            }
            if (settings.width && settings.height) {
                delete settings.aspectRatio
                // settings.aspectRatio = settings.width / settings.height
            }
        }
        // so that the video or texture is not used by anyone else like ML model or three.js. todo: do not render texture when not usable.(in webcam bg plugin)
        videoFeed.usable = false
        if (settings && (
            (settings.deviceId && settings.deviceId !== videoFeed.deviceId) ||
            (settings.facingMode && settings.facingMode !== videoFeed.settings.facingMode)
        )) {
            videoFeed.video.pause()
            // videoFeed.video.srcObject = null
            videoFeed.texture.dispose()
            videoFeed.video._cancelAllVideoFrameCallbacks() // because of three.js
            const newDeviceId = settings.deviceId || ''
            // videoFeed.texture.image = null // todo this needs to be set to null if there is an error in stopping/starting below
            await this.stopStream(videoFeed.deviceId, false)

            // const settings1 = {...videoFeed.settings, ...settings}
            const __ret = await this._createVideo(id, newDeviceId, settings)
            if (!__ret) return __ret
            Object.assign(videoFeed, __ret)
        } else {
            // this._viewer?.console.log('apply settings', settings)

            // to force facing mode. (not required)
            // settings.facingMode = videoFeed.settings.facingMode

            // not sure if this is a bug or not. on ios safari we need to swap width and height when in portrait mode since it is being swapped internally somehow
            // todo check if this is the case with android(chrome, firefox, opera etc) as well
            // const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
            const isMobile = /iPhone|iPad/i.test(navigator.userAgent)
            const orientation = window.screen?.orientation?.angle ?? window.orientation
            const swapWH =
                isMobile &&
                orientation !== 90 &&
                orientation !== -90 &&
                orientation !== 270 &&
                orientation !== -270
            const changingSize = settings.width && settings.height
            if (changingSize && swapWH) {
                settings = { ...settings } // clone just in case
                const t = settings.width
                // noinspection JSSuspiciousNameCombination
                settings.width = settings.height
                settings.height = t
            }

            await videoFeed.track.applyConstraints({ advanced: [settings] })
            const newSettings = videoFeed.track.getSettings()
            // this._viewer?console.log('new settings', newSettings)

            if (changingSize) {
                const isSame = newSettings.width === settings.width && newSettings.height === settings.height
                const isSwap = newSettings.width === settings.height && newSettings.height === settings.width
                if ((isSame && !swapWH) || (isSwap && swapWH)) {
                    // all good
                } else {
                    const expected = !swapWH ? `${settings.width}x${settings.height}` : `${settings.height}x${settings.width}`
                    this._viewer?.console.error(`Size changed: ${settings.width}x${settings.height} -> ${newSettings.width}x${newSettings.height}, expected: ${expected}`)
                }
            }
            Object.assign(videoFeed.settings, newSettings)
        }
        videoFeed.usable = true
        // console.log(videoFeed.video.width, videoFeed.video.height, videoFeed.settings.width, videoFeed.settings.height)
        if (videoFeed.settings.width) videoFeed.video.width = videoFeed.settings.width
        if (videoFeed.settings.height) videoFeed.video.height = videoFeed.settings.height
        this.refreshVideoTexture(id)
        return videoFeed.settings
    }

    async startVideo(id: string, newSettings: MediaTrackSettings, mode: WebCameraVideoFeed['view']['mode'] = 'viewer', autoEnable = true) {
        if (!this._initialized) {
            await this.initialise(autoEnable)
        }
        if (!this._initialized) {
            this._viewer?.console.error('WebCameraPlugin not initialized')
            return null
        }

        let { deviceId } = newSettings
        deviceId = deviceId ?? ''
        const anyCamera = deviceId?.length === 0

        // if(!deviceInfo){
        //     this._viewer?.console.error('Device not found:', deviceId)
        //     return null
        // }
        const oldSettings = this.devicesData.find(d => d.deviceId === deviceId)?.settings
        const createVideoSettings = { ...oldSettings, ...newSettings }
        const maxTry = 3
        let __ret: Awaited<ReturnType<typeof this._createVideo>> = null
        for (let i = 0; i < maxTry && !__ret; i++) {
            if (i) this._viewer?.console.log('Create Webcam Video retry:', i, id, deviceId, oldSettings)

            __ret = await this._createVideo(id, deviceId, createVideoSettings)

            if (anyCamera) deviceId = ''
        }
        if (!__ret) return __ret
        deviceId = __ret.deviceId
        const { stream, video, track, settings, texture, deviceInfo } = __ret

        this.videos[id] = {
            id,
            deviceId,
            video,
            stream,
            track,
            settings,
            texture,
            deviceInfo,
            usable: true,
            view: {
                mode,
                width: video.width,
                height: video.height,
                scale: 1,
            },
            textureScale: [1, 1],
        }
        this.refreshVideoTexture(id)

        const resizeListener = () => {
            const videoFeed1 = this.videos[id]
            if (!videoFeed1 || !videoFeed1.texture || videoFeed1.view.mode === 'manual') return
            this.refreshVideoTexture(id)
        }
        this._viewer?.renderManager.addEventListener('resize', resizeListener)
        const l2 = (ev: any) => {
            if (ev.id !== id) return;
            this._viewer?.renderManager.removeEventListener('resize', resizeListener)
            this.removeEventListener('stopVideo', l2)
        }
        this.addEventListener('stopVideo', l2)

        this.dispatchEvent({ type: 'startVideo', id, video: this.videos[id] })
        this.refreshUi()

        video.style.position = 'absolute'
        video.style.top = '0'
        video.style.left = '0'
        // document.body.appendChild(video)

        return this.videos[id]
    }

    private async _createVideo(id: string, deviceId: string, settings1?: MediaTrackSettings) {
        const macroModeCameraLabels = ['Back Telephoto Camera', 'Back Triple Camera', 'Back Dual Wide Camera'] // iPhone 16 Pro Max
        const rejectedCameraLabels = ['Telephoto', 'Ultra Wide']

        console.log('WebcamPlugin: Creating video:', id, deviceId, settings1)
        if (deviceId.length === 0) {
            for (const device of this.devicesData) {
                if (device.deviceId === deviceId) {
                    break
                }

                const preferredFacingMode = settings1?.facingMode ?? ""
                const label = device.label.toLowerCase()

                if (preferredFacingMode === 'environment' && label.split(/\s+/).includes('back')) {
                    const isIphoneMacroCamera = isAppleMobileDevice() && macroModeCameraLabels.includes(device.label)

                    // check if the device is not an iPhone macro camera and not a rejected camera (telephoto, ultra wide)
                    if (!isIphoneMacroCamera && !rejectedCameraLabels.some(l => device.label.split(/\s+/).includes(l))) {
                        deviceId = device.deviceId
                        console.log("WebcamPlugin: Found suitable camera:", device.label)
                        break
                    }
                }

                if (preferredFacingMode === "user" && label.split(/\s+/).includes('front')) {
                    deviceId = device.deviceId
                    console.log("WebcamPlugin: Found suitable front camera:", device.label)
                    break
                }
            }
        }

        const stream = await this.startStream(deviceId, settings1, false)
        if (!stream) return null

        const video = videoElementCancelCallbackPolyfill(document.createElement('video'))
        video.id = 'webcam-' + id
        video.autoplay = true
        video.muted = true
        video.playsInline = true
        video.loop = true
        video.srcObject = stream

        video.style.boxSizing = 'border-box'
        await timeout(100) // for ios?
        const tracks = stream.getVideoTracks()
        const res = await video.play().then(() => true).catch(e => {
            this._viewer?.console.error('Failed to play video', e)
            this.dispatchEvent({ type: 'mediaDevicesError', error: e })
            return false
        })
        if (!res) {
            await this.stopStream(deviceId, false)
            return null
        }
        if (!tracks.length) {
            this._viewer?.console.error('Failed to get video track')
            this.dispatchEvent({ type: 'mediaDevicesError', error: new Error('Failed to get video track') })
            return null
        }
        const track = tracks[0]
        const settings = track.getSettings()

        if (settings.width) video.width = settings.width
        if (settings.height) video.height = settings.height
        const texture = new VideoTexture(video)
        texture.needsUpdate = true;

        if (settings.deviceId && settings.deviceId !== deviceId) {
            if (deviceId) this._viewer?.console.error('Stream deviceId mismatch:', settings.deviceId, deviceId)
            deviceId = settings.deviceId
        }
        let deviceInfo = this.devicesData.find(d => d.deviceId === deviceId)
        if (!deviceInfo) {
            this.devicesData.push({
                deviceId: deviceId,
                label: `Unnamed device ${this.devicesData.length + 1}`,
                groupId: '',
                capabilities: (typeof track.getCapabilities === "function") ? track.getCapabilities() : {},
                constraints: (typeof track.getConstraints === "function") ? track.getConstraints() : {},
                settings
            })
            deviceInfo = this.devicesData[this.devicesData.length - 1]
        } else {
            // Update device info with capabilities and settings
            deviceInfo.capabilities = (typeof track.getCapabilities === "function") ? track.getCapabilities() : {}
            deviceInfo.constraints = (typeof track.getConstraints === "function") ? track.getConstraints() : {}
            deviceInfo.settings = settings
        }
        return { deviceId, deviceInfo, stream, video, track, settings, texture }
    }

    async stopVideo(id: string) {
        const videoFeed = this.videos[id]
        if (!videoFeed) {
            this._viewer?.console.error('Video feed not found:', id)
            return null
        }
        videoFeed.video.pause()
        videoFeed.video.srcObject = null
        videoFeed.video.remove()
        videoFeed.texture.dispose()
        await this.stopStream(videoFeed.deviceId, false)
        delete this.videos[id]
        this.dispatchEvent({ type: 'stopVideo', id })
        this.refreshUi()
        return true
    }

    refreshVideoTexture(id: string) {
        const videoFeed = this.videos[id]
        if (!videoFeed || !videoFeed.texture) {
            this._viewer?.console.error('Video feed or texture not found:', id)
            return null
        }
        if (videoFeed.view.mode === 'screen') {
            videoFeed.view.width = window.innerWidth
            videoFeed.view.height = window.innerHeight
        } else if (videoFeed.view.mode === 'viewer') {
            videoFeed.view.width = this._viewer?.canvas.clientWidth || window.innerWidth
            videoFeed.view.height = this._viewer?.canvas.clientHeight || window.innerHeight
        } else if (videoFeed.view.mode === 'auto') {
            videoFeed.view.width = videoFeed.video.width
            videoFeed.view.height = videoFeed.video.height
        } else if (videoFeed.view.mode === 'manual') {
            // do nothing
        }
        videoFeed.textureScale = this._updateTextureTransform(videoFeed.texture, videoFeed.view)
        return videoFeed.texture
    }

    protected _updateTextureTransform(texture: VideoTexture | CanvasTexture, view: WebCameraVideoFeed['view']) {
        const videoHeight = Math.floor(texture.image.height);
        const videoWidth = Math.floor(texture.image.width);
        const canvasWidth = Math.floor(view.width);
        const canvasHeight = Math.floor(view.height);

        const videoAspect = videoWidth / videoHeight;
        const canvasAspect = canvasWidth / canvasHeight;

        let newWidth = canvasWidth;
        let newHeight = canvasHeight;

        if (videoAspect > canvasAspect) newWidth = Math.floor(canvasHeight * videoAspect);
        else newHeight = Math.floor(canvasWidth / videoAspect);

        // Modify the scale factors for the texture by zoom level.
        const textureScaleX = 1 / (newWidth / canvasWidth) / (view.scale || 1);
        const textureScaleY = 1 / (newHeight / canvasHeight) / (view.scale || 1);

        // Offset values to ensure the texture is centered on the canvas.
        const offsetX = (1 - textureScaleX) / 2;
        const offsetY = (1 - textureScaleY) / 2;

        texture.repeat.set(textureScaleX, textureScaleY);
        texture.offset.set(offsetX, offsetY);
        texture.updateMatrix();
        return [textureScaleX, textureScaleY] as [number, number];
    }

}