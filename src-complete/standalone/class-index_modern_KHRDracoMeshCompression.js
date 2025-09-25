/* Standalone Class: index_modern_KHRDracoMeshCompression */

class index_modern_KHRDracoMeshCompression extends Extension {
    constructor(...o) {
        super(...o),
        this.extensionName = NAME$j,
        this.prereadTypes = [index_modern_PropertyType.PRIMITIVE],
        this.prewriteTypes = [index_modern_PropertyType.ACCESSOR],
        this.readDependencies = ["draco3d.decoder"],
        this.writeDependencies = ["draco3d.encoder"],
        this._decoderModule = null,
        this._encoderModule = null,
        this._encoderOptions = {}
    }
    install(o, c) {
        return o === "draco3d.decoder" && (this._decoderModule = c,
        initDecoderModule(this._decoderModule)),
        o === "draco3d.encoder" && (this._encoderModule = c,
        initEncoderModule(this._encoderModule)),
        this
    }
    setEncoderOptions(o) {
        return this._encoderOptions = o,
        this
    }
    preread(o) {
        if (!this._decoderModule)
            throw new Error(`[${NAME$j}] Please install extension dependency, "draco3d.decoder".`);
        const c = this.document.getLogger()
          , h = o.jsonDoc
          , _ = new Map;
        try {
            const b = h.json.meshes || [];
            for (const _e of b)
                for (const nt of _e.primitives) {
                    if (!nt.extensions || !nt.extensions[NAME$j])
                        continue;
                    const it = nt.extensions[NAME$j];
                    let[at,ut] = _.get(it.bufferView) || [];
                    if (!ut || !at) {
                        const pt = h.json.bufferViews[it.bufferView]
                          , ht = h.json.buffers[pt.buffer]
                          , _t = ht.uri ? h.resources[ht.uri] : h.resources[GLB_BUFFER]
                          , vt = pt.byteOffset || 0
                          , bt = pt.byteLength
                          , St = index_modern_BufferUtils.toView(_t, vt, bt);
                        at = new this._decoderModule.Decoder,
                        ut = decodeGeometry(at, St),
                        _.set(it.bufferView, [at, ut]),
                        c.debug(`[${NAME$j}] Decompressed ${St.byteLength} bytes.`)
                    }
                    for (const pt in nt.attributes) {
                        const ht = o.jsonDoc.json.accessors[nt.attributes[pt]]
                          , _t = at.GetAttributeByUniqueId(ut, it.attributes[pt])
                          , vt = decodeAttribute(at, ut, _t, ht);
                        o.accessors[nt.attributes[pt]].setArray(vt)
                    }
                    nt.indices !== void 0 && o.accessors[nt.indices].setArray(decodeIndex(at, ut))
                }
        } finally {
            for (const [b,_e] of Array.from(_.values()))
                this._decoderModule.destroy(b),
                this._decoderModule.destroy(_e)
        }
        return this
    }
    read(o) {
        return this
    }
    prewrite(o, c) {
        if (!this._encoderModule)
            throw new Error(`[${NAME$j}] Please install extension dependency, "draco3d.encoder".`);
        const h = this.document.getLogger();
        h.debug(`[${NAME$j}] Compression options: ${JSON.stringify(this._encoderOptions)}`);
        const _ = listDracoPrimitives(this.document)
          , b = new Map;
        let _e = "mesh";
        this._encoderOptions.quantizationVolume === "scene" && (this.document.getRoot().listScenes().length !== 1 ? h.warn(`[${NAME$j}]: quantizationVolume=scene requires exactly 1 scene.`) : _e = getBounds(this.document.getRoot().listScenes().pop()));
        for (const nt of Array.from(_.keys())) {
            const it = _.get(nt);
            if (!it)
                throw new Error("Unexpected primitive.");
            if (b.has(it)) {
                b.set(it, b.get(it));
                continue
            }
            const at = nt.getIndices()
              , ut = o.jsonDoc.json.accessors;
            let pt;
            try {
                pt = encodeGeometry(nt, dist_index_modern_extends({}, this._encoderOptions, {
                    quantizationVolume: _e
                }))
            } catch (vt) {
                if (vt instanceof EncodingError) {
                    h.warn(`[${NAME$j}]: ${vt.message} Skipping primitive compression.`);
                    continue
                }
                throw vt
            }
            b.set(it, pt);
            const ht = o.createAccessorDef(at);
            ht.count = pt.numIndices,
            o.accessorIndexMap.set(at, ut.length),
            ut.push(ht),
            pt.numVertices > 65534 && index_modern_Accessor.getComponentSize(ht.componentType) <= 2 ? ht.componentType = index_modern_Accessor.ComponentType.UNSIGNED_INT : pt.numVertices > 254 && index_modern_Accessor.getComponentSize(ht.componentType) <= 1 && (ht.componentType = index_modern_Accessor.ComponentType.UNSIGNED_SHORT);
            for (const vt of nt.listSemantics()) {
                const bt = nt.getAttribute(vt);
                if (pt.attributeIDs[vt] === void 0)
                    continue;
                const St = o.createAccessorDef(bt);
                St.count = pt.numVertices,
                o.accessorIndexMap.set(bt, ut.length),
                ut.push(St)
            }
            const _t = nt.getAttribute("POSITION").getBuffer() || this.document.getRoot().listBuffers()[0];
            o.otherBufferViews.has(_t) || o.otherBufferViews.set(_t, []),
            o.otherBufferViews.get(_t).push(pt.data)
        }
        return h.debug(`[${NAME$j}] Compressed ${_.size} primitives.`),
        o.extensionData[NAME$j] = {
            primitiveHashMap: _,
            primitiveEncodingMap: b
        },
        this
    }
    write(o) {
        const c = o.extensionData[NAME$j];
        for (const h of this.document.getRoot().listMeshes()) {
            const _ = o.jsonDoc.json.meshes[o.meshIndexMap.get(h)];
            for (let b = 0; b < h.listPrimitives().length; b++) {
                const _e = h.listPrimitives()[b]
                  , nt = _.primitives[b]
                  , it = c.primitiveHashMap.get(_e);
                if (!it)
                    continue;
                const at = c.primitiveEncodingMap.get(it);
                at && (nt.extensions = nt.extensions || {},
                nt.extensions[NAME$j] = {
                    bufferView: o.otherBufferViewsIndexMap.get(at.data),
                    attributes: at.attributeIDs
                })
            }
        }
        if (!c.primitiveHashMap.size) {
            const h = o.jsonDoc.json;
            h.extensionsUsed = (h.extensionsUsed || []).filter(_ => _ !== NAME$j),
            h.extensionsRequired = (h.extensionsRequired || []).filter(_ => _ !== NAME$j)
        }
        return this
    }
}

export default index_modern_KHRDracoMeshCompression;
