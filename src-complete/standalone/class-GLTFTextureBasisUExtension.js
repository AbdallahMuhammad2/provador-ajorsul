/* Standalone Class: GLTFTextureBasisUExtension */

class GLTFTextureBasisUExtension {
    constructor(o) {
        this.parser = o,
        this.name = EXTENSIONS.KHR_TEXTURE_BASISU
    }
    loadTexture(o) {
        const c = this.parser
          , h = c.json
          , _ = h.textures[o];
        if (!_.extensions || !_.extensions[this.name])
            return null;
        const b = _.extensions[this.name]
          , _e = c.options.ktx2Loader;
        if (!_e) {
            if (h.extensionsRequired && h.extensionsRequired.indexOf(this.name) >= 0)
                throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");
            return null
        }
        return c.loadTextureImage(o, b.source, _e)
    }
}

export default GLTFTextureBasisUExtension;
