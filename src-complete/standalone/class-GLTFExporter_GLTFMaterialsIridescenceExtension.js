/* Standalone Class: GLTFExporter_GLTFMaterialsIridescenceExtension */

class GLTFExporter_GLTFMaterialsIridescenceExtension {
    constructor(o) {
        this.writer = o,
        this.name = "KHR_materials_iridescence"
    }
    writeMaterial(o, c) {
        if (!o.isMeshPhysicalMaterial || o.iridescence === 0)
            return;
        const h = this.writer
          , _ = h.extensionsUsed
          , b = {};
        if (b.iridescenceFactor = o.iridescence,
        h.checkEmptyMap(o.iridescenceMap)) {
            const _e = {
                index: h.processTexture(o.iridescenceMap),
                texCoord: o.iridescenceMap.channel
            };
            h.applyTextureTransform(_e, o.iridescenceMap),
            b.iridescenceTexture = _e
        }
        if (b.iridescenceIor = o.iridescenceIOR,
        b.iridescenceThicknessMinimum = o.iridescenceThicknessRange[0],
        b.iridescenceThicknessMaximum = o.iridescenceThicknessRange[1],
        h.checkEmptyMap(o.iridescenceThicknessMap)) {
            const _e = {
                index: h.processTexture(o.iridescenceThicknessMap),
                texCoord: o.iridescenceThicknessMap.channel
            };
            h.applyTextureTransform(_e, o.iridescenceThicknessMap),
            b.iridescenceThicknessTexture = _e
        }
        c.extensions = c.extensions || {},
        c.extensions[this.name] = b,
        _[this.name] = !0
    }
}

export default GLTFExporter_GLTFMaterialsIridescenceExtension;
