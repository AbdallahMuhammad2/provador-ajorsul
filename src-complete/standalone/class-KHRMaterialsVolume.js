/* Standalone Class: KHRMaterialsVolume */

class KHRMaterialsVolume extends Extension {
    constructor(...o) {
        super(...o),
        this.extensionName = NAME$4,
        this.prereadTypes = [index_modern_PropertyType.MESH],
        this.prewriteTypes = [index_modern_PropertyType.MESH]
    }
    createVolume() {
        return new Volume(this.document.getGraph())
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
            if (b.extensions && b.extensions[NAME$4]) {
                const nt = this.createVolume();
                o.materials[_e].setExtension(NAME$4, nt);
                const it = b.extensions[NAME$4];
                if (it.thicknessFactor !== void 0 && nt.setThicknessFactor(it.thicknessFactor),
                it.attenuationDistance !== void 0 && nt.setAttenuationDistance(it.attenuationDistance),
                it.attenuationColor !== void 0 && nt.setAttenuationColor(it.attenuationColor),
                it.thicknessTexture !== void 0) {
                    const at = it.thicknessTexture
                      , ut = o.textures[_[at.index].source];
                    nt.setThicknessTexture(ut),
                    o.setTextureInfo(nt.getThicknessTextureInfo(), at)
                }
            }
        }
        ),
        this
    }
    prewrite(o) {
        const c = o.jsonDoc;
        return this.document.getRoot().listMaterials().forEach(h => {
            const _ = h.getExtension(NAME$4);
            if (_) {
                const b = o.materialIndexMap.get(h)
                  , _e = c.json.materials[b];
                _e.extensions = _e.extensions || {};
                const nt = _e.extensions[NAME$4] = {};
                if (_.getThicknessFactor() > 0 && (nt.thicknessFactor = _.getThicknessFactor()),
                Number.isFinite(_.getAttenuationDistance()) && (nt.attenuationDistance = _.getAttenuationDistance()),
                index_modern_MathUtils.eq(_.getAttenuationColor(), [1, 1, 1]) || (nt.attenuationColor = _.getAttenuationColor()),
                _.getThicknessTexture()) {
                    const it = _.getThicknessTexture()
                      , at = _.getThicknessTextureInfo();
                    nt.thicknessTexture = o.createTextureInfoDef(it, at)
                }
            }
        }
        ),
        this
    }
}

export default KHRMaterialsVolume;
