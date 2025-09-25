/* Standalone Class: PlatformIO */

class PlatformIO {
    constructor() {
        this._logger = Logger.DEFAULT_INSTANCE,
        this._extensions = new Set,
        this._dependencies = {},
        this._vertexLayout = VertexLayout.INTERLEAVED,
        this.lastReadBytes = 0,
        this.lastWriteBytes = 0
    }
    setLogger(o) {
        return this._logger = o,
        this
    }
    registerExtensions(o) {
        for (const c of o)
            this._extensions.add(c),
            c.register();
        return this
    }
    registerDependencies(o) {
        return Object.assign(this._dependencies, o),
        this
    }
    setVertexLayout(o) {
        return this._vertexLayout = o,
        this
    }
    async read(o) {
        return await this.readJSON(await this.readAsJSON(o))
    }
    async readAsJSON(o) {
        const c = await this.readURI(o, "view");
        this.lastReadBytes = c.byteLength;
        const h = isGLB(c) ? this._binaryToJSON(c) : {
            json: JSON.parse(index_modern_BufferUtils.decodeText(c)),
            resources: {}
        };
        return await this._readResourcesExternal(h, this.dirname(o)),
        this._readResourcesInternal(h),
        h
    }
    async readJSON(o) {
        return o = this._copyJSON(o),
        this._readResourcesInternal(o),
        GLTFReader.read(o, {
            extensions: Array.from(this._extensions),
            dependencies: this._dependencies,
            logger: this._logger
        })
    }
    async binaryToJSON(o) {
        const c = this._binaryToJSON(index_modern_BufferUtils.assertView(o));
        this._readResourcesInternal(c);
        const h = c.json;
        if (h.buffers && h.buffers.some(_ => isExternalBuffer(c, _)))
            throw new Error("Cannot resolve external buffers with binaryToJSON().");
        if (h.images && h.images.some(_ => isExternalImage(c, _)))
            throw new Error("Cannot resolve external images with binaryToJSON().");
        return c
    }
    async readBinary(o) {
        return this.readJSON(await this.binaryToJSON(index_modern_BufferUtils.assertView(o)))
    }
    async writeJSON(o, c={}) {
        if (c.format === Format.GLB && o.getRoot().listBuffers().length > 1)
            throw new Error("GLB must have 0–1 buffers.");
        return index_modern_GLTFWriter.write(o, {
            format: c.format || Format.GLTF,
            basename: c.basename || "",
            logger: this._logger,
            vertexLayout: this._vertexLayout,
            dependencies: index_modern_extends({}, this._dependencies),
            extensions: Array.from(this._extensions)
        })
    }
    async writeBinary(o) {
        const {json: c, resources: h} = await this.writeJSON(o, {
            format: Format.GLB
        })
          , _ = new Uint32Array([1179937895, 2, 12])
          , b = JSON.stringify(c)
          , _e = index_modern_BufferUtils.pad(index_modern_BufferUtils.encodeText(b), 32)
          , nt = index_modern_BufferUtils.toView(new Uint32Array([_e.byteLength, 1313821514]))
          , it = index_modern_BufferUtils.concat([nt, _e]);
        _[_.length - 1] += it.byteLength;
        const at = Object.values(h)[0];
        if (!at || !at.byteLength)
            return index_modern_BufferUtils.concat([index_modern_BufferUtils.toView(_), it]);
        const ut = index_modern_BufferUtils.pad(at, 0)
          , pt = index_modern_BufferUtils.toView(new Uint32Array([ut.byteLength, 5130562]))
          , ht = index_modern_BufferUtils.concat([pt, ut]);
        return _[_.length - 1] += ht.byteLength,
        index_modern_BufferUtils.concat([index_modern_BufferUtils.toView(_), it, ht])
    }
    async _readResourcesExternal(o, c) {
        var h = this;
        const _ = [...o.json.images || [], ...o.json.buffers || []].map(async function(b) {
            const _e = b.uri;
            if (!_e || _e.match(/data:/))
                return Promise.resolve();
            o.resources[_e] = await h.readURI(h.resolve(c, _e), "view"),
            h.lastReadBytes += o.resources[_e].byteLength
        });
        await Promise.all(_)
    }
    _readResourcesInternal(o) {
        function c(h) {
            if (h.uri) {
                if (h.uri in o.resources)
                    index_modern_BufferUtils.assertView(o.resources[h.uri]);
                else if (h.uri.match(/data:/)) {
                    const _ = `__${index_modern_uuid()}.${index_modern_FileUtils.extension(h.uri)}`;
                    o.resources[_] = index_modern_BufferUtils.createBufferFromDataURI(h.uri),
                    h.uri = _
                }
            }
        }
        (o.json.images || []).forEach(h => {
            if (h.bufferView === void 0 && h.uri === void 0)
                throw new Error("Missing resource URI or buffer view.");
            c(h)
        }
        ),
        (o.json.buffers || []).forEach(c)
    }
    _copyJSON(o) {
        const {images: c, buffers: h} = o.json;
        return o = {
            json: index_modern_extends({}, o.json),
            resources: index_modern_extends({}, o.resources)
        },
        c && (o.json.images = c.map(_ => index_modern_extends({}, _))),
        h && (o.json.buffers = h.map(_ => index_modern_extends({}, _))),
        o
    }
    _binaryToJSON(o) {
        if (!isGLB(o))
            throw new Error("Invalid glTF 2.0 binary.");
        const c = new Uint32Array(o.buffer,o.byteOffset + 12,2);
        if (c[1] !== ChunkType.JSON)
            throw new Error("Missing required GLB JSON chunk.");
        const h = c[0]
          , _ = index_modern_BufferUtils.decodeText(index_modern_BufferUtils.toView(o, 20, h))
          , b = JSON.parse(_)
          , _e = 20 + h;
        if (o.byteLength <= _e)
            return {
                json: b,
                resources: {}
            };
        const nt = new Uint32Array(o.buffer,o.byteOffset + _e,2);
        if (nt[1] !== ChunkType.BIN)
            return {
                json: b,
                resources: {}
            };
        const it = nt[0]
          , at = index_modern_BufferUtils.toView(o, _e + 8, it);
        return {
            json: b,
            resources: {
                [GLB_BUFFER]: at
            }
        }
    }
}

export default PlatformIO;
