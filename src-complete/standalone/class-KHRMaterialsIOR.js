/* Standalone Class: KHRMaterialsIOR */

class KHRMaterialsIOR extends Extension {
    constructor(...o) {
        super(...o),
        this.extensionName = NAME$c,
        this.prereadTypes = [index_modern_PropertyType.MESH],
        this.prewriteTypes = [index_modern_PropertyType.MESH]
    }
    createIOR() {
        return new IOR(this.document.getGraph())
    }
    read(o) {
        return this
    }
    write(o) {
        return this
    }
    preread(o) {
        return (o.jsonDoc.json.materials || []).forEach( (c, h) => {
            if (c.extensions && c.extensions[NAME$c]) {
                const _ = this.createIOR();
                o.materials[h].setExtension(NAME$c, _);
                const b = c.extensions[NAME$c];
                b.ior !== void 0 && _.setIOR(b.ior)
            }
        }
        ),
        this
    }
    prewrite(o) {
        const c = o.jsonDoc;
        return this.document.getRoot().listMaterials().forEach(h => {
            const _ = h.getExtension(NAME$c);
            if (_) {
                const b = o.materialIndexMap.get(h)
                  , _e = c.json.materials[b];
                _e.extensions = _e.extensions || {},
                _e.extensions[NAME$c] = {
                    ior: _.getIOR()
                }
            }
        }
        ),
        this
    }
}

export default KHRMaterialsIOR;
