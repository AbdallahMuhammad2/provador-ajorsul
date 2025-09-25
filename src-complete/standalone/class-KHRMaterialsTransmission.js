/* Standalone Class: KHRMaterialsTransmission */

class KHRMaterialsTransmission extends Extension {
    constructor(...o) {
        super(...o),
        this.extensionName = NAME$7,
        this.prereadTypes = [index_modern_PropertyType.MESH],
        this.prewriteTypes = [index_modern_PropertyType.MESH]
    }
    createTransmission() {
        return new Transmission(this.document.getGraph())
    }
    read(o) {
        return this
    }
    write(o) {
        return this
    }
    preread(o) {
        const c = o.jsonDoc
          , h = c.json.materials || []
          , _ = c.json.textures || [];
        return h.forEach( (b, _e) => {
            if (b.extensions && b.extensions[NAME$7]) {
                const nt = this.createTransmission();
                o.materials[_e].setExtension(NAME$7, nt);
                const it = b.extensions[NAME$7];
                if (it.transmissionFactor !== void 0 && nt.setTransmissionFactor(it.transmissionFactor),
                it.transmissionTexture !== void 0) {
                    const at = it.transmissionTexture
                      , ut = o.textures[_[at.index].source];
                    nt.setTransmissionTexture(ut),
                    o.setTextureInfo(nt.getTransmissionTextureInfo(), at)
                }
            }
        }
        ),
        this
    }
    prewrite(o) {
        const c = o.jsonDoc;
        return this.document.getRoot().listMaterials().forEach(h => {
            const _ = h.getExtension(NAME$7);
            if (_) {
                const b = o.materialIndexMap.get(h)
                  , _e = c.json.materials[b];
                _e.extensions = _e.extensions || {};
                const nt = _e.extensions[NAME$7] = {
                    transmissionFactor: _.getTransmissionFactor()
                };
                if (_.getTransmissionTexture()) {
                    const it = _.getTransmissionTexture()
                      , at = _.getTransmissionTextureInfo();
                    nt.transmissionTexture = o.createTextureInfoDef(it, at)
                }
            }
        }
        ),
        this
    }
}

export default KHRMaterialsTransmission;
