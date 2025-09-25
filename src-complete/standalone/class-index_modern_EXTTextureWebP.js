/* Standalone Class: index_modern_EXTTextureWebP */

class index_modern_EXTTextureWebP extends Extension {
    constructor(...o) {
        super(...o),
        this.extensionName = NAME$l,
        this.prereadTypes = [index_modern_PropertyType.TEXTURE]
    }
    static register() {
        index_modern_ImageUtils.registerFormat("image/webp", new WEBPImageUtils)
    }
    preread(o) {
        return (o.jsonDoc.json.textures || []).forEach(c => {
            c.extensions && c.extensions[NAME$l] && (c.source = c.extensions[NAME$l].source)
        }
        ),
        this
    }
    read(o) {
        return this
    }
    write(o) {
        const c = o.jsonDoc;
        return this.document.getRoot().listTextures().forEach(h => {
            if (h.getMimeType() === "image/webp") {
                const _ = o.imageIndexMap.get(h);
                (c.json.textures || []).forEach(b => {
                    b.source === _ && (b.extensions = b.extensions || {},
                    b.extensions[NAME$l] = {
                        source: b.source
                    },
                    delete b.source)
                }
                )
            }
        }
        ),
        this
    }
}

export default index_modern_EXTTextureWebP;
