/* Standalone Class: GLTFExporter_GLTFMaterialsTransmissionExtension */

class GLTFExporter_GLTFMaterialsTransmissionExtension {
    constructor(o) {
        this.writer = o,
        this.name = "KHR_materials_transmission"
    }
    writeMaterial(o, c) {
        if (!o.isMeshPhysicalMaterial || o.transmission === 0)
            return;
        const h = this.writer
          , _ = h.extensionsUsed
          , b = {};
        if (b.transmissionFactor = o.transmission,
        h.checkEmptyMap(o.transmissionMap)) {
            const _e = {
                index: h.processTexture(o.transmissionMap),
                texCoord: o.transmissionMap.channel
            };
            h.applyTextureTransform(_e, o.transmissionMap),
            b.transmissionTexture = _e
        }
        c.extensions = c.extensions || {},
        c.extensions[this.name] = b,
        _[this.name] = !0
    }
}

export default GLTFExporter_GLTFMaterialsTransmissionExtension;
