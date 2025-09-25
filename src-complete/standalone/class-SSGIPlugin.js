/* Standalone Class: SSGIPlugin */

class SSGIPlugin extends MultiFilterPlugin {
    get rtgiTarget() {
        return this._rtgiTarget
    }
    constructor(o=!0) {
        super(),
        this.dependencies = [AssetManagerPlugin, GBufferPlugin, ProgressivePlugin],
        this._initEnabled = !1,
        this.setDirty = this.setDirty.bind(this),
        this._initEnabled = o
    }
    async onAdded(o) {
        var c, h;
        await super.onAdded(o),
        this.enabled = this._initEnabled,
        (h = (c = this.uiConfig).uiRefresh) === null || h === void 0 || h.call(c, "postFrame", !0)
    }
    get enabled() {
        var o, c;
        return ((c = (o = this.passes.ssrtgi) === null || o === void 0 ? void 0 : o.passObject) === null || c === void 0 ? void 0 : c.enabled) || !1
    }
    set enabled(o) {
        var c;
        !((c = this.passes.ssrtgi) === null || c === void 0) && c.passObject && (this.passes.ssrtgi.passObject.enabled = o)
    }
    createPasses(o) {
        var c, h, _;
        return this._rtgiTarget = o.renderer.createTarget({
            sizeMultiplier: 1
        }),
        (c = this._viewer) === null || c === void 0 || c.getPluginByType("debug"),
        [makeFilter(o, {
            passId: "ssrtgi",
            after: ["gbuffer"],
            before: ["render"],
            required: ["render", "gbuffer", "progressive"],
            passObject: new SSRTAOPass(o.renderer,this._rtgiTarget,(_ = (h = o.getPlugin(GBufferPlugin)) === null || h === void 0 ? void 0 : h.getUnpackSnippet()) !== null && _ !== void 0 ? _ : "",!0),
            update: () => {
                var b;
                const _e = this.enabled;
                if (_e) {
                    const nt = (b = this._viewer) === null || b === void 0 ? void 0 : b.getPluginByType("SSAO");
                    nt != null && nt.enabled && (nt.enabled = !1)
                }
                _e && this.passes.ssrtgi.passObject.bilateralPass.updateShaderProperties([o.getPlugin(GBufferPlugin)])
            }
        }, () => [o.getPlugin(GBufferPlugin), o.getPlugin(ProgressivePlugin), o.scene.activeCamera, o.renderer])]
    }
    async onRemove(o) {
        return o.renderer.disposeTarget(this._rtgiTarget),
        super.onRemove(o)
    }
    setDirty() {
        var o;
        (o = this._viewer) === null || o === void 0 || o.setDirty()
    }
    get uiConfig() {
        var o, c, h, _, b;
        const _e = (h = (c = (o = this.passes.ssrtgi) === null || o === void 0 ? void 0 : o.passObject) === null || c === void 0 ? void 0 : c.uiConfig) !== null && h !== void 0 ? h : {};
        return (b = (_ = _e.children) === null || _ === void 0 ? void 0 : _.map(nt => Ee$1(nt))) === null || b === void 0 || b.flat(2).forEach(nt => nt && (nt.onChange = this.setDirty)),
        _e
    }
}

export default SSGIPlugin;
