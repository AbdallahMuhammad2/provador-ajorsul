/* Standalone Class: GLTFMaterialsClearcoatExtension */

class GLTFMaterialsClearcoatExtension {
    constructor(o) {
        this.parser = o,
        this.name = EXTENSIONS.KHR_MATERIALS_CLEARCOAT
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
        if (_e.clearcoatFactor !== void 0 && (c.clearcoat = _e.clearcoatFactor),
        _e.clearcoatTexture !== void 0 && b.push(h.assignTexture(c, "clearcoatMap", _e.clearcoatTexture)),
        _e.clearcoatRoughnessFactor !== void 0 && (c.clearcoatRoughness = _e.clearcoatRoughnessFactor),
        _e.clearcoatRoughnessTexture !== void 0 && b.push(h.assignTexture(c, "clearcoatRoughnessMap", _e.clearcoatRoughnessTexture)),
        _e.clearcoatNormalTexture !== void 0 && (b.push(h.assignTexture(c, "clearcoatNormalMap", _e.clearcoatNormalTexture)),
        _e.clearcoatNormalTexture.scale !== void 0)) {
            const nt = _e.clearcoatNormalTexture.scale;
            c.clearcoatNormalScale = new three_module.I9Y(nt,nt)
        }
        return Promise.all(b)
    }
}

export default GLTFMaterialsClearcoatExtension;
