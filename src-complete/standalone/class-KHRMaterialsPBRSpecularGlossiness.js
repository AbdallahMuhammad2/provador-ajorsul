/* Standalone Class: KHRMaterialsPBRSpecularGlossiness */

class KHRMaterialsPBRSpecularGlossiness extends Extension {
    constructor(...o) {
        super(...o),
        this.extensionName = NAME$a,
        this.prereadTypes = [index_modern_PropertyType.MESH],
        this.prewriteTypes = [index_modern_PropertyType.MESH]
    }
    createPBRSpecularGlossiness() {
        return new PBRSpecularGlossiness(this.document.getGraph())
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
            if (b.extensions && b.extensions[NAME$a]) {
                const nt = this.createPBRSpecularGlossiness();
                o.materials[_e].setExtension(NAME$a, nt);
                const it = b.extensions[NAME$a];
                if (it.diffuseFactor !== void 0 && nt.setDiffuseFactor(it.diffuseFactor),
                it.specularFactor !== void 0 && nt.setSpecularFactor(it.specularFactor),
                it.glossinessFactor !== void 0 && nt.setGlossinessFactor(it.glossinessFactor),
                it.diffuseTexture !== void 0) {
                    const at = it.diffuseTexture
                      , ut = o.textures[_[at.index].source];
                    nt.setDiffuseTexture(ut),
                    o.setTextureInfo(nt.getDiffuseTextureInfo(), at)
                }
                if (it.specularGlossinessTexture !== void 0) {
                    const at = it.specularGlossinessTexture
                      , ut = o.textures[_[at.index].source];
                    nt.setSpecularGlossinessTexture(ut),
                    o.setTextureInfo(nt.getSpecularGlossinessTextureInfo(), at)
                }
            }
        }
        ),
        this
    }
    prewrite(o) {
        const c = o.jsonDoc;
        return this.document.getRoot().listMaterials().forEach(h => {
            const _ = h.getExtension(NAME$a);
            if (_) {
                const b = o.materialIndexMap.get(h)
                  , _e = c.json.materials[b];
                _e.extensions = _e.extensions || {};
                const nt = _e.extensions[NAME$a] = {
                    diffuseFactor: _.getDiffuseFactor(),
                    specularFactor: _.getSpecularFactor(),
                    glossinessFactor: _.getGlossinessFactor()
                };
                if (_.getDiffuseTexture()) {
                    const it = _.getDiffuseTexture()
                      , at = _.getDiffuseTextureInfo();
                    nt.diffuseTexture = o.createTextureInfoDef(it, at)
                }
                if (_.getSpecularGlossinessTexture()) {
                    const it = _.getSpecularGlossinessTexture()
                      , at = _.getSpecularGlossinessTextureInfo();
                    nt.specularGlossinessTexture = o.createTextureInfoDef(it, at)
                }
            }
        }
        ),
        this
    }
}

export default KHRMaterialsPBRSpecularGlossiness;
