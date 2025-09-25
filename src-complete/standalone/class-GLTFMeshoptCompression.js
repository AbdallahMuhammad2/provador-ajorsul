/* Standalone Class: GLTFMeshoptCompression */

class GLTFMeshoptCompression {
    constructor(o) {
        this.name = EXTENSIONS.EXT_MESHOPT_COMPRESSION,
        this.parser = o
    }
    loadBufferView(o) {
        const c = this.parser.json
          , h = c.bufferViews[o];
        if (h.extensions && h.extensions[this.name]) {
            const _ = h.extensions[this.name]
              , b = this.parser.getDependency("buffer", _.buffer)
              , _e = this.parser.options.meshoptDecoder;
            if (!_e || !_e.supported) {
                if (c.extensionsRequired && c.extensionsRequired.indexOf(this.name) >= 0)
                    throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");
                return null
            }
            return b.then(function(nt) {
                const it = _.byteOffset || 0
                  , at = _.byteLength || 0
                  , ut = _.count
                  , pt = _.byteStride
                  , ht = new Uint8Array(nt,it,at);
                return _e.decodeGltfBufferAsync ? _e.decodeGltfBufferAsync(ut, pt, ht, _.mode, _.filter).then(function(_t) {
                    return _t.buffer
                }) : _e.ready.then(function() {
                    const _t = new ArrayBuffer(ut * pt);
                    return _e.decodeGltfBuffer(new Uint8Array(_t), ut, pt, ht, _.mode, _.filter),
                    _t
                })
            })
        }
        return null
    }
}

export default GLTFMeshoptCompression;
