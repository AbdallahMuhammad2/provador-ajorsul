/* Standalone Class: index_modern_KHRMaterialsUnlit */

class index_modern_KHRMaterialsUnlit extends Extension {
    constructor(...o) {
        super(...o),
        this.extensionName = NAME$6,
        this.prereadTypes = [index_modern_PropertyType.MESH],
        this.prewriteTypes = [index_modern_PropertyType.MESH]
    }
    createUnlit() {
        return new Unlit(this.document.getGraph())
    }
    read(o) {
        return this
    }
    write(o) {
        return this
    }
    preread(o) {
        return (o.jsonDoc.json.materials || []).forEach( (c, h) => {
            c.extensions && c.extensions[NAME$6] && o.materials[h].setExtension(NAME$6, this.createUnlit())
        }
        ),
        this
    }
    prewrite(o) {
        const c = o.jsonDoc;
        return this.document.getRoot().listMaterials().forEach(h => {
            if (h.getExtension(NAME$6)) {
                const _ = o.materialIndexMap.get(h)
                  , b = c.json.materials[_];
                b.extensions = b.extensions || {},
                b.extensions[NAME$6] = {}
            }
        }
        ),
        this
    }
}

export default index_modern_KHRMaterialsUnlit;
