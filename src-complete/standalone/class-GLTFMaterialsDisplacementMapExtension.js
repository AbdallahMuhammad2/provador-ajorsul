/* Standalone Class: GLTFMaterialsDisplacementMapExtension */

class GLTFMaterialsDisplacementMapExtension {
    constructor(o) {
        this.parser = o,
        this.name = GLTFMaterialsDisplacementMapExtensionName
    }
    async extendMaterialParams(o, c) {
        const h = this.parser
          , _ = h.json.materials[o];
        if (!_.extensions || !_.extensions[this.name])
            return Promise.resolve();
        const b = []
          , _e = _.extensions[this.name];
        return _e.displacementScale !== void 0 && (c.displacementScale = _e.displacementScale),
        _e.displacementBias !== void 0 && (c.displacementBias = _e.displacementBias),
        _e.displacementTexture !== void 0 && b.push(h.assignTexture(c, "displacementMap", _e.displacementTexture)),
        Promise.all(b)
    }
}

export default GLTFMaterialsDisplacementMapExtension;
