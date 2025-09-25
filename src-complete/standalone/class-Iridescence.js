/* Standalone Class: Iridescence */

class Iridescence extends index_modern_ExtensionProperty {
    init() {
        this.extensionName = KHR_MATERIALS_IRIDESCENCE,
        this.propertyType = "Iridescence",
        this.parentTypes = [index_modern_PropertyType.MATERIAL]
    }
    getDefaults() {
        return Object.assign(super.getDefaults(), {
            iridescenceFactor: 0,
            iridescenceTexture: null,
            iridescenceTextureInfo: new index_modern_TextureInfo(this.graph,"iridescenceTextureInfo"),
            iridescenceIOR: 1.3,
            iridescenceThicknessMinimum: 100,
            iridescenceThicknessMaximum: 400,
            iridescenceThicknessTexture: null,
            iridescenceThicknessTextureInfo: new index_modern_TextureInfo(this.graph,"iridescenceThicknessTextureInfo")
        })
    }
    getIridescenceFactor() {
        return this.get("iridescenceFactor")
    }
    setIridescenceFactor(o) {
        return this.set("iridescenceFactor", o)
    }
    getIridescenceTexture() {
        return this.getRef("iridescenceTexture")
    }
    getIridescenceTextureInfo() {
        return this.getRef("iridescenceTexture") ? this.getRef("iridescenceTextureInfo") : null
    }
    setIridescenceTexture(o) {
        return this.setRef("iridescenceTexture", o, {
            channels: R$4
        })
    }
    getIridescenceIOR() {
        return this.get("iridescenceIOR")
    }
    setIridescenceIOR(o) {
        return this.set("iridescenceIOR", o)
    }
    getIridescenceThicknessMinimum() {
        return this.get("iridescenceThicknessMinimum")
    }
    setIridescenceThicknessMinimum(o) {
        return this.set("iridescenceThicknessMinimum", o)
    }
    getIridescenceThicknessMaximum() {
        return this.get("iridescenceThicknessMaximum")
    }
    setIridescenceThicknessMaximum(o) {
        return this.set("iridescenceThicknessMaximum", o)
    }
    getIridescenceThicknessTexture() {
        return this.getRef("iridescenceThicknessTexture")
    }
    getIridescenceThicknessTextureInfo() {
        return this.getRef("iridescenceThicknessTexture") ? this.getRef("iridescenceThicknessTextureInfo") : null
    }
    setIridescenceThicknessTexture(o) {
        return this.setRef("iridescenceThicknessTexture", o, {
            channels: G$4
        })
    }
}

export default Iridescence;
