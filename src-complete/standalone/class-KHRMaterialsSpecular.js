/* Standalone Class: KHRMaterialsSpecular */

class KHRMaterialsSpecular extends Extension {
    constructor(...o) {
        super(...o),
        this.extensionName = NAME$8,
        this.prereadTypes = [index_modern_PropertyType.MESH],
        this.prewriteTypes = [index_modern_PropertyType.MESH]
    }
    createSpecular() {
        return new Specular(this.document.getGraph())
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
            if (b.extensions && b.extensions[NAME$8]) {
                const nt = this.createSpecular();
                o.materials[_e].setExtension(NAME$8, nt);
                const it = b.extensions[NAME$8];
                if (it.specularFactor !== void 0 && nt.setSpecularFactor(it.specularFactor),
                it.specularColorFactor !== void 0 && nt.setSpecularColorFactor(it.specularColorFactor),
                it.specularTexture !== void 0) {
                    const at = it.specularTexture
                      , ut = o.textures[_[at.index].source];
                    nt.setSpecularTexture(ut),
                    o.setTextureInfo(nt.getSpecularTextureInfo(), at)
                }
                if (it.specularColorTexture !== void 0) {
                    const at = it.specularColorTexture
                      , ut = o.textures[_[at.index].source];
                    nt.setSpecularColorTexture(ut),
                    o.setTextureInfo(nt.getSpecularColorTextureInfo(), at)
                }
            }
        }
        ),
        this
    }
    prewrite(o) {
        const c = o.jsonDoc;
        return this.document.getRoot().listMaterials().forEach(h => {
            const _ = h.getExtension(NAME$8);
            if (_) {
                const b = o.materialIndexMap.get(h)
                  , _e = c.json.materials[b];
                _e.extensions = _e.extensions || {};
                const nt = _e.extensions[NAME$8] = {};
                if (_.getSpecularFactor() !== 1 && (nt.specularFactor = _.getSpecularFactor()),
                index_modern_MathUtils.eq(_.getSpecularColorFactor(), [1, 1, 1]) || (nt.specularColorFactor = _.getSpecularColorFactor()),
                _.getSpecularTexture()) {
                    const it = _.getSpecularTexture()
                      , at = _.getSpecularTextureInfo();
                    nt.specularTexture = o.createTextureInfoDef(it, at)
                }
                if (_.getSpecularColorTexture()) {
                    const it = _.getSpecularColorTexture()
                      , at = _.getSpecularColorTextureInfo();
                    nt.specularColorTexture = o.createTextureInfoDef(it, at)
                }
            }
        }
        ),
        this
    }
}

export default KHRMaterialsSpecular;
