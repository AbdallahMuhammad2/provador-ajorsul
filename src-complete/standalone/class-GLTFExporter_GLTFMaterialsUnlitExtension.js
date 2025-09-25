/* Standalone Class: GLTFExporter_GLTFMaterialsUnlitExtension */

class GLTFExporter_GLTFMaterialsUnlitExtension {
    constructor(o) {
        this.writer = o,
        this.name = "KHR_materials_unlit"
    }
    writeMaterial(o, c) {
        if (!o.isMeshBasicMaterial)
            return;
        const h = this.writer.extensionsUsed;
        c.extensions = c.extensions || {},
        c.extensions[this.name] = {},
        h[this.name] = !0,
        c.pbrMetallicRoughness.metallicFactor = 0,
        c.pbrMetallicRoughness.roughnessFactor = .9
    }
}

export default GLTFExporter_GLTFMaterialsUnlitExtension;
