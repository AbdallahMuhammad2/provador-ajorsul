/* Standalone Class: GLTFMaterialsIridescenceExtension */

class GLTFMaterialsIridescenceExtension {
    constructor(o) {
        this.parser = o,
        this.name = EXTENSIONS.KHR_MATERIALS_IRIDESCENCE
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
        return _e.iridescenceFactor !== void 0 && (c.iridescence = _e.iridescenceFactor),
        _e.iridescenceTexture !== void 0 && b.push(h.assignTexture(c, "iridescenceMap", _e.iridescenceTexture)),
        _e.iridescenceIor !== void 0 && (c.iridescenceIOR = _e.iridescenceIor),
        c.iridescenceThicknessRange === void 0 && (c.iridescenceThicknessRange = [100, 400]),
        _e.iridescenceThicknessMinimum !== void 0 && (c.iridescenceThicknessRange[0] = _e.iridescenceThicknessMinimum),
        _e.iridescenceThicknessMaximum !== void 0 && (c.iridescenceThicknessRange[1] = _e.iridescenceThicknessMaximum),
        _e.iridescenceThicknessTexture !== void 0 && b.push(h.assignTexture(c, "iridescenceThicknessMap", _e.iridescenceThicknessTexture)),
        Promise.all(b)
    }
}

export default GLTFMaterialsIridescenceExtension;
