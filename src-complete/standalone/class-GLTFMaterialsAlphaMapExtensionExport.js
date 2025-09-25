/* Standalone Class: GLTFMaterialsAlphaMapExtensionExport */

class GLTFMaterialsAlphaMapExtensionExport {
    constructor(o) {
        this.writer = o,
        this.name = GLTFMaterialsAlphaMapExtensionName
    }
    writeMaterial(o, c) {
        if (!o.isMeshStandardMaterial || !o.alphaMap)
            return;
        const h = this.writer
          , _ = h.extensionsUsed
          , b = {};
        if (h.checkEmptyMap(o.alphaMap)) {
            const _e = {
                index: h.processTexture(o.alphaMap)
            };
            h.applyTextureTransform(_e, o.alphaMap),
            b.alphaTexture = _e
        }
        c.extensions = c.extensions || {},
        c.extensions[this.name] = b,
        _[this.name] = !0
    }
}

export default GLTFMaterialsAlphaMapExtensionExport;
