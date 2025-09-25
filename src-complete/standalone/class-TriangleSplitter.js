/* Standalone Class: TriangleSplitter */

class TriangleSplitter {
    constructor() {
        this.trianglePool = new TrianglePool,
        this.triangles = [],
        this.normal = new three_module.Pq0,
        this.coplanarTriangleUsed = !1
    }
    initialize(o) {
        this.reset();
        const {triangles: c, trianglePool: h, normal: _} = this;
        if (Array.isArray(o))
            for (let b = 0, _e = o.length; b < _e; b++) {
                const nt = o[b];
                if (b === 0)
                    nt.getNormal(_);
                else if (Math.abs(1 - nt.getNormal(_vec).dot(_)) > TriangleSplitter_EPSILON)
                    throw new Error("Triangle Splitter: Cannot initialize with triangles that have different normals.");
                const it = h.getTriangle();
                it.copy(nt),
                c.push(it)
            }
        else {
            o.getNormal(_);
            const b = h.getTriangle();
            b.copy(o),
            c.push(b)
        }
    }
    splitByTriangle(o) {
        const {normal: c, triangles: h} = this;
        if (o.getNormal(_triangleNormal).normalize(),
        Math.abs(1 - Math.abs(_triangleNormal.dot(c))) < PARALLEL_EPSILON) {
            this.coplanarTriangleUsed = !0;
            for (let b = 0, _e = h.length; b < _e; b++)
                h[b].coplanarCount = 0;
            const _ = [o.a, o.b, o.c];
            for (let b = 0; b < 3; b++) {
                const _e = (b + 1) % 3
                  , nt = _[b]
                  , it = _[_e];
                _vec.subVectors(it, nt).normalize(),
                _planeNormal.crossVectors(_triangleNormal, _vec),
                TriangleSplitter_plane.setFromNormalAndCoplanarPoint(_planeNormal, nt),
                this.splitByPlane(TriangleSplitter_plane, o)
            }
        } else
            o.getPlane(TriangleSplitter_plane),
            this.splitByPlane(TriangleSplitter_plane, o)
    }
    splitByPlane(o, c) {
        const {triangles: h, trianglePool: _} = this;
        _splittingTriangle.copy(c),
        _splittingTriangle.needsUpdate = !0;
        for (let b = 0, _e = h.length; b < _e; b++) {
            const nt = h[b];
            if (!_splittingTriangle.intersectsTriangle(nt, _edge, !0))
                continue;
            const {a: it, b: at, c: ut} = nt;
            let pt = 0
              , ht = -1
              , _t = !1
              , vt = []
              , bt = [];
            const St = [it, at, ut];
            for (let At = 0; At < 3; At++) {
                const Et = (At + 1) % 3;
                _edge.start.copy(St[At]),
                _edge.end.copy(St[Et]);
                const Pt = o.distanceToPoint(_edge.start)
                  , It = o.distanceToPoint(_edge.end);
                if (Math.abs(Pt) < COPLANAR_EPSILON && Math.abs(It) < COPLANAR_EPSILON) {
                    _t = !0;
                    break
                }
                if (Pt > 0 ? vt.push(At) : bt.push(At),
                Math.abs(Pt) < COPLANAR_EPSILON)
                    continue;
                let Dt = !!o.intersectLine(_edge, _vec);
                !Dt && Math.abs(It) < COPLANAR_EPSILON && (_vec.copy(_edge.end),
                Dt = !0),
                !Dt || _vec.distanceTo(_edge.start) < TriangleSplitter_EPSILON || (_vec.distanceTo(_edge.end) < TriangleSplitter_EPSILON && (ht = At),
                pt === 0 ? _foundEdge.start.copy(_vec) : _foundEdge.end.copy(_vec),
                pt++)
            }
            if (!_t && pt === 2 && _foundEdge.distance() > COPLANAR_EPSILON)
                if (ht !== -1) {
                    ht = (ht + 1) % 3;
                    let At = 0;
                    At === ht && (At = (At + 1) % 3);
                    let Et = At + 1;
                    Et === ht && (Et = (Et + 1) % 3);
                    const Pt = _.getTriangle();
                    Pt.a.copy(St[Et]),
                    Pt.b.copy(_foundEdge.end),
                    Pt.c.copy(_foundEdge.start),
                    isTriDegenerate(Pt) || h.push(Pt),
                    nt.a.copy(St[At]),
                    nt.b.copy(_foundEdge.start),
                    nt.c.copy(_foundEdge.end),
                    isTriDegenerate(nt) && (h.splice(b, 1),
                    b--,
                    _e--)
                } else {
                    const At = vt.length >= 2 ? bt[0] : vt[0];
                    if (At === 0) {
                        let Gt = _foundEdge.start;
                        _foundEdge.start = _foundEdge.end,
                        _foundEdge.end = Gt
                    }
                    const Et = (At + 1) % 3
                      , Pt = (At + 2) % 3
                      , It = _.getTriangle()
                      , Dt = _.getTriangle();
                    St[Et].distanceToSquared(_foundEdge.start) < St[Pt].distanceToSquared(_foundEdge.end) ? (It.a.copy(St[Et]),
                    It.b.copy(_foundEdge.start),
                    It.c.copy(_foundEdge.end),
                    Dt.a.copy(St[Et]),
                    Dt.b.copy(St[Pt]),
                    Dt.c.copy(_foundEdge.start)) : (It.a.copy(St[Pt]),
                    It.b.copy(_foundEdge.start),
                    It.c.copy(_foundEdge.end),
                    Dt.a.copy(St[Et]),
                    Dt.b.copy(St[Pt]),
                    Dt.c.copy(_foundEdge.end)),
                    nt.a.copy(St[At]),
                    nt.b.copy(_foundEdge.end),
                    nt.c.copy(_foundEdge.start),
                    isTriDegenerate(It) || h.push(It),
                    isTriDegenerate(Dt) || h.push(Dt),
                    isTriDegenerate(nt) && (h.splice(b, 1),
                    b--,
                    _e--)
                }
            else
                pt === 3 && console.warn("TriangleClipper: Coplanar clip not handled")
        }
    }
    reset() {
        this.triangles.length = 0,
        this.trianglePool.clear(),
        this.coplanarTriangleUsed = !1
    }
}

export default TriangleSplitter;
