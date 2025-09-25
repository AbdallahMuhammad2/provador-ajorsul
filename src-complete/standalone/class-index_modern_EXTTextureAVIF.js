/* Standalone Class: index_modern_EXTTextureAVIF */

class index_modern_EXTTextureAVIF extends Extension {
    constructor(...o) {
        super(...o),
        this.extensionName = NAME$m,
        this.prereadTypes = [index_modern_PropertyType.TEXTURE]
    }
    static register() {
        index_modern_ImageUtils.registerFormat("image/avif", new AVIFImageUtils)
    }
    preread(o) {
        return (o.jsonDoc.json.textures || []).forEach(c => {
            c.extensions && c.extensions[NAME$m] && (c.source = c.extensions[NAME$m].source)
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
            if (h.getMimeType() === "image/avif") {
                const _ = o.imageIndexMap.get(h);
                (c.json.textures || []).forEach(b => {
                    b.source === _ && (b.extensions = b.extensions || {},
                    b.extensions[NAME$m] = {
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

export default index_modern_EXTTextureAVIF;
