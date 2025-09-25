/* Standalone Class: KHRMaterialsEmissiveStrength */

class KHRMaterialsEmissiveStrength extends Extension {
    constructor(...o) {
        super(...o),
        this.extensionName = NAME$d,
        this.prereadTypes = [index_modern_PropertyType.MESH],
        this.prewriteTypes = [index_modern_PropertyType.MESH]
    }
    createEmissiveStrength() {
        return new EmissiveStrength(this.document.getGraph())
    }
    read(o) {
        return this
    }
    write(o) {
        return this
    }
    preread(o) {
        return (o.jsonDoc.json.materials || []).forEach( (c, h) => {
            if (c.extensions && c.extensions[NAME$d]) {
                const _ = this.createEmissiveStrength();
                o.materials[h].setExtension(NAME$d, _);
                const b = c.extensions[NAME$d];
                b.emissiveStrength !== void 0 && _.setEmissiveStrength(b.emissiveStrength)
            }
        }
        ),
        this
    }
    prewrite(o) {
        const c = o.jsonDoc;
        return this.document.getRoot().listMaterials().forEach(h => {
            const _ = h.getExtension(NAME$d);
            if (_) {
                const b = o.materialIndexMap.get(h)
                  , _e = c.json.materials[b];
                _e.extensions = _e.extensions || {},
                _e.extensions[NAME$d] = {
                    emissiveStrength: _.getEmissiveStrength()
                }
            }
        }
        ),
        this
    }
}

export default KHRMaterialsEmissiveStrength;
