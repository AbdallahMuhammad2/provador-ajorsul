/* Standalone Class: GLTFMaterialsBumpMapExtensionExport */

class GLTFMaterialsBumpMapExtensionExport {
    constructor(o) {
        this.writer = o,
        this.name = GLTFMaterialsBumpMapExtensionName
    }
    writeMaterial(o, c) {
        if (!o.isMeshStandardMaterial || o.bumpScale === 0)
            return;
        const h = this.writer
          , _ = h.extensionsUsed
          , b = {};
        if (b.bumpScale = o.bumpScale,
        o.bumpMap && h.checkEmptyMap(o.bumpMap)) {
            const _e = {
                index: h.processTexture(o.bumpMap)
            };
            h.applyTextureTransform(_e, o.bumpMap),
            b.bumpTexture = _e
        }
        c.extensions = c.extensions || {},
        c.extensions[this.name] = b,
        _[this.name] = !0
    }
}

export default GLTFMaterialsBumpMapExtensionExport;
