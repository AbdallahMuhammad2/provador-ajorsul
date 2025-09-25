/* Standalone Class: GLTFExporter_GLTFMaterialsSheenExtension */

class GLTFExporter_GLTFMaterialsSheenExtension {
    constructor(o) {
        this.writer = o,
        this.name = "KHR_materials_sheen"
    }
    writeMaterial(o, c) {
        if (!o.isMeshPhysicalMaterial || o.sheen < .001)
            return;
        const h = this.writer
          , _ = h.extensionsUsed
          , b = {};
        if (h.checkEmptyMap(o.sheenRoughnessMap)) {
            const _e = {
                index: h.processTexture(o.sheenRoughnessMap),
                texCoord: o.sheenRoughnessMap.channel
            };
            h.applyTextureTransform(_e, o.sheenRoughnessMap),
            b.sheenRoughnessTexture = _e
        }
        if (h.checkEmptyMap(o.sheenColorMap)) {
            const _e = {
                index: h.processTexture(o.sheenColorMap),
                texCoord: o.sheenColorMap.channel
            };
            h.applyTextureTransform(_e, o.sheenColorMap),
            b.sheenColorTexture = _e
        }
        b.sheenRoughnessFactor = o.sheenRoughness,
        b.sheenColorFactor = o.sheenColor.toArray(),
        c.extensions = c.extensions || {},
        c.extensions[this.name] = b,
        c.extras = c.extras || {},
        c.extras.sheenFactor = o.sheen,
        _[this.name] = !0
    }
}

export default GLTFExporter_GLTFMaterialsSheenExtension;
