/* Standalone Class: GLTFMaterialsLightMapExtensionExport */

class GLTFMaterialsLightMapExtensionExport {
    constructor(o) {
        this.writer = o,
        this.name = GLTFMaterialsLightMapExtensionName
    }
    writeMaterial(o, c) {
        if (!o.isMeshStandardMaterial || o.lightMapIntensity === 0)
            return;
        const h = this.writer
          , _ = h.extensionsUsed
          , b = {};
        if (b.lightMapIntensity = o.lightMapIntensity,
        o.lightMap && h.checkEmptyMap(o.lightMap)) {
            const _e = {
                index: h.processTexture(o.lightMap)
            };
            h.applyTextureTransform(_e, o.lightMap),
            b.lightMapTexture = _e
        }
        c.extensions = c.extensions || {},
        c.extensions[this.name] = b,
        _[this.name] = !0
    }
}

export default GLTFMaterialsLightMapExtensionExport;
