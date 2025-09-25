/* Standalone Class: MeshBVH */

class MeshBVH {
    static serialize(o, c={}) {
        c = {
            cloneBuffers: !0,
            ...c
        };
        const h = o.geometry
          , _ = o._roots
          , b = o._indirectBuffer
          , _e = h.getIndex();
        let nt;
        return nt = c.cloneBuffers ? {
            roots: _.map(it => it.slice()),
            index: _e.array.slice(),
            indirectBuffer: b ? b.slice() : null
        } : {
            roots: _,
            index: _e.array,
            indirectBuffer: b
        },
        nt
    }
    static deserialize(o, c, h={}) {
        h = {
            setIndex: !0,
            indirect: !!o.indirectBuffer,
            ...h
        };
        const {index: _, roots: b, indirectBuffer: _e} = o
          , nt = new MeshBVH(c,{
            ...h,
            [SKIP_GENERATION]: !0
        });
        if (nt._roots = b,
        nt._indirectBuffer = _e || null,
        h.setIndex) {
            const it = c.getIndex();
            if (it === null) {
                const at = new three_module.THS(o.index,1,!1);
                c.setIndex(at)
            } else
                it.array !== _ && (it.array.set(_),
                it.needsUpdate = !0)
        }
        return nt
    }
    get indirect() {
        return !!this._indirectBuffer
    }
    constructor(o, c={}) {
        if (!o.isBufferGeometry)
            throw new Error("MeshBVH: Only BufferGeometries are supported.");
        if (o.index && o.index.isInterleavedBufferAttribute)
            throw new Error("MeshBVH: InterleavedBufferAttribute is not supported for the index attribute.");
        if ((c = Object.assign({
            strategy: CENTER,
            maxDepth: 40,
            maxLeafTris: 10,
            verbose: !0,
            useSharedArrayBuffer: !1,
            setBoundingBox: !0,
            onProgress: null,
            indirect: !1,
            [SKIP_GENERATION]: !1
        }, c)).useSharedArrayBuffer && !isSharedArrayBufferSupported())
            throw new Error("MeshBVH: SharedArrayBuffer is not available.");
        this.geometry = o,
        this._roots = null,
        this._indirectBuffer = null,
        c[SKIP_GENERATION] || (buildPackedTree(this, c),
        !o.boundingBox && c.setBoundingBox && (o.boundingBox = this.getBoundingBox(new three_module.NRn)));
        const {_indirectBuffer: h} = this;
        this.resolveTriangleIndex = c.indirect ? _ => h[_] : _ => _
    }
    refit(o=null) {
        return (this.indirect ? refit_indirect : refit)(this, o)
    }
    traverse(o, c=0) {
        const h = this._roots[c]
          , _ = new Uint32Array(h)
          , b = new Uint16Array(h);
        (function _e(nt, it=0) {
            const at = 2 * nt
              , ut = b[at + 15] === IS_LEAFNODE_FLAG;
            if (ut) {
                const pt = _[nt + 6]
                  , ht = b[at + 14];
                o(it, ut, new Float32Array(h,4 * nt,6), pt, ht)
            } else {
                const pt = nt + BYTES_PER_NODE / 4
                  , ht = _[nt + 6]
                  , _t = _[nt + 7];
                o(it, ut, new Float32Array(h,4 * nt,6), _t) || (_e(pt, it + 1),
                _e(ht, it + 1))
            }
        }
        )(0)
    }
    raycast(o, c=three_module.hB5) {
        const h = this._roots
          , _ = this.geometry
          , b = []
          , _e = c.isMaterial
          , nt = Array.isArray(c)
          , it = _.groups
          , at = _e ? c.side : c
          , ut = this.indirect ? raycast_indirect : raycast;
        for (let pt = 0, ht = h.length; pt < ht; pt++) {
            const _t = nt ? c[it[pt].materialIndex].side : at
              , vt = b.length;
            if (ut(this, pt, _t, o, b),
            nt) {
                const bt = it[pt].materialIndex;
                for (let St = vt, At = b.length; St < At; St++)
                    b[St].face.materialIndex = bt
            }
        }
        return b
    }
    raycastFirst(o, c=three_module.hB5) {
        const h = this._roots
          , _ = this.geometry
          , b = c.isMaterial
          , _e = Array.isArray(c);
        let nt = null;
        const it = _.groups
          , at = b ? c.side : c
          , ut = this.indirect ? raycastFirst_indirect : raycastFirst;
        for (let pt = 0, ht = h.length; pt < ht; pt++) {
            const _t = ut(this, pt, _e ? c[it[pt].materialIndex].side : at, o);
            _t != null && (nt == null || _t.distance < nt.distance) && (nt = _t,
            _e && (_t.face.materialIndex = it[pt].materialIndex))
        }
        return nt
    }
    intersectsGeometry(o, c) {
        let h = !1;
        const _ = this._roots
          , b = this.indirect ? intersectsGeometry_indirect : intersectsGeometry;
        for (let _e = 0, nt = _.length; _e < nt && (h = b(this, _e, o, c),
        !h); _e++)
            ;
        return h
    }
    shapecast(o) {
        const c = ExtendedTrianglePool.getPrimitive()
          , h = this.indirect ? iterateOverTriangles_indirect : iterateOverTriangles;
        let {boundsTraverseOrder: _, intersectsBounds: b, intersectsRange: _e, intersectsTriangle: nt} = o;
        if (_e && nt) {
            const pt = _e;
            _e = (ht, _t, vt, bt, St) => !!pt(ht, _t, vt, bt, St) || h(ht, _t, this, nt, vt, bt, c)
        } else
            _e || (_e = nt ? (pt, ht, _t, vt) => h(pt, ht, this, nt, _t, vt, c) : (pt, ht, _t) => _t);
        let it = !1
          , at = 0;
        const ut = this._roots;
        for (let pt = 0, ht = ut.length; pt < ht; pt++) {
            const _t = ut[pt];
            if (it = shapecast(this, pt, b, _e, _, at),
            it)
                break;
            at += _t.byteLength
        }
        return ExtendedTrianglePool.releasePrimitive(c),
        it
    }
    bvhcast(o, c, h) {
        let {intersectsRanges: _, intersectsTriangles: b} = h;
        const _e = ExtendedTrianglePool.getPrimitive()
          , nt = this.geometry.index
          , it = this.geometry.attributes.position
          , at = this.indirect ? vt => {
            const bt = this.resolveTriangleIndex(vt);
            setTriangle(_e, 3 * bt, nt, it)
        }
        : vt => {
            setTriangle(_e, 3 * vt, nt, it)
        }
          , ut = ExtendedTrianglePool.getPrimitive()
          , pt = o.geometry.index
          , ht = o.geometry.attributes.position
          , _t = o.indirect ? vt => {
            const bt = o.resolveTriangleIndex(vt);
            setTriangle(ut, 3 * bt, pt, ht)
        }
        : vt => {
            setTriangle(ut, 3 * vt, pt, ht)
        }
        ;
        if (b) {
            const vt = (bt, St, At, Et, Pt, It, Dt, Gt) => {
                for (let Bt = At, kt = At + Et; Bt < kt; Bt++) {
                    _t(Bt),
                    ut.a.applyMatrix4(c),
                    ut.b.applyMatrix4(c),
                    ut.c.applyMatrix4(c),
                    ut.needsUpdate = !0;
                    for (let Ut = bt, Ht = bt + St; Ut < Ht; Ut++)
                        if (at(Ut),
                        _e.needsUpdate = !0,
                        b(_e, ut, Ut, Bt, Pt, It, Dt, Gt))
                            return !0
                }
                return !1
            }
            ;
            if (_) {
                const bt = _;
                _ = function(St, At, Et, Pt, It, Dt, Gt, Bt) {
                    return !!bt(St, At, Et, Pt, It, Dt, Gt, Bt) || vt(St, At, Et, Pt, It, Dt, Gt, Bt)
                }
            } else
                _ = vt
        }
        return bvhcast(this, o, c, _)
    }
    intersectsBox(o, c) {
        return MeshBVH_obb.set(o.min, o.max, c),
        MeshBVH_obb.needsUpdate = !0,
        this.shapecast({
            intersectsBounds: h => MeshBVH_obb.intersectsBox(h),
            intersectsTriangle: h => MeshBVH_obb.intersectsTriangle(h)
        })
    }
    intersectsSphere(o) {
        return this.shapecast({
            intersectsBounds: c => o.intersectsBox(c),
            intersectsTriangle: c => c.intersectsSphere(o)
        })
    }
    closestPointToGeometry(o, c, h={}, _={}, b=0, _e=1 / 0) {
        return (this.indirect ? closestPointToGeometry_indirect : closestPointToGeometry)(this, o, c, h, _, b, _e)
    }
    closestPointToPoint(o, c={}, h=0, _=1 / 0) {
        return closestPointToPoint(this, o, c, h, _)
    }
    getBoundingBox(o) {
        return o.makeEmpty(),
        this._roots.forEach(c => {
            arrayToBox(0, new Float32Array(c), tempBox),
            o.union(tempBox)
        }
        ),
        o
    }
}

export default MeshBVH;
