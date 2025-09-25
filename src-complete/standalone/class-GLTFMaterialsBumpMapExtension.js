/* Standalone Class: GLTFMaterialsBumpMapExtension */

class GLTFMaterialsBumpMapExtension {
    constructor(o) {
        this.parser = o,
        this.name = GLTFMaterialsBumpMapExtensionName
    }
    async extendMaterialParams(o, c) {
        const h = this.parser
          , _ = h.json.materials[o];
        if (!_.extensions || !_.extensions[this.name])
            return Promise.resolve();
        const b = []
          , _e = _.extensions[this.name];
        return _e.bumpScale !== void 0 && (c.bumpScale = _e.bumpScale),
        _e.bumpTexture !== void 0 && b.push(h.assignTexture(c, "bumpMap", _e.bumpTexture)),
        Promise.all(b)
    }
}

export default GLTFMaterialsBumpMapExtension;
