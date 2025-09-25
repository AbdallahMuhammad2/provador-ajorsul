/* Standalone Class: BackgroundPresetGroup */

class BackgroundPresetGroup extends PresetGroup {
    constructor() {
        super(...arguments),
        this.name = "Background"
    }
    async apply(o, c) {
        const h = await super.apply(o, c)
          , _ = h == null ? void 0 : h[0];
        return _ && (_.colorSpace = three_module.er$,
        o.scene.background = _,
        o.scene.backgroundColor = new three_module.Q1f(1,1,1)),
        _
    }
}

export default BackgroundPresetGroup;
