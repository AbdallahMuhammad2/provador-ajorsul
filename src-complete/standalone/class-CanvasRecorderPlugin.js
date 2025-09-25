/* Standalone Class: CanvasRecorderPlugin */

class CanvasRecorderPlugin extends AViewerPlugin {
    get recorder() {
        return this._recorder
    }
    constructor() {
        super(),
        this.enabled = !0,
        this.convergeMode = !0,
        this.mimeType = "video/mp4",
        this.videoFrameRate = 30,
        this._recorders = {},
        this._renderToScreenDisabled = !1,
        this._preRender = () => {
            var o, c, h;
            if (this.convergeMode && (!((o = this._recorder) === null || o === void 0) && o.isRecording())) {
                const _ = this._viewer.renderer.composer.renderToScreen;
                this._viewer.renderer.composer.renderToScreen = ((h = (c = this._viewer) === null || c === void 0 ? void 0 : c.getPluginByType("Progressive")) === null || h === void 0 ? void 0 : h.isConverged()) || !1,
                _ && !this._viewer.renderer.composer.renderToScreen && (this._renderToScreenDisabled = !0)
            }
        }
        ,
        this._postRender = () => {
            var o, c, h;
            if (!((o = this._recorder) === null || o === void 0) && o.isRecording() && (!this.convergeMode || !((h = (c = this._viewer) === null || c === void 0 ? void 0 : c.getPluginByType("Progressive")) === null || h === void 0) && h.isConverged(!0))) {
                const _ = () => {
                    var b;
                    return (b = this._recorder) === null || b === void 0 ? void 0 : b.requestFrame()
                }
                ;
                this.convergeMode ? X$2(1).then(_) : _()
            }
            this._renderToScreenDisabled && (this._viewer.renderer.composer.renderToScreen = !0)
        }
        ,
        this._refreshUi = () => {
            var o;
            (o = this.uiConfig.children) === null || o === void 0 || o.map(c => Ee$1(c)).flat(2).forEach(c => {
                var h;
                return (h = c == null ? void 0 : c.uiRefresh) === null || h === void 0 ? void 0 : h.call(c)
            }
            )
        }
        ,
        this.endPaddingMs = 500,
        this._turntableAnimationAngle = 360,
        this._turntableAnimationDuration = 5,
        this._turntableAnimationEasing = "linear",
        this.uiConfig = {
            type: "folder",
            label: "Video Export",
            children: [{
                type: "slider",
                label: "Frame Rate",
                bounds: [1, 60],
                stepSize: 1,
                property: [this, "videoFrameRate"]
            }, {
                type: "checkbox",
                property: [this, "convergeMode"],
                onChange: () => {
                    var o, c;
                    return (c = (o = this.uiConfig).uiRefresh) === null || c === void 0 ? void 0 : c.call(o, "postFrame", !0)
                }
            }, {
                type: "dropdown",
                label: "Mime type",
                property: [this, "mimeType"],
                children: [["Auto Video (x264)", "auto"], ["PNG sequence", "image/png"], ["JPEG sequence", "image/jpeg"], ["WEBP sequence", "image/webp"], ["MP4 Video (ffmpeg)", "video/mp4"]].map(o => ({
                    label: o[0],
                    value: o[1]
                }))
            }, generateUiFolder("FFmpeg Options (Advanced)", () => this._recorder.ffmpegOptions, {}, "folder", !0), {
                type: "input",
                disabled: !0,
                label: "State",
                getValue: () => {
                    var o, c;
                    return (c = (o = this.recorder) === null || o === void 0 ? void 0 : o.state) !== null && c !== void 0 ? c : "not initialized"
                }
            }, {
                type: "button",
                label: () => this.isRecording() ? "Stop Recording" : "Start Recording",
                hidden: () => !this.isRecording() && this.convergeMode,
                value: () => {
                    this.isRecording() ? this.stopRecording().then(async o => {
                        if (o) {
                            const c = o.type.split(";")[0].split("/").pop() || "mp4";
                            await this._downloadBlob(o, c)
                        }
                    }
                    ) : this.startRecording()
                }
            }, {
                type: "button",
                label: "Record Camera Views",
                hidden: () => {
                    var o;
                    return this.isRecording() || !(!((o = this._viewer) === null || o === void 0) && o.getPluginByType("CameraViews"))
                }
                ,
                value: () => {
                    var o, c;
                    (c = (o = this._viewer) === null || o === void 0 ? void 0 : o.getPluginByType("CameraViews")) === null || c === void 0 || c.recordAllViews()
                }
            }, {
                type: "button",
                label: "Record Camera Views + GLTF Anim",
                hidden: () => {
                    var o, c, h;
                    return this.isRecording() || !(!((o = this._viewer) === null || o === void 0) && o.getPluginByType("CameraViews")) || !(!((h = (c = this._viewer) === null || c === void 0 ? void 0 : c.getPluginByType("GLTFAnimation")) === null || h === void 0) && h.animations.length)
                }
                ,
                value: () => {
                    var o, c, h, _;
                    const b = ((c = (o = this._viewer) === null || o === void 0 ? void 0 : o.getPluginByType("GLTFAnimation")) === null || c === void 0 ? void 0 : c.animationState) === "playing";
                    (_ = (h = this._viewer) === null || h === void 0 ? void 0 : h.getPluginByType("CameraViews")) === null || _ === void 0 || _.recordAllViews( () => {
                        var _e, nt;
                        (nt = (_e = this._viewer) === null || _e === void 0 ? void 0 : _e.getPluginByType("GLTFAnimation")) === null || nt === void 0 || nt.playAnimation()
                    }
                    ).then( () => {
                        var _e, nt;
                        b || (nt = (_e = this._viewer) === null || _e === void 0 ? void 0 : _e.getPluginByType("GLTFAnimation")) === null || nt === void 0 || nt.stopAnimation()
                    }
                    )
                }
            }, {
                type: "button",
                label: "Record GLTF Anim",
                hidden: () => {
                    var o, c;
                    return this.isRecording() || !(!((c = (o = this._viewer) === null || o === void 0 ? void 0 : o.getPluginByType("GLTFAnimation")) === null || c === void 0) && c.animations.length)
                }
                ,
                value: async () => {
                    var o;
                    if (this.isRecording())
                        return;
                    const c = (o = this._viewer) === null || o === void 0 ? void 0 : o.getPluginByType("GLTFAnimation");
                    if (!c)
                        return;
                    let h = !1;
                    c.loopAnimations && (h = !0),
                    h && (c.loopAnimations = !1);
                    const _ = await this.record(async () => c.playAnimation());
                    if (h && (c.loopAnimations = !0),
                    _) {
                        const b = _.type.split(";")[0].split("/").pop() || "mp4";
                        await this._downloadBlob(_, b)
                    }
                }
            }, {
                type: "number",
                label: "Turntable animation angle",
                disabled: () => this.isRecording(),
                property: [this, "_turntableAnimationAngle"]
            }, {
                type: "number",
                label: "Turntable animation time (sec)",
                disabled: () => this.isRecording(),
                property: [this, "_turntableAnimationDuration"]
            }, {
                type: "dropdown",
                label: "Turntable animation ease",
                children: Object.keys(EasingFunctions).map(o => ({
                    label: o
                })),
                disabled: () => this.isRecording(),
                property: [this, "_turntableAnimationEasing"]
            }, {
                type: "button",
                label: "Record turntable animation",
                hidden: () => this.isRecording(),
                value: async () => this.download360Recording(this._turntableAnimationDuration, !1, this._turntableAnimationAngle, EasingFunctions[this._turntableAnimationEasing])
            }, {
                type: "button",
                label: "Record turntable animation (CCW)",
                hidden: () => this.isRecording(),
                value: async () => this.download360Recording(this._turntableAnimationDuration, !0, this._turntableAnimationAngle, EasingFunctions[this._turntableAnimationEasing])
            }, {
                type: "number",
                label: "After recording wait time (ms)",
                disabled: () => this.isRecording(),
                property: [this, "endPaddingMs"]
            }]
        },
        this.refreshRecorderOptions = this.refreshRecorderOptions.bind(this)
    }
    isRecording() {
        var o, c;
        return (c = (o = this._recorder) === null || o === void 0 ? void 0 : o.isRecording()) !== null && c !== void 0 && c
    }
    refreshRecorderOptions() {
        var o, c;
        if (!this._viewer)
            return;
        let h = "image";
        this.mimeType === "video/mp4" ? h = "ffmpeg.js" : this.mimeType === "auto" ? h = "canvas-media" : this.mimeType.startsWith("image") && (h = "image"),
        this._recorder = this._getRecorder(h),
        this._recorder && (this._recorder.setOptions({
            frameRate: this.videoFrameRate,
            mimeType: this.mimeType,
            stepMode: this.convergeMode,
            internalMimeType: this.internalMimeType
        }),
        (c = (o = this.uiConfig).uiRefresh) === null || c === void 0 || c.call(o, "postFrame", !0))
    }
    async onAdded(o) {
        var c;
        await super.onAdded(o),
        o.addEventListener("preRender", this._preRender),
        o.addEventListener("postRender", this._postRender),
        o.scene.addEventListener("addSceneObject", this._refreshUi),
        this._recordIndicator = document.createElement("div"),
        this._recordIndicator.style.width = "20px",
        this._recordIndicator.style.height = "20px",
        this._recordIndicator.style.backgroundColor = "red",
        this._recordIndicator.style.top = "10px",
        this._recordIndicator.style.left = "10px",
        this._recordIndicator.style.position = "absolute",
        this._recordIndicator.style.borderRadius = "100%",
        this._recordIndicator.style.visibility = "hidden",
        (c = o.canvas.parentElement) === null || c === void 0 || c.appendChild(this._recordIndicator),
        this.refreshRecorderOptions()
    }
    _stateChange(o) {
        var c, h;
        this.dirty = o,
        (c = this._viewer) === null || c === void 0 || c.setDirty(),
        (h = this.uiConfig.children) === null || h === void 0 || h.map(_ => Ee$1(_)).flat(2).forEach(_ => {
            var b;
            return (b = _ == null ? void 0 : _.uiRefresh) === null || b === void 0 ? void 0 : b.call(_)
        }
        )
    }
    async onRemove(o) {
        var c;
        return o.removeEventListener("preRender", this._preRender),
        o.removeEventListener("preRender", this._postRender),
        o.scene.removeEventListener("addSceneObject", this._refreshUi),
        (c = this._recorder) === null || c === void 0 || c.dispose(),
        Object.values(this._recorders).forEach(h => {
            h == null || h.dispose()
        }
        ),
        super.onRemove(o)
    }
    async record(o, c) {
        var h, _;
        if (!this.enabled || !((h = this._recorder) === null || h === void 0) && h.isRecording())
            return;
        const b = (_ = this._viewer) === null || _ === void 0 ? void 0 : _.getPluginByType("Progressive")
          , _e = b == null ? void 0 : b.maxFrameCount;
        b && this.convergeMode && (b.maxFrameCount = Math.min(16, _e ?? 16)),
        await new Promise( (it, at) => {
            const ut = () => {
                this.removeEventListener("start", pt),
                this.removeEventListener("stop", ut),
                this.removeEventListener("error", ht)
            }
              , pt = async () => {
                ut(),
                c == null || c(),
                await o(),
                it()
            }
              , ht = async () => {
                ut(),
                at()
            }
            ;
            this.addEventListener("start", pt),
            this.addEventListener("stop", ut),
            this.addEventListener("error", ht),
            this.startRecording()
        }
        );
        const nt = await this.stopRecording();
        return b && this.convergeMode && (b.maxFrameCount = _e ?? 16),
        nt
    }
    startRecording() {
        var o;
        return !!this.enabled && ((o = this.recorder) === null || o === void 0 ? void 0 : o.isRecording()) === !1 && (this.recorder.options.stepMode = this.convergeMode,
        this.recorder.start(),
        !0)
    }
    async stopRecording() {
        var o, c;
        if (!((o = this.recorder) === null || o === void 0) && o.isRecording() && this._viewer) {
            if (await this._viewer.doOnce("postFrame"),
            this.convergeMode) {
                const h = (c = this._viewer) === null || c === void 0 ? void 0 : c.getPluginByType("Progressive");
                if (h)
                    for (let b = 0; b < 10 && !h.isConverged(!0); b++)
                        await this._viewer.doOnce("postFrame")
            }
            return this.endPaddingMs && await X$2(this.endPaddingMs),
            new Promise( (h, _) => {
                var b;
                return (b = this.recorder) === null || b === void 0 ? void 0 : b.stop(h)
            }
            )
        }
    }
    async _downloadBlob(o, c) {
        var h, _, b;
        const _e = await ((h = this._viewer) === null || h === void 0 ? void 0 : h.prompt("Canvas Recorder: Save file as", "recording.mp4", !1))
          , nt = (_ = this._viewer) === null || _ === void 0 ? void 0 : _.getPluginByType("FileTransferPlugin");
        nt ? await nt.exportFile(o, _e || "recording.mp4") : (b = this._viewer) === null || b === void 0 || b.console.error("FileTransferPlugin required to export/download file")
    }
    async download360Recording(o=null, c=!1, h=360, _) {
        var b;
        if (!((b = this.recorder) === null || b === void 0) && b.isRecording() || !this._viewer)
            return;
        const _e = o || await this._viewer.prompt("Enter duration in seconds", "5", !0);
        if (_e === null)
            return;
        const nt = parseFloat(_e || "5");
        if (!isFinite(nt) || nt <= 0)
            return;
        const it = await this.recordCamera360(nt, c, h, _);
        if (it) {
            const at = it.type.split(";")[0].split("/").pop() || "mp4";
            await this._downloadBlob(it, at)
        }
    }
    async recordCamera360(o, c=!1, h=360, _) {
        var b;
        if (!((b = this.recorder) === null || b === void 0) && b.isRecording() || !this._viewer)
            return;
        const _e = this._viewer.scene.activeCamera;
        let nt = _e.interactionsEnabled
          , it = 0;
        for (; !(nt || (this._viewer.setDirty(),
        await this._viewer.doOnce("postFrame"),
        it % 30 == 0 && this._viewer.console.warn("CanvasRecorderPlugin: interactions are already disabled by something, waiting..."),
        nt = _e.interactionsEnabled,
        it > 5e3 / 30)); )
            it++;
        _e.setInteractions(!1, CanvasRecorderPlugin.PluginType);
        const at = _e.target.clone()
          , ut = _e.position.clone().sub(at)
          , pt = await this._viewer.getPluginByType("PopmotionPlugin");
        if (!pt)
            return void console.error("Popmotion plugin not found");
        const ht = new three_module.YHV().setFromVector3(ut);
        _e.position.setFromSpherical(ht).add(at),
        _e.positionUpdated(!0);
        const _t = _e.autoLookAtTarget;
        _e.autoLookAtTarget = !0;
        const vt = ht.theta
          , bt = await this.record(async () => pt.animate({
            from: vt,
            to: vt + (c ? -1 : 1) * h * Math.PI / 180,
            duration: 1e3 * o,
            ease: _ ?? EasingFunctions.linear,
            onUpdate: St => {
                ht.theta = St,
                _e.position.setFromSpherical(ht).add(at),
                _e.positionUpdated(!0)
            }
            ,
            onComplete: async () => {
                ht.theta = vt,
                _e.position.setFromSpherical(ht).add(at),
                _e.positionUpdated(!0)
            }
        }).promise);
        return _e.autoLookAtTarget = _t,
        _e.position.copy(ut).add(at),
        _e.positionUpdated(!0),
        _e.setInteractions(!0, CanvasRecorderPlugin.PluginType),
        bt
    }
    _getRecorder(o) {
        if (!this._viewer)
            throw new Error("No viewer");
        if (this._recorders[o])
            return this._recorders[o];
        let c;
        return c = o === "canvas-media" ? new CanvasMediaRecorder(this._viewer.canvas,{
            frameRate: this.videoFrameRate,
            mimeType: this.mimeType
        }) : o === "ffmpeg.js" ? new FFMPEGRecorder(this._viewer.canvas,{
            frameRate: this.videoFrameRate,
            mimeType: this.mimeType
        }) : new ImageSequenceRecorder(this._viewer.canvas,{
            frameRate: this.videoFrameRate,
            mimeType: this.mimeType
        }),
        c.addEventListener("starting", () => this._stateChange(!1)),
        c.addEventListener("recording", () => {
            this._recordIndicator.style.visibility = "visible",
            this._recordIndicator.style.backgroundColor = "red",
            this.dispatchEvent({
                type: "start"
            }),
            this._stateChange(!this.convergeMode)
        }
        ),
        c.addEventListener("error", () => {
            this.dispatchEvent({
                type: "error"
            })
        }
        ),
        c.addEventListener("paused", () => this._stateChange(!1)),
        c.addEventListener("stopped", () => {
            this._recordIndicator.style.visibility = "hidden",
            this.dispatchEvent({
                type: "stop"
            }),
            this._stateChange(!1)
        }
        ),
        c.addEventListener("encode-progress", h => {
            this.dispatchEvent({
                ...h
            })
        }
        ),
        this._recorders[o] = c,
        c
    }
}

export default CanvasRecorderPlugin;
