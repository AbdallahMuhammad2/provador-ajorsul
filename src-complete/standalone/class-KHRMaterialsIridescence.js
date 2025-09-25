/* Standalone Class: KHRMaterialsIridescence */

class KHRMaterialsIridescence extends Extension {
    constructor(...o) {
        super(...o),
        this.extensionName = NAME$b,
        this.prereadTypes = [index_modern_PropertyType.MESH],
        this.prewriteTypes = [index_modern_PropertyType.MESH]
    }
    createIridescence() {
        return new Iridescence(this.document.getGraph())
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
            if (b.extensions && b.extensions[NAME$b]) {
                const nt = this.createIridescence();
                o.materials[_e].setExtension(NAME$b, nt);
                const it = b.extensions[NAME$b];
                if (it.iridescenceFactor !== void 0 && nt.setIridescenceFactor(it.iridescenceFactor),
                it.iridescenceIor !== void 0 && nt.setIridescenceIOR(it.iridescenceIor),
                it.iridescenceThicknessMinimum !== void 0 && nt.setIridescenceThicknessMinimum(it.iridescenceThicknessMinimum),
                it.iridescenceThicknessMaximum !== void 0 && nt.setIridescenceThicknessMaximum(it.iridescenceThicknessMaximum),
                it.iridescenceTexture !== void 0) {
                    const at = it.iridescenceTexture
                      , ut = o.textures[_[at.index].source];
                    nt.setIridescenceTexture(ut),
                    o.setTextureInfo(nt.getIridescenceTextureInfo(), at)
                }
                if (it.iridescenceThicknessTexture !== void 0) {
                    const at = it.iridescenceThicknessTexture
                      , ut = o.textures[_[at.index].source];
                    nt.setIridescenceThicknessTexture(ut),
                    o.setTextureInfo(nt.getIridescenceThicknessTextureInfo(), at)
                }
            }
        }
        ),
        this
    }
    prewrite(o) {
        const c = o.jsonDoc;
        return this.document.getRoot().listMaterials().forEach(h => {
            const _ = h.getExtension(NAME$b);
            if (_) {
                const b = o.materialIndexMap.get(h)
                  , _e = c.json.materials[b];
                _e.extensions = _e.extensions || {};
                const nt = _e.extensions[NAME$b] = {};
                if (_.getIridescenceFactor() > 0 && (nt.iridescenceFactor = _.getIridescenceFactor()),
                _.getIridescenceIOR() !== 1.3 && (nt.iridescenceIor = _.getIridescenceIOR()),
                _.getIridescenceThicknessMinimum() !== 100 && (nt.iridescenceThicknessMinimum = _.getIridescenceThicknessMinimum()),
                _.getIridescenceThicknessMaximum() !== 400 && (nt.iridescenceThicknessMaximum = _.getIridescenceThicknessMaximum()),
                _.getIridescenceTexture()) {
                    const it = _.getIridescenceTexture()
                      , at = _.getIridescenceTextureInfo();
                    nt.iridescenceTexture = o.createTextureInfoDef(it, at)
                }
                if (_.getIridescenceThicknessTexture()) {
                    const it = _.getIridescenceThicknessTexture()
                      , at = _.getIridescenceThicknessTextureInfo();
                    nt.iridescenceThicknessTexture = o.createTextureInfoDef(it, at)
                }
            }
        }
        ),
        this
    }
}

export default KHRMaterialsIridescence;
