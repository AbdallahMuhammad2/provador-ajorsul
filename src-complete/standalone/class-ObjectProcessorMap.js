/* Standalone Class: ObjectProcessorMap */

class ObjectProcessorMap {
    constructor() {
        this._processors = new Map
    }
    add(o, c) {
        var h;
        this._processors.has(o) || this._processors.set(o, []),
        (h = this._processors.get(o)) === null || h === void 0 || h.push(c)
    }
    remove(o, c) {
        const h = this._processors.get(o)
          , _ = (h == null ? void 0 : h.indexOf(c)) || (h == null ? void 0 : h.findIndex(b => b.process && b.process === c.process || b.processAsync && b.processAsync === c.processAsync));
        !h || !_ || _ < 0 || h.splice(_, 1)
    }
    get(o) {
        var c;
        return (c = this._processors.get(o)) !== null && c !== void 0 ? c : []
    }
    async process(o, c, h) {
        var _, b, _e, nt;
        const it = this.get(o)
          , at = c.assetType;
        for (const ut of it)
            ut.forAssetType === at && (c = (b = (_ = ut.process) === null || _ === void 0 ? void 0 : _.call(ut, c, h)) !== null && b !== void 0 ? b : c,
            c = (nt = await ((_e = ut.processAsync) === null || _e === void 0 ? void 0 : _e.call(ut, c, h))) !== null && nt !== void 0 ? nt : c);
        return c
    }
    dispose() {
        this._processors.clear()
    }
}

export default ObjectProcessorMap;
