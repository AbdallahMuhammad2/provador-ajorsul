/* Standalone Class: KHRMaterialsClearcoat */

class KHRMaterialsClearcoat extends Extension {
    constructor(...o) {
        super(...o),
        this.extensionName = NAME$g,
        this.prereadTypes = [index_modern_PropertyType.MESH],
        this.prewriteTypes = [index_modern_PropertyType.MESH]
    }
    createClearcoat() {
        return new Clearcoat(this.document.getGraph())
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
            if (b.extensions && b.extensions[NAME$g]) {
                const nt = this.createClearcoat();
                o.materials[_e].setExtension(NAME$g, nt);
                const it = b.extensions[NAME$g];
                if (it.clearcoatFactor !== void 0 && nt.setClearcoatFactor(it.clearcoatFactor),
                it.clearcoatRoughnessFactor !== void 0 && nt.setClearcoatRoughnessFactor(it.clearcoatRoughnessFactor),
                it.clearcoatTexture !== void 0) {
                    const at = it.clearcoatTexture
                      , ut = o.textures[_[at.index].source];
                    nt.setClearcoatTexture(ut),
                    o.setTextureInfo(nt.getClearcoatTextureInfo(), at)
                }
                if (it.clearcoatRoughnessTexture !== void 0) {
                    const at = it.clearcoatRoughnessTexture
                      , ut = o.textures[_[at.index].source];
                    nt.setClearcoatRoughnessTexture(ut),
                    o.setTextureInfo(nt.getClearcoatRoughnessTextureInfo(), at)
                }
                if (it.clearcoatNormalTexture !== void 0) {
                    const at = it.clearcoatNormalTexture
                      , ut = o.textures[_[at.index].source];
                    nt.setClearcoatNormalTexture(ut),
                    o.setTextureInfo(nt.getClearcoatNormalTextureInfo(), at),
                    at.scale !== void 0 && nt.setClearcoatNormalScale(at.scale)
                }
            }
        }
        ),
        this
    }
    prewrite(o) {
        const c = o.jsonDoc;
        return this.document.getRoot().listMaterials().forEach(h => {
            const _ = h.getExtension(NAME$g);
            if (_) {
                const b = o.materialIndexMap.get(h)
                  , _e = c.json.materials[b];
                _e.extensions = _e.extensions || {};
                const nt = _e.extensions[NAME$g] = {
                    clearcoatFactor: _.getClearcoatFactor(),
                    clearcoatRoughnessFactor: _.getClearcoatRoughnessFactor()
                };
                if (_.getClearcoatTexture()) {
                    const it = _.getClearcoatTexture()
                      , at = _.getClearcoatTextureInfo();
                    nt.clearcoatTexture = o.createTextureInfoDef(it, at)
                }
                if (_.getClearcoatRoughnessTexture()) {
                    const it = _.getClearcoatRoughnessTexture()
                      , at = _.getClearcoatRoughnessTextureInfo();
                    nt.clearcoatRoughnessTexture = o.createTextureInfoDef(it, at)
                }
                if (_.getClearcoatNormalTexture()) {
                    const it = _.getClearcoatNormalTexture()
                      , at = _.getClearcoatNormalTextureInfo();
                    nt.clearcoatNormalTexture = o.createTextureInfoDef(it, at),
                    _.getClearcoatNormalScale() !== 1 && (nt.clearcoatNormalTexture.scale = _.getClearcoatNormalScale())
                }
            }
        }
        ),
        this
    }
}

export default KHRMaterialsClearcoat;
