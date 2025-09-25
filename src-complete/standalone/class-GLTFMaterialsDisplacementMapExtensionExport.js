/* Standalone Class: GLTFMaterialsDisplacementMapExtensionExport */

class GLTFMaterialsDisplacementMapExtensionExport {
    constructor(o) {
        this.writer = o,
        this.name = GLTFMaterialsDisplacementMapExtensionName
    }
    writeMaterial(o, c) {
        if (!o.isMeshStandardMaterial || o.displacementScale === 0)
            return;
        const h = this.writer
          , _ = h.extensionsUsed
          , b = {};
        if (b.displacementScale = o.displacementScale,
        b.displacementBias = o.displacementBias,
        o.displacementMap && h.checkEmptyMap(o.displacementMap)) {
            const _e = {
                index: h.processTexture(o.displacementMap)
            };
            h.applyTextureTransform(_e, o.displacementMap),
            b.displacementTexture = _e
        }
        c.extensions = c.extensions || {},
        c.extensions[this.name] = b,
        _[this.name] = !0
    }
}

export default GLTFMaterialsDisplacementMapExtensionExport;
