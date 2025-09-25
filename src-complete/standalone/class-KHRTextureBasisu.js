/* Standalone Class: KHRTextureBasisu */

class KHRTextureBasisu extends Extension {
    constructor(...o) {
        super(...o),
        this.extensionName = NAME$2,
        this.prereadTypes = [index_modern_PropertyType.TEXTURE]
    }
    static register() {
        index_modern_ImageUtils.registerFormat("image/ktx2", new KTX2ImageUtils)
    }
    preread(o) {
        return o.jsonDoc.json.textures.forEach(c => {
            if (c.extensions && c.extensions[NAME$2]) {
                const h = c.extensions[NAME$2];
                c.source = h.source
            }
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
            if (h.getMimeType() === "image/ktx2") {
                const _ = o.imageIndexMap.get(h);
                c.json.textures.forEach(b => {
                    b.source === _ && (b.extensions = b.extensions || {},
                    b.extensions[NAME$2] = {
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

export default KHRTextureBasisu;
