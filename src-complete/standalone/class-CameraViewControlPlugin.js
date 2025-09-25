/* Standalone Class: CameraViewControlPlugin */

class CameraViewControlPlugin extends AViewerPlugin {
    _onEnabledChanged1() {
        this._onEnabledChanged()
    }
    _onEnabledChanged() {
        this._viewer && (this._viewer.scene.activeCamera.interactionsEnabled = !this.enabled);
        const o = this._cameraViews.length;
        this._oldState = o < 2 ? 0 : three_module.cj9.clamp(this._currentState, 0, o - 1.001),
        this.enabled && this._animateCameraToView(),
        this.dispatchEvent({
            type: "enableChanged",
            enabled: this.enabled
        })
    }
    constructor(o=!0) {
        super(),
        this.enabled = !0,
        this.animEase = "easeInOutSine",
        this.interpolateMode = "spherical",
        this.enableDamping = !0,
        this.damping = .04,
        this.initAnimationTime = 1,
        this.dependencies = [CameraViewPlugin],
        this._currentState = 0,
        this._oldState = 0,
        this._overrideTime = 0,
        this._preFrame1 = c => {
            this._preFrame(c)
        }
        ,
        this.enabled = o,
        this._onEnabledChanged1 = this._onEnabledChanged1.bind(this)
    }
    get _cameraViews() {
        var o, c, h;
        return (h = (c = (o = this._viewer) === null || o === void 0 ? void 0 : o.getPlugin(CameraViewPlugin)) === null || c === void 0 ? void 0 : c.camViews) !== null && h !== void 0 ? h : []
    }
    setState(o) {
        this._currentState = o
    }
    async onAdded(o) {
        await super.onAdded(o),
        this.enabled && this._onEnabledChanged(),
        o.addEventListener("preFrame", this._preFrame1)
    }
    async onRemove(o) {
        return o.removeEventListener("preFrame", this._preFrame1),
        this.enabled = !1,
        super.onRemove(o)
    }
    _preFrame(o) {
        var c;
        if (!this.enabled)
            return;
        const h = this._cameraViews;
        if (h.length <= 1 || !this._overrideStartView && Math.abs(this._currentState - this._oldState) < .001)
            return;
        this.enableDamping ? this._oldState = three_module.cj9.lerp(this._oldState, this._currentState, this.damping) : this._oldState = this._currentState,
        this._oldState = three_module.cj9.clamp(this._oldState, 0, h.length - 1.001);
        const _ = Math.floor(this._oldState)
          , b = this._overrideStartView || h[_]
          , _e = this._overrideEndView || h[_ + 1];
        let nt, it = this._overrideStartView ? this._overrideTime : this._oldState - _;
        it = EasingFunctions[this.animEase](it),
        nt = this.interpolateMode === "spherical" ? this._lerpViewsSpherical(b, _e, it) : this._lerpViewsLinear(b, _e, it);
        const at = (c = this._viewer) === null || c === void 0 ? void 0 : c.scene.activeCamera;
        at && (at.position.copy(nt[0]),
        at.target.copy(nt[1]),
        at.positionTargetUpdated(!0)),
        this._overrideStartView && (this._overrideTime += o.deltaTime / 1e3,
        this._overrideTime >= this.initAnimationTime && (this._overrideTime = 0,
        this._overrideStartView = void 0,
        this._overrideEndView = void 0))
    }
    _lerpViewsLinear(o, c, h) {
        const _ = new three_module.Pq0
          , b = new three_module.Pq0;
        return b.lerpVectors(o.position, c.position, h),
        _.lerpVectors(o.target, c.target, h),
        [b, _]
    }
    _lerpViewsSpherical(o, c, h) {
        const _ = o.target.clone()
          , b = new three_module.Pq0
          , _e = new three_module.Pq0
          , nt = sphericalFromObject(o, o.target)
          , it = sphericalFromObject(c, c.target)
          , at = new three_module.YHV;
        return at.phi = lerpAngle(nt.phi, it.phi, h),
        at.theta = lerpAngle(nt.theta, it.theta, h),
        at.radius = three_module.cj9.lerp(nt.radius, it.radius, h),
        b.copy(_).lerp(c.target, h),
        _e.setFromSpherical(at),
        _e.add(b),
        [_e, b]
    }
    _animateCameraToView() {
        const o = this._cameraViews;
        if (!this._viewer || o.length < 2 || !this.enabled)
            return;
        this._overrideStartView = new CameraView(this._viewer.scene.activeCamera.position,this._viewer.scene.activeCamera.target);
        const c = Math.floor(this._oldState)
          , h = this._oldState - c;
        let _;
        _ = this.interpolateMode === "spherical" ? this._lerpViewsSpherical(o[c], o[c + 1], h) : this._lerpViewsLinear(o[c], o[c + 1], h),
        this._overrideEndView = new CameraView(_[0],_[1]),
        this._overrideTime = 0
    }
}

export default CameraViewControlPlugin;
