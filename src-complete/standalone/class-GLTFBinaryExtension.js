/* Standalone Class: GLTFBinaryExtension */

class GLTFBinaryExtension {
    constructor(o) {
        this.name = EXTENSIONS.KHR_BINARY_GLTF,
        this.content = null,
        this.body = null;
        const c = new DataView(o,0,BINARY_EXTENSION_HEADER_LENGTH)
          , h = new TextDecoder;
        if (this.header = {
            magic: h.decode(new Uint8Array(o.slice(0, 4))),
            version: c.getUint32(4, !0),
            length: c.getUint32(8, !0)
        },
        this.header.magic !== BINARY_EXTENSION_HEADER_MAGIC)
            throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");
        if (this.header.version < 2)
            throw new Error("THREE.GLTFLoader: Legacy binary file detected.");
        const _ = this.header.length - BINARY_EXTENSION_HEADER_LENGTH
          , b = new DataView(o,BINARY_EXTENSION_HEADER_LENGTH);
        let _e = 0;
        for (; _e < _; ) {
            const nt = b.getUint32(_e, !0);
            _e += 4;
            const it = b.getUint32(_e, !0);
            if (_e += 4,
            it === BINARY_EXTENSION_CHUNK_TYPES.JSON) {
                const at = new Uint8Array(o,BINARY_EXTENSION_HEADER_LENGTH + _e,nt);
                this.content = h.decode(at)
            } else if (it === BINARY_EXTENSION_CHUNK_TYPES.BIN) {
                const at = BINARY_EXTENSION_HEADER_LENGTH + _e;
                this.body = o.slice(at, at + nt)
            }
            _e += nt
        }
        if (this.content === null)
            throw new Error("THREE.GLTFLoader: JSON content not found.")
    }
}

export default GLTFBinaryExtension;
