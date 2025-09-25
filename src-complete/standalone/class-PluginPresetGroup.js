/* Standalone Class: PluginPresetGroup */

class PluginPresetGroup extends PresetGroup {
    async apply(o, c) {
        var h, _;
        const b = await super.apply(o, c, {
            processImported: !1
        });
        return b ? (_ = (h = o.getManager()) === null || h === void 0 ? void 0 : h.importer) === null || _ === void 0 ? void 0 : _.processImported(b) : void 0
    }
}

export default PluginPresetGroup;
