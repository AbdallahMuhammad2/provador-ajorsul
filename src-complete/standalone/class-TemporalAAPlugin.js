/* Standalone Class: TemporalAAPlugin */

class TemporalAAPlugin extends GenericFilterPlugin {
    constructor() {
        super(...arguments),
        this.passId = "taa",
        this._beforeFilters = ["progressive"],
        this._afterFilters = [],
        this._requiredFilters = ["render", "progressive"],
        this.dependencies = [GBufferPlugin],
        this._stableNoise = !0,
        this._stableNoiseConfig = {
            label: "Stable Noise (Use Total Frame Count)",
            type: "checkbox",
            property: [this, "stableNoise"]
        }
    }
    passCtor(o) {
        if (!o.getPlugin(ProgressivePlugin))
            throw "Add ProgressivePlugin before TAA";
        const c = o.isAntialiased
          , h = new TAAPass( () => {
            var _;
            return (_ = o.getPlugin(ProgressivePlugin)) === null || _ === void 0 ? void 0 : _.lastFrame
        }
        ,o.getPlugin(GBufferPlugin).getUnpackSnippet(),c);
        return o.renderer.addEventListener("resize", h.onSizeUpdate),
        h
    }
    setDirty() {
        var o;
        (o = this._viewer) === null || o === void 0 || o.setDirty()
    }
    async onDispose(o) {
        return this.pass && o.renderer.removeEventListener("resize", this.pass.passObject.onSizeUpdate),
        super.onDispose(o)
    }
    _update(o) {
        if (!super._update(o))
            return !1;
        const c = o.renderer.frameCount
          , h = this._pass.passObject;
        if (h.taaEnabled = c <= 1 && o.scene.renderCamera === o.scene.activeCamera,
        !h.taaEnabled)
            return !1;
        const _ = o.scene.renderCamera;
        return h.updateShaderProperties([o.getPlugin(GBufferPlugin), _, o.getPluginByType("VelocityBuffer")]),
        h.target = o.getPlugin(ProgressivePlugin).lastFrame,
        h.updateCameraProperties(_ == null ? void 0 : _.cameraObject),
        !0
    }
    async onAdded(o) {
        await super.onAdded(o),
        this.stableNoise = this._stableNoise
    }
    get stableNoise() {
        var o, c;
        return (c = (o = this._viewer) === null || o === void 0 ? void 0 : o.renderer.stableNoise) !== null && c !== void 0 ? c : this._stableNoise
    }
    set stableNoise(o) {
        this._viewer && (this._viewer.renderer.stableNoise = o),
        this._stableNoise = o
    }
    get uiConfig() {
        var o;
        const c = (o = this.pass) === null || o === void 0 ? void 0 : o.passObject.uiConfig;
        if (c && c.children)
            return c.children.includes(this._stableNoiseConfig) || c.children.push(this._stableNoiseConfig),
            c
    }
}

export default TemporalAAPlugin;
