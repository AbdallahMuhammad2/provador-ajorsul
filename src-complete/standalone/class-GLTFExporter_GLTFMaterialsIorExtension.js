/* Standalone Class: GLTFExporter_GLTFMaterialsIorExtension */

class GLTFExporter_GLTFMaterialsIorExtension {
    constructor(o) {
        this.writer = o,
        this.name = "KHR_materials_ior"
    }
    writeMaterial(o, c) {
        if (!o.isMeshPhysicalMaterial || o.ior === 1.5)
            return;
        const h = this.writer.extensionsUsed
          , _ = {};
        _.ior = o.ior,
        c.extensions = c.extensions || {},
        c.extensions[this.name] = _,
        h[this.name] = !0
    }
}

export default GLTFExporter_GLTFMaterialsIorExtension;
