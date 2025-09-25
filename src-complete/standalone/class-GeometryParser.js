/* Standalone Class: GeometryParser */

class GeometryParser {
    constructor() {
        this.negativeMaterialIndices = !1
    }
    parse(o) {
        const c = new Map;
        if ("Geometry"in fbxTree.Objects) {
            const h = fbxTree.Objects.Geometry;
            for (const _ in h) {
                const b = connections.get(parseInt(_))
                  , _e = this.parseGeometry(b, h[_], o);
                c.set(parseInt(_), _e)
            }
        }
        return this.negativeMaterialIndices === !0 && console.warn("THREE.FBXLoader: The FBX file contains invalid (negative) material indices. The asset might not render as expected."),
        c
    }
    parseGeometry(o, c, h) {
        switch (c.attrType) {
        case "Mesh":
            return this.parseMeshGeometry(o, c, h);
        case "NurbsCurve":
            return this.parseNurbsGeometry(c)
        }
    }
    parseMeshGeometry(o, c, h) {
        const _ = h.skeletons
          , b = []
          , _e = o.parents.map(function(pt) {
            return fbxTree.Objects.Model[pt.ID]
        });
        if (_e.length === 0)
            return;
        const nt = o.children.reduce(function(pt, ht) {
            return _[ht.ID] !== void 0 && (pt = _[ht.ID]),
            pt
        }, null);
        o.children.forEach(function(pt) {
            h.morphTargets[pt.ID] !== void 0 && b.push(h.morphTargets[pt.ID])
        });
        const it = _e[0]
          , at = {};
        "RotationOrder"in it && (at.eulerOrder = getEulerOrder(it.RotationOrder.value)),
        "InheritType"in it && (at.inheritType = parseInt(it.InheritType.value)),
        "GeometricTranslation"in it && (at.translation = it.GeometricTranslation.value),
        "GeometricRotation"in it && (at.rotation = it.GeometricRotation.value),
        "GeometricScaling"in it && (at.scale = it.GeometricScaling.value);
        const ut = generateTransform(at);
        return this.genGeometry(c, nt, b, ut)
    }
    genGeometry(o, c, h, _) {
        const b = new three_module.LoY;
        o.attrName && (b.name = o.attrName);
        const _e = this.parseGeoNode(o, c)
          , nt = this.genBuffers(_e)
          , it = new three_module.qtW(nt.vertex,3);
        if (it.applyMatrix4(_),
        b.setAttribute("position", it),
        nt.colors.length > 0 && b.setAttribute("color", new three_module.qtW(nt.colors,3)),
        c && (b.setAttribute("skinIndex", new three_module.A$4(nt.weightsIndices,4)),
        b.setAttribute("skinWeight", new three_module.qtW(nt.vertexWeights,4)),
        b.FBX_Deformer = c),
        nt.normal.length > 0) {
            const at = new three_module.dwI().getNormalMatrix(_)
              , ut = new three_module.qtW(nt.normal,3);
            ut.applyNormalMatrix(at),
            b.setAttribute("normal", ut)
        }
        if (nt.uvs.forEach(function(at, ut) {
            const pt = ut === 0 ? "uv" : `uv${ut}`;
            b.setAttribute(pt, new three_module.qtW(nt.uvs[ut],2))
        }),
        _e.material && _e.material.mappingType !== "AllSame") {
            let at = nt.materialIndex[0]
              , ut = 0;
            if (nt.materialIndex.forEach(function(pt, ht) {
                pt !== at && (b.addGroup(ut, ht - ut, at),
                at = pt,
                ut = ht)
            }),
            b.groups.length > 0) {
                const pt = b.groups[b.groups.length - 1]
                  , ht = pt.start + pt.count;
                ht !== nt.materialIndex.length && b.addGroup(ht, nt.materialIndex.length - ht, at)
            }
            b.groups.length === 0 && b.addGroup(0, nt.materialIndex.length, nt.materialIndex[0])
        }
        return this.addMorphTargets(b, o, h, _),
        b
    }
    parseGeoNode(o, c) {
        const h = {};
        if (h.vertexPositions = o.Vertices !== void 0 ? o.Vertices.a : [],
        h.vertexIndices = o.PolygonVertexIndex !== void 0 ? o.PolygonVertexIndex.a : [],
        o.LayerElementColor && (h.color = this.parseVertexColors(o.LayerElementColor[0])),
        o.LayerElementMaterial && (h.material = this.parseMaterialIndices(o.LayerElementMaterial[0])),
        o.LayerElementNormal && (h.normal = this.parseNormals(o.LayerElementNormal[0])),
        o.LayerElementUV) {
            h.uv = [];
            let _ = 0;
            for (; o.LayerElementUV[_]; )
                o.LayerElementUV[_].UV && h.uv.push(this.parseUVs(o.LayerElementUV[_])),
                _++
        }
        return h.weightTable = {},
        c !== null && (h.skeleton = c,
        c.rawBones.forEach(function(_, b) {
            _.indices.forEach(function(_e, nt) {
                h.weightTable[_e] === void 0 && (h.weightTable[_e] = []),
                h.weightTable[_e].push({
                    id: b,
                    weight: _.weights[nt]
                })
            })
        })),
        h
    }
    genBuffers(o) {
        const c = {
            vertex: [],
            normal: [],
            colors: [],
            uvs: [],
            materialIndex: [],
            vertexWeights: [],
            weightsIndices: []
        };
        let h = 0
          , _ = 0
          , b = !1
          , _e = []
          , nt = []
          , it = []
          , at = []
          , ut = []
          , pt = [];
        const ht = this;
        return o.vertexIndices.forEach(function(_t, vt) {
            let bt, St = !1;
            _t < 0 && (_t = ~_t,
            St = !0);
            let At = []
              , Et = [];
            if (_e.push(3 * _t, 3 * _t + 1, 3 * _t + 2),
            o.color) {
                const Pt = getData(vt, h, _t, o.color);
                it.push(Pt[0], Pt[1], Pt[2])
            }
            if (o.skeleton) {
                if (o.weightTable[_t] !== void 0 && o.weightTable[_t].forEach(function(Pt) {
                    Et.push(Pt.weight),
                    At.push(Pt.id)
                }),
                Et.length > 4) {
                    b || (console.warn("THREE.FBXLoader: Vertex has more than 4 skinning weights assigned to vertex. Deleting additional weights."),
                    b = !0);
                    const Pt = [0, 0, 0, 0]
                      , It = [0, 0, 0, 0];
                    Et.forEach(function(Dt, Gt) {
                        let Bt = Dt
                          , kt = At[Gt];
                        It.forEach(function(Ut, Ht, Kt) {
                            if (Bt > Ut) {
                                Kt[Ht] = Bt,
                                Bt = Ut;
                                const Jt = Pt[Ht];
                                Pt[Ht] = kt,
                                kt = Jt
                            }
                        })
                    }),
                    At = Pt,
                    Et = It
                }
                for (; Et.length < 4; )
                    Et.push(0),
                    At.push(0);
                for (let Pt = 0; Pt < 4; ++Pt)
                    ut.push(Et[Pt]),
                    pt.push(At[Pt])
            }
            if (o.normal) {
                const Pt = getData(vt, h, _t, o.normal);
                nt.push(Pt[0], Pt[1], Pt[2])
            }
            o.material && o.material.mappingType !== "AllSame" && (bt = getData(vt, h, _t, o.material)[0],
            bt < 0 && (ht.negativeMaterialIndices = !0,
            bt = 0)),
            o.uv && o.uv.forEach(function(Pt, It) {
                const Dt = getData(vt, h, _t, Pt);
                at[It] === void 0 && (at[It] = []),
                at[It].push(Dt[0]),
                at[It].push(Dt[1])
            }),
            _++,
            St && (_ > 4 && console.warn("THREE.FBXLoader: Polygons with more than four sides are not supported. Make sure to triangulate the geometry during export."),
            ht.genFace(c, o, _e, bt, nt, it, at, ut, pt, _),
            h++,
            _ = 0,
            _e = [],
            nt = [],
            it = [],
            at = [],
            ut = [],
            pt = [])
        }),
        c
    }
    genFace(o, c, h, _, b, _e, nt, it, at, ut) {
        for (let pt = 2; pt < ut; pt++)
            o.vertex.push(c.vertexPositions[h[0]]),
            o.vertex.push(c.vertexPositions[h[1]]),
            o.vertex.push(c.vertexPositions[h[2]]),
            o.vertex.push(c.vertexPositions[h[3 * (pt - 1)]]),
            o.vertex.push(c.vertexPositions[h[3 * (pt - 1) + 1]]),
            o.vertex.push(c.vertexPositions[h[3 * (pt - 1) + 2]]),
            o.vertex.push(c.vertexPositions[h[3 * pt]]),
            o.vertex.push(c.vertexPositions[h[3 * pt + 1]]),
            o.vertex.push(c.vertexPositions[h[3 * pt + 2]]),
            c.skeleton && (o.vertexWeights.push(it[0]),
            o.vertexWeights.push(it[1]),
            o.vertexWeights.push(it[2]),
            o.vertexWeights.push(it[3]),
            o.vertexWeights.push(it[4 * (pt - 1)]),
            o.vertexWeights.push(it[4 * (pt - 1) + 1]),
            o.vertexWeights.push(it[4 * (pt - 1) + 2]),
            o.vertexWeights.push(it[4 * (pt - 1) + 3]),
            o.vertexWeights.push(it[4 * pt]),
            o.vertexWeights.push(it[4 * pt + 1]),
            o.vertexWeights.push(it[4 * pt + 2]),
            o.vertexWeights.push(it[4 * pt + 3]),
            o.weightsIndices.push(at[0]),
            o.weightsIndices.push(at[1]),
            o.weightsIndices.push(at[2]),
            o.weightsIndices.push(at[3]),
            o.weightsIndices.push(at[4 * (pt - 1)]),
            o.weightsIndices.push(at[4 * (pt - 1) + 1]),
            o.weightsIndices.push(at[4 * (pt - 1) + 2]),
            o.weightsIndices.push(at[4 * (pt - 1) + 3]),
            o.weightsIndices.push(at[4 * pt]),
            o.weightsIndices.push(at[4 * pt + 1]),
            o.weightsIndices.push(at[4 * pt + 2]),
            o.weightsIndices.push(at[4 * pt + 3])),
            c.color && (o.colors.push(_e[0]),
            o.colors.push(_e[1]),
            o.colors.push(_e[2]),
            o.colors.push(_e[3 * (pt - 1)]),
            o.colors.push(_e[3 * (pt - 1) + 1]),
            o.colors.push(_e[3 * (pt - 1) + 2]),
            o.colors.push(_e[3 * pt]),
            o.colors.push(_e[3 * pt + 1]),
            o.colors.push(_e[3 * pt + 2])),
            c.material && c.material.mappingType !== "AllSame" && (o.materialIndex.push(_),
            o.materialIndex.push(_),
            o.materialIndex.push(_)),
            c.normal && (o.normal.push(b[0]),
            o.normal.push(b[1]),
            o.normal.push(b[2]),
            o.normal.push(b[3 * (pt - 1)]),
            o.normal.push(b[3 * (pt - 1) + 1]),
            o.normal.push(b[3 * (pt - 1) + 2]),
            o.normal.push(b[3 * pt]),
            o.normal.push(b[3 * pt + 1]),
            o.normal.push(b[3 * pt + 2])),
            c.uv && c.uv.forEach(function(ht, _t) {
                o.uvs[_t] === void 0 && (o.uvs[_t] = []),
                o.uvs[_t].push(nt[_t][0]),
                o.uvs[_t].push(nt[_t][1]),
                o.uvs[_t].push(nt[_t][2 * (pt - 1)]),
                o.uvs[_t].push(nt[_t][2 * (pt - 1) + 1]),
                o.uvs[_t].push(nt[_t][2 * pt]),
                o.uvs[_t].push(nt[_t][2 * pt + 1])
            })
    }
    addMorphTargets(o, c, h, _) {
        if (h.length === 0)
            return;
        o.morphTargetsRelative = !0,
        o.morphAttributes.position = [];
        const b = this;
        h.forEach(function(_e) {
            _e.rawTargets.forEach(function(nt) {
                const it = fbxTree.Objects.Geometry[nt.geoID];
                it !== void 0 && b.genMorphGeometry(o, c, it, _, nt.name)
            })
        })
    }
    genMorphGeometry(o, c, h, _, b) {
        const _e = c.PolygonVertexIndex !== void 0 ? c.PolygonVertexIndex.a : []
          , nt = h.Vertices !== void 0 ? h.Vertices.a : []
          , it = h.Indexes !== void 0 ? h.Indexes.a : []
          , at = 3 * o.attributes.position.count
          , ut = new Float32Array(at);
        for (let vt = 0; vt < it.length; vt++) {
            const bt = 3 * it[vt];
            ut[bt] = nt[3 * vt],
            ut[bt + 1] = nt[3 * vt + 1],
            ut[bt + 2] = nt[3 * vt + 2]
        }
        const pt = {
            vertexIndices: _e,
            vertexPositions: ut
        }
          , ht = this.genBuffers(pt)
          , _t = new three_module.qtW(ht.vertex,3);
        _t.name = b || h.attrName,
        _t.applyMatrix4(_),
        o.morphAttributes.position.push(_t)
    }
    parseNormals(o) {
        const c = o.MappingInformationType
          , h = o.ReferenceInformationType
          , _ = o.Normals.a;
        let b = [];
        return h === "IndexToDirect" && ("NormalIndex"in o ? b = o.NormalIndex.a : "NormalsIndex"in o && (b = o.NormalsIndex.a)),
        {
            dataSize: 3,
            buffer: _,
            indices: b,
            mappingType: c,
            referenceType: h
        }
    }
    parseUVs(o) {
        const c = o.MappingInformationType
          , h = o.ReferenceInformationType
          , _ = o.UV.a;
        let b = [];
        return h === "IndexToDirect" && (b = o.UVIndex.a),
        {
            dataSize: 2,
            buffer: _,
            indices: b,
            mappingType: c,
            referenceType: h
        }
    }
    parseVertexColors(o) {
        const c = o.MappingInformationType
          , h = o.ReferenceInformationType
          , _ = o.Colors.a;
        let b = [];
        h === "IndexToDirect" && (b = o.ColorIndex.a);
        for (let _e = 0, nt = new three_module.Q1f; _e < _.length; _e += 4)
            nt.fromArray(_, _e).convertSRGBToLinear().toArray(_, _e);
        return {
            dataSize: 4,
            buffer: _,
            indices: b,
            mappingType: c,
            referenceType: h
        }
    }
    parseMaterialIndices(o) {
        const c = o.MappingInformationType
          , h = o.ReferenceInformationType;
        if (c === "NoMappingInformation")
            return {
                dataSize: 1,
                buffer: [0],
                indices: [0],
                mappingType: "AllSame",
                referenceType: h
            };
        const _ = o.Materials.a
          , b = [];
        for (let _e = 0; _e < _.length; ++_e)
            b.push(_e);
        return {
            dataSize: 1,
            buffer: _,
            indices: b,
            mappingType: c,
            referenceType: h
        }
    }
    parseNurbsGeometry(o) {
        const c = parseInt(o.Order);
        if (isNaN(c))
            return console.error("THREE.FBXLoader: Invalid Order %s given for geometry ID: %s", o.Order, o.id),
            new three_module.LoY;
        const h = c - 1
          , _ = o.KnotVector.a
          , b = []
          , _e = o.Points.a;
        for (let ut = 0, pt = _e.length; ut < pt; ut += 4)
            b.push(new three_module.IUQ().fromArray(_e, ut));
        let nt, it;
        if (o.Form === "Closed")
            b.push(b[0]);
        else if (o.Form === "Periodic") {
            nt = h,
            it = _.length - 1 - nt;
            for (let ut = 0; ut < h; ++ut)
                b.push(b[ut])
        }
        const at = new NURBSCurve(h,_,b,nt,it).getPoints(12 * b.length);
        return new three_module.LoY().setFromPoints(at)
    }
}

export default GeometryParser;
