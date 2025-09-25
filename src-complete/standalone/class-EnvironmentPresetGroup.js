/* Standalone Class: EnvironmentPresetGroup */

class EnvironmentPresetGroup extends PresetGroup {
    constructor() {
        super(...arguments),
        this.name = "Environment"
    }
    async apply(o, c) {
        const h = await super.apply(o, c)
          , _ = h == null ? void 0 : h[0];
        return _ && (o.scene.environment = _),
        _
    }
}

export default EnvironmentPresetGroup;
