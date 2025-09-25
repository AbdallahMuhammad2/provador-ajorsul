/* Standalone Class: KHRMaterialsDispersion */

class KHRMaterialsDispersion extends Extension {
    constructor(...o) {
        super(...o),
        this.extensionName = NAME$e,
        this.prereadTypes = [index_modern_PropertyType.MESH],
        this.prewriteTypes = [index_modern_PropertyType.MESH]
    }
    createDispersion() {
        return new Dispersion(this.document.getGraph())
    }
    read(o) {
        return this
    }
    write(o) {
        return this
    }
    preread(o) {
        return (o.jsonDoc.json.materials || []).forEach( (c, h) => {
            if (c.extensions && c.extensions[NAME$e]) {
                const _ = this.createDispersion();
                o.materials[h].setExtension(NAME$e, _);
                const b = c.extensions[NAME$e];
                b.dispersion !== void 0 && _.setDispersion(b.dispersion)
            }
        }
        ),
        this
    }
    prewrite(o) {
        const c = o.jsonDoc;
        return this.document.getRoot().listMaterials().forEach(h => {
            const _ = h.getExtension(NAME$e);
            if (_) {
                const b = o.materialIndexMap.get(h)
                  , _e = c.json.materials[b];
                _e.extensions = _e.extensions || {},
                _e.extensions[NAME$e] = {
                    dispersion: _.getDispersion()
                }
            }
        }
        ),
        this
    }
}

export default KHRMaterialsDispersion;
