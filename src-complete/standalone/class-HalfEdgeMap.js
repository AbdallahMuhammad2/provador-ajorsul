/* Standalone Class: HalfEdgeMap */

class HalfEdgeMap {
    constructor(o=null) {
        this.data = null,
        this.disjointConnections = null,
        this.unmatchedDisjointEdges = null,
        this.unmatchedEdges = -1,
        this.matchedEdges = -1,
        this.useDrawRange = !0,
        this.useAllAttributes = !1,
        this.matchDisjointEdges = !1,
        this.degenerateEpsilon = 1e-8,
        o && this.updateFrom(o)
    }
    getSiblingTriangleIndex(o, c) {
        const h = this.data[3 * o + c];
        return h === -1 ? -1 : ~~(h / 3)
    }
    getSiblingEdgeIndex(o, c) {
        const h = this.data[3 * o + c];
        return h === -1 ? -1 : h % 3
    }
    getDisjointSiblingTriangleIndices(o, c) {
        const h = 3 * o + c
          , _ = this.disjointConnections.get(h);
        return _ ? _.map(b => ~~(b / 3)) : []
    }
    getDisjointSiblingEdgeIndices(o, c) {
        const h = 3 * o + c
          , _ = this.disjointConnections.get(h);
        return _ ? _.map(b => b % 3) : []
    }
    isFullyConnected() {
        return this.unmatchedEdges === 0
    }
    updateFrom(o) {
        const {useAllAttributes: c, useDrawRange: h, matchDisjointEdges: _, degenerateEpsilon: b} = this
          , _e = c ? function(Et) {
            let Pt = "";
            for (let It = 0, Dt = at.length; It < Dt; It++) {
                const Gt = it[at[It]];
                let Bt;
                switch (Gt.itemSize) {
                case 1:
                    Bt = hashNumber(Gt.getX(Et));
                    break;
                case 2:
                    Bt = hashVertex2(_vec2.fromBufferAttribute(Gt, Et));
                    break;
                case 3:
                    Bt = hashVertex3(HalfEdgeMap_vec3.fromBufferAttribute(Gt, Et));
                    break;
                case 4:
                    Bt = hashVertex4(_vec4.fromBufferAttribute(Gt, Et))
                }
                Pt !== "" && (Pt += "|"),
                Pt += Bt
            }
            return Pt
        }
        : function(Et) {
            return HalfEdgeMap_vec3.fromBufferAttribute(pt, Et),
            hashVertex3(HalfEdgeMap_vec3)
        }
          , nt = new Map
          , {attributes: it} = o
          , at = c ? Object.keys(it) : null
          , ut = o.index
          , pt = it.position;
        let ht = getTriCount(o);
        const _t = ht;
        let vt = 0;
        h && (vt = o.drawRange.start,
        o.drawRange.count !== 1 / 0 && (ht = ~~(o.drawRange.count / 3)));
        let bt = this.data;
        (!bt || bt.length < 3 * _t) && (bt = new Int32Array(3 * _t)),
        bt.fill(-1);
        let St = 0
          , At = new Set;
        for (let Et = vt, Pt = 3 * ht + vt; Et < Pt; Et += 3) {
            const It = Et;
            for (let Dt = 0; Dt < 3; Dt++) {
                let Gt = It + Dt;
                ut && (Gt = ut.getX(Gt)),
                _hashes[Dt] = _e(Gt)
            }
            for (let Dt = 0; Dt < 3; Dt++) {
                const Gt = (Dt + 1) % 3
                  , Bt = _hashes[Dt]
                  , kt = _hashes[Gt]
                  , Ut = `${kt}_${Bt}`;
                if (nt.has(Ut)) {
                    const Ht = It + Dt
                      , Kt = nt.get(Ut);
                    bt[Ht] = Kt,
                    bt[Kt] = Ht,
                    nt.delete(Ut),
                    St += 2,
                    At.delete(Kt)
                } else {
                    const Ht = `${Bt}_${kt}`
                      , Kt = It + Dt;
                    nt.set(Ht, Kt),
                    At.add(Kt)
                }
            }
        }
        if (_) {
            const {fragmentMap: Et, disjointConnectivityMap: Pt} = computeDisjointEdges(o, At, b);
            At.clear(),
            Et.forEach( ({forward: It, reverse: Dt}) => {
                It.forEach( ({index: Gt}) => At.add(Gt)),
                Dt.forEach( ({index: Gt}) => At.add(Gt))
            }
            ),
            this.unmatchedDisjointEdges = Et,
            this.disjointConnections = Pt,
            St = 3 * ht - At.size
        }
        this.matchedEdges = St,
        this.unmatchedEdges = At.size,
        this.data = bt
    }
}

export default HalfEdgeMap;
