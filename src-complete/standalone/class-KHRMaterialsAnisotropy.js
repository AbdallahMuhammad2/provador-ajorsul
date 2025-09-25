/* Standalone Class: KHRMaterialsAnisotropy */

class KHRMaterialsAnisotropy extends Extension {
    constructor(...o) {
        super(...o),
        this.extensionName = NAME$h,
        this.prereadTypes = [index_modern_PropertyType.MESH],
        this.prewriteTypes = [index_modern_PropertyType.MESH]
    }
    createAnisotropy() {
        return new Anisotropy(this.document.getGraph())
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
            if (b.extensions && b.extensions[NAME$h]) {
                const nt = this.createAnisotropy();
                o.materials[_e].setExtension(NAME$h, nt);
                const it = b.extensions[NAME$h];
                if (it.anisotropyStrength !== void 0 && nt.setAnisotropyStrength(it.anisotropyStrength),
                it.anisotropyRotation !== void 0 && nt.setAnisotropyRotation(it.anisotropyRotation),
                it.anisotropyTexture !== void 0) {
                    const at = it.anisotropyTexture
                      , ut = o.textures[_[at.index].source];
                    nt.setAnisotropyTexture(ut),
                    o.setTextureInfo(nt.getAnisotropyTextureInfo(), at)
                }
            }
        }
        ),
        this
    }
    prewrite(o) {
        const c = o.jsonDoc;
        return this.document.getRoot().listMaterials().forEach(h => {
            const _ = h.getExtension(NAME$h);
            if (_) {
                const b = o.materialIndexMap.get(h)
                  , _e = c.json.materials[b];
                _e.extensions = _e.extensions || {};
                const nt = _e.extensions[NAME$h] = {};
                if (_.getAnisotropyStrength() > 0 && (nt.anisotropyStrength = _.getAnisotropyStrength()),
                _.getAnisotropyRotation() !== 0 && (nt.anisotropyRotation = _.getAnisotropyRotation()),
                _.getAnisotropyTexture()) {
                    const it = _.getAnisotropyTexture()
                      , at = _.getAnisotropyTextureInfo();
                    nt.anisotropyTexture = o.createTextureInfoDef(it, at)
                }
            }
        }
        ),
        this
    }
}

export default KHRMaterialsAnisotropy;
