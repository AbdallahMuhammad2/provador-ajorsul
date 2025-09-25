/* Standalone Class: Clearcoat */

class Clearcoat extends index_modern_ExtensionProperty {
    init() {
        this.extensionName = KHR_MATERIALS_CLEARCOAT,
        this.propertyType = "Clearcoat",
        this.parentTypes = [index_modern_PropertyType.MATERIAL]
    }
    getDefaults() {
        return Object.assign(super.getDefaults(), {
            clearcoatFactor: 0,
            clearcoatTexture: null,
            clearcoatTextureInfo: new index_modern_TextureInfo(this.graph,"clearcoatTextureInfo"),
            clearcoatRoughnessFactor: 0,
            clearcoatRoughnessTexture: null,
            clearcoatRoughnessTextureInfo: new index_modern_TextureInfo(this.graph,"clearcoatRoughnessTextureInfo"),
            clearcoatNormalScale: 1,
            clearcoatNormalTexture: null,
            clearcoatNormalTextureInfo: new index_modern_TextureInfo(this.graph,"clearcoatNormalTextureInfo")
        })
    }
    getClearcoatFactor() {
        return this.get("clearcoatFactor")
    }
    setClearcoatFactor(o) {
        return this.set("clearcoatFactor", o)
    }
    getClearcoatTexture() {
        return this.getRef("clearcoatTexture")
    }
    getClearcoatTextureInfo() {
        return this.getRef("clearcoatTexture") ? this.getRef("clearcoatTextureInfo") : null
    }
    setClearcoatTexture(o) {
        return this.setRef("clearcoatTexture", o, {
            channels: R$6
        })
    }
    getClearcoatRoughnessFactor() {
        return this.get("clearcoatRoughnessFactor")
    }
    setClearcoatRoughnessFactor(o) {
        return this.set("clearcoatRoughnessFactor", o)
    }
    getClearcoatRoughnessTexture() {
        return this.getRef("clearcoatRoughnessTexture")
    }
    getClearcoatRoughnessTextureInfo() {
        return this.getRef("clearcoatRoughnessTexture") ? this.getRef("clearcoatRoughnessTextureInfo") : null
    }
    setClearcoatRoughnessTexture(o) {
        return this.setRef("clearcoatRoughnessTexture", o, {
            channels: G$6
        })
    }
    getClearcoatNormalScale() {
        return this.get("clearcoatNormalScale")
    }
    setClearcoatNormalScale(o) {
        return this.set("clearcoatNormalScale", o)
    }
    getClearcoatNormalTexture() {
        return this.getRef("clearcoatNormalTexture")
    }
    getClearcoatNormalTextureInfo() {
        return this.getRef("clearcoatNormalTexture") ? this.getRef("clearcoatNormalTextureInfo") : null
    }
    setClearcoatNormalTexture(o) {
        return this.setRef("clearcoatNormalTexture", o, {
            channels: R$6 | G$6 | B$4
        })
    }
}

export default Clearcoat;
