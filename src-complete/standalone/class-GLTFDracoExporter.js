/* Standalone Class: GLTFDracoExporter */

class GLTFDracoExporter extends GLTFExporter2 {
    constructor(o) {
        super(),
        this._loadedLibs = !1,
        o = o || {
            method: index_modern_KHRDracoMeshCompression.EncoderMethod.EDGEBREAKER,
            encodeSpeed: 5
        },
        this._io = new WebIO().registerExtensions(ALL_EXTENSIONS).registerExtensions(ALL_WEBGI_EXTENSIONS),
        this._encoderOptions = o
    }
    preload() {
        return this._loadLibs(),
        this
    }
    async _loadLibs() {
        if (this._loadedLibs || !this.loader)
            return;
        const o = await Promise.all([this.loader.initEncoder(), this.loader.initDecoder()]);
        this._io.registerDependencies({
            "draco3d.encoder": o[0],
            "draco3d.decoder": o[1]
        }),
        this._loadedLibs = !0
    }
    async parseAsync(o, {compress: c=!1, dracoOptions: h, ..._}, b=!1) {
        if (!this.loader)
            return console.error("GLTFDracoExporter: No DRACOLoader2 instance provided"),
            super.parseAsync(o, _);
        await this._loadLibs();
        const _e = {
            ..._
        };
        c && (_e.externalImagesInExtras = !0);
        const nt = await new Promise( (at, ut) => this.parse(o, at, ut, _e))
          , it = await super.parseAsync(nt, _e);
        if (!c)
            return it;
        try {
            if (!nt)
                throw new Error("GLTFDracoExporter: gltf is null");
            let at = nt;
            const ut = at.byteLength || 1 / 0
              , pt = await (typeof at != "object" || at.byteLength ? this._io.readBinary(new Uint8Array(at)) : this._io.readJSON({
                json: at,
                resources: {}
            }));
            if (pt.createExtension(index_modern_KHRDracoMeshCompression).setRequired(!0).setEncoderOptions({
                ...this._encoderOptions,
                ...h ?? {}
            }),
            _e.exportExt === "glb")
                at = await this._io.writeBinary(pt),
                isFinite(ut) && console.log("DRACO Compression ratio: " + (at.byteLength / ut).toFixed(5));
            else {
                const _t = await this._io.writeJSON(pt);
                at = _t.json,
                Object.values(_t.resources).filter(vt => vt).length > 0 && (console.warn("DRACOExporter: extra resources in resources not supported properly"),
                at.resources = _t.resources)
            }
            at.__isGLTFOutput = !0;
            const ht = await super.parseAsync(at, _e);
            if (!ht)
                throw new Error("GLTFDracoExporter: blob is null");
            return ht.ext = "glb",
            ht.__uncompressed = it,
            ht
        } catch (at) {
            if (b)
                throw at;
            return console.error("Unable to compress glb with DRACO extension"),
            console.error(at),
            it
        }
    }
    addExtension(o) {
        return this._io.registerExtensions([o]),
        this
    }
    createAndAddExtension(o, c) {
        return this.addExtension(createGenericExtensionClass(o, c))
    }
}

export default GLTFDracoExporter;
