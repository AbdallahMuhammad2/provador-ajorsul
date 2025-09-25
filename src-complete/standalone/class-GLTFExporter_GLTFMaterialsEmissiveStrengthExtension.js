/* Standalone Class: GLTFExporter_GLTFMaterialsEmissiveStrengthExtension */

class GLTFExporter_GLTFMaterialsEmissiveStrengthExtension {
    constructor(o) {
        this.writer = o,
        this.name = "KHR_materials_emissive_strength"
    }
    writeMaterial(o, c) {
        if (!o.isMeshStandardMaterial || o.emissiveIntensity === 1)
            return;
        const h = this.writer.extensionsUsed
          , _ = {};
        _.emissiveStrength = o.emissiveIntensity,
        c.extensions = c.extensions || {},
        c.extensions[this.name] = _,
        h[this.name] = !0
    }
}

export default GLTFExporter_GLTFMaterialsEmissiveStrengthExtension;
