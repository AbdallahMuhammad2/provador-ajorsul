/* Standalone Class: DepthOfFieldPlugin */

class DepthOfFieldPlugin extends GenericFilterPlugin {
    passCtor(o) {
        return new DepthOfFieldPass
    }
    constructor(o=!0, c=!1) {
        super(),
        this.passId = "depthOfField",
        this._beforeFilters = ["progressive", "tonemap", "screen"],
        this._afterFilters = ["render"],
        this._requiredFilters = ["render"],
        this.dependencies = [GBufferPlugin],
        this.enableEdit = !1,
        this._focalPointHit = new three_module.Pq0(0,0,0),
        this.crossFadeTime = 200,
        this._focalPointHitTime = 0,
        this._tempVec = new three_module.Pq0,
        this.enabled = o,
        this.enableEdit = c,
        this._onObjectHit = this._onObjectHit.bind(this),
        this.setDirty = this.setDirty.bind(this)
    }
    setFocalPoint(o, c=!0, h=!1) {
        var _, b;
        this._focalPointHit.copy(o),
        c && ((b = (_ = this._viewer) === null || _ === void 0 ? void 0 : _.getPlugin(FrameFadePlugin)) === null || b === void 0 || b.startTransition(this._frameFadeTime)),
        h && (this._focalPointHitTime = g()),
        this.setDirty()
    }
    getFocalPoint() {
        return this._focalPointHit
    }
    get depthRange() {
        var o, c;
        return (c = (o = this.pass) === null || o === void 0 ? void 0 : o.passObject.focalDepthRange.y) !== null && c !== void 0 ? c : 0
    }
    set depthRange(o) {
        this.pass && (this.pass.passObject.focalDepthRange.y = o),
        this.setDirty()
    }
    get nearBlurScale() {
        var o, c;
        return (c = (o = this.pass) === null || o === void 0 ? void 0 : o.passObject.nearFarBlurScale.x) !== null && c !== void 0 ? c : 0
    }
    set nearBlurScale(o) {
        this.pass && (this.pass.passObject.nearFarBlurScale.x = o),
        this.setDirty()
    }
    get farBlurScale() {
        var o, c;
        return (c = (o = this.pass) === null || o === void 0 ? void 0 : o.passObject.nearFarBlurScale.y) !== null && c !== void 0 ? c : 0
    }
    set farBlurScale(o) {
        this.pass && (this.pass.passObject.nearFarBlurScale.y = o),
        this.setDirty()
    }
    get _frameFadeTime() {
        return 2.5 * this.crossFadeTime
    }
    _onObjectHit(o) {
        var c, h;
        this._pass && o.intersects.intersect && this.enabled && this.enableEdit && (this._focalPointHit.copy(o.intersects.intersect.point),
        this._focalPointHitTime = o.time,
        o.intersects.selectedObject = null,
        (h = (c = this._viewer) === null || c === void 0 ? void 0 : c.getPlugin(FrameFadePlugin)) === null || h === void 0 || h.startTransition(this._frameFadeTime),
        this.setDirty())
    }
    async onAdded(o) {
        var c;
        await super.onAdded(o),
        (c = o.getPluginByType("Picking")) === null || c === void 0 || c.addEventListener("hitObject", this._onObjectHit)
    }
    async onRemove(o) {
        var c;
        return (c = o.getPluginByType("Picking")) === null || c === void 0 || c.removeEventListener("hitObject", this._onObjectHit),
        super.onRemove(o)
    }
    setDirty() {
        var o;
        (o = this._viewer) === null || o === void 0 || o.setDirty()
    }
    _update(o) {
        var c, h;
        if (!super._update(o))
            return !1;
        const _ = (c = this.pass) === null || c === void 0 ? void 0 : c.passObject;
        if (!_)
            return !1;
        const b = o.getPlugin(GBufferPlugin);
        b == null || b.updateShaderProperties(_.material),
        _.dofBlurMaterial.uniforms.frameCount && ((h = o.renderer) === null || h === void 0 || h.updateShaderProperties(_.dofBlurMaterial));
        const _e = o.scene.renderCamera;
        if (!_e)
            return !1;
        _e.cameraObject.updateMatrixWorld(!0),
        _e.updateShaderProperties(_.material),
        _e.cameraObject.getWorldPosition(this._tempVec),
        this._tempVec.subVectors(this._focalPointHit, this._tempVec),
        _.focalDepthRange.x = this._tempVec.length(),
        _.focalDepthRange.x *= _e.cameraObject.getWorldDirection(new three_module.Pq0).dot(this._tempVec.normalize());
        let nt = (g() - this._focalPointHitTime) / this.crossFadeTime;
        if (nt = 1 - Math.min(1, Math.max(0, nt)),
        Math.abs(nt - _.crossAlpha) > .01 && (_.crossAlpha = nt,
        this.setDirty()),
        nt > 0) {
            const it = this._tempVec.copy(this._focalPointHit).project(_e.cameraObject).addScalar(1).divideScalar(2);
            _.crossCenter.set(it.x, it.y),
            _.computeCocMaterial.uniformsNeedUpdate = !0,
            _.expandCocMaterial.uniformsNeedUpdate = !0
        }
        return !0
    }
    get uiConfig() {
        var o, c, h, _, b;
        if (this._uiConfig)
            return this._uiConfig;
        const _e = (c = (o = this._pass) === null || o === void 0 ? void 0 : o.passObject) === null || c === void 0 ? void 0 : c.uiConfig;
        return _e ? ((_ = (h = _e.children) === null || h === void 0 ? void 0 : h.map(nt => Ee$1(nt))) === null || _ === void 0 || _.flat(2).forEach(nt => nt && (nt.onChange = this.setDirty)),
        (b = _e.children) === null || b === void 0 || b.push({
            type: "checkbox",
            label: "Enable Edit",
            limitedUi: !0,
            property: [this, "enableEdit"]
        }),
        this._uiConfig = _e,
        _e) : {}
    }
}

export default DepthOfFieldPlugin;
