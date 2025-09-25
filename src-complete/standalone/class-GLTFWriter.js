/* Standalone Class: GLTFWriter */

class GLTFWriter {
    constructor() {
        this.plugins = [],
        this.options = {},
        this.pending = [],
        this.buffers = [],
        this.byteOffset = 0,
        this.buffers = [],
        this.nodeMap = new Map,
        this.skins = [],
        this.extensionsUsed = {},
        this.extensionsRequired = {},
        this.uids = new Map,
        this.uid = 0,
        this.json = {
            asset: {
                version: "2.0",
                generator: "THREE.GLTFExporter"
            }
        },
        this.cache = {
            meshes: new Map,
            attributes: new Map,
            attributesNormalized: new Map,
            materials: new Map,
            textures: new Map,
            images: new Map
        }
    }
    setPlugins(o) {
        this.plugins = o
    }
    async write(o, c, h={}) {
        this.options = Object.assign({
            binary: !1,
            trs: !1,
            onlyVisible: !0,
            maxTextureSize: 1 / 0,
            animations: [],
            includeCustomExtensions: !1,
            ignoreInvalidMorphTargetTracks: !1,
            ignoreEmptyTextures: !1
        }, h),
        this.options.animations.length > 0 && (this.options.trs = !0),
        this.processInput(o),
        await Promise.all(this.pending);
        const _ = this
          , b = _.buffers
          , _e = _.json;
        h = _.options;
        const nt = _.extensionsUsed
          , it = _.extensionsRequired
          , at = new Blob(b,{
            type: "application/octet-stream"
        })
          , ut = Object.keys(nt)
          , pt = Object.keys(it);
        if (ut.length > 0 && (_e.extensionsUsed = ut),
        pt.length > 0 && (_e.extensionsRequired = pt),
        _e.buffers && _e.buffers.length > 0 && (_e.buffers[0].byteLength = at.size),
        h.binary === !0) {
            const ht = new FileReader;
            ht.readAsArrayBuffer(at),
            ht.onloadend = function() {
                const _t = getPaddedArrayBuffer(ht.result)
                  , vt = new DataView(new ArrayBuffer(GLB_CHUNK_PREFIX_BYTES));
                vt.setUint32(0, _t.byteLength, !0),
                vt.setUint32(4, GLB_CHUNK_TYPE_BIN, !0);
                const bt = getPaddedArrayBuffer(stringToArrayBuffer(JSON.stringify(_e)), 32)
                  , St = new DataView(new ArrayBuffer(GLB_CHUNK_PREFIX_BYTES));
                St.setUint32(0, bt.byteLength, !0),
                St.setUint32(4, GLB_CHUNK_TYPE_JSON, !0);
                const At = new ArrayBuffer(GLB_HEADER_BYTES)
                  , Et = new DataView(At);
                Et.setUint32(0, GLB_HEADER_MAGIC, !0),
                Et.setUint32(4, GLB_VERSION, !0);
                const Pt = GLB_HEADER_BYTES + St.byteLength + bt.byteLength + vt.byteLength + _t.byteLength;
                Et.setUint32(8, Pt, !0);
                const It = new Blob([At, St, bt, vt, _t],{
                    type: "application/octet-stream"
                })
                  , Dt = new FileReader;
                Dt.readAsArrayBuffer(It),
                Dt.onloadend = function() {
                    c(Dt.result)
                }
            }
        } else if (_e.buffers && _e.buffers.length > 0) {
            const ht = new FileReader;
            ht.readAsDataURL(at),
            ht.onloadend = function() {
                const _t = ht.result;
                _e.buffers[0].uri = _t,
                c(_e)
            }
        } else
            c(_e)
    }
    serializeUserData(o, c) {
        if (Object.keys(o.userData).length === 0)
            return;
        const h = this.options
          , _ = this.extensionsUsed;
        try {
            const b = JSON.parse(JSON.stringify(o.userData));
            if (h.includeCustomExtensions && b.gltfExtensions) {
                c.extensions === void 0 && (c.extensions = {});
                for (const _e in b.gltfExtensions)
                    c.extensions[_e] = b.gltfExtensions[_e],
                    _[_e] = !0;
                delete b.gltfExtensions
            }
            Object.keys(b).length > 0 && (c.extras = b)
        } catch (b) {
            console.warn("THREE.GLTFExporter: userData of '" + o.name + "' won't be serialized because of JSON.stringify error - " + b.message),
            console.warn({
                ...o.userData
            })
        }
    }
    getUID(o, c=!1) {
        if (this.uids.has(o) === !1) {
            const h = new Map;
            h.set(!0, this.uid++),
            h.set(!1, this.uid++),
            this.uids.set(o, h)
        }
        return this.uids.get(o).get(c)
    }
    isNormalizedNormalAttribute(o) {
        if (this.cache.attributesNormalized.has(o))
            return !1;
        const c = new three_module.Pq0;
        for (let h = 0, _ = o.count; h < _; h++)
            if (Math.abs(c.fromBufferAttribute(o, h).length() - 1) > 5e-4)
                return !1;
        return !0
    }
    createNormalizedNormalAttribute(o) {
        const c = this.cache;
        if (c.attributesNormalized.has(o))
            return c.attributesNormalized.get(o);
        const h = o.clone()
          , _ = new three_module.Pq0;
        for (let b = 0, _e = h.count; b < _e; b++)
            _.fromBufferAttribute(h, b),
            _.x === 0 && _.y === 0 && _.z === 0 ? _.setX(1) : _.normalize(),
            h.setXYZ(b, _.x, _.y, _.z);
        return c.attributesNormalized.set(o, h),
        h
    }
    applyTextureTransform(o, c) {
        let h = !1;
        const _ = {};
        c.offset.x === 0 && c.offset.y === 0 || (_.offset = c.offset.toArray(),
        h = !0),
        c.rotation !== 0 && (_.rotation = c.rotation,
        h = !0),
        c.repeat.x === 1 && c.repeat.y === 1 || (_.scale = c.repeat.toArray(),
        h = !0),
        h && (o.extensions = o.extensions || {},
        o.extensions.KHR_texture_transform = _,
        this.extensionsUsed.KHR_texture_transform = !0)
    }
    buildMetalRoughTexture(o, c) {
        if (o === c)
            return o;
        function h(ht) {
            return ht.colorSpace === three_module.er$ ? function(_t) {
                return _t < .04045 ? .0773993808 * _t : Math.pow(.9478672986 * _t + .0521327014, 2.4)
            }
            : function(_t) {
                return _t
            }
        }
        console.warn("THREE.GLTFExporter: Merged metalnessMap and roughnessMap textures."),
        o instanceof three_module.FvD && (o = TextureUtils_decompress(o)),
        c instanceof three_module.FvD && (c = TextureUtils_decompress(c));
        const _ = o ? o.image : null
          , b = c ? c.image : null
          , _e = Math.max(_ ? _.width : 0, b ? b.width : 0)
          , nt = Math.max(_ ? _.height : 0, b ? b.height : 0)
          , it = getCanvas();
        it.width = _e,
        it.height = nt;
        const at = it.getContext("2d");
        at.fillStyle = "#00ffff",
        at.fillRect(0, 0, _e, nt);
        const ut = at.getImageData(0, 0, _e, nt);
        if (_) {
            at.drawImage(_, 0, 0, _e, nt);
            const ht = h(o)
              , _t = at.getImageData(0, 0, _e, nt).data;
            for (let vt = 2; vt < _t.length; vt += 4)
                ut.data[vt] = 256 * ht(_t[vt] / 256)
        }
        if (b) {
            at.drawImage(b, 0, 0, _e, nt);
            const ht = h(c)
              , _t = at.getImageData(0, 0, _e, nt).data;
            for (let vt = 1; vt < _t.length; vt += 4)
                ut.data[vt] = 256 * ht(_t[vt] / 256)
        }
        at.putImageData(ut, 0, 0);
        const pt = (o || c).clone();
        return pt.source = new three_module.kLi(it),
        pt.colorSpace = three_module.jf0,
        pt.channel = (o || c).channel,
        o && c && o.channel !== c.channel && console.warn("THREE.GLTFExporter: UV channels for metalnessMap and roughnessMap textures must match."),
        pt
    }
    processBuffer(o) {
        const c = this.json
          , h = this.buffers;
        return c.buffers || (c.buffers = [{
            byteLength: 0
        }]),
        h.push(o),
        0
    }
    processBufferView(o, c, h, _, b) {
        const _e = this.json;
        let nt;
        switch (_e.bufferViews || (_e.bufferViews = []),
        c) {
        case GLTFExporter_WEBGL_CONSTANTS.BYTE:
        case GLTFExporter_WEBGL_CONSTANTS.UNSIGNED_BYTE:
            nt = 1;
            break;
        case GLTFExporter_WEBGL_CONSTANTS.SHORT:
        case GLTFExporter_WEBGL_CONSTANTS.UNSIGNED_SHORT:
            nt = 2;
            break;
        default:
            nt = 4
        }
        const it = getPaddedBufferSize(_ * o.itemSize * nt)
          , at = new DataView(new ArrayBuffer(it));
        let ut = 0;
        for (let ht = h; ht < h + _; ht++)
            for (let _t = 0; _t < o.itemSize; _t++) {
                let vt;
                o.itemSize > 4 ? vt = o.array[ht * o.itemSize + _t] : (_t === 0 ? vt = o.getX(ht) : _t === 1 ? vt = o.getY(ht) : _t === 2 ? vt = o.getZ(ht) : _t === 3 && (vt = o.getW(ht)),
                o.normalized === !0 && (vt = three_module.cj9.normalize(vt, o.array))),
                c === GLTFExporter_WEBGL_CONSTANTS.FLOAT ? at.setFloat32(ut, vt, !0) : c === GLTFExporter_WEBGL_CONSTANTS.INT ? at.setInt32(ut, vt, !0) : c === GLTFExporter_WEBGL_CONSTANTS.UNSIGNED_INT ? at.setUint32(ut, vt, !0) : c === GLTFExporter_WEBGL_CONSTANTS.SHORT ? at.setInt16(ut, vt, !0) : c === GLTFExporter_WEBGL_CONSTANTS.UNSIGNED_SHORT ? at.setUint16(ut, vt, !0) : c === GLTFExporter_WEBGL_CONSTANTS.BYTE ? at.setInt8(ut, vt) : c === GLTFExporter_WEBGL_CONSTANTS.UNSIGNED_BYTE && at.setUint8(ut, vt),
                ut += nt
            }
        const pt = {
            buffer: this.processBuffer(at.buffer),
            byteOffset: this.byteOffset,
            byteLength: it
        };
        return b !== void 0 && (pt.target = b),
        b === GLTFExporter_WEBGL_CONSTANTS.ARRAY_BUFFER && (pt.byteStride = o.itemSize * nt),
        this.byteOffset += it,
        _e.bufferViews.push(pt),
        {
            id: _e.bufferViews.length - 1,
            byteLength: 0
        }
    }
    processBufferViewImage(o) {
        const c = this
          , h = c.json;
        return h.bufferViews || (h.bufferViews = []),
        new Promise(function(_) {
            const b = new FileReader;
            b.readAsArrayBuffer(o),
            b.onloadend = function() {
                const _e = getPaddedArrayBuffer(b.result)
                  , nt = {
                    buffer: c.processBuffer(_e),
                    byteOffset: c.byteOffset,
                    byteLength: _e.byteLength
                };
                c.byteOffset += _e.byteLength,
                _(h.bufferViews.push(nt) - 1)
            }
        }
        )
    }
    processBufferViewImageBuffer(o) {
        const c = this
          , h = c.json;
        h.bufferViews || (h.bufferViews = []),
        o = getPaddedArrayBuffer(o);
        const _ = {
            buffer: c.processBuffer(o),
            byteOffset: c.byteOffset,
            byteLength: o.byteLength
        };
        return c.byteOffset += o.byteLength,
        h.bufferViews.push(_) - 1
    }
    processAccessor(o, c, h, _) {
        const b = this.json;
        let _e;
        if (o.array.constructor === Float32Array)
            _e = GLTFExporter_WEBGL_CONSTANTS.FLOAT;
        else if (o.array.constructor === Int32Array)
            _e = GLTFExporter_WEBGL_CONSTANTS.INT;
        else if (o.array.constructor === Uint32Array)
            _e = GLTFExporter_WEBGL_CONSTANTS.UNSIGNED_INT;
        else if (o.array.constructor === Int16Array)
            _e = GLTFExporter_WEBGL_CONSTANTS.SHORT;
        else if (o.array.constructor === Uint16Array)
            _e = GLTFExporter_WEBGL_CONSTANTS.UNSIGNED_SHORT;
        else if (o.array.constructor === Int8Array)
            _e = GLTFExporter_WEBGL_CONSTANTS.BYTE;
        else {
            if (o.array.constructor !== Uint8Array)
                throw new Error("THREE.GLTFExporter: Unsupported bufferAttribute component type: " + o.array.constructor.name);
            _e = GLTFExporter_WEBGL_CONSTANTS.UNSIGNED_BYTE
        }
        if (h === void 0 && (h = 0),
        _ === void 0 && (_ = o.count),
        _ === 0)
            return null;
        const nt = getMinMax(o, h, _);
        let it;
        c !== void 0 && (it = o === c.index ? GLTFExporter_WEBGL_CONSTANTS.ELEMENT_ARRAY_BUFFER : GLTFExporter_WEBGL_CONSTANTS.ARRAY_BUFFER);
        const at = this.processBufferView(o, _e, h, _, it)
          , ut = {
            bufferView: at.id,
            byteOffset: at.byteOffset,
            componentType: _e,
            count: _,
            max: nt.max,
            min: nt.min,
            type: {
                1: "SCALAR",
                2: "VEC2",
                3: "VEC3",
                4: "VEC4",
                9: "MAT3",
                16: "MAT4"
            }[o.itemSize]
        };
        return o.normalized === !0 && (ut.normalized = !0),
        b.accessors || (b.accessors = []),
        b.accessors.push(ut) - 1
    }
    processImage(o, c, h, _="image/png", b=void 0, _e=void 0) {
        if (o !== null) {
            const nt = this
              , it = nt.cache
              , at = nt.json
              , ut = nt.options
              , pt = nt.pending;
            it.images.has(o) || it.images.set(o, {});
            const ht = it.images.get(o)
              , _t = _ + ":flipY/" + h.toString() + (b || _e ? ";" + b + ";" + _e : "");
            if (ht[_t] !== void 0)
                return ht[_t];
            at.images || (at.images = []);
            const vt = {
                mimeType: _
            }
              , bt = getCanvas();
            bt.width = Math.min(b || o.width, ut.maxTextureSize),
            bt.height = Math.min(_e || o.height, ut.maxTextureSize);
            const St = bt.getContext("2d");
            if (h === !0 && (St.translate(0, bt.height),
            St.scale(1, -1)),
            o.data !== void 0) {
                c !== three_module.GWd && console.error("GLTFExporter: Only RGBAFormat is supported.", c),
                (o.width > ut.maxTextureSize || o.height > ut.maxTextureSize) && console.warn("GLTFExporter: Image size is bigger than maxTextureSize", o);
                const Et = new Uint8ClampedArray(o.height * o.width * 4);
                for (let Pt = 0; Pt < Et.length; Pt += 4)
                    Et[Pt + 0] = o.data[Pt + 0],
                    Et[Pt + 1] = o.data[Pt + 1],
                    Et[Pt + 2] = o.data[Pt + 2],
                    Et[Pt + 3] = o.data[Pt + 3];
                St.putImageData(new ImageData(Et,o.width,o.height), 0, 0)
            } else
                St.drawImage(o, 0, 0, bt.width, bt.height);
            ut.binary === !0 ? pt.push(getToBlobPromise(bt, _).then(Et => nt.processBufferViewImage(Et)).then(Et => {
                vt.bufferView = Et
            }
            )) : bt.toDataURL !== void 0 ? vt.uri = bt.toDataURL(_) : pt.push(getToBlobPromise(bt, _).then(Et => new FileReader().readAsDataURL(Et)).then(Et => {
                vt.uri = Et
            }
            ));
            const At = at.images.push(vt) - 1;
            return ht[_t] = At,
            At
        }
        throw new Error("THREE.GLTFExporter: No valid image data found. Unable to process texture.")
    }
    processSampler(o) {
        const c = this.json;
        c.samplers || (c.samplers = []);
        const h = {
            magFilter: THREE_TO_WEBGL[o.magFilter],
            minFilter: THREE_TO_WEBGL[o.minFilter],
            wrapS: THREE_TO_WEBGL[o.wrapS],
            wrapT: THREE_TO_WEBGL[o.wrapT]
        };
        return c.samplers.push(h) - 1
    }
    processTexture(o) {
        const c = this.options
          , h = this.cache
          , _ = this.json;
        if (h.textures.has(o))
            return h.textures.get(o);
        _.textures || (_.textures = []),
        o instanceof three_module.FvD && !o.source._canSerialize && (o = TextureUtils_decompress(o, c.maxTextureSize));
        let b = o.userData.mimeType;
        b === "image/webp" && (b = "image/png"),
        b === "image/jpg" && (b = "image/jpeg");
        const _e = {
            sampler: this.processSampler(o),
            source: !b || ["image/jpeg", "image/png"].includes(b) ? this.processImage(o.image, o.format, o.flipY, b) : null
        };
        o.name && (_e.name = o.name),
        this._invokeAll(function(it) {
            it.writeTexture && it.writeTexture(o, _e)
        }),
        _e.source === null && console.error("GLTFExporter: Unsupported mime type: " + b + ". Cannot export texture.", o);
        const nt = _.textures.push(_e) - 1;
        return h.textures.set(o, nt),
        nt
    }
    processMaterial(o) {
        const c = this.cache
          , h = this.json;
        if (c.materials.has(o))
            return c.materials.get(o);
        if (o.isShaderMaterial)
            return console.warn("GLTFExporter: THREE.ShaderMaterial not supported."),
            null;
        h.materials || (h.materials = []);
        const _ = {
            pbrMetallicRoughness: {}
        };
        o.isMeshStandardMaterial !== !0 && o.isMeshBasicMaterial !== !0 && console.warn("GLTFExporter: Use MeshStandardMaterial or MeshBasicMaterial for best results.");
        const b = o.color.toArray().concat([o.opacity]);
        if (equalArray(b, [1, 1, 1, 1]) || (_.pbrMetallicRoughness.baseColorFactor = b),
        o.isMeshStandardMaterial ? (_.pbrMetallicRoughness.metallicFactor = o.metalness,
        _.pbrMetallicRoughness.roughnessFactor = o.roughness) : (_.pbrMetallicRoughness.metallicFactor = .5,
        _.pbrMetallicRoughness.roughnessFactor = .5),
        this.checkEmptyMap(o.metalnessMap) || this.checkEmptyMap(o.roughnessMap)) {
            const nt = this.buildMetalRoughTexture(o.metalnessMap, o.roughnessMap)
              , it = {
                index: this.processTexture(nt),
                channel: nt.channel
            };
            this.applyTextureTransform(it, nt),
            _.pbrMetallicRoughness.metallicRoughnessTexture = it
        }
        if (this.checkEmptyMap(o.map)) {
            const nt = {
                index: this.processTexture(o.map),
                texCoord: o.map.channel
            };
            this.applyTextureTransform(nt, o.map),
            _.pbrMetallicRoughness.baseColorTexture = nt
        }
        if (o.emissive) {
            const nt = o.emissive;
            if (Math.max(nt.r, nt.g, nt.b) > 0 && (_.emissiveFactor = o.emissive.toArray()),
            this.checkEmptyMap(o.emissiveMap)) {
                const it = {
                    index: this.processTexture(o.emissiveMap),
                    texCoord: o.emissiveMap.channel
                };
                this.applyTextureTransform(it, o.emissiveMap),
                _.emissiveTexture = it
            }
        }
        if (this.checkEmptyMap(o.normalMap)) {
            const nt = {
                index: this.processTexture(o.normalMap),
                texCoord: o.normalMap.channel
            };
            o.normalScale && o.normalScale.x !== 1 && (nt.scale = o.normalScale.x),
            this.applyTextureTransform(nt, o.normalMap),
            _.normalTexture = nt
        }
        if (this.checkEmptyMap(o.aoMap)) {
            const nt = {
                index: this.processTexture(o.aoMap),
                texCoord: o.aoMap.channel
            };
            o.aoMapIntensity !== 1 && (nt.strength = o.aoMapIntensity),
            this.applyTextureTransform(nt, o.aoMap),
            _.occlusionTexture = nt
        }
        o.transparent ? _.alphaMode = "BLEND" : o.alphaTest > 0 && (_.alphaMode = "MASK",
        _.alphaCutoff = o.alphaTest),
        o.side === three_module.$EB && (_.doubleSided = !0),
        o.name !== "" && (_.name = o.name),
        this.serializeUserData(o, _),
        this._invokeAll(function(nt) {
            nt.writeMaterial && nt.writeMaterial(o, _)
        });
        const _e = h.materials.push(_) - 1;
        return c.materials.set(o, _e),
        _e
    }
    processMesh(o) {
        const c = this.cache
          , h = this.json
          , _ = [o.geometry.uuid];
        if (Array.isArray(o.material))
            for (let Pt = 0, It = o.material.length; Pt < It; Pt++)
                _.push(o.material[Pt].uuid);
        else
            _.push(o.material.uuid);
        const b = _.join(":");
        if (c.meshes.has(b))
            return c.meshes.get(b);
        const _e = o.geometry;
        let nt;
        nt = o.isLineSegments ? GLTFExporter_WEBGL_CONSTANTS.LINES : o.isLineLoop ? GLTFExporter_WEBGL_CONSTANTS.LINE_LOOP : o.isLine ? GLTFExporter_WEBGL_CONSTANTS.LINE_STRIP : o.isPoints ? GLTFExporter_WEBGL_CONSTANTS.POINTS : o.material.wireframe ? GLTFExporter_WEBGL_CONSTANTS.LINES : GLTFExporter_WEBGL_CONSTANTS.TRIANGLES;
        const it = {}
          , at = {}
          , ut = []
          , pt = []
          , ht = {
            uv: "TEXCOORD_0",
            uv1: "TEXCOORD_1",
            color: "COLOR_0",
            skinWeight: "WEIGHTS_0",
            skinIndex: "JOINTS_0"
        }
          , _t = _e.getAttribute("normal");
        _t === void 0 || this.isNormalizedNormalAttribute(_t) || (console.warn("THREE.GLTFExporter: Creating normalized normal attribute from the non-normalized one."),
        _e.setAttribute("normal", this.createNormalizedNormalAttribute(_t)));
        let vt = null;
        for (let Pt in _e.attributes) {
            if (Pt.slice(0, 5) === "morph")
                continue;
            const It = _e.attributes[Pt];
            if (Pt = ht[Pt] || Pt.toUpperCase(),
            /^(POSITION|NORMAL|TANGENT|TEXCOORD_\d+|COLOR_\d+|JOINTS_\d+|WEIGHTS_\d+)$/.test(Pt) || (Pt = "_" + Pt),
            c.attributes.has(this.getUID(It))) {
                at[Pt] = c.attributes.get(this.getUID(It));
                continue
            }
            vt = null;
            const Dt = It.array;
            Pt !== "JOINTS_0" || Dt instanceof Uint16Array || Dt instanceof Uint8Array || (console.warn('GLTFExporter: Attribute "skinIndex" converted to type UNSIGNED_SHORT.'),
            vt = new three_module.THS(new Uint16Array(Dt),It.itemSize,It.normalized));
            const Gt = this.processAccessor(vt || It, _e);
            Gt !== null && (Pt.startsWith("_") || this.detectMeshQuantization(Pt, It),
            at[Pt] = Gt,
            c.attributes.set(this.getUID(It), Gt))
        }
        if (_t !== void 0 && _e.setAttribute("normal", _t),
        Object.keys(at).length === 0)
            return null;
        if (o.morphTargetInfluences !== void 0 && o.morphTargetInfluences.length > 0) {
            const Pt = []
              , It = []
              , Dt = {};
            if (o.morphTargetDictionary !== void 0)
                for (const Gt in o.morphTargetDictionary)
                    Dt[o.morphTargetDictionary[Gt]] = Gt;
            for (let Gt = 0; Gt < o.morphTargetInfluences.length; ++Gt) {
                const Bt = {};
                let kt = !1;
                for (const Ut in _e.morphAttributes) {
                    if (Ut !== "position" && Ut !== "normal") {
                        kt || (console.warn("GLTFExporter: Only POSITION and NORMAL morph are supported."),
                        kt = !0);
                        continue
                    }
                    const Ht = _e.morphAttributes[Ut][Gt]
                      , Kt = Ut.toUpperCase()
                      , Jt = _e.attributes[Ut];
                    if (c.attributes.has(this.getUID(Ht, !0))) {
                        Bt[Kt] = c.attributes.get(this.getUID(Ht, !0));
                        continue
                    }
                    const or = Ht.clone();
                    if (!_e.morphTargetsRelative)
                        for (let ir = 0, lr = Ht.count; ir < lr; ir++)
                            for (let ar = 0; ar < Ht.itemSize; ar++)
                                ar === 0 && or.setX(ir, Ht.getX(ir) - Jt.getX(ir)),
                                ar === 1 && or.setY(ir, Ht.getY(ir) - Jt.getY(ir)),
                                ar === 2 && or.setZ(ir, Ht.getZ(ir) - Jt.getZ(ir)),
                                ar === 3 && or.setW(ir, Ht.getW(ir) - Jt.getW(ir));
                    Bt[Kt] = this.processAccessor(or, _e),
                    c.attributes.set(this.getUID(Jt, !0), Bt[Kt])
                }
                pt.push(Bt),
                Pt.push(o.morphTargetInfluences[Gt]),
                o.morphTargetDictionary !== void 0 && It.push(Dt[Gt])
            }
            it.weights = Pt,
            It.length > 0 && (it.extras = {},
            it.extras.targetNames = It)
        }
        const bt = Array.isArray(o.material);
        if (bt && _e.groups.length === 0)
            return null;
        const St = bt ? o.material : [o.material]
          , At = bt ? _e.groups : [{
            materialIndex: 0,
            start: void 0,
            count: void 0
        }];
        for (let Pt = 0, It = At.length; Pt < It; Pt++) {
            const Dt = {
                mode: nt,
                attributes: at
            };
            if (this.serializeUserData(_e, Dt),
            pt.length > 0 && (Dt.targets = pt),
            _e.index !== null) {
                let Bt = this.getUID(_e.index);
                At[Pt].start === void 0 && At[Pt].count === void 0 || (Bt += ":" + At[Pt].start + ":" + At[Pt].count),
                c.attributes.has(Bt) ? Dt.indices = c.attributes.get(Bt) : (Dt.indices = this.processAccessor(_e.index, _e, At[Pt].start, At[Pt].count),
                c.attributes.set(Bt, Dt.indices)),
                Dt.indices === null && delete Dt.indices
            }
            const Gt = this.processMaterial(St[At[Pt].materialIndex]);
            Gt !== null && (Dt.material = Gt),
            ut.push(Dt)
        }
        it.primitives = ut,
        h.meshes || (h.meshes = []),
        this._invokeAll(function(Pt) {
            Pt.writeMesh && Pt.writeMesh(o, it)
        });
        const Et = h.meshes.push(it) - 1;
        return c.meshes.set(b, Et),
        Et
    }
    detectMeshQuantization(o, c) {
        if (this.extensionsUsed[KHR_MESH_QUANTIZATION])
            return;
        let h;
        switch (c.array.constructor) {
        case Int8Array:
            h = "byte";
            break;
        case Uint8Array:
            h = "unsigned byte";
            break;
        case Int16Array:
            h = "short";
            break;
        case Uint16Array:
            h = "unsigned short";
            break;
        default:
            return
        }
        c.normalized && (h += " normalized");
        const _ = o.split("_", 1)[0];
        KHR_mesh_quantization_ExtraAttrTypes[_] && KHR_mesh_quantization_ExtraAttrTypes[_].includes(h) && (this.extensionsUsed[KHR_MESH_QUANTIZATION] = !0,
        this.extensionsRequired[KHR_MESH_QUANTIZATION] = !0)
    }
    processCamera(o) {
        const c = this.json;
        c.cameras || (c.cameras = []);
        const h = o.isOrthographicCamera
          , _ = {
            type: h ? "orthographic" : "perspective"
        };
        return h ? _.orthographic = {
            xmag: 2 * o.right,
            ymag: 2 * o.top,
            zfar: o.far <= 0 ? .001 : o.far,
            znear: o.near < 0 ? 0 : o.near
        } : _.perspective = {
            aspectRatio: o.aspect,
            yfov: three_module.cj9.degToRad(o.fov),
            zfar: o.far <= 0 ? .001 : o.far,
            znear: o.near < 0 ? 0 : o.near
        },
        o.name !== "" && (_.name = o.type),
        c.cameras.push(_) - 1
    }
    processAnimation(o, c) {
        const h = this.json
          , _ = this.nodeMap;
        h.animations || (h.animations = []);
        try {
            o = GLTFExporter.Utils.mergeMorphTargetTracks(o.clone(), c)
        } catch (it) {
            if (console.warn('THREE.GLTFExporter: Could not export animation clip "%s".', o.name),
            !this.options.ignoreInvalidMorphTargetTracks)
                throw it;
            return console.error(it),
            null
        }
        const b = o.tracks
          , _e = []
          , nt = [];
        for (let it = 0; it < b.length; ++it) {
            const at = b[it]
              , ut = three_module.Nwf.parseTrackName(at.name);
            let pt = three_module.Nwf.findNode(c, ut.nodeName);
            const ht = GLTFExporter_PATH_PROPERTIES[ut.propertyName];
            if (ut.objectName === "bones" && (pt = pt.isSkinnedMesh === !0 ? pt.skeleton.getBoneByName(ut.objectIndex) : void 0),
            !pt || !ht)
                return console.warn('THREE.GLTFExporter: Could not export animation track "%s".', at.name),
                null;
            const _t = 1;
            let vt, bt = at.values.length / at.times.length;
            ht === GLTFExporter_PATH_PROPERTIES.morphTargetInfluences && (bt /= pt.morphTargetInfluences.length),
            at.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline === !0 ? (vt = "CUBICSPLINE",
            bt /= 3) : vt = at.getInterpolation() === three_module.ljd ? "STEP" : "LINEAR",
            nt.push({
                input: this.processAccessor(new three_module.THS(at.times,_t)),
                output: this.processAccessor(new three_module.THS(at.values,bt)),
                interpolation: vt
            }),
            _e.push({
                sampler: nt.length - 1,
                target: {
                    node: _.get(pt),
                    path: ht
                }
            })
        }
        return h.animations.push({
            name: o.name || "clip_" + h.animations.length,
            samplers: nt,
            channels: _e
        }),
        h.animations.length - 1
    }
    processSkin(o) {
        const c = this.json
          , h = this.nodeMap
          , _ = c.nodes[h.get(o)]
          , b = o.skeleton;
        if (b === void 0)
            return null;
        const _e = o.skeleton.bones[0];
        if (_e === void 0)
            return null;
        const nt = []
          , it = new Float32Array(16 * b.bones.length)
          , at = new three_module.kn4;
        for (let ut = 0; ut < b.bones.length; ++ut)
            nt.push(h.get(b.bones[ut])),
            at.copy(b.boneInverses[ut]),
            at.multiply(o.bindMatrix).toArray(it, 16 * ut);
        return c.skins === void 0 && (c.skins = []),
        c.skins.push({
            inverseBindMatrices: this.processAccessor(new three_module.THS(it,16)),
            joints: nt,
            skeleton: h.get(_e)
        }),
        _.skin = c.skins.length - 1
    }
    processNode(o) {
        const c = this.json
          , h = this.options
          , _ = this.nodeMap;
        c.nodes || (c.nodes = []);
        const b = {};
        if (h.trs) {
            const nt = o.quaternion.toArray()
              , it = o.position.toArray()
              , at = o.scale.toArray();
            equalArray(nt, [0, 0, 0, 1]) || (b.rotation = nt),
            equalArray(it, [0, 0, 0]) || (b.translation = it),
            equalArray(at, [1, 1, 1]) || (b.scale = at)
        } else
            o.matrixAutoUpdate && o.updateMatrix(),
            isIdentityMatrix(o.matrix) === !1 && (b.matrix = o.matrix.elements);
        if (o.name !== "" && (b.name = String(o.name)),
        this.serializeUserData(o, b),
        o.isMesh || o.isLine || o.isPoints) {
            const nt = this.processMesh(o);
            nt !== null && (b.mesh = nt)
        } else
            o.isCamera && (b.camera = this.processCamera(o));
        if (o.isSkinnedMesh && this.skins.push(o),
        o.children.length > 0) {
            const nt = [];
            for (let it = 0, at = o.children.length; it < at; it++) {
                const ut = o.children[it];
                if (ut.visible || h.onlyVisible === !1) {
                    const pt = this.processNode(ut);
                    pt !== null && nt.push(pt)
                }
            }
            nt.length > 0 && (b.children = nt)
        }
        this._invokeAll(function(nt) {
            nt.writeNode && nt.writeNode(o, b)
        });
        const _e = c.nodes.push(b) - 1;
        return _.set(o, _e),
        _e
    }
    processScene(o) {
        const c = this.json
          , h = this.options;
        c.scenes || (c.scenes = [],
        c.scene = 0);
        const _ = {};
        o.name !== "" && (_.name = o.name),
        c.scenes.push(_);
        const b = [];
        for (let _e = 0, nt = o.children.length; _e < nt; _e++) {
            const it = o.children[_e];
            if (it.visible || h.onlyVisible === !1) {
                const at = this.processNode(it);
                at !== null && b.push(at)
            }
        }
        b.length > 0 && (_.nodes = b),
        this.serializeUserData(o, _)
    }
    processObjects(o) {
        const c = new three_module.Z58;
        c.name = "AuxScene";
        for (let h = 0; h < o.length; h++)
            c.children.push(o[h]);
        this.processScene(c)
    }
    processInput(o) {
        const c = this.options;
        o = o instanceof Array ? o : [o],
        this._invokeAll(function(_) {
            _.beforeParse && _.beforeParse(o)
        });
        const h = [];
        for (let _ = 0; _ < o.length; _++)
            o[_]instanceof three_module.Z58 ? this.processScene(o[_]) : h.push(o[_]);
        h.length > 0 && this.processObjects(h);
        for (let _ = 0; _ < this.skins.length; ++_)
            this.processSkin(this.skins[_]);
        for (let _ = 0; _ < c.animations.length; ++_)
            this.processAnimation(c.animations[_], o[0]);
        this._invokeAll(function(_) {
            _.afterParse && _.afterParse(o)
        })
    }
    _invokeAll(o) {
        for (let c = 0, h = this.plugins.length; c < h; c++)
            o(this.plugins[c])
    }
    checkEmptyMap(o) {
        return !(!o || this.options.ignoreEmptyTextures && !o.image)
    }
}

export default GLTFWriter;
