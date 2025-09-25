/* Standalone Class: KHRMaterialsSheen */

class KHRMaterialsSheen extends Extension {
    constructor(...o) {
        super(...o),
        this.extensionName = NAME$9,
        this.prereadTypes = [index_modern_PropertyType.MESH],
        this.prewriteTypes = [index_modern_PropertyType.MESH]
    }
    createSheen() {
        return new Sheen(this.document.getGraph())
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
            if (b.extensions && b.extensions[NAME$9]) {
                const nt = this.createSheen();
                o.materials[_e].setExtension(NAME$9, nt);
                const it = b.extensions[NAME$9];
                if (it.sheenColorFactor !== void 0 && nt.setSheenColorFactor(it.sheenColorFactor),
                it.sheenRoughnessFactor !== void 0 && nt.setSheenRoughnessFactor(it.sheenRoughnessFactor),
                it.sheenColorTexture !== void 0) {
                    const at = it.sheenColorTexture
                      , ut = o.textures[_[at.index].source];
                    nt.setSheenColorTexture(ut),
                    o.setTextureInfo(nt.getSheenColorTextureInfo(), at)
                }
                if (it.sheenRoughnessTexture !== void 0) {
                    const at = it.sheenRoughnessTexture
                      , ut = o.textures[_[at.index].source];
                    nt.setSheenRoughnessTexture(ut),
                    o.setTextureInfo(nt.getSheenRoughnessTextureInfo(), at)
                }
            }
        }
        ),
        this
    }
    prewrite(o) {
        const c = o.jsonDoc;
        return this.document.getRoot().listMaterials().forEach(h => {
            const _ = h.getExtension(NAME$9);
            if (_) {
                const b = o.materialIndexMap.get(h)
                  , _e = c.json.materials[b];
                _e.extensions = _e.extensions || {};
                const nt = _e.extensions[NAME$9] = {
                    sheenColorFactor: _.getSheenColorFactor(),
                    sheenRoughnessFactor: _.getSheenRoughnessFactor()
                };
                if (_.getSheenColorTexture()) {
                    const it = _.getSheenColorTexture()
                      , at = _.getSheenColorTextureInfo();
                    nt.sheenColorTexture = o.createTextureInfoDef(it, at)
                }
                if (_.getSheenRoughnessTexture()) {
                    const it = _.getSheenRoughnessTexture()
                      , at = _.getSheenRoughnessTextureInfo();
                    nt.sheenRoughnessTexture = o.createTextureInfoDef(it, at)
                }
            }
        }
        ),
        this
    }
}

export default KHRMaterialsSheen;
