/* Standalone Class: MaterialLibPresetGroupPresetGroup */

class MaterialLibPresetGroupPresetGroup extends PluginPresetGroup {
    constructor() {
        super(...arguments),
        this.name = "MaterialLibraries"
    }
    async apply(o, c) {
        const h = await super.apply(o, c);
        return h && await o.alert("Material Library successfully imported."),
        h
    }
}

export default MaterialLibPresetGroupPresetGroup;
