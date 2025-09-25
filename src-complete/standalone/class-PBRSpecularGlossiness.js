/* Standalone Class: PBRSpecularGlossiness */

class PBRSpecularGlossiness extends index_modern_ExtensionProperty {
    init() {
        this.extensionName = KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS,
        this.propertyType = "PBRSpecularGlossiness",
        this.parentTypes = [index_modern_PropertyType.MATERIAL]
    }
    getDefaults() {
        return Object.assign(super.getDefaults(), {
            diffuseFactor: [1, 1, 1, 1],
            diffuseTexture: null,
            diffuseTextureInfo: new index_modern_TextureInfo(this.graph,"diffuseTextureInfo"),
            specularFactor: [1, 1, 1],
            glossinessFactor: 1,
            specularGlossinessTexture: null,
            specularGlossinessTextureInfo: new index_modern_TextureInfo(this.graph,"specularGlossinessTextureInfo")
        })
    }
    getDiffuseFactor() {
        return this.get("diffuseFactor")
    }
    setDiffuseFactor(o) {
        return this.set("diffuseFactor", o)
    }
    getDiffuseTexture() {
        return this.getRef("diffuseTexture")
    }
    getDiffuseTextureInfo() {
        return this.getRef("diffuseTexture") ? this.getRef("diffuseTextureInfo") : null
    }
    setDiffuseTexture(o) {
        return this.setRef("diffuseTexture", o, {
            channels: R$3 | G$3 | B$2$1 | A$2,
            isColor: !0
        })
    }
    getSpecularFactor() {
        return this.get("specularFactor")
    }
    setSpecularFactor(o) {
        return this.set("specularFactor", o)
    }
    getGlossinessFactor() {
        return this.get("glossinessFactor")
    }
    setGlossinessFactor(o) {
        return this.set("glossinessFactor", o)
    }
    getSpecularGlossinessTexture() {
        return this.getRef("specularGlossinessTexture")
    }
    getSpecularGlossinessTextureInfo() {
        return this.getRef("specularGlossinessTexture") ? this.getRef("specularGlossinessTextureInfo") : null
    }
    setSpecularGlossinessTexture(o) {
        return this.setRef("specularGlossinessTexture", o, {
            channels: R$3 | G$3 | B$2$1 | A$2
        })
    }
}

export default PBRSpecularGlossiness;
