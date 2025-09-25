/* Standalone Class: PresetGroup */

class PresetGroup {
    async apply(o, c, h) {
        var _, b, _e, nt;
        if (!c)
            return void (this.selected = void 0);
        let it = this.presets.find(at => match(at, c));
        return it || (this.presets.push(c),
        it = c),
        this.selected = it,
        typeof it != "string" ? (b = (_ = o.getManager()) === null || _ === void 0 ? void 0 : _.importer) === null || b === void 0 ? void 0 : b.importAsset(it, h) : (nt = (_e = o.getManager()) === null || _e === void 0 ? void 0 : _e.importer) === null || nt === void 0 ? void 0 : nt.importPath(it, h)
    }
    addPresets(o) {
        this.presets.push(...o.filter(c => {
            const h = this.presets.find(_ => match(_, c));
            return !h || (typeof h == "string" ? (this.presets = this.presets.filter(_ => _ !== h),
            !0) : (typeof c == "string" || Object.assign(h, c),
            !1))
        }
        ))
    }
    clear() {
        this.selected = void 0
    }
    constructor(o) {
        this.presets = [],
        this.name = "",
        this.selected = void 0,
        o && (this.name = o)
    }
}

export default PresetGroup;
