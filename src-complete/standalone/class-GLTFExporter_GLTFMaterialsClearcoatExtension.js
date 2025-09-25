/* Standalone Class: GLTFExporter_GLTFMaterialsClearcoatExtension */

class GLTFExporter_GLTFMaterialsClearcoatExtension {
    constructor(o) {
        this.writer = o,
        this.name = "KHR_materials_clearcoat"
    }
    writeMaterial(o, c) {
        if (!o.isMeshPhysicalMaterial || o.clearcoat === 0)
            return;
        const h = this.writer
          , _ = h.extensionsUsed
          , b = {};
        if (b.clearcoatFactor = o.clearcoat,
        h.checkEmptyMap(o.clearcoatMap)) {
            const _e = {
                index: h.processTexture(o.clearcoatMap),
                texCoord: o.clearcoatMap.channel
            };
            h.applyTextureTransform(_e, o.clearcoatMap),
            b.clearcoatTexture = _e
        }
        if (b.clearcoatRoughnessFactor = o.clearcoatRoughness,
        h.checkEmptyMap(o.clearcoatRoughnessMap)) {
            const _e = {
                index: h.processTexture(o.clearcoatRoughnessMap),
                texCoord: o.clearcoatRoughnessMap.channel
            };
            h.applyTextureTransform(_e, o.clearcoatRoughnessMap),
            b.clearcoatRoughnessTexture = _e
        }
        if (h.checkEmptyMap(o.clearcoatNormalMap)) {
            const _e = {
                index: h.processTexture(o.clearcoatNormalMap),
                texCoord: o.clearcoatNormalMap.channel
            };
            h.applyTextureTransform(_e, o.clearcoatNormalMap),
            b.clearcoatNormalTexture = _e
        }
        c.extensions = c.extensions || {},
        c.extensions[this.name] = b,
        _[this.name] = !0
    }
}

export default GLTFExporter_GLTFMaterialsClearcoatExtension;
