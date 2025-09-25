/* Standalone Class: GemEnvironmentPresetGroup */

class GemEnvironmentPresetGroup extends PresetGroup {
    constructor(o="envMap") {
        super(),
        this.key = o,
        this.name = "GemEnvironment",
        this.name += o.split("Map")[1]
    }
    async apply(o, c) {
        const h = await super.apply(o, c)
          , _ = h == null ? void 0 : h[0];
        return S$2(o.getPluginByType("Diamond"), this.key, _),
        _
    }
}

export default GemEnvironmentPresetGroup;
