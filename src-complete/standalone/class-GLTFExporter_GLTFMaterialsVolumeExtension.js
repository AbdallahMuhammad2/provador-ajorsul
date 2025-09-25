/* Standalone Class: GLTFExporter_GLTFMaterialsVolumeExtension */

class GLTFExporter_GLTFMaterialsVolumeExtension {
    constructor(o) {
        this.writer = o,
        this.name = "KHR_materials_volume"
    }
    writeMaterial(o, c) {
        if (!o.isMeshPhysicalMaterial || o.transmission === 0)
            return;
        const h = this.writer
          , _ = h.extensionsUsed
          , b = {};
        if (b.thicknessFactor = o.thickness,
        h.checkEmptyMap(o.thicknessMap)) {
            const _e = {
                index: h.processTexture(o.thicknessMap),
                texCoord: o.thicknessMap.channel
            };
            h.applyTextureTransform(_e, o.thicknessMap),
            b.thicknessTexture = _e
        }
        b.attenuationDistance = o.attenuationDistance,
        b.attenuationColor = o.attenuationColor.toArray(),
        c.extensions = c.extensions || {},
        c.extensions[this.name] = b,
        _[this.name] = !0
    }
}

export default GLTFExporter_GLTFMaterialsVolumeExtension;
