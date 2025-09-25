/* Standalone Class: Anisotropy */

class Anisotropy extends index_modern_ExtensionProperty {
    init() {
        this.extensionName = KHR_MATERIALS_ANISOTROPY,
        this.propertyType = "Anisotropy",
        this.parentTypes = [index_modern_PropertyType.MATERIAL]
    }
    getDefaults() {
        return Object.assign(super.getDefaults(), {
            anisotropyStrength: 0,
            anisotropyRotation: 0,
            anisotropyTexture: null,
            anisotropyTextureInfo: new index_modern_TextureInfo(this.graph,"anisotropyTextureInfo")
        })
    }
    getAnisotropyStrength() {
        return this.get("anisotropyStrength")
    }
    setAnisotropyStrength(o) {
        return this.set("anisotropyStrength", o)
    }
    getAnisotropyRotation() {
        return this.get("anisotropyRotation")
    }
    setAnisotropyRotation(o) {
        return this.set("anisotropyRotation", o)
    }
    getAnisotropyTexture() {
        return this.getRef("anisotropyTexture")
    }
    getAnisotropyTextureInfo() {
        return this.getRef("anisotropyTexture") ? this.getRef("anisotropyTextureInfo") : null
    }
    setAnisotropyTexture(o) {
        return this.setRef("anisotropyTexture", o, {
            channels: R$7 | G$7 | B$5
        })
    }
}

export default Anisotropy;
