/* Standalone Class: CombinedPostPlugin */

class CombinedPostPlugin extends GenericFilterPlugin {
    get renderToScreen() {
        return this._renderToScreen
    }
    constructor(o=!0, c=!0) {
        super(),
        this.depthTonemap = o,
        this.passId = "combinedPost",
        this.dependencies = [GBufferPlugin],
        this.toJSON = void 0,
        this._beforeFilters = [],
        this._afterFilters = ["render", "screen"],
        this._requiredFilters = ["render"],
        this._renderToScreen = !0,
        this._postFrame = () => {
            var h, _;
            this._needsReRender && this._renderToScreen && this._viewer && this.pass && (this._needsReRender = !1,
            (_ = (h = this.pass).update) === null || _ === void 0 || _.call(h),
            this.pass.passObject.reRender(this._viewer.renderer.rendererObject, null))
        }
        ,
        this._needsReRender = !1,
        this._setDirty = this._setDirty.bind(this),
        this._renderToScreen = c
    }
    async onAdded(o) {
        var c, h;
        return !((h = (c = this._viewer) === null || c === void 0 ? void 0 : c.screenShader) === null || h === void 0) && h.isShaderPass2 && (this._renderToScreen = !1),
        this._renderToScreen && S$2(o.renderer.passes.find(_ => _.passId === "screen"), "enabled", !1, !0, !0),
        o.addEventListener("postFrame", this._postFrame),
        super.onAdded(o)
    }
    async onRemove(o) {
        return this._renderToScreen && S$2(o.renderer.passes.find(c => c.passId === "screen"), "enabled", !0, !0, !0),
        super.onRemove(o)
    }
    passCtor(o) {
        var c, h;
        const _ = o.screenShader
          , b = ["", ""];
        this._renderToScreen && !_.isShaderPass2 && (b[0] = Array.isArray(_) ? _[0] : (_ == null ? void 0 : _.pars) || "",
        b[1] = Array.isArray(_) ? _[1] : typeof _ == "string" ? _ : (_ == null ? void 0 : _.main) || "");
        const _e = new CombinedPostPass(b);
        return S$2((h = (c = _e.uiConfig) === null || c === void 0 ? void 0 : c.children) === null || h === void 0 ? void 0 : h.find(nt => (nt == null ? void 0 : nt.label) === "Enabled"), "hidden", !0, !0),
        _e
    }
    _update(o) {
        var c, h, _;
        return !!super._update(o) && (this._pass.passObject.updateShaderProperties((c = this._viewer) === null || c === void 0 ? void 0 : c.getPlugin(GBufferPlugin)),
        this._pass.passObject.material.uniforms.tTransparent.value = ((_ = (h = this._viewer) === null || h === void 0 ? void 0 : h.renderFilter.passObject.transparentTarget) === null || _ === void 0 ? void 0 : _.texture) || null,
        !0)
    }
    _setDirty() {
        this.pass && (this.pass.dirty = !0)
    }
    get uiConfig() {
        var o, c, h;
        return (h = (c = (o = this.pass) === null || o === void 0 ? void 0 : o.passObject) === null || c === void 0 ? void 0 : c.uiConfig) !== null && h !== void 0 ? h : {}
    }
    addExtension(o) {
        this.pass.passObject.material.registerMaterialExtensions([o])
    }
    reRender() {
        this._renderToScreen ? this._needsReRender = !0 : this._setDirty()
    }
}

export default CombinedPostPlugin;
