/* Standalone Class: index_modern_EXTMeshoptCompression */

class index_modern_EXTMeshoptCompression extends Extension {
    constructor(...o) {
        super(...o),
        this.extensionName = NAME$n,
        this.prereadTypes = [index_modern_PropertyType.BUFFER, index_modern_PropertyType.PRIMITIVE],
        this.prewriteTypes = [index_modern_PropertyType.BUFFER, index_modern_PropertyType.ACCESSOR],
        this.readDependencies = ["meshopt.decoder"],
        this.writeDependencies = ["meshopt.encoder"],
        this._decoder = null,
        this._decoderFallbackBufferMap = new Map,
        this._encoder = null,
        this._encoderOptions = DEFAULT_ENCODER_OPTIONS$1,
        this._encoderFallbackBuffer = null,
        this._encoderBufferViews = {},
        this._encoderBufferViewData = {},
        this._encoderBufferViewAccessors = {}
    }
    install(o, c) {
        return o === "meshopt.decoder" && (this._decoder = c),
        o === "meshopt.encoder" && (this._encoder = c),
        this
    }
    setEncoderOptions(o) {
        return this._encoderOptions = dist_index_modern_extends({}, DEFAULT_ENCODER_OPTIONS$1, o),
        this
    }
    preread(o, c) {
        if (!this._decoder) {
            if (!this.isRequired())
                return this;
            throw new Error(`[${NAME$n}] Please install extension dependency, "meshopt.decoder".`)
        }
        if (!this._decoder.supported) {
            if (!this.isRequired())
                return this;
            throw new Error(`[${NAME$n}]: Missing WASM support.`)
        }
        return c === index_modern_PropertyType.BUFFER ? this._prereadBuffers(o) : c === index_modern_PropertyType.PRIMITIVE && this._prereadPrimitives(o),
        this
    }
    _prereadBuffers(o) {
        const c = o.jsonDoc;
        (c.json.bufferViews || []).forEach( (h, _) => {
            if (!h.extensions || !h.extensions[NAME$n])
                return;
            const b = h.extensions[NAME$n]
              , _e = b.byteOffset || 0
              , nt = b.byteLength || 0
              , it = b.count
              , at = b.byteStride
              , ut = new Uint8Array(it * at)
              , pt = c.json.buffers[b.buffer]
              , ht = pt.uri ? c.resources[pt.uri] : c.resources[GLB_BUFFER]
              , _t = index_modern_BufferUtils.toView(ht, _e, nt);
            this._decoder.decodeGltfBuffer(ut, it, at, _t, b.mode, b.filter),
            o.bufferViews[_] = ut
        }
        )
    }
    _prereadPrimitives(o) {
        const c = o.jsonDoc;
        (c.json.bufferViews || []).forEach(h => {
            if (!h.extensions || !h.extensions[NAME$n])
                return;
            const _ = h.extensions[NAME$n]
              , b = o.buffers[_.buffer]
              , _e = o.buffers[h.buffer];
            isFallbackBuffer(c.json.buffers[h.buffer]) && this._decoderFallbackBufferMap.set(_e, b)
        }
        )
    }
    read(o) {
        if (!this.isRequired())
            return this;
        for (const [c,h] of this._decoderFallbackBufferMap) {
            for (const _ of c.listParents())
                _ instanceof index_modern_Accessor && _.swap(c, h);
            c.dispose()
        }
        return this
    }
    prewrite(o, c) {
        return c === index_modern_PropertyType.ACCESSOR ? this._prewriteAccessors(o) : c === index_modern_PropertyType.BUFFER && this._prewriteBuffers(o),
        this
    }
    _prewriteAccessors(o) {
        const c = o.jsonDoc.json
          , h = this._encoder
          , _ = this._encoderOptions
          , b = this.document.getGraph()
          , _e = this.document.createBuffer()
          , nt = this.document.getRoot().listBuffers().indexOf(_e);
        let it = 1;
        const at = new Map
          , ut = pt => {
            for (const ht of b.listParents(pt)) {
                if (ht.propertyType === index_modern_PropertyType.ROOT)
                    continue;
                let _t = at.get(pt);
                return _t === void 0 && at.set(pt, _t = it++),
                _t
            }
            return -1
        }
        ;
        this._encoderFallbackBuffer = _e,
        this._encoderBufferViews = {},
        this._encoderBufferViewData = {},
        this._encoderBufferViewAccessors = {};
        for (const pt of this.document.getRoot().listAccessors()) {
            if (getTargetPath(pt) === "weights" || pt.getSparse())
                continue;
            const ht = o.getAccessorUsage(pt)
              , _t = o.accessorUsageGroupedByParent.has(ht) ? ut(pt) : null
              , vt = getMeshoptMode(pt, ht)
              , bt = _.method === EncoderMethod$1.FILTER ? getMeshoptFilter(pt, this.document) : {
                filter: MeshoptFilter.NONE
            }
              , St = prepareAccessor(pt, h, vt, bt)
              , {array: At, byteStride: Et} = St
              , Pt = pt.getBuffer();
            if (!Pt)
                throw new Error(`${NAME$n}: Missing buffer for accessor.`);
            const It = this.document.getRoot().listBuffers().indexOf(Pt)
              , Dt = [ht, _t, vt, bt.filter, Et, It].join(":");
            let Gt = this._encoderBufferViews[Dt]
              , Bt = this._encoderBufferViewData[Dt]
              , kt = this._encoderBufferViewAccessors[Dt];
            Gt && Bt || (kt = this._encoderBufferViewAccessors[Dt] = [],
            Bt = this._encoderBufferViewData[Dt] = [],
            Gt = this._encoderBufferViews[Dt] = {
                buffer: nt,
                target: WriterContext.USAGE_TO_TARGET[ht],
                byteOffset: 0,
                byteLength: 0,
                byteStride: ht === WriterContext.BufferViewUsage.ARRAY_BUFFER ? Et : void 0,
                extensions: {
                    [NAME$n]: {
                        buffer: It,
                        byteOffset: 0,
                        byteLength: 0,
                        mode: vt,
                        filter: bt.filter !== MeshoptFilter.NONE ? bt.filter : void 0,
                        byteStride: Et,
                        count: 0
                    }
                }
            });
            const Ut = o.createAccessorDef(pt);
            Ut.componentType = St.componentType,
            Ut.normalized = St.normalized,
            Ut.byteOffset = Gt.byteLength,
            Ut.min && St.min && (Ut.min = St.min),
            Ut.max && St.max && (Ut.max = St.max),
            o.accessorIndexMap.set(pt, c.accessors.length),
            c.accessors.push(Ut),
            kt.push(Ut),
            Bt.push(new Uint8Array(At.buffer,At.byteOffset,At.byteLength)),
            Gt.byteLength += At.byteLength,
            Gt.extensions.EXT_meshopt_compression.count += pt.getCount()
        }
    }
    _prewriteBuffers(o) {
        const c = this._encoder;
        for (const h in this._encoderBufferViews) {
            const _ = this._encoderBufferViews[h]
              , b = this._encoderBufferViewData[h]
              , _e = this.document.getRoot().listBuffers()[_.extensions[NAME$n].buffer]
              , nt = o.otherBufferViews.get(_e) || []
              , {count: it, byteStride: at, mode: ut} = _.extensions[NAME$n]
              , pt = index_modern_BufferUtils.concat(b)
              , ht = c.encodeGltfBuffer(pt, it, at, ut)
              , _t = index_modern_BufferUtils.pad(ht);
            _.extensions[NAME$n].byteLength = ht.byteLength,
            b.length = 0,
            b.push(_t),
            nt.push(_t),
            o.otherBufferViews.set(_e, nt)
        }
    }
    write(o) {
        let c = 0;
        for (const _e in this._encoderBufferViews) {
            const nt = this._encoderBufferViews[_e]
              , it = this._encoderBufferViewData[_e][0]
              , at = o.otherBufferViewsIndexMap.get(it)
              , ut = this._encoderBufferViewAccessors[_e];
            for (const _t of ut)
                _t.bufferView = at;
            const pt = o.jsonDoc.json.bufferViews[at]
              , ht = pt.byteOffset || 0;
            Object.assign(pt, nt),
            pt.byteOffset = c,
            pt.extensions[NAME$n].byteOffset = ht,
            c += index_modern_BufferUtils.padNumber(nt.byteLength)
        }
        const h = this._encoderFallbackBuffer
          , _ = o.bufferIndexMap.get(h)
          , b = o.jsonDoc.json.buffers[_];
        return b.byteLength = c,
        b.extensions = {
            [NAME$n]: {
                fallback: !0
            }
        },
        h.dispose(),
        this
    }
}

export default index_modern_EXTMeshoptCompression;
