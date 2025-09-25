/* Standalone Class: MultiFilterPlugin */

class MultiFilterPlugin extends AViewerPlugin {
    get passes() {
        if (!this._passes)
            throw "Plugin not yet added to the viewer";
        return this._passes
    }
    get pipeline() {
        return this._pipeline
    }
    set pipeline(o) {
        this._pipeline = o
    }
    constructor() {
        super(),
        this._pipeline = []
    }
    async onAdded(o) {
        await super.onAdded(o);
        const c = this.createPasses(o);
        this._passes = Object.fromEntries(c.map(h => (h.passId || (console.warn("no id found for pass", h),
        h.passId = esm_browser_v4()),
        o.renderer.registerPass(h, !0),
        [h.passId, h])))
    }
    async onRemove(o) {
        var c;
        if (this._passes) {
            for (const h of [...Object.values(this._passes)]) {
                const _ = h;
                o.renderer.unregisterPass(_),
                (c = _ == null ? void 0 : _.dispose) === null || c === void 0 || c.call(_)
            }
            this._passes = void 0
        }
        await super.onRemove(o)
    }
    toJSON(o) {
        var c;
        const h = super.toJSON(o);
        if (!h.type)
            return h;
        const _ = Object.entries(this.passes);
        h.passes = {};
        for (const [b,_e] of _)
            h.passes[b] = serializeObject((c = _e == null ? void 0 : _e.passObject) !== null && c !== void 0 ? c : _e, !1, o);
        return h
    }
    fromJSON(o, c) {
        var h;
        if (!super.fromJSON(o, c))
            return null;
        if (o.passes) {
            const _ = Object.entries(this.passes);
            for (const [b,_e] of _)
                deserializeObject(o.passes[b], (h = _e == null ? void 0 : _e.passObject) !== null && h !== void 0 ? h : _e, !1, c)
        }
        return this
    }
}

export default MultiFilterPlugin;
