/* Standalone Class: index_modern_TextureInfo */

class index_modern_TextureInfo extends ExtensibleProperty {
    init() {
        this.propertyType = index_modern_PropertyType.TEXTURE_INFO
    }
    getDefaults() {
        return Object.assign(super.getDefaults(), {
            texCoord: 0,
            magFilter: null,
            minFilter: null,
            wrapS: index_modern_TextureInfo.WrapMode.REPEAT,
            wrapT: index_modern_TextureInfo.WrapMode.REPEAT
        })
    }
    getTexCoord() {
        return this.get("texCoord")
    }
    setTexCoord(o) {
        return this.set("texCoord", o)
    }
    getMagFilter() {
        return this.get("magFilter")
    }
    setMagFilter(o) {
        return this.set("magFilter", o)
    }
    getMinFilter() {
        return this.get("minFilter")
    }
    setMinFilter(o) {
        return this.set("minFilter", o)
    }
    getWrapS() {
        return this.get("wrapS")
    }
    setWrapS(o) {
        return this.set("wrapS", o)
    }
    getWrapT() {
        return this.get("wrapT")
    }
    setWrapT(o) {
        return this.set("wrapT", o)
    }
}

export default index_modern_TextureInfo;
