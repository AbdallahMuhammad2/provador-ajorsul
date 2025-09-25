/* Standalone Class: Volume */

class Volume extends index_modern_ExtensionProperty {
    init() {
        this.extensionName = KHR_MATERIALS_VOLUME,
        this.propertyType = "Volume",
        this.parentTypes = [index_modern_PropertyType.MATERIAL]
    }
    getDefaults() {
        return Object.assign(super.getDefaults(), {
            thicknessFactor: 0,
            thicknessTexture: null,
            thicknessTextureInfo: new index_modern_TextureInfo(this.graph,"thicknessTexture"),
            attenuationDistance: 1 / 0,
            attenuationColor: [1, 1, 1]
        })
    }
    getThicknessFactor() {
        return this.get("thicknessFactor")
    }
    setThicknessFactor(o) {
        return this.set("thicknessFactor", o)
    }
    getThicknessTexture() {
        return this.getRef("thicknessTexture")
    }
    getThicknessTextureInfo() {
        return this.getRef("thicknessTexture") ? this.getRef("thicknessTextureInfo") : null
    }
    setThicknessTexture(o) {
        return this.setRef("thicknessTexture", o, {
            channels: dist_index_modern_G
        })
    }
    getAttenuationDistance() {
        return this.get("attenuationDistance")
    }
    setAttenuationDistance(o) {
        return this.set("attenuationDistance", o)
    }
    getAttenuationColor() {
        return this.get("attenuationColor")
    }
    setAttenuationColor(o) {
        return this.set("attenuationColor", o)
    }
}

export default Volume;
