/* Standalone Class: GLTFTextureAVIFExtension */

class GLTFTextureAVIFExtension {
    constructor(o) {
        this.parser = o,
        this.name = EXTENSIONS.EXT_TEXTURE_AVIF,
        this.isSupported = null
    }
    loadTexture(o) {
        const c = this.name
          , h = this.parser
          , _ = h.json
          , b = _.textures[o];
        if (!b.extensions || !b.extensions[c])
            return null;
        const _e = b.extensions[c]
          , nt = _.images[_e.source];
        let it = h.textureLoader;
        if (nt.uri) {
            const at = h.options.manager.getHandler(nt.uri);
            at !== null && (it = at)
        }
        return this.detectSupport().then(function(at) {
            if (at)
                return h.loadTextureImage(o, _e.source, it);
            if (_.extensionsRequired && _.extensionsRequired.indexOf(c) >= 0)
                throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");
            return h.loadTexture(o)
        })
    }
    detectSupport() {
        return this.isSupported || (this.isSupported = new Promise(function(o) {
            const c = new Image;
            c.src = "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",
            c.onload = c.onerror = function() {
                o(c.height === 1)
            }
        }
        )),
        this.isSupported
    }
}

export default GLTFTextureAVIFExtension;
