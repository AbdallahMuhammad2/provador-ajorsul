/* Standalone Class: GLTFExporter_GLTFMaterialsSpecularExtension */

class GLTFExporter_GLTFMaterialsSpecularExtension {
    constructor(o) {
        this.writer = o,
        this.name = "KHR_materials_specular"
    }
    writeMaterial(o, c) {
        if (!o.isMeshPhysicalMaterial || o.specularIntensity === 1 && o.specularColor.equals(DEFAULT_SPECULAR_COLOR) && !o.specularIntensityMap && !o.specularColorTexture)
            return;
        const h = this.writer
          , _ = h.extensionsUsed
          , b = {};
        if (h.checkEmptyMap(o.specularIntensityMap)) {
            const _e = {
                index: h.processTexture(o.specularIntensityMap),
                texCoord: o.specularIntensityMap.channel
            };
            h.applyTextureTransform(_e, o.specularIntensityMap),
            b.specularTexture = _e
        }
        if (h.checkEmptyMap(o.specularColorMap)) {
            const _e = {
                index: h.processTexture(o.specularColorMap),
                texCoord: o.specularColorMap.channel
            };
            h.applyTextureTransform(_e, o.specularColorMap),
            b.specularColorTexture = _e
        }
        b.specularFactor = o.specularIntensity,
        b.specularColorFactor = o.specularColor.toArray(),
        c.extensions = c.extensions || {},
        c.extensions[this.name] = b,
        _[this.name] = !0
    }
}

export default GLTFExporter_GLTFMaterialsSpecularExtension;
