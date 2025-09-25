/* Standalone Class: index_modern_Material */

class index_modern_Material extends ExtensibleProperty {
    init() {
        this.propertyType = index_modern_PropertyType.MATERIAL
    }
    getDefaults() {
        return Object.assign(super.getDefaults(), {
            alphaMode: index_modern_Material.AlphaMode.OPAQUE,
            alphaCutoff: .5,
            doubleSided: !1,
            baseColorFactor: [1, 1, 1, 1],
            baseColorTexture: null,
            baseColorTextureInfo: new index_modern_TextureInfo(this.graph,"baseColorTextureInfo"),
            emissiveFactor: [0, 0, 0],
            emissiveTexture: null,
            emissiveTextureInfo: new index_modern_TextureInfo(this.graph,"emissiveTextureInfo"),
            normalScale: 1,
            normalTexture: null,
            normalTextureInfo: new index_modern_TextureInfo(this.graph,"normalTextureInfo"),
            occlusionStrength: 1,
            occlusionTexture: null,
            occlusionTextureInfo: new index_modern_TextureInfo(this.graph,"occlusionTextureInfo"),
            roughnessFactor: 1,
            metallicFactor: 1,
            metallicRoughnessTexture: null,
            metallicRoughnessTextureInfo: new index_modern_TextureInfo(this.graph,"metallicRoughnessTextureInfo")
        })
    }
    getDoubleSided() {
        return this.get("doubleSided")
    }
    setDoubleSided(o) {
        return this.set("doubleSided", o)
    }
    getAlpha() {
        return this.get("baseColorFactor")[3]
    }
    setAlpha(o) {
        const c = this.get("baseColorFactor").slice();
        return c[3] = o,
        this.set("baseColorFactor", c)
    }
    getAlphaMode() {
        return this.get("alphaMode")
    }
    setAlphaMode(o) {
        return this.set("alphaMode", o)
    }
    getAlphaCutoff() {
        return this.get("alphaCutoff")
    }
    setAlphaCutoff(o) {
        return this.set("alphaCutoff", o)
    }
    getBaseColorFactor() {
        return this.get("baseColorFactor")
    }
    setBaseColorFactor(o) {
        return this.set("baseColorFactor", o)
    }
    getBaseColorTexture() {
        return this.getRef("baseColorTexture")
    }
    getBaseColorTextureInfo() {
        return this.getRef("baseColorTexture") ? this.getRef("baseColorTextureInfo") : null
    }
    setBaseColorTexture(o) {
        return this.setRef("baseColorTexture", o, {
            channels: index_modern_R | index_modern_G | index_modern_B | index_modern_A,
            isColor: !0
        })
    }
    getEmissiveFactor() {
        return this.get("emissiveFactor")
    }
    setEmissiveFactor(o) {
        return this.set("emissiveFactor", o)
    }
    getEmissiveTexture() {
        return this.getRef("emissiveTexture")
    }
    getEmissiveTextureInfo() {
        return this.getRef("emissiveTexture") ? this.getRef("emissiveTextureInfo") : null
    }
    setEmissiveTexture(o) {
        return this.setRef("emissiveTexture", o, {
            channels: index_modern_R | index_modern_G | index_modern_B,
            isColor: !0
        })
    }
    getNormalScale() {
        return this.get("normalScale")
    }
    setNormalScale(o) {
        return this.set("normalScale", o)
    }
    getNormalTexture() {
        return this.getRef("normalTexture")
    }
    getNormalTextureInfo() {
        return this.getRef("normalTexture") ? this.getRef("normalTextureInfo") : null
    }
    setNormalTexture(o) {
        return this.setRef("normalTexture", o, {
            channels: index_modern_R | index_modern_G | index_modern_B
        })
    }
    getOcclusionStrength() {
        return this.get("occlusionStrength")
    }
    setOcclusionStrength(o) {
        return this.set("occlusionStrength", o)
    }
    getOcclusionTexture() {
        return this.getRef("occlusionTexture")
    }
    getOcclusionTextureInfo() {
        return this.getRef("occlusionTexture") ? this.getRef("occlusionTextureInfo") : null
    }
    setOcclusionTexture(o) {
        return this.setRef("occlusionTexture", o, {
            channels: index_modern_R
        })
    }
    getRoughnessFactor() {
        return this.get("roughnessFactor")
    }
    setRoughnessFactor(o) {
        return this.set("roughnessFactor", o)
    }
    getMetallicFactor() {
        return this.get("metallicFactor")
    }
    setMetallicFactor(o) {
        return this.set("metallicFactor", o)
    }
    getMetallicRoughnessTexture() {
        return this.getRef("metallicRoughnessTexture")
    }
    getMetallicRoughnessTextureInfo() {
        return this.getRef("metallicRoughnessTexture") ? this.getRef("metallicRoughnessTextureInfo") : null
    }
    setMetallicRoughnessTexture(o) {
        return this.setRef("metallicRoughnessTexture", o, {
            channels: index_modern_G | index_modern_B
        })
    }
}

export default index_modern_Material;
