/* Standalone Class: index_modern_Texture */

class index_modern_Texture extends ExtensibleProperty {
    init() {
        this.propertyType = index_modern_PropertyType.TEXTURE
    }
    getDefaults() {
        return Object.assign(super.getDefaults(), {
            image: null,
            mimeType: "",
            uri: ""
        })
    }
    getMimeType() {
        return this.get("mimeType") || index_modern_ImageUtils.extensionToMimeType(index_modern_FileUtils.extension(this.get("uri")))
    }
    setMimeType(o) {
        return this.set("mimeType", o)
    }
    getURI() {
        return this.get("uri")
    }
    setURI(o) {
        this.set("uri", o);
        const c = index_modern_ImageUtils.extensionToMimeType(index_modern_FileUtils.extension(o));
        return c && this.set("mimeType", c),
        this
    }
    getImage() {
        return this.get("image")
    }
    setImage(o) {
        return this.set("image", index_modern_BufferUtils.assertView(o))
    }
    getSize() {
        const o = this.get("image");
        return o ? index_modern_ImageUtils.getSize(o, this.getMimeType()) : null
    }
}

export default index_modern_Texture;
