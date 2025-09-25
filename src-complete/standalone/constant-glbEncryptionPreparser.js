/* Standalone Constant: glbEncryptionPreparser */

const glbEncryptionPreparser = {
    key: (d, o, c) => d.key || window && window.prompt && window.prompt("GLTFEncryption: Please enter the password/key for the model: " + c) || "",
    async process(d, o) {
        var c;
        if (typeof d == "string" || !new TextDecoder().decode(new Uint8Array(d,0,100)).includes("WebGiGLBWrapper"))
            return d;
        const h = new GLTFBinaryExtension(d)
          , _ = JSON.parse(h.content || "{}");
        let b = h.body || d;
        const _e = (c = _.asset) === null || c === void 0 ? void 0 : c.encryption;
        if (!_e)
            return b;
        const nt = _e.type
          , it = _e.version;
        if (nt === "aesgcm" && it === 1) {
            const at = await Ee$1(this.key, _e, _, o) || "";
            try {
                b = (await Pe$1(new Uint8Array(b), at)).buffer
            } catch {
                throw new ErrorEvent("decryption error")
            }
        }
        return b
    }
};

export default glbEncryptionPreparser;
