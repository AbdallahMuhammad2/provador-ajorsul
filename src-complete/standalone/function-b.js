/* Standalone Function: b */

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

export default b;
