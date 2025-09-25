/* Standalone Class: SSRPlugin */

class SSRPlugin extends MultiFilterPlugin {
    get ssrTarget() {
        return this._ssrTarget
    }
    constructor() {
        super(),
        this.dependencies = [AssetManagerPlugin, GBufferPlugin, ProgressivePlugin],
        this.inlineSSR = !0,
        this.setDirty = this.setDirty.bind(this)
    }
    get enabled() {
        var o, c;
        return ((c = (o = this.passes.ssr) === null || o === void 0 ? void 0 : o.passObject) === null || c === void 0 ? void 0 : c.enabled) || !1
    }
    set enabled(o) {
        var c;
        !((c = this.passes.ssr) === null || c === void 0) && c.passObject && (this.passes.ssr.passObject.enabled = o)
    }
    async onAdded(o) {
        var c, h;
        o.getPluginByType("Ground") && console.error("GroundPlugin must be added after SSRPlugin"),
        await super.onAdded(o),
        (h = (c = this.uiConfig).uiRefresh) === null || h === void 0 || h.call(c, "postFrame", !0)
    }
    createPasses(o) {
        var c, h;
        return this._ssrTarget = this.inlineSSR ? void 0 : o.renderer.createTarget({
            sizeMultiplier: 1
        }),
        [makeFilter(o, {
            passId: "ssr",
            after: ["gbuffer"],
            before: ["render"],
            required: ["render", "gbuffer", "progressive"],
            passObject: new SSRPass(o.renderer,this._ssrTarget,(h = (c = o.getPlugin(GBufferPlugin)) === null || c === void 0 ? void 0 : c.getUnpackSnippet()) !== null && h !== void 0 ? h : "",this.inlineSSR)
        }, () => [o.getPlugin(GBufferPlugin), o.getPlugin(ProgressivePlugin), o.scene.activeCamera, o.renderer, o.scene])]
    }
    async onRemove(o) {
        return this._ssrTarget && o.renderer.disposeTarget(this._ssrTarget),
        super.onRemove(o)
    }
    setDirty() {
        var o;
        (o = this._viewer) === null || o === void 0 || o.setDirty()
    }
    get uiConfig() {
        var o, c, h, _, b;
        const _e = (h = (c = (o = this.passes.ssr) === null || o === void 0 ? void 0 : o.passObject) === null || c === void 0 ? void 0 : c.uiConfig) !== null && h !== void 0 ? h : {};
        return (b = (_ = _e.children) === null || _ === void 0 ? void 0 : _.map(nt => Ee$1(nt))) === null || b === void 0 || b.flat(2).forEach(nt => nt && (nt.onChange = this.setDirty)),
        _e
    }
}

export default SSRPlugin;
