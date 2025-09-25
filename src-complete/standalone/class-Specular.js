/* Standalone Class: Specular */

class Specular extends index_modern_ExtensionProperty {
    init() {
        this.extensionName = KHR_MATERIALS_SPECULAR,
        this.propertyType = "Specular",
        this.parentTypes = [index_modern_PropertyType.MATERIAL]
    }
    getDefaults() {
        return Object.assign(super.getDefaults(), {
            specularFactor: 1,
            specularTexture: null,
            specularTextureInfo: new index_modern_TextureInfo(this.graph,"specularTextureInfo"),
            specularColorFactor: [1, 1, 1],
            specularColorTexture: null,
            specularColorTextureInfo: new index_modern_TextureInfo(this.graph,"specularColorTextureInfo")
        })
    }
    getSpecularFactor() {
        return this.get("specularFactor")
    }
    setSpecularFactor(o) {
        return this.set("specularFactor", o)
    }
    getSpecularColorFactor() {
        return this.get("specularColorFactor")
    }
    setSpecularColorFactor(o) {
        return this.set("specularColorFactor", o)
    }
    getSpecularTexture() {
        return this.getRef("specularTexture")
    }
    getSpecularTextureInfo() {
        return this.getRef("specularTexture") ? this.getRef("specularTextureInfo") : null
    }
    setSpecularTexture(o) {
        return this.setRef("specularTexture", o, {
            channels: dist_index_modern_A
        })
    }
    getSpecularColorTexture() {
        return this.getRef("specularColorTexture")
    }
    getSpecularColorTextureInfo() {
        return this.getRef("specularColorTexture") ? this.getRef("specularColorTextureInfo") : null
    }
    setSpecularColorTexture(o) {
        return this.setRef("specularColorTexture", o, {
            channels: R$1$1 | G$1$1 | dist_index_modern_B,
            isColor: !0
        })
    }
}

export default Specular;
