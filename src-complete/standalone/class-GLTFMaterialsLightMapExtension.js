/* Standalone Class: GLTFMaterialsLightMapExtension */

class GLTFMaterialsLightMapExtension {
    constructor(o) {
        this.parser = o,
        this.name = GLTFMaterialsLightMapExtensionName
    }
    async extendMaterialParams(o, c) {
        const h = this.parser
          , _ = h.json.materials[o];
        if (!_.extensions || !_.extensions[this.name])
            return Promise.resolve();
        const b = []
          , _e = _.extensions[this.name];
        return _e.lightMapIntensity !== void 0 && (c.lightMapIntensity = _e.lightMapIntensity),
        _e.lightMapTexture !== void 0 && b.push(h.assignTexture(c, "lightMap", _e.lightMapTexture)),
        Promise.all(b)
    }
}

export default GLTFMaterialsLightMapExtension;
