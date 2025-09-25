/* Standalone Class: KHRMaterialsDiffuseTransmission */

class KHRMaterialsDiffuseTransmission extends Extension {
    constructor(...o) {
        super(...o),
        this.extensionName = NAME$f
    }
    createDiffuseTransmission() {
        return new DiffuseTransmission(this.document.getGraph())
    }
    read(o) {
        const c = o.jsonDoc
          , h = c.json.materials || []
          , _ = c.json.textures || [];
        return h.forEach( (b, _e) => {
            if (b.extensions && b.extensions[NAME$f]) {
                const nt = this.createDiffuseTransmission();
                o.materials[_e].setExtension(NAME$f, nt);
                const it = b.extensions[NAME$f];
                if (it.diffuseTransmissionFactor !== void 0 && nt.setDiffuseTransmissionFactor(it.diffuseTransmissionFactor),
                it.diffuseTransmissionColorFactor !== void 0 && nt.setDiffuseTransmissionColorFactor(it.diffuseTransmissionColorFactor),
                it.diffuseTransmissionTexture !== void 0) {
                    const at = it.diffuseTransmissionTexture
                      , ut = o.textures[_[at.index].source];
                    nt.setDiffuseTransmissionTexture(ut),
                    o.setTextureInfo(nt.getDiffuseTransmissionTextureInfo(), at)
                }
                if (it.diffuseTransmissionColorTexture !== void 0) {
                    const at = it.diffuseTransmissionColorTexture
                      , ut = o.textures[_[at.index].source];
                    nt.setDiffuseTransmissionColorTexture(ut),
                    o.setTextureInfo(nt.getDiffuseTransmissionColorTextureInfo(), at)
                }
            }
        }
        ),
        this
    }
    write(o) {
        const c = o.jsonDoc;
        for (const h of this.document.getRoot().listMaterials()) {
            const _ = h.getExtension(NAME$f);
            if (!_)
                continue;
            const b = o.materialIndexMap.get(h)
              , _e = c.json.materials[b];
            _e.extensions = _e.extensions || {};
            const nt = _e.extensions[NAME$f] = {
                diffuseTransmissionFactor: _.getDiffuseTransmissionFactor(),
                diffuseTransmissionColorFactor: _.getDiffuseTransmissionColorFactor()
            };
            if (_.getDiffuseTransmissionTexture()) {
                const it = _.getDiffuseTransmissionTexture()
                  , at = _.getDiffuseTransmissionTextureInfo();
                nt.diffuseTransmissionTexture = o.createTextureInfoDef(it, at)
            }
            if (_.getDiffuseTransmissionColorTexture()) {
                const it = _.getDiffuseTransmissionColorTexture()
                  , at = _.getDiffuseTransmissionColorTextureInfo();
                nt.diffuseTransmissionColorTexture = o.createTextureInfoDef(it, at)
            }
        }
        return this
    }
}

export default KHRMaterialsDiffuseTransmission;
