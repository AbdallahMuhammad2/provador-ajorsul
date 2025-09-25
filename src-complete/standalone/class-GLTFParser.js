/* Standalone Class: GLTFParser */

class GLTFParser {
    constructor(o={}, c={}) {
        this.json = o,
        this.extensions = {},
        this.plugins = {},
        this.options = c,
        this.cache = new GLTFRegistry,
        this.associations = new Map,
        this.primitiveCache = {},
        this.nodeCache = {},
        this.meshCache = {
            refs: {},
            uses: {}
        },
        this.cameraCache = {
            refs: {},
            uses: {}
        },
        this.lightCache = {
            refs: {},
            uses: {}
        },
        this.sourceCache = {},
        this.textureCache = {},
        this.nodeNamesUsed = {};
        let h = !1
          , _ = !1
          , b = -1;
        typeof navigator < "u" && (h = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) === !0,
        _ = navigator.userAgent.indexOf("Firefox") > -1,
        b = _ ? navigator.userAgent.match(/Firefox\/([0-9]+)\./)[1] : -1),
        typeof createImageBitmap > "u" || h || _ && b < 98 ? this.textureLoader = new three_module.Tap(this.options.manager) : this.textureLoader = new three_module.Kzg(this.options.manager),
        this.textureLoader.setCrossOrigin(this.options.crossOrigin),
        this.textureLoader.setRequestHeader(this.options.requestHeader),
        this.fileLoader = new three_module.Y9S(this.options.manager),
        this.fileLoader.setResponseType("arraybuffer"),
        this.options.crossOrigin === "use-credentials" && this.fileLoader.setWithCredentials(!0)
    }
    setExtensions(o) {
        this.extensions = o
    }
    setPlugins(o) {
        this.plugins = o
    }
    parse(o, c) {
        const h = this
          , _ = this.json
          , b = this.extensions;
        this.cache.removeAll(),
        this.nodeCache = {},
        this._invokeAll(function(_e) {
            return _e._markDefs && _e._markDefs()
        }),
        Promise.all(this._invokeAll(function(_e) {
            return _e.beforeRoot && _e.beforeRoot()
        })).then(function() {
            return Promise.all([h.getDependencies("scene"), h.getDependencies("animation"), h.getDependencies("camera")])
        }).then(function(_e) {
            const nt = {
                scene: _e[0][_.scene || 0],
                scenes: _e[0],
                animations: _e[1],
                cameras: _e[2],
                asset: _.asset,
                parser: h,
                userData: {}
            };
            return addUnknownExtensionsToUserData(b, nt, _),
            assignExtrasToUserData(nt, _),
            Promise.all(h._invokeAll(function(it) {
                return it.afterRoot && it.afterRoot(nt)
            })).then(function() {
                o(nt)
            })
        }).catch(c)
    }
    _markDefs() {
        const o = this.json.nodes || []
          , c = this.json.skins || []
          , h = this.json.meshes || [];
        for (let _ = 0, b = c.length; _ < b; _++) {
            const _e = c[_].joints;
            for (let nt = 0, it = _e.length; nt < it; nt++)
                o[_e[nt]].isBone = !0
        }
        for (let _ = 0, b = o.length; _ < b; _++) {
            const _e = o[_];
            _e.mesh !== void 0 && (this._addNodeRef(this.meshCache, _e.mesh),
            _e.skin !== void 0 && (h[_e.mesh].isSkinnedMesh = !0)),
            _e.camera !== void 0 && this._addNodeRef(this.cameraCache, _e.camera)
        }
    }
    _addNodeRef(o, c) {
        c !== void 0 && (o.refs[c] === void 0 && (o.refs[c] = o.uses[c] = 0),
        o.refs[c]++)
    }
    _getNodeRef(o, c, h) {
        if (o.refs[c] <= 1)
            return h;
        const _ = h.clone()
          , b = (_e, nt) => {
            const it = this.associations.get(_e);
            it != null && this.associations.set(nt, it);
            for (const [at,ut] of _e.children.entries())
                b(ut, nt.children[at])
        }
        ;
        return b(h, _),
        _.name += "_instance_" + o.uses[c]++,
        _
    }
    _invokeOne(o) {
        const c = Object.values(this.plugins);
        c.push(this);
        for (let h = 0; h < c.length; h++) {
            const _ = o(c[h]);
            if (_)
                return _
        }
        return null
    }
    _invokeAll(o) {
        const c = Object.values(this.plugins);
        c.unshift(this);
        const h = [];
        for (let _ = 0; _ < c.length; _++) {
            const b = o(c[_]);
            b && h.push(b)
        }
        return h
    }
    getDependency(o, c) {
        const h = o + ":" + c;
        let _ = this.cache.get(h);
        if (!_) {
            switch (o) {
            case "scene":
                _ = this.loadScene(c);
                break;
            case "node":
                _ = this._invokeOne(function(b) {
                    return b.loadNode && b.loadNode(c)
                });
                break;
            case "mesh":
                _ = this._invokeOne(function(b) {
                    return b.loadMesh && b.loadMesh(c)
                });
                break;
            case "accessor":
                _ = this.loadAccessor(c);
                break;
            case "bufferView":
                _ = this._invokeOne(function(b) {
                    return b.loadBufferView && b.loadBufferView(c)
                });
                break;
            case "buffer":
                _ = this.loadBuffer(c);
                break;
            case "material":
                _ = this._invokeOne(function(b) {
                    return b.loadMaterial && b.loadMaterial(c)
                });
                break;
            case "texture":
                _ = this._invokeOne(function(b) {
                    return b.loadTexture && b.loadTexture(c)
                });
                break;
            case "skin":
                _ = this.loadSkin(c);
                break;
            case "animation":
                _ = this._invokeOne(function(b) {
                    return b.loadAnimation && b.loadAnimation(c)
                });
                break;
            case "camera":
                _ = this.loadCamera(c);
                break;
            default:
                if (_ = this._invokeOne(function(b) {
                    return b != this && b.getDependency && b.getDependency(o, c)
                }),
                !_)
                    throw new Error("Unknown type: " + o)
            }
            this.cache.add(h, _)
        }
        return _
    }
    getDependencies(o) {
        let c = this.cache.get(o);
        if (!c) {
            const h = this
              , _ = this.json[o + (o === "mesh" ? "es" : "s")] || [];
            c = Promise.all(_.map(function(b, _e) {
                return h.getDependency(o, _e)
            })),
            this.cache.add(o, c)
        }
        return c
    }
    loadBuffer(o) {
        const c = this.json.buffers[o]
          , h = this.fileLoader;
        if (c.type && c.type !== "arraybuffer")
            throw new Error("THREE.GLTFLoader: " + c.type + " buffer type is not supported.");
        if (c.uri === void 0 && o === 0)
            return Promise.resolve(this.extensions[EXTENSIONS.KHR_BINARY_GLTF].body);
        const _ = this.options;
        return new Promise(function(b, _e) {
            h.load(three_module.r6x.resolveURL(c.uri, _.path), b, void 0, function() {
                _e(new Error('THREE.GLTFLoader: Failed to load buffer "' + c.uri + '".'))
            })
        }
        )
    }
    loadBufferView(o) {
        const c = this.json.bufferViews[o];
        return this.getDependency("buffer", c.buffer).then(function(h) {
            const _ = c.byteLength || 0
              , b = c.byteOffset || 0;
            return h.slice(b, b + _)
        })
    }
    loadAccessor(o) {
        const c = this
          , h = this.json
          , _ = this.json.accessors[o];
        if (_.bufferView === void 0 && _.sparse === void 0) {
            const _e = WEBGL_TYPE_SIZES[_.type]
              , nt = WEBGL_COMPONENT_TYPES[_.componentType]
              , it = _.normalized === !0
              , at = new nt(_.count * _e);
            return Promise.resolve(new three_module.THS(at,_e,it))
        }
        const b = [];
        return _.bufferView !== void 0 ? b.push(this.getDependency("bufferView", _.bufferView)) : b.push(null),
        _.sparse !== void 0 && (b.push(this.getDependency("bufferView", _.sparse.indices.bufferView)),
        b.push(this.getDependency("bufferView", _.sparse.values.bufferView))),
        Promise.all(b).then(function(_e) {
            const nt = _e[0]
              , it = WEBGL_TYPE_SIZES[_.type]
              , at = WEBGL_COMPONENT_TYPES[_.componentType]
              , ut = at.BYTES_PER_ELEMENT
              , pt = ut * it
              , ht = _.byteOffset || 0
              , _t = _.bufferView !== void 0 ? h.bufferViews[_.bufferView].byteStride : void 0
              , vt = _.normalized === !0;
            let bt, St;
            if (_t && _t !== pt) {
                const At = Math.floor(ht / _t)
                  , Et = "InterleavedBuffer:" + _.bufferView + ":" + _.componentType + ":" + At + ":" + _.count;
                let Pt = c.cache.get(Et);
                Pt || (bt = new at(nt,At * _t,_.count * _t / ut),
                Pt = new three_module.eB$(bt,_t / ut),
                c.cache.add(Et, Pt)),
                St = new three_module.eHs(Pt,it,ht % _t / ut,vt)
            } else
                bt = nt === null ? new at(_.count * it) : new at(nt,ht,_.count * it),
                St = new three_module.THS(bt,it,vt);
            if (_.sparse !== void 0) {
                const At = WEBGL_TYPE_SIZES.SCALAR
                  , Et = WEBGL_COMPONENT_TYPES[_.sparse.indices.componentType]
                  , Pt = _.sparse.indices.byteOffset || 0
                  , It = _.sparse.values.byteOffset || 0
                  , Dt = new Et(_e[1],Pt,_.sparse.count * At)
                  , Gt = new at(_e[2],It,_.sparse.count * it);
                nt !== null && (St = new three_module.THS(St.array.slice(),St.itemSize,St.normalized));
                for (let Bt = 0, kt = Dt.length; Bt < kt; Bt++) {
                    const Ut = Dt[Bt];
                    if (St.setX(Ut, Gt[Bt * it]),
                    it >= 2 && St.setY(Ut, Gt[Bt * it + 1]),
                    it >= 3 && St.setZ(Ut, Gt[Bt * it + 2]),
                    it >= 4 && St.setW(Ut, Gt[Bt * it + 3]),
                    it >= 5)
                        throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")
                }
            }
            return St
        })
    }
    loadTexture(o) {
        const c = this.json
          , h = this.options;
        if (o < 0 || o >= c.textures.length)
            return console.warn("THREE.GLTFLoader: Invalid texture index:", o),
            null;
        const _ = c.textures[o].source;
        if (_ < 0 || _ >= c.images.length)
            return console.warn("THREE.GLTFLoader: Invalid source index:", _),
            null;
        const b = c.images[_];
        let _e = this.textureLoader;
        if (b.uri) {
            const nt = h.manager.getHandler(b.uri);
            nt !== null && (_e = nt)
        }
        return this.loadTextureImage(o, _, _e)
    }
    loadTextureImage(o, c, h) {
        const _ = this
          , b = this.json
          , _e = b.textures[o]
          , nt = b.images[c]
          , it = (nt.uri || nt.bufferView) + ":" + _e.sampler;
        if (this.textureCache[it])
            return this.textureCache[it];
        const at = this.loadImageSource(c, h).then(function(ut) {
            ut.name = _e.name || nt.name || "",
            ut.name === "" && typeof nt.uri == "string" && nt.uri.startsWith("data:image/") === !1 && (ut.name = nt.uri);
            const pt = (b.samplers || {})[_e.sampler] || {};
            return ut.magFilter = WEBGL_FILTERS[pt.magFilter] || three_module.k6q,
            ut.minFilter = WEBGL_FILTERS[pt.minFilter] || three_module.$_I,
            ut.wrapS = WEBGL_WRAPPINGS[pt.wrapS] || three_module.GJx,
            ut.wrapT = WEBGL_WRAPPINGS[pt.wrapT] || three_module.GJx,
            pt.extras && pt.extras.uuid !== void 0 && (ut.uuid = pt.extras.uuid,
            ut.__hasGLTFUuid = !0),
            _.associations.set(ut, {
                textures: o
            }),
            ut
        }).catch(function() {
            return null
        });
        return this.textureCache[it] = at,
        at
    }
    loadImageSource(o, c, h=!1, _=!1) {
        const b = this
          , _e = this.json
          , nt = this.options;
        if (!_ && this.sourceCache[o] !== void 0)
            return this.sourceCache[o].then(vt => vt.clone());
        const it = _e.images[o]
          , at = self.URL || self.webkitURL;
        it.uri === void 0 && it.extras && it.extras.uri && (it.uri = it.extras.uri);
        let ut = it.uri || ""
          , pt = !1
          , ht = null;
        if (it.bufferView === void 0 || h && ut) {
            if (it.uri === void 0)
                throw new Error("THREE.GLTFLoader: Image " + o + " is missing URI and bufferView")
        } else
            ut = b.getDependency("bufferView", it.bufferView).then(function(vt) {
                pt = !0;
                const bt = new Blob([vt],{
                    type: it.mimeType
                });
                return ut = at.createObjectURL(bt),
                ht = bt,
                ut
            });
        const _t = Promise.resolve(ut).then(function(vt) {
            return new Promise(function(bt, St) {
                let At = bt;
                c.isImageBitmapLoader === !0 && (At = function(Et) {
                    const Pt = new three_module.gPd(Et);
                    Pt.needsUpdate = !0,
                    bt(Pt)
                }
                ),
                c.load(three_module.r6x.resolveURL(vt, nt.path), At, void 0, function(Et) {
                    c.isImageBitmapLoader === !0 ? (c = new three_module.Tap(b.options.manager),
                    At = bt,
                    c.setCrossOrigin(b.options.crossOrigin),
                    c.setRequestHeader(b.options.requestHeader),
                    c.load(three_module.r6x.resolveURL(vt, nt.path), At, void 0, St)) : St(Et)
                })
            }
            )
        }).then(function(vt) {
            if (pt === !0 && at.revokeObjectURL(ut),
            vt.userData.mimeType = it.mimeType || getImageURIMimeType(it.uri),
            vt.flipY = !1,
            it.extras) {
                if (it.extras.flipY !== void 0) {
                    if (c.isImageBitmapLoader === !0 && typeof createImageBitmap !== void 0) {
                        let bt = vt;
                        const St = it.extras.flipY && !bt.flipY;
                        createImageBitmap(bt.source.data, {
                            imageOrientation: St ? "flipY" : "none"
                        }).then(function(At) {
                            bt._newTex && (bt = bt._newTex),
                            bt.source.data.close && bt.source.data.close(),
                            bt.source.data = At,
                            bt.source.needsUpdate = !0,
                            bt.needsUpdate = !0
                        })
                    }
                    vt.flipY = it.extras.flipY,
                    vt.needsUpdate = !0,
                    delete it.extras.flipY
                }
                it.extras.uuid !== void 0 && (vt.source.uuid = it.extras.uuid),
                it.extras.t_uuid !== void 0 && (vt.uuid = it.extras.t_uuid,
                vt.__hasGLTFUuid = !0)
            }
            return it.uri && typeof it.uri == "string" && pt === !1 && !it.uri.startsWith("/") && (vt.userData.rootPath = three_module.r6x.resolveURL(it.uri, nt.path)),
            ht && (vt.userData.__sourceBlob = ht),
            !h && it.uri && it.uri !== ut && b.loadImageSource(o, c, !0, !0).then(function(bt) {
                vt.source.data && vt.source.data.close && vt.source.data.close(),
                vt.dispose(),
                vt.source = bt.source,
                vt.source.needsUpdate = !0,
                vt.needsUpdate = !0,
                vt.uuid = bt.uuid,
                bt.__hasGLTFUuid && (vt.__hasGLTFUuid = !0),
                vt.flipY = bt.flipY,
                vt.userData = bt.userData,
                vt.setDirty && vt.setDirty(),
                bt._newTex = vt
            }),
            vt
        }).catch(function(vt) {
            throw console.error("THREE.GLTFLoader: Couldn't load texture", ut),
            vt
        });
        return this.sourceCache[o] = _t,
        _t
    }
    assignTexture(o, c, h, _) {
        const b = this;
        return this.getDependency("texture", h.index).then(function(_e) {
            if (!_e)
                return null;
            if (h.texCoord !== void 0 && h.texCoord > 0 && ((_e = _e.clone()).channel = h.texCoord),
            b.extensions[EXTENSIONS.KHR_TEXTURE_TRANSFORM]) {
                const nt = h.extensions !== void 0 ? h.extensions[EXTENSIONS.KHR_TEXTURE_TRANSFORM] : void 0;
                if (nt) {
                    const it = b.associations.get(_e);
                    _e = b.extensions[EXTENSIONS.KHR_TEXTURE_TRANSFORM].extendTexture(_e, nt),
                    b.associations.set(_e, it)
                }
            }
            return _ !== void 0 && (_e.colorSpace = _),
            o[c] = _e,
            _e
        })
    }
    assignFinalMaterial(o) {
        const c = o.geometry;
        let h = o.material;
        const _ = c.attributes.tangent === void 0
          , b = c.attributes.color !== void 0
          , _e = c.attributes.normal === void 0;
        if (o.isPoints) {
            const it = "PointsMaterial:" + h.uuid;
            let at = this.cache.get(it);
            at || (at = new GLTFLoader.ObjectConstructors.PointsMaterial,
            three_module.imn.prototype.copy.call(at, h),
            at.color.copy(h.color),
            at.map = h.map,
            at.sizeAttenuation = !1,
            this.cache.add(it, at)),
            h = at
        } else if (o.isLine) {
            const it = "LineBasicMaterial:" + h.uuid;
            let at = this.cache.get(it);
            at || (at = new GLTFLoader.ObjectConstructors.LineBasicMaterial,
            three_module.imn.prototype.copy.call(at, h),
            at.color.copy(h.color),
            at.map = h.map,
            this.cache.add(it, at)),
            h = at
        }
        const nt = !(!h.userData || !h.userData.gltfExtensions || !h.userData.gltfExtensions.WEBGI_material_extras);
        if ((_ || b || _e) && !nt) {
            let it = "ClonedMaterial:" + h.uuid + ":";
            _ && (it += "derivative-tangents:"),
            b && (it += "vertex-colors:"),
            _e && (it += "flat-shading:");
            let at = this.cache.get(it);
            at || (at = h.clone(),
            b && (at.vertexColors = !0),
            _e && (at.flatShading = !0),
            _ && (at.normalScale && (at.normalScale.y *= -1),
            at.clearcoatNormalScale && (at.clearcoatNormalScale.y *= -1)),
            this.cache.add(it, at),
            this.associations.set(at, this.associations.get(h))),
            h = at
        }
        o.material = h
    }
    getMaterialType() {
        return GLTFLoader.ObjectConstructors.MeshStandardMaterial
    }
    loadMaterial(o) {
        const c = this
          , h = this.json
          , _ = this.extensions
          , b = h.materials[o];
        let _e;
        const nt = {}
          , it = [];
        if ((b.extensions || {})[EXTENSIONS.KHR_MATERIALS_UNLIT]) {
            const ut = _[EXTENSIONS.KHR_MATERIALS_UNLIT];
            _e = ut.getMaterialType(),
            it.push(ut.extendParams(nt, b, c))
        } else {
            const ut = b.pbrMetallicRoughness || {};
            if (nt.color = new three_module.Q1f(1,1,1),
            nt.opacity = 1,
            Array.isArray(ut.baseColorFactor)) {
                const pt = ut.baseColorFactor;
                nt.color.setRGB(pt[0], pt[1], pt[2], three_module.Zr2),
                nt.opacity = pt[3]
            }
            ut.baseColorTexture !== void 0 && it.push(c.assignTexture(nt, "map", ut.baseColorTexture, three_module.er$)),
            nt.metalness = ut.metallicFactor !== void 0 ? ut.metallicFactor : 1,
            nt.roughness = ut.roughnessFactor !== void 0 ? ut.roughnessFactor : 1,
            ut.metallicRoughnessTexture !== void 0 && (it.push(c.assignTexture(nt, "metalnessMap", ut.metallicRoughnessTexture)),
            it.push(c.assignTexture(nt, "roughnessMap", ut.metallicRoughnessTexture))),
            _e = this._invokeOne(function(pt) {
                return pt.getMaterialType && pt.getMaterialType(o)
            }),
            it.push(Promise.all(this._invokeAll(function(pt) {
                return pt.extendMaterialParams && pt.extendMaterialParams(o, nt)
            })))
        }
        b.doubleSided === !0 && (nt.side = three_module.$EB);
        const at = b.alphaMode || ALPHA_MODES.OPAQUE;
        if (at === ALPHA_MODES.BLEND ? (nt.transparent = !0,
        nt.depthWrite = !1) : (nt.transparent = !1,
        at === ALPHA_MODES.MASK && (nt.alphaTest = b.alphaCutoff !== void 0 ? b.alphaCutoff : .5)),
        b.normalTexture !== void 0 && _e !== GLTFLoader.ObjectConstructors.MeshBasicMaterial && (it.push(c.assignTexture(nt, "normalMap", b.normalTexture)),
        nt.normalScale = new three_module.I9Y(1,1),
        b.normalTexture.scale !== void 0)) {
            const ut = b.normalTexture.scale;
            nt.normalScale.set(ut, ut)
        }
        if (b.occlusionTexture !== void 0 && _e !== GLTFLoader.ObjectConstructors.MeshBasicMaterial && (it.push(c.assignTexture(nt, "aoMap", b.occlusionTexture)),
        b.occlusionTexture.strength !== void 0 && (nt.aoMapIntensity = b.occlusionTexture.strength)),
        b.emissiveFactor !== void 0 && _e !== GLTFLoader.ObjectConstructors.MeshBasicMaterial) {
            const ut = b.emissiveFactor;
            nt.emissive = new three_module.Q1f().setRGB(ut[0], ut[1], ut[2], three_module.Zr2)
        }
        return b.emissiveTexture !== void 0 && _e !== GLTFLoader.ObjectConstructors.MeshBasicMaterial && it.push(c.assignTexture(nt, "emissiveMap", b.emissiveTexture, three_module.er$)),
        Promise.all(it).then(function() {
            const ut = new _e(nt);
            return b.extras && b.extras.uuid && (ut.uuid = b.extras.uuid),
            b.name && (ut.name = b.name),
            assignExtrasToUserData(ut, b),
            c.associations.set(ut, {
                materials: o
            }),
            b.extensions && addUnknownExtensionsToUserData(_, ut, b),
            ut
        })
    }
    createUniqueName(o) {
        const c = three_module.Nwf.sanitizeNodeName(o || "");
        return c in this.nodeNamesUsed ? c + "_" + ++this.nodeNamesUsed[c] : (this.nodeNamesUsed[c] = 0,
        c)
    }
    loadGeometries(o) {
        const c = this
          , h = this.extensions
          , _ = this.primitiveCache;
        function b(nt) {
            return h[EXTENSIONS.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(nt, c).then(function(it) {
                return addPrimitiveAttributes(it, nt, c)
            })
        }
        const _e = [];
        for (let nt = 0, it = o.length; nt < it; nt++) {
            const at = o[nt]
              , ut = createPrimitiveKey(at)
              , pt = _[ut];
            if (pt)
                _e.push(pt.promise);
            else {
                let ht;
                ht = at.extensions && at.extensions[EXTENSIONS.KHR_DRACO_MESH_COMPRESSION] ? b(at) : addPrimitiveAttributes(new three_module.LoY, at, c),
                _[ut] = {
                    primitive: at,
                    promise: ht
                },
                _e.push(ht)
            }
        }
        return Promise.all(_e)
    }
    loadMesh(o) {
        const c = this
          , h = this.json
          , _ = this.extensions
          , b = h.meshes[o]
          , _e = b.primitives
          , nt = [];
        for (let it = 0, at = _e.length; it < at; it++) {
            const ut = _e[it].material === void 0 ? createDefaultMaterial(this.cache) : this.getDependency("material", _e[it].material);
            nt.push(ut)
        }
        return nt.push(c.loadGeometries(_e)),
        Promise.all(nt).then(function(it) {
            const at = it.slice(0, it.length - 1)
              , ut = it[it.length - 1]
              , pt = [];
            for (let _t = 0, vt = ut.length; _t < vt; _t++) {
                const bt = ut[_t]
                  , St = _e[_t];
                let At;
                const Et = at[_t];
                if (St.mode === WEBGL_CONSTANTS.TRIANGLES || St.mode === WEBGL_CONSTANTS.TRIANGLE_STRIP || St.mode === WEBGL_CONSTANTS.TRIANGLE_FAN || St.mode === void 0)
                    At = b.isSkinnedMesh === !0 ? new three_module.I46(bt,Et) : new three_module.eaF(bt,Et),
                    At.isSkinnedMesh === !0 && At.normalizeSkinWeights(),
                    St.mode === WEBGL_CONSTANTS.TRIANGLE_STRIP ? At.geometry = toTrianglesDrawMode(At.geometry, three_module.O49) : St.mode === WEBGL_CONSTANTS.TRIANGLE_FAN && (At.geometry = toTrianglesDrawMode(At.geometry, three_module.rYR));
                else if (St.mode === WEBGL_CONSTANTS.LINES)
                    At = new three_module.DXC(bt,Et);
                else if (St.mode === WEBGL_CONSTANTS.LINE_STRIP)
                    At = new three_module.N1A(bt,Et);
                else if (St.mode === WEBGL_CONSTANTS.LINE_LOOP)
                    At = new three_module.FCc(bt,Et);
                else {
                    if (St.mode !== WEBGL_CONSTANTS.POINTS)
                        throw new Error("THREE.GLTFLoader: Primitive mode unsupported: " + St.mode);
                    At = new three_module.ONl(bt,Et)
                }
                Object.keys(At.geometry.morphAttributes).length > 0 && updateMorphTargets(At, b),
                At.name = c.createUniqueName(b.name || "mesh_" + o),
                At.geometry && b.extras && b.extras.isGeometryUserData ? (assignExtrasToUserData(At.geometry, b),
                St.extensions && addUnknownExtensionsToUserData(_, At.geometry, St)) : (assignExtrasToUserData(At, b),
                St.extensions && addUnknownExtensionsToUserData(_, At, St)),
                c.assignFinalMaterial(At),
                pt.push(At)
            }
            b.extensions && pt.forEach(_t => addUnknownExtensionsToUserData(_, _t, b));
            for (let _t = 0, vt = pt.length; _t < vt; _t++)
                c.associations.set(pt[_t], {
                    meshes: o,
                    primitives: _t
                });
            if (pt.length === 1)
                return b.extensions && addUnknownExtensionsToUserData(_, pt[0], b),
                pt[0];
            const ht = new three_module.YJl;
            b.extensions && addUnknownExtensionsToUserData(_, ht, b),
            c.associations.set(ht, {
                meshes: o
            });
            for (let _t = 0, vt = pt.length; _t < vt; _t++)
                ht.add(pt[_t]);
            return ht
        })
    }
    loadCamera(o) {
        let c;
        const h = this.json.cameras[o]
          , _ = h[h.type];
        if (_)
            return h.type === "perspective" ? c = new GLTFLoader.ObjectConstructors.PerspectiveCamera(three_module.cj9.radToDeg(_.yfov),_.aspectRatio || 1,_.znear || 1,_.zfar || 2e6) : h.type === "orthographic" && (c = new GLTFLoader.ObjectConstructors.OrthographicCamera(-_.xmag,_.xmag,_.ymag,-_.ymag,_.znear,_.zfar)),
            h.name && (c.name = this.createUniqueName(h.name)),
            assignExtrasToUserData(c, h),
            Promise.resolve(c);
        console.warn("THREE.GLTFLoader: Missing camera parameters.")
    }
    loadSkin(o) {
        const c = this.json.skins[o]
          , h = [];
        for (let _ = 0, b = c.joints.length; _ < b; _++)
            h.push(this._loadNodeShallow(c.joints[_]));
        return c.inverseBindMatrices !== void 0 ? h.push(this.getDependency("accessor", c.inverseBindMatrices)) : h.push(null),
        Promise.all(h).then(function(_) {
            const b = _.pop()
              , _e = _
              , nt = []
              , it = [];
            for (let at = 0, ut = _e.length; at < ut; at++) {
                const pt = _e[at];
                if (pt) {
                    nt.push(pt);
                    const ht = new three_module.kn4;
                    b !== null && ht.fromArray(b.array, 16 * at),
                    it.push(ht)
                } else
                    console.warn('THREE.GLTFLoader: Joint "%s" could not be found.', c.joints[at])
            }
            return new three_module.EAD(nt,it)
        })
    }
    loadAnimation(o) {
        const c = this.json
          , h = this
          , _ = c.animations[o]
          , b = _.name ? _.name : "animation_" + o
          , _e = []
          , nt = []
          , it = []
          , at = []
          , ut = [];
        for (let pt = 0, ht = _.channels.length; pt < ht; pt++) {
            const _t = _.channels[pt]
              , vt = _.samplers[_t.sampler]
              , bt = _t.target
              , St = bt.node
              , At = _.parameters !== void 0 ? _.parameters[vt.input] : vt.input
              , Et = _.parameters !== void 0 ? _.parameters[vt.output] : vt.output;
            bt.node !== void 0 && (_e.push(this.getDependency("node", St)),
            nt.push(this.getDependency("accessor", At)),
            it.push(this.getDependency("accessor", Et)),
            at.push(vt),
            ut.push(bt))
        }
        return Promise.all([Promise.all(_e), Promise.all(nt), Promise.all(it), Promise.all(at), Promise.all(ut)]).then(function(pt) {
            const ht = pt[0]
              , _t = pt[1]
              , vt = pt[2]
              , bt = pt[3]
              , St = pt[4]
              , At = [];
            for (let Et = 0, Pt = ht.length; Et < Pt; Et++) {
                const It = ht[Et]
                  , Dt = _t[Et]
                  , Gt = vt[Et]
                  , Bt = bt[Et]
                  , kt = St[Et];
                if (It === void 0)
                    continue;
                It.updateMatrix && It.updateMatrix();
                const Ut = h._createAnimationTracks(It, Dt, Gt, Bt, kt);
                if (Ut)
                    for (let Ht = 0; Ht < Ut.length; Ht++)
                        At.push(Ut[Ht])
            }
            return new three_module.tz3(b,void 0,At)
        })
    }
    createNodeMesh(o) {
        const c = this.json
          , h = this
          , _ = c.nodes[o];
        return _.mesh === void 0 ? null : h.getDependency("mesh", _.mesh).then(function(b) {
            const _e = h._getNodeRef(h.meshCache, _.mesh, b);
            return _.weights !== void 0 && _e.traverse(function(nt) {
                if (nt.isMesh)
                    for (let it = 0, at = _.weights.length; it < at; it++)
                        nt.morphTargetInfluences[it] = _.weights[it]
            }),
            _e
        })
    }
    loadNode(o) {
        const c = this
          , h = this.json.nodes[o]
          , _ = c._loadNodeShallow(o)
          , b = []
          , _e = h.children || [];
        for (let it = 0, at = _e.length; it < at; it++)
            b.push(c.getDependency("node", _e[it]));
        const nt = h.skin === void 0 ? Promise.resolve(null) : c.getDependency("skin", h.skin);
        return Promise.all([_, Promise.all(b), nt]).then(function(it) {
            const at = it[0]
              , ut = it[1]
              , pt = it[2];
            pt !== null && at.traverse(function(ht) {
                ht.isSkinnedMesh && ht.bind(pt, _identityMatrix)
            });
            for (let ht = 0, _t = ut.length; ht < _t; ht++)
                at.add(ut[ht]);
            return at
        })
    }
    _loadNodeShallow(o) {
        const c = this.json
          , h = this.extensions
          , _ = this;
        if (this.nodeCache[o] !== void 0)
            return this.nodeCache[o];
        const b = c.nodes[o]
          , _e = b.name ? _.createUniqueName(b.name) : ""
          , nt = []
          , it = _._invokeOne(function(at) {
            return at.createNodeMesh && at.createNodeMesh(o)
        });
        return it && nt.push(it),
        b.camera !== void 0 && nt.push(_.getDependency("camera", b.camera).then(function(at) {
            return _._getNodeRef(_.cameraCache, b.camera, at)
        })),
        _._invokeAll(function(at) {
            return at.createNodeAttachment && at.createNodeAttachment(o)
        }).forEach(function(at) {
            nt.push(at)
        }),
        this.nodeCache[o] = Promise.all(nt).then(function(at) {
            let ut;
            if (ut = b.isBone === !0 ? new three_module.$Kf : at.length > 1 ? new three_module.YJl : at.length === 1 ? at[0] : new three_module.B69,
            ut !== at[0])
                for (let pt = 0, ht = at.length; pt < ht; pt++)
                    ut.add(at[pt]);
            if (b.name && (ut.userData.name = b.name,
            ut.name = _e),
            assignExtrasToUserData(ut, b),
            b.extensions && addUnknownExtensionsToUserData(h, ut, b),
            b.matrix !== void 0) {
                const pt = new three_module.kn4;
                pt.fromArray(b.matrix),
                ut.applyMatrix4(pt)
            } else
                b.translation !== void 0 && ut.position.fromArray(b.translation),
                b.rotation !== void 0 && ut.quaternion.fromArray(b.rotation),
                b.scale !== void 0 && ut.scale.fromArray(b.scale);
            return _.associations.has(ut) || _.associations.set(ut, {}),
            _.associations.get(ut).nodes = o,
            ut
        }),
        this.nodeCache[o]
    }
    loadScene(o) {
        const c = this.extensions
          , h = this.json.scenes[o]
          , _ = this
          , b = new three_module.YJl;
        h.name && (b.name = _.createUniqueName(h.name)),
        assignExtrasToUserData(b, h),
        h.extensions && addUnknownExtensionsToUserData(c, b, h);
        const _e = h.nodes || []
          , nt = [];
        for (let it = 0, at = _e.length; it < at; it++)
            nt.push(_.getDependency("node", _e[it]));
        return Promise.all(nt).then(function(it) {
            for (let at = 0, ut = it.length; at < ut; at++)
                b.add(it[at]);
            return _.associations = (at => {
                const ut = new Map;
                for (const [pt,ht] of _.associations)
                    (pt instanceof three_module.imn || pt instanceof three_module.gPd) && ut.set(pt, ht);
                return at.traverse(pt => {
                    const ht = _.associations.get(pt);
                    ht != null && ut.set(pt, ht)
                }
                ),
                ut
            }
            )(b),
            b
        })
    }
    _createAnimationTracks(o, c, h, _, b) {
        const _e = []
          , nt = o.name ? o.name : o.uuid
          , it = [];
        let at;
        switch (PATH_PROPERTIES[b.path] === PATH_PROPERTIES.weights ? o.traverse(function(ht) {
            ht.morphTargetInfluences && it.push(ht.name ? ht.name : ht.uuid)
        }) : it.push(nt),
        PATH_PROPERTIES[b.path]) {
        case PATH_PROPERTIES.weights:
            at = three_module.Hit;
            break;
        case PATH_PROPERTIES.rotation:
            at = three_module.MBL;
            break;
        case PATH_PROPERTIES.position:
        case PATH_PROPERTIES.scale:
            at = three_module.RiT;
            break;
        default:
            at = h.itemSize === 1 ? three_module.Hit : three_module.RiT
        }
        const ut = _.interpolation !== void 0 ? INTERPOLATION[_.interpolation] : three_module.PJ3
          , pt = this._getArrayFromAccessor(h);
        for (let ht = 0, _t = it.length; ht < _t; ht++) {
            const vt = new at(it[ht] + "." + PATH_PROPERTIES[b.path],c.array,pt,ut);
            _.interpolation === "CUBICSPLINE" && this._createCubicSplineTrackInterpolant(vt),
            _e.push(vt)
        }
        return _e
    }
    _getArrayFromAccessor(o) {
        let c = o.array;
        if (o.normalized) {
            const h = getNormalizedComponentScale(c.constructor)
              , _ = new Float32Array(c.length);
            for (let b = 0, _e = c.length; b < _e; b++)
                _[b] = c[b] * h;
            c = _
        }
        return c
    }
    _createCubicSplineTrackInterpolant(o) {
        o.createInterpolant = function(c) {
            return new (this instanceof three_module.MBL ? GLTFCubicSplineQuaternionInterpolant : GLTFCubicSplineInterpolant)(this.times,this.values,this.getValueSize() / 3,c)
        }
        ,
        o.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline = !0
    }
}

export default GLTFParser;
