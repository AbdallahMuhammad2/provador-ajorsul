/* Standalone Class: Sheen */

class Sheen extends index_modern_ExtensionProperty {
    init() {
        this.extensionName = KHR_MATERIALS_SHEEN,
        this.propertyType = "Sheen",
        this.parentTypes = [index_modern_PropertyType.MATERIAL]
    }
    getDefaults() {
        return Object.assign(super.getDefaults(), {
            sheenColorFactor: [0, 0, 0],
            sheenColorTexture: null,
            sheenColorTextureInfo: new index_modern_TextureInfo(this.graph,"sheenColorTextureInfo"),
            sheenRoughnessFactor: 0,
            sheenRoughnessTexture: null,
            sheenRoughnessTextureInfo: new index_modern_TextureInfo(this.graph,"sheenRoughnessTextureInfo")
        })
    }
    getSheenColorFactor() {
        return this.get("sheenColorFactor")
    }
    setSheenColorFactor(o) {
        return this.set("sheenColorFactor", o)
    }
    getSheenColorTexture() {
        return this.getRef("sheenColorTexture")
    }
    getSheenColorTextureInfo() {
        return this.getRef("sheenColorTexture") ? this.getRef("sheenColorTextureInfo") : null
    }
    setSheenColorTexture(o) {
        return this.setRef("sheenColorTexture", o, {
            channels: R$2$1 | G$2$1 | B$1$1,
            isColor: !0
        })
    }
    getSheenRoughnessFactor() {
        return this.get("sheenRoughnessFactor")
    }
    setSheenRoughnessFactor(o) {
        return this.set("sheenRoughnessFactor", o)
    }
    getSheenRoughnessTexture() {
        return this.getRef("sheenRoughnessTexture")
    }
    getSheenRoughnessTextureInfo() {
        return this.getRef("sheenRoughnessTexture") ? this.getRef("sheenRoughnessTextureInfo") : null
    }
    setSheenRoughnessTexture(o) {
        return this.setRef("sheenRoughnessTexture", o, {
            channels: A$1$1
        })
    }
}

export default Sheen;
