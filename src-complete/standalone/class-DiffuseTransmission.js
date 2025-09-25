/* Standalone Class: DiffuseTransmission */

class DiffuseTransmission extends index_modern_ExtensionProperty {
    init() {
        this.extensionName = KHR_MATERIALS_DIFFUSE_TRANSMISSION,
        this.propertyType = "DiffuseTransmission",
        this.parentTypes = [index_modern_PropertyType.MATERIAL]
    }
    getDefaults() {
        return Object.assign(super.getDefaults(), {
            diffuseTransmissionFactor: 0,
            diffuseTransmissionTexture: null,
            diffuseTransmissionTextureInfo: new index_modern_TextureInfo(this.graph,"diffuseTransmissionTextureInfo"),
            diffuseTransmissionColorFactor: [1, 1, 1],
            diffuseTransmissionColorTexture: null,
            diffuseTransmissionColorTextureInfo: new index_modern_TextureInfo(this.graph,"diffuseTransmissionColorTextureInfo")
        })
    }
    getDiffuseTransmissionFactor() {
        return this.get("diffuseTransmissionFactor")
    }
    setDiffuseTransmissionFactor(o) {
        return this.set("diffuseTransmissionFactor", o)
    }
    getDiffuseTransmissionTexture() {
        return this.getRef("diffuseTransmissionTexture")
    }
    getDiffuseTransmissionTextureInfo() {
        return this.getRef("diffuseTransmissionTexture") ? this.getRef("diffuseTransmissionTextureInfo") : null
    }
    setDiffuseTransmissionTexture(o) {
        return this.setRef("diffuseTransmissionTexture", o, {
            channels: A$3
        })
    }
    getDiffuseTransmissionColorFactor() {
        return this.get("diffuseTransmissionColorFactor")
    }
    setDiffuseTransmissionColorFactor(o) {
        return this.set("diffuseTransmissionColorFactor", o)
    }
    getDiffuseTransmissionColorTexture() {
        return this.getRef("diffuseTransmissionColorTexture")
    }
    getDiffuseTransmissionColorTextureInfo() {
        return this.getRef("diffuseTransmissionColorTexture") ? this.getRef("diffuseTransmissionColorTextureInfo") : null
    }
    setDiffuseTransmissionColorTexture(o) {
        return this.setRef("diffuseTransmissionColorTexture", o, {
            channels: R$5 | G$5 | B$3
        })
    }
}

export default DiffuseTransmission;
