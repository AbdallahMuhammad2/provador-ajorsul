/* Standalone Class: GenericFilterPlugin */

class GenericFilterPlugin extends AViewerPlugin {
    _update(o) {
        var c;
        return ((c = this._pass) === null || c === void 0 ? void 0 : c.enabled) && this.enabled || !1
    }
    get enabled() {
        var o, c, h;
        return (h = (c = (o = this._pass) === null || o === void 0 ? void 0 : o.passObject) === null || c === void 0 ? void 0 : c.enabled) !== null && h !== void 0 ? h : this._enabledTemp
    }
    set enabled(o) {
        var c;
        !((c = this._pass) === null || c === void 0) && c.passObject && (this._pass.passObject.enabled = o),
        this._enabledTemp = o
    }
    constructor() {
        super(),
        this._enabledTemp = !0
    }
    async onAdded(o) {
        await super.onAdded(o);
        const c = {
            enabled: !0,
            passId: this.passId,
            passObject: this.passCtor(o),
            after: this._afterFilters,
            before: this._beforeFilters,
            required: this._requiredFilters,
            set dirty(h) {
                h && o.setDirty()
            },
            get dirty() {
                return !1
            },
            update: () => this._update(o)
        };
        this._pass = makeFilter(o, c),
        c.passObject.onDirty !== void 0 && c.passObject.onDirty.push( () => c.dirty = !0),
        o.renderer.registerPass(this._pass),
        this.enabled = this._enabledTemp
    }
    async onRemove(o) {
        var c, h;
        this._pass && o.renderer.unregisterPass(this._pass),
        (h = (c = this._pass) === null || c === void 0 ? void 0 : c.dispose) === null || h === void 0 || h.call(c),
        this._pass = void 0,
        await super.onRemove(o)
    }
    get pass() {
        return this._pass
    }
    toJSON(o) {
        var c;
        const h = super.toJSON(o);
        if (!h.type)
            return h;
        const _ = this.pass;
        return _ && (h.pass = serializeObject((c = _ == null ? void 0 : _.passObject) !== null && c !== void 0 ? c : _, !1, o)),
        h
    }
    fromJSON(o, c) {
        var h;
        if (!super.fromJSON(o, c))
            return null;
        if (o.pass) {
            const _ = this.pass;
            _ && deserializeObject(o.pass, (h = _ == null ? void 0 : _.passObject) !== null && h !== void 0 ? h : _, !1, c)
        }
        return this
    }
}

export default GenericFilterPlugin;
