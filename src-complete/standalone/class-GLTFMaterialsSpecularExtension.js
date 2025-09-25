/* Standalone Class: GLTFMaterialsSpecularExtension */

class GLTFMaterialsSpecularExtension {
    constructor(o) {
        this.parser = o,
        this.name = EXTENSIONS.KHR_MATERIALS_SPECULAR
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
        c.specularIntensity = _e.specularFactor !== void 0 ? _e.specularFactor : 1,
        _e.specularTexture !== void 0 && b.push(h.assignTexture(c, "specularIntensityMap", _e.specularTexture));
        const nt = _e.specularColorFactor || [1, 1, 1];
        return c.specularColor = new three_module.Q1f().setRGB(nt[0], nt[1], nt[2], three_module.Zr2),
        _e.specularColorTexture !== void 0 && b.push(h.assignTexture(c, "specularColorMap", _e.specularColorTexture, three_module.er$)),
        Promise.all(b)
    }
}

export default GLTFMaterialsSpecularExtension;
