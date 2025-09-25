/* Standalone Class: GLTFMaterialsAlphaMapExtension */

class GLTFMaterialsAlphaMapExtension {
    constructor(o) {
        this.parser = o,
        this.name = GLTFMaterialsAlphaMapExtensionName
    }
    async extendMaterialParams(o, c) {
        const h = this.parser
          , _ = h.json.materials[o];
        if (!_.extensions || !_.extensions[this.name])
            return Promise.resolve();
        const b = []
          , _e = _.extensions[this.name];
        return _e.alphaTexture !== void 0 && b.push(h.assignTexture(c, "alphaMap", _e.alphaTexture)),
        Promise.all(b)
    }
}

export default GLTFMaterialsAlphaMapExtension;
