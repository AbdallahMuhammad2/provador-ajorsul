/* Standalone Class: GLTFExporter_GLTFMaterialsAnisotropyExtension */

class GLTFExporter_GLTFMaterialsAnisotropyExtension {
    constructor(o) {
        this.writer = o,
        this.name = "KHR_materials_anisotropy"
    }
    writeMaterial(o, c) {
        if (!o.isMeshPhysicalMaterial || o.anisotropy == 0)
            return;
        const h = this.writer
          , _ = h.extensionsUsed
          , b = {};
        if (h.checkEmptyMap(o.anisotropyMap)) {
            const _e = {
                index: h.processTexture(o.anisotropyMap)
            };
            h.applyTextureTransform(_e, o.anisotropyMap),
            b.anisotropyTexture = _e
        }
        b.anisotropyStrength = o.anisotropy,
        b.anisotropyRotation = o.anisotropyRotation,
        c.extensions = c.extensions || {},
        c.extensions[this.name] = b,
        _[this.name] = !0
    }
}

export default GLTFExporter_GLTFMaterialsAnisotropyExtension;
