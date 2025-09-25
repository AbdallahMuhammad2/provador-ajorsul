/* Standalone Class: ModelStagePresetGroup */

class ModelStagePresetGroup extends PresetGroup {
    constructor() {
        super(...arguments),
        this.name = "ModelStage"
    }
    async apply(o, c) {
        var h;
        const _ = typeof c == "string" ? c : c.path;
        let b = !1;
        try {
            b = new URL(_.includes("://") ? _ : "https://example.com/" + _).pathname.endsWith(".json")
        } catch {
            b = _.endsWith(".json")
        }
        if (b)
            return super.apply(o, c);
        {
            const _e = o.getPluginByType("ModelStagePlugin");
            return _e == null ? void 0 : _e.setModel((h = c.file) !== null && h !== void 0 ? h : _)
        }
    }
}

export default ModelStagePresetGroup;
