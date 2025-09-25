/* Standalone Class: zstddec_module_Q */

class zstddec_module_Q {
    init() {
        return zstddec_module_A || (zstddec_module_A = typeof fetch < "u" ? fetch("data:application/wasm;base64," + zstddec_module_C).then(o => o.arrayBuffer()).then(o => WebAssembly.instantiate(o, zstddec_module_g)).then(this._init) : WebAssembly.instantiate(Buffer.from(zstddec_module_C, "base64"), zstddec_module_g).then(this._init),
        zstddec_module_A)
    }
    _init(o) {
        zstddec_module_I = o.instance,
        zstddec_module_g.env.emscripten_notify_memory_growth(0)
    }
    decode(o, c=0) {
        if (!zstddec_module_I)
            throw new Error("ZSTDDecoder: Await .init() before decoding.");
        const h = o.byteLength
          , _ = zstddec_module_I.exports.malloc(h);
        zstddec_module_B.set(o, _),
        c = c || Number(zstddec_module_I.exports.ZSTD_findDecompressedSize(_, h));
        const b = zstddec_module_I.exports.malloc(c)
          , _e = zstddec_module_I.exports.ZSTD_decompress(b, c, _, h)
          , nt = zstddec_module_B.slice(b, b + _e);
        return zstddec_module_I.exports.free(_),
        zstddec_module_I.exports.free(b),
        nt
    }
}

export default zstddec_module_Q;
