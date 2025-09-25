/* Standalone Class: GLTFMaterialsTransmissionExtension */

class GLTFMaterialsTransmissionExtension {
    constructor(o) {
        this.parser = o,
        this.name = EXTENSIONS.KHR_MATERIALS_TRANSMISSION
    }
    getMaterialType(o) {
        const c = this.parser.json.materials[o];
        return c.extensions && c.extensions[this.name] ? GLTFLoader.ObjectConstructors.MeshPhysicalMaterial : null
    }
    extendMaterialParams(o, c) {
        const h = this.parser
          , _ = h.json.materials[o];
        if (!_.extensions || !_.extensions[this.name])
            return Promise.resolve();
        const b = []
          , _e = _.extensions[this.name];
        return _e.transmissionFactor !== void 0 && (c.transmission = _e.transmissionFactor),
        _e.transmissionTexture !== void 0 && b.push(h.assignTexture(c, "transmissionMap", _e.transmissionTexture)),
        Promise.all(b)
    }
}

export default GLTFMaterialsTransmissionExtension;
