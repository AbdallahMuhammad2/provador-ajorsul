/* Standalone Class: CameraViewPlugin */

class CameraViewPlugin extends AViewerPlugin {
    get animationLooping() {
        return this._animationLooping
    }
    get animating() {
        return this._animating
    }
    constructor() {
        super(),
        this.enabled = !0,
        this._cameraViews = [],
        this.viewLooping = !1,
        this.viewPauseTime = 200,
        this.animEase = "easeInOutSine",
        this.animDuration = 1e3,
        this.rotationOffset = .25,
        this.interpolateMode = "spherical",
        this.splineCurve = "chordal",
        this.animateOnScroll = !1,
        this.seekOnScroll = !1,
        this._animating = !1,
        this.dependencies = [],
        this._scrollAnimationState = 0,
        this.scrollAnimationDamping = .1,
        this._updaters = [],
        this._lastFrameTime = 0,
        this._fadeDisabled = !1,
        this._viewQueue = [],
        this._animationLooping = !1,
        this._infiniteLooping = !0,
        this._driver = o => ({
            start: () => this._updaters.push({
                u: o,
                time: 0
            }),
            stop: () => this._updaters.splice(this._updaters.findIndex(c => c.u === o), 1)
        }),
        this.focusNext = (o=!0) => {
            if (this._animating || this._cameraViews.length < 2)
                return;
            let c = this._cameraViews.findIndex(h => h === this._currentView);
            c < 0 && (c = -1),
            c += 1,
            o ? c %= this._cameraViews.length : c = Math.min(c, this._cameraViews.length - 1),
            this.focusView(this._cameraViews[c])
        }
        ,
        this.focusPrevious = (o=!0) => {
            if (this._animating || this._cameraViews.length < 2 || !this._currentView)
                return;
            let c = this._cameraViews.findIndex(h => h === this._currentView);
            c < 0 && (c = 0),
            c -= 1,
            c = o ? (c + this._cameraViews.length) % this._cameraViews.length : Math.max(c, 0),
            this.focusView(this._cameraViews[c])
        }
        ,
        this._popAnimations = [],
        this.uiConfig = {
            type: "folder",
            label: "Camera Views",
            children: [ () => [...this._cameraViews.map(o => o.uiConfig)], ...generateUiConfig(this)]
        },
        this.addCurrentView = this.addCurrentView.bind(this),
        this.animateAllViews = this.animateAllViews.bind(this),
        this.recordAllViews = this.recordAllViews.bind(this),
        this.resetToFirstView = this.resetToFirstView.bind(this),
        this._wheel = this._wheel.bind(this),
        this._pointerMove = this._pointerMove.bind(this),
        this._postFrame = this._postFrame.bind(this)
    }
    get camViews() {
        return this._cameraViews
    }
    _wheel(o) {
        this.enabled && (this.seekOnScroll && !this._animating || Math.abs(o.deltaY) > .001 && (this._scrollAnimationState = -1 * Math.sign(o.deltaY)))
    }
    _pointerMove(o) {
        var c;
        if (this.enabled && !this._animating && this.seekOnScroll) {
            const h = (c = this._viewer) === null || c === void 0 ? void 0 : c.scene.activeCamera;
            if (!h)
                return;
            const _ = new three_module.YHV
              , b = h.position
              , _e = h.target
              , nt = new three_module.PTz().setFromUnitVectors(h.cameraObject.up, new three_module.Pq0(0,1,0))
              , it = nt.clone().invert()
              , at = b.clone().sub(_e);
            at.applyQuaternion(nt),
            _.setFromVector3(at),
            _.theta += this.rotationOffset * o.movementX / this._viewer.canvas.clientWidth,
            _.phi += this.rotationOffset * o.movementY / this._viewer.canvas.clientHeight,
            _.makeSafe(),
            at.setFromSpherical(_),
            at.applyQuaternion(it),
            b.copy(_e).add(at),
            h.positionUpdated(!1),
            h.targetUpdated()
        }
    }
    async onAdded(o) {
        await super.onAdded(o),
        o.addEventListener("preFrame", c => {
            this.seekOnScroll || this._animating ? this._viewer.scene.activeCamera.setInteractions(!1, CameraViewPlugin.PluginType) : this._viewer.scene.activeCamera.setInteractions(!0, CameraViewPlugin.PluginType)
        }
        ),
        o.addEventListener("postFrame", this._postFrame),
        window.addEventListener("wheel", this._wheel),
        window.addEventListener("pointermove", this._pointerMove)
    }
    _postFrame() {
        var o, c;
        if (!this._viewer)
            return;
        if (!this.enabled || !this._animating)
            return this._lastFrameTime = 0,
            void (this._fadeDisabled && ((o = this._viewer.getPluginByType("FrameFade")) === null || o === void 0 || o.enable(CameraViewPlugin.PluginType),
            this._fadeDisabled = !1));
        const h = g() / 1e3;
        this._lastFrameTime < 1 && (this._lastFrameTime = h - 1 / 60);
        let _ = h - this._lastFrameTime;
        this._lastFrameTime = h,
        _ *= this.animateOnScroll ? this._scrollAnimationState : 1;
        const b = (c = this._viewer.getPluginByType("Progressive")) === null || c === void 0 ? void 0 : c.postFrameConvergedRecordingDelta();
        if (b && b > 0 && (_ = b),
        b !== 0 && (_ *= 1e3,
        !(_ <= 0 || (this._updaters.forEach(_e => {
            let nt = _;
            _e.time + nt < 0 && (nt = -_e.time),
            _e.time += nt,
            Math.abs(nt) > .001 && _e.u(nt)
        }
        ),
        this._scrollAnimationState < .001 ? this._scrollAnimationState = 0 : this._scrollAnimationState *= 1 - this.scrollAnimationDamping,
        this._fadeDisabled)))) {
            const _e = this._viewer.getPluginByType("FrameFade");
            _e && (_e.disable(CameraViewPlugin.PluginType),
            this._fadeDisabled = !0)
        }
    }
    async onRemove(o) {
        return o.removeEventListener("postFrame", this._postFrame),
        window.removeEventListener("wheel", this._wheel),
        window.removeEventListener("pointermove", this._pointerMove),
        super.onRemove(o)
    }
    async _animationLoop() {
        if (!this._animationLooping) {
            for (this._animationLooping = !0; (this.viewLooping || !this._infiniteLooping) && this.enabled && !(this._cameraViews.length < 1); ) {
                if (this._viewQueue.length === 0) {
                    if (!this._infiniteLooping)
                        break;
                    this._viewQueue.push(...this._cameraViews)
                }
                await this.animateToView(this._viewQueue.shift()),
                await X$2(2 + this.viewPauseTime)
            }
            this._animationLooping = !1
        }
    }
    async animateAllViews() {
        if (this.enabled && !(this.viewLooping || this._cameraViews.length < 2)) {
            for (; this._viewQueue.length > 0; )
                this._viewQueue.pop();
            this._viewQueue.push(...this._cameraViews),
            this._viewQueue.push(this._viewQueue.shift()),
            this._infiniteLooping = !1,
            await this._animationLoop(),
            this._infiniteLooping = !0
        }
    }
    async resetToFirstView(o=100) {
        this.enabled && (this._currentView = void 0,
        await this.animateToView(this._cameraViews[0], o),
        await X$2(2))
    }
    async recordAllViews(o, c=!0) {
        var h;
        if (!this.enabled)
            return;
        const _ = (h = this._viewer) === null || h === void 0 ? void 0 : h.getPluginByType("CanvasRecorder");
        if (!_ || !_.enabled || this._cameraViews.length < 1)
            return;
        if (_.isRecording())
            return void console.error("CanvasRecorderPlugin is already recording");
        let b = !1;
        return this.viewLooping && (b = !0,
        this.viewLooping = !1),
        await this.resetToFirstView(),
        new Promise( (_e, nt) => {
            const it = () => {
                _.removeEventListener("start", at),
                _.removeEventListener("stop", it),
                _.removeEventListener("error", ut)
            }
              , at = async () => {
                var pt;
                it(),
                o == null || o(),
                await this.animateAllViews();
                const ht = await _.stopRecording();
                if (b && (this.viewLooping = !0),
                c) {
                    const _t = await ((pt = this._viewer) === null || pt === void 0 ? void 0 : pt.prompt("Canvas Recorder: Save file as", "recording.mp4"));
                    _t !== null && ht && await this._downloadBlob(ht, _t || "recording.mp4")
                }
                _e(ht)
            }
              , ut = async () => {
                it(),
                nt()
            }
            ;
            _.addEventListener("start", at),
            _.addEventListener("stop", it),
            _.addEventListener("error", ut),
            _.startRecording() || console.error("cannot start recording")
        }
        )
    }
    async addCurrentView() {
        if (!this.enabled)
            return;
        const o = this.getCurrentCameraView();
        this.addView(o)
    }
    addView(o) {
        var c, h;
        this._cameraViews.push(o),
        (h = (c = this.uiConfig).uiRefresh) === null || h === void 0 || h.call(c),
        this.dispatchEvent({
            type: "viewAdd",
            view: o
        })
    }
    getCurrentCameraView(o, c=!0, h) {
        var _, b, _e;
        if (o || (o = (_ = this._viewer) === null || _ === void 0 ? void 0 : _.scene.activeCamera),
        !o)
            return new CameraView;
        const nt = new three_module.Pq0;
        o.cameraObject.updateWorldMatrix(!0, !1);
        const it = o.cameraObject.matrixWorld;
        nt.x = it.elements[4],
        nt.y = it.elements[5],
        nt.z = it.elements[6],
        nt.normalize();
        const at = o.target.clone()
          , ut = o.position.clone()
          , pt = o.cameraObject.parent;
        pt && (c ? ut.applyMatrix4(pt.matrixWorld) : nt.transformDirection(pt.matrixWorld.clone().invert()));
        const ht = c ? o.cameraObject.getWorldQuaternion(new three_module.PTz) : o.cameraObject.quaternion.clone();
        return h ? (h.position.copy(ut),
        h.target.copy(at),
        h.up.copy(nt),
        h.quaternion.copy(ht)) : ((h = new CameraView(ut,at,nt,ht,1)).focusView = async () => h && this.focusView(h),
        h.deleteView = () => h && this.deleteView(h),
        h.updateView = () => this.getCurrentCameraView(o, c, h)),
        (_e = (b = h.uiConfig).uiRefresh) === null || _e === void 0 || _e.call(b, "postFrame", !0),
        h
    }
    setCurrentCameraView(o) {
        var c;
        const h = (c = this._viewer) === null || c === void 0 ? void 0 : c.scene.activeCamera;
        h && (h.position.copy(o.position),
        h.target.copy(o.target),
        h.cameraObject.quaternion.copy(o.quaternion),
        h.positionUpdated())
    }
    async focusView(o) {
        return this.animateToView(o)
    }
    deleteView(o) {
        var c, h;
        const _ = this._cameraViews.indexOf(o);
        _ >= 0 && this._cameraViews.splice(_, 1),
        (h = (c = this.uiConfig).uiRefresh) === null || h === void 0 || h.call(c),
        this.dispatchEvent({
            type: "viewDelete",
            view: o
        })
    }
    async stopAllAnimations() {
        for (this.viewLooping = !1,
        this._popAnimations.forEach(o => {
            var c;
            return (c = o == null ? void 0 : o.stop) === null || c === void 0 ? void 0 : c.call(o)
        }
        ),
        this._popAnimations = []; this._animating || this._animationLooping; )
            await X$2(100)
    }
    async animateToView(o, c, h, _=!1) {
        var b, _e, nt;
        const it = (b = this._viewer) === null || b === void 0 ? void 0 : b.scene.activeCamera;
        if (!it)
            return;
        if (this._animating) {
            this._popAnimations.forEach(At => (At == null ? void 0 : At.stop) && At.stop()),
            this._popAnimations = [];
            let St = 0;
            for (; this._animating && (await X$2(100),
            !(St++ > 20)); )
                ;
            if (this._animating)
                return void console.warn("Unable to stop all animations, maybe because of viewLooping?")
        }
        const at = (_e = this._viewer) === null || _e === void 0 ? void 0 : _e.getPlugin(InteractionPromptPlugin);
        at && at.animationRunning && await at.stopAnimation({
            reset: !0
        }),
        this._currentView = o,
        this._animating = !0,
        this.dispatchEvent({
            type: "startViewChange",
            view: o
        }),
        c === void 0 && (c = this.animDuration),
        c = Math.max(10, c);
        const ut = typeof h == "function" ? h : EasingFunctions[h || this.animEase]
          , pt = this._driver
          , ht = [];
        this._popAnimations = [];
        const _t = this._popAnimations
          , vt = this.camViews.indexOf(o);
        let bt = this.interpolateMode;
        if (vt < 0 && bt === "spline" && (console.warn("CameraViewPlugin - Cannot animate along a spline with external camera view, fallback to spherical"),
        bt = "spherical"),
        bt === "spherical")
            ht.push(animateCameraToViewSpherical(it, o, c * o.duration, ut, pt, _t));
        else if (bt === "linear") {
            ht.push(animateAsync({
                from: it.position.clone(),
                to: o.position.clone(),
                duration: c * o.duration,
                ease: ut,
                driver: pt,
                onUpdate: Et => it.position = Et,
                onComplete: () => it.position = o.position,
                onStop: () => {
                    throw new Error("Animation stopped")
                }
            }, _t)),
            ht.push(animateAsync({
                from: it.target.clone(),
                to: o.target.clone(),
                duration: c * o.duration,
                ease: ut,
                driver: pt,
                onUpdate: Et => {
                    it.target = Et,
                    it.targetUpdated()
                }
                ,
                onComplete: () => {
                    it.target = o.target,
                    it.targetUpdated()
                }
            }, _t));
            const St = it.cameraObject.quaternion.clone()
              , At = new three_module.PTz;
            ht.push(animateAsync({
                from: 0,
                to: 1,
                duration: c * o.duration,
                ease: ut,
                driver: pt,
                onUpdate: Et => {
                    At.copy(St).slerp(o.quaternion, Et),
                    it.cameraObject.quaternion.copy(At),
                    it.cameraObject.updateProjectionMatrix()
                }
                ,
                onComplete: () => {
                    it.cameraObject.quaternion.copy(o.quaternion),
                    it.cameraObject.updateProjectionMatrix()
                }
            }, _t))
        } else if (bt === "spline") {
            const St = this.camViews.map(Pt => Pt.position.clone())
              , At = new three_module.B6O(St,!0,this.splineCurve,.75)
              , Et = Pt => {
                const It = new three_module.Pq0
                  , Dt = 1 / St.length
                  , Gt = ((vt === 0 ? St.length : vt) - 1) * Dt;
                return At.getPointAt(Gt + Pt * Dt, It),
                It
            }
            ;
            ht.push(animateAsync({
                from: 0,
                to: 1,
                duration: c * o.duration,
                ease: ut,
                driver: pt,
                onUpdate: Pt => it.position = Et(Pt),
                onComplete: () => it.position = Et(1),
                onStop: () => {
                    throw new Error("Animation stopped")
                }
            }, _t)),
            ht.push(animateAsync({
                from: it.target.clone(),
                to: o.target.clone(),
                duration: c * o.duration,
                ease: ut,
                driver: pt,
                onUpdate: Pt => {
                    it.target = Pt,
                    it.targetUpdated()
                }
                ,
                onComplete: () => {
                    it.target = o.target,
                    it.targetUpdated()
                }
            }, _t))
        }
        await Promise.allSettled(ht).catch(St => {
            if (_)
                throw St
        }
        ),
        (nt = this._viewer) === null || nt === void 0 || nt.setDirty(),
        this._animating = !1,
        this.dispatchEvent({
            type: "viewChange",
            view: o
        }),
        await X$2(10)
    }
    fromJSON(o, c) {
        var h, _;
        return this._cameraViews.forEach(b => this.deleteView(b)),
        super.fromJSON(o, c) ? (this._cameraViews.forEach(b => b.focusView = async () => this.focusView(b)),
        this._cameraViews.forEach(b => b.deleteView = () => this.deleteView(b)),
        this._cameraViews.forEach(b => b.updateView = () => this.getCurrentCameraView(void 0, void 0, b)),
        (_ = (h = this.uiConfig).uiRefresh) === null || _ === void 0 || _.call(h),
        this) : null
    }
    async animateToObject(o, c=4, h, _, b={
        min: .5,
        max: 5
    }) {
        if (!this._viewer)
            return;
        const _e = new Box3B().expandByObject(o || this._viewer.scene.modelRoot.modelObject, !1, !0)
          , nt = _e.getCenter(new three_module.Pq0)
          , it = _e.getSize(new three_module.Pq0).length() / 2;
        await this.animateToTarget(Math.min(b.max, Math.max(b.min, it * c)), nt, h, _)
    }
    async animateToFitObject(o, c=1.5, h=1e3, _, b={
        min: .5,
        max: 50
    }) {
        if (!this._viewer)
            return;
        const _e = new Box3B().expandByObject(o || this._viewer.scene.modelRoot.modelObject, !1, !0)
          , nt = _e.getCenter(new three_module.Pq0)
          , it = this._viewer.scene.activeCamera.getFittingDistance(_e);
        await this.animateToTarget(Math.min(b.max, Math.max(b.min, it * c)), nt, h, _)
    }
    async animateToTarget(o, c, h, _) {
        const b = this.getCurrentCameraView();
        b.target.copy(c);
        const _e = new three_module.Pq0().subVectors(b.target, b.position).normalize();
        b.position.copy(_e.multiplyScalar(-o).add(b.target)),
        await this.animateToView(b, h, _)
    }
    async _downloadBlob(o, c) {
        var h, _;
        const b = (h = this._viewer) === null || h === void 0 ? void 0 : h.getPluginByType("FileTransferPlugin");
        b ? await b.exportFile(o, c) : (_ = this._viewer) === null || _ === void 0 || _.console.error("FileTransferPlugin required to export/download file")
    }
}

export default CameraViewPlugin;
