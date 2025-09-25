/* Standalone Class: GLTFMaterialsAnisotropyExtension */

class GLTFMaterialsAnisotropyExtension {
    constructor(o) {
        this.parser = o,
        this.name = EXTENSIONS.KHR_MATERIALS_ANISOTROPY
    }
    getMaterialType(o) {
        const c = this.parser.json.materials[o];
        return c.extensions && c.extensions[this.name] ? three_module.uSd : null
    }
    extendMaterialParams(o, c) {
        const h = this.parser
          , _ = h.json.materials[o];
        if (!_.extensions || !_.extensions[this.name])
            return Promise.resolve();
        const b = []
          , _e = _.extensions[this.name];
        return _e.anisotropyStrength !== void 0 && (c.anisotropy = _e.anisotropyStrength),
        _e.anisotropyRotation !== void 0 && (c.anisotropyRotation = _e.anisotropyRotation),
        _e.anisotropyTexture !== void 0 && b.push(h.assignTexture(c, "anisotropyMap", _e.anisotropyTexture)),
        Promise.all(b)
    }
}

export default GLTFMaterialsAnisotropyExtension;
