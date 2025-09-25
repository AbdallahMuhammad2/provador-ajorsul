/* Standalone Constant: b */

const b = {
        data: new Array,
        totalSize: 0
    }
      , _e = o.width * o.numOutputChannels * o.blockLines * o.dataSize;
    switch (o.compression) {
    case 0:
        c = compressNONE;
        break;
    case 2:
    case 3:
        c = compressZIP
    }
    o.compression !== 0 && (h = new Uint8Array(_e));
    for (let nt = 0; nt < o.numBlocks; ++nt) {
        const it = c(d.subarray(_e * nt, _e * (nt + 1)), h);
        _ += it.length,
        b.data.push({
            dataChunk: it,
            size: it.length
        })
    }
    return b.totalSize = _,
    b
}
function compressNONE(d) {
    return d
}
function compressZIP(d, o) {
    let c = 0
      , h = Math.floor((d.length + 1) / 2)
      , _ = 0;
    const b = d.length - 1;
    for (; !(_ > b || (o[c++] = d[_++],
    _ > b)); )
        o[h++] = d[_++];
    let _e = o[0];
    for (let nt = 1; nt < o.length; nt++) {
        const it = o[nt] - _e + 384;
        _e = o[nt],
        o[nt] = it
    }
    return fflate_module_zlibSync(o)
}
function fillHeader(d, o, c) {
    const h = {
        value: 0
    }
      , _ = new DataView(d.buffer);
    setUint32(_, 20000630, h),
    setUint32(_, 2, h),
    setString(_, "compression", h),
    setString(_, "compression", h),
    setUint32(_, 1, h),
    setUint8(_, c.compression, h),
    setString(_, "screenWindowCenter", h),
    setString(_, "v2f", h),
    setUint32(_, 8, h),
    setUint32(_, 0, h),
    setUint32(_, 0, h),
    setString(_, "screenWindowWidth", h),
    setString(_, "float", h),
    setUint32(_, 4, h),
    setFloat32(_, 1, h),
    setString(_, "pixelAspectRatio", h),
    setString(_, "float", h),
    setUint32(_, 4, h),
    setFloat32(_, 1, h),
    setString(_, "lineOrder", h),
    setString(_, "lineOrder", h),
    setUint32(_, 1, h),
    setUint8(_, 0, h),
    setString(_, "dataWindow", h),
    setString(_, "box2i", h),
    setUint32(_, 16, h),
    setUint32(_, 0, h),
    setUint32(_, 0, h),
    setUint32(_, c.width - 1, h),
    setUint32(_, c.height - 1, h),
    setString(_, "displayWindow", h),
    setString(_, "box2i", h),
    setUint32(_, 16, h),
    setUint32(_, 0, h),
    setUint32(_, 0, h),
    setUint32(_, c.width - 1, h),
    setUint32(_, c.height - 1, h),
    setString(_, "channels", h),
    setString(_, "chlist", h),
    setUint32(_, 18 * c.numOutputChannels + 1, h),
    setString(_, "A", h),
    setUint32(_, c.dataType, h),
    h.value += 4,
    setUint32(_, 1, h),
    setUint32(_, 1, h),
    setString(_, "B", h),
    setUint32(_, c.dataType, h),
    h.value += 4,
    setUint32(_, 1, h),
    setUint32(_, 1, h),
    setString(_, "G", h),
    setUint32(_, c.dataType, h),
    h.value += 4,
    setUint32(_, 1, h),
    setUint32(_, 1, h),
    setString(_, "R", h),
    setUint32(_, c.dataType, h),
    h.value += 4,
    setUint32(_, 1, h),
    setUint32(_, 1, h),
    setUint8(_, 0, h),
    setUint8(_, 0, h);
    let b = h.value + 8 * c.numBlocks;
    for (let _e = 0; _e < o.data.length; ++_e)
        setUint64(_, b, h),
        b += o.data[_e].size + 8
}
function fillData(d, o) {
    const c = 8 * o.numBlocks
      , h = 259 + 18 * o.numOutputChannels
      , _ = {
        value: h + c
    }
      , b = new Uint8Array(h + c + d.totalSize + 8 * o.numBlocks)
      , _e = new DataView(b.buffer);
    fillHeader(b, d, o);
    for (let nt = 0; nt < d.data.length; ++nt) {
        const it = d.data[nt].dataChunk
          , at = d.data[nt].size;
        setUint32(_e, nt * o.blockLines, _),
        setUint32(_e, at, _),
        b.set(it, _.value),
        _.value += at
    }
    return b
}
function decodeLinear(d, o, c, h, _) {
    d.r = o,
    d.g = c,
    d.b = h,
    d.a = _
}
function setUint8(d, o, c) {
    d.setUint8(c.value, o),
    c.value += 1
}
function setUint32(d, o, c) {
    d.setUint32(c.value, o, !0),
    c.value += 4
}
function setFloat16(d, o, c) {
    d.setUint16(c.value, three_module.GxU.toHalfFloat(o), !0),
    c.value += 2
}
function setFloat32(d, o, c) {
    d.setFloat32(c.value, o, !0),
    c.value += 4
}
function setUint64(d, o, c) {
    d.setBigUint64(c.value, BigInt(o), !0),
    c.value += 8
}
function setString(d, o, c) {
    const h = textEncoder.encode(o + "\0");
    for (let _ = 0; _ < h.length; ++_)
        setUint8(d, h[_], c)
}
function decodeFloat16(d) {
    const o = (31744 & d) >> 10
      , c = 1023 & d;
    return (d >> 15 ? -1 : 1) * (o ? o === 31 ? c ? NaN : 1 / 0 : Math.pow(2, o - 15) * (1 + c / 1024) : c / 1024 * 6103515625e-14)
}
function getFloat16(d, o) {
    return decodeFloat16(d[o])
}
function getFloat32(d, o) {
    return d[o]
}
class EXRExporter2 extends EXRExporter {
    async parseAsync(o, c) {
        const h = o;
        if (h.isWebGLRenderTarget && !o.renderer)
            throw new Error("No renderManager on renderTarget");
        if (!h.isWebGLRenderTarget && !o.isDataTexture)
            throw new Error("Invalid object type");
        h.isWebGLMultipleRenderTargets && c.textureIndex === void 0 && console.warn("No textureIndex specified for WebGLMultipleRenderTargets");
        const _ = h.isWebGLRenderTarget ? this.parse(o.renderer.rendererObject, h, c) : this.parse(o, c);
        return new Blob([_],{
            type: "image/x-exr"
        })
    }
}
class AssetExporter extends I$2 {
    get processors() {
        return this._processors
    }
    getExporter(...o) {
        return this.Exporters.find(c => c.ext.some(h => o.includes(h)))
    }
    constructor(o, c={}) {
        super(),
        this._processors = new ObjectProcessorMap,
        this.Exporters = [{
            ctor: () => new SimpleJSONExporter,
            ext: ["json"]
        }, {
            ctor: () => new SimpleTextExporter,
            ext: ["txt", "text"]
        }, {
            ctor: () => new EXRExporter2,
            ext: ["exr"]
        }],
        this._cachedParsers = [],
        addGLTFExporter(this, o)
    }
    async exportObject(o, c={}) {
        var h, _;
        if (!(o != null && o.assetType))
            return void console.error("Object has no asset type");
        !((h = o == null ? void 0 : o.userData) === null || h === void 0) && h.rootSceneModelRoot && c.viewerConfig === !1 && (o.userData.__exportViewerConfig = !1);
        const b = [];
        o.assetType === "model" && o.modelObject.traverse(nt => {
            nt.userData.excludeFromExport && nt.visible && (nt.visible = !1,
            b.push(nt))
        }
        );
        const _e = await this._exportFile(o, c);
        return o.assetType === "model" && b.forEach(nt => nt.visible = !0),
        !((_ = o == null ? void 0 : o.userData) === null || _ === void 0) && _.rootSceneModelRoot && c.viewerConfig === !1 && delete o.userData.__exportViewerConfig,
        _e
    }
    async _exportFile(o, c={}) {
        var h, _, b;
        let _e;
        this.dispatchEvent({
            type: "exportFile",
            obj: o,
            state: "processing"
        });
        try {
            const nt = await this.processBeforeExport(o, c)
              , it = (_ = (h = c.exportExt) !== null && h !== void 0 ? h : nt == null ? void 0 : nt.typeExt) !== null && _ !== void 0 ? _ : nt == null ? void 0 : nt.ext;
            if (!nt || !it)
                throw new Error(`Unable to preprocess before export ${it}`);
            const at = this._getParser(it);
            this.dispatchEvent({
                type: "exportFile",
                obj: o,
                state: "exporting"
            });
            const ut = await at.parseAsync(nt.obj, {
                exportExt: (b = nt.ext) !== null && b !== void 0 ? b : it,
                ...c
            });
            ut.ext = nt.ext,
            _e = ut
        } catch (nt) {
            return console.error("AssetExporter: Unable to Export file", o),
            console.error(nt),
            void this.dispatchEvent({
                type: "exportFile",
                obj: o,
                state: "error",
                error: nt
            })
        }
        return this.dispatchEvent({
            type: "exportFile",
            obj: o,
            state: "done"
        }),
        _e
    }
    _createParser(o) {
        const c = this.Exporters.find(_ => _.ext.includes(o));
        if (!c)
            throw new Error(`No exporter found for extension ${o}`);
        const h = c == null ? void 0 : c.ctor(this);
        if (!h)
            throw new Error(`Unable to create parser for extension ${o}`);
        return this._cachedParsers.push({
            ext: c.ext,
            parser: h
        }),
        this.dispatchEvent({
            type: "exporterCreate",
            exporter: c,
            parser: h
        }),
        h
    }
    _getParser(o) {
        var c, h;
        return (h = (c = this._cachedParsers.find(_ => _.ext.includes(o))) === null || c === void 0 ? void 0 : c.parser) !== null && h !== void 0 ? h : this._createParser(o)
    }
    async processBeforeExport(o, c={}) {
        if (o.assetType != null && o.assetType !== "renderTarget" && (o = await this._processors.process(o.assetType, o, c)),
        o.isWebGLRenderTarget)
            return {
                obj: o,
                ext: "exr"
            };

export default b;
