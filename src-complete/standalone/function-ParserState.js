/* Standalone Function: ParserState */

function ParserState() {
    const d = {
        objects: [],
        object: {},
        vertices: [],
        normals: [],
        colors: [],
        uvs: [],
        materials: {},
        materialLibraries: [],
        startObject: function(o, c) {
            if (this.object && this.object.fromDeclaration === !1)
                return this.object.name = o,
                void (this.object.fromDeclaration = c !== !1);
            const h = this.object && typeof this.object.currentMaterial == "function" ? this.object.currentMaterial() : void 0;
            if (this.object && typeof this.object._finalize == "function" && this.object._finalize(!0),
            this.object = {
                name: o || "",
                fromDeclaration: c !== !1,
                geometry: {
                    vertices: [],
                    normals: [],
                    colors: [],
                    uvs: [],
                    hasUVIndices: !1
                },
                materials: [],
                smooth: !0,
                startMaterial: function(_, b) {
                    const _e = this._finalize(!1);
                    _e && (_e.inherited || _e.groupCount <= 0) && this.materials.splice(_e.index, 1);
                    const nt = {
                        index: this.materials.length,
                        name: _ || "",
                        mtllib: Array.isArray(b) && b.length > 0 ? b[b.length - 1] : "",
                        smooth: _e !== void 0 ? _e.smooth : this.smooth,
                        groupStart: _e !== void 0 ? _e.groupEnd : 0,
                        groupEnd: -1,
                        groupCount: -1,
                        inherited: !1,
                        clone: function(it) {
                            const at = {
                                index: typeof it == "number" ? it : this.index,
                                name: this.name,
                                mtllib: this.mtllib,
                                smooth: this.smooth,
                                groupStart: 0,
                                groupEnd: -1,
                                groupCount: -1,
                                inherited: !1
                            };
                            return at.clone = this.clone.bind(at),
                            at
                        }
                    };
                    return this.materials.push(nt),
                    nt
                },
                currentMaterial: function() {
                    if (this.materials.length > 0)
                        return this.materials[this.materials.length - 1]
                },
                _finalize: function(_) {
                    const b = this.currentMaterial();
                    if (b && b.groupEnd === -1 && (b.groupEnd = this.geometry.vertices.length / 3,
                    b.groupCount = b.groupEnd - b.groupStart,
                    b.inherited = !1),
                    _ && this.materials.length > 1)
                        for (let _e = this.materials.length - 1; _e >= 0; _e--)
                            this.materials[_e].groupCount <= 0 && this.materials.splice(_e, 1);
                    return _ && this.materials.length === 0 && this.materials.push({
                        name: "",
                        smooth: this.smooth
                    }),
                    b
                }
            },
            h && h.name && typeof h.clone == "function") {
                const _ = h.clone(0);
                _.inherited = !0,
                this.object.materials.push(_)
            }
            this.objects.push(this.object)
        },
        finalize: function() {
            this.object && typeof this.object._finalize == "function" && this.object._finalize(!0)
        },
        parseVertexIndex: function(o, c) {
            const h = parseInt(o, 10);
            return 3 * (h >= 0 ? h - 1 : h + c / 3)
        },
        parseNormalIndex: function(o, c) {
            const h = parseInt(o, 10);
            return 3 * (h >= 0 ? h - 1 : h + c / 3)
        },
        parseUVIndex: function(o, c) {
            const h = parseInt(o, 10);
            return 2 * (h >= 0 ? h - 1 : h + c / 2)
        },
        addVertex: function(o, c, h) {
            const _ = this.vertices
              , b = this.object.geometry.vertices;
            b.push(_[o + 0], _[o + 1], _[o + 2]),
            b.push(_[c + 0], _[c + 1], _[c + 2]),
            b.push(_[h + 0], _[h + 1], _[h + 2])
        },
        addVertexPoint: function(o) {
            const c = this.vertices;
            this.object.geometry.vertices.push(c[o + 0], c[o + 1], c[o + 2])
        },
        addVertexLine: function(o) {
            const c = this.vertices;
            this.object.geometry.vertices.push(c[o + 0], c[o + 1], c[o + 2])
        },
        addNormal: function(o, c, h) {
            const _ = this.normals
              , b = this.object.geometry.normals;
            b.push(_[o + 0], _[o + 1], _[o + 2]),
            b.push(_[c + 0], _[c + 1], _[c + 2]),
            b.push(_[h + 0], _[h + 1], _[h + 2])
        },
        addFaceNormal: function(o, c, h) {
            const _ = this.vertices
              , b = this.object.geometry.normals;
            _vA.fromArray(_, o),
            _vB.fromArray(_, c),
            _vC.fromArray(_, h),
            _cb.subVectors(_vC, _vB),
            _ab.subVectors(_vA, _vB),
            _cb.cross(_ab),
            _cb.normalize(),
            b.push(_cb.x, _cb.y, _cb.z),
            b.push(_cb.x, _cb.y, _cb.z),
            b.push(_cb.x, _cb.y, _cb.z)
        },
        addColor: function(o, c, h) {
            const _ = this.colors
              , b = this.object.geometry.colors;
            _[o] !== void 0 && b.push(_[o + 0], _[o + 1], _[o + 2]),
            _[c] !== void 0 && b.push(_[c + 0], _[c + 1], _[c + 2]),
            _[h] !== void 0 && b.push(_[h + 0], _[h + 1], _[h + 2])
        },
        addUV: function(o, c, h) {
            const _ = this.uvs
              , b = this.object.geometry.uvs;
            b.push(_[o + 0], _[o + 1]),
            b.push(_[c + 0], _[c + 1]),
            b.push(_[h + 0], _[h + 1])
        },
        addDefaultUV: function() {
            const o = this.object.geometry.uvs;
            o.push(0, 0),
            o.push(0, 0),
            o.push(0, 0)
        },
        addUVLine: function(o) {
            const c = this.uvs;
            this.object.geometry.uvs.push(c[o + 0], c[o + 1])
        },
        addFace: function(o, c, h, _, b, _e, nt, it, at) {
            const ut = this.vertices.length;
            let pt = this.parseVertexIndex(o, ut)
              , ht = this.parseVertexIndex(c, ut)
              , _t = this.parseVertexIndex(h, ut);
            if (this.addVertex(pt, ht, _t),
            this.addColor(pt, ht, _t),
            nt !== void 0 && nt !== "") {
                const vt = this.normals.length;
                pt = this.parseNormalIndex(nt, vt),
                ht = this.parseNormalIndex(it, vt),
                _t = this.parseNormalIndex(at, vt),
                this.addNormal(pt, ht, _t)
            } else
                this.addFaceNormal(pt, ht, _t);
            if (_ !== void 0 && _ !== "") {
                const vt = this.uvs.length;
                pt = this.parseUVIndex(_, vt),
                ht = this.parseUVIndex(b, vt),
                _t = this.parseUVIndex(_e, vt),
                this.addUV(pt, ht, _t),
                this.object.geometry.hasUVIndices = !0
            } else
                this.addDefaultUV()
        },
        addPointGeometry: function(o) {
            this.object.geometry.type = "Points";
            const c = this.vertices.length;
            for (let h = 0, _ = o.length; h < _; h++) {
                const b = this.parseVertexIndex(o[h], c);
                this.addVertexPoint(b),
                this.addColor(b)
            }
        },
        addLineGeometry: function(o, c) {
            this.object.geometry.type = "Line";
            const h = this.vertices.length
              , _ = this.uvs.length;
            for (let b = 0, _e = o.length; b < _e; b++)
                this.addVertexLine(this.parseVertexIndex(o[b], h));
            for (let b = 0, _e = c.length; b < _e; b++)
                this.addUVLine(this.parseUVIndex(c[b], _))
        }
    };
    return d.startObject("", !1),
    d
}

export default ParserState;
