/* Standalone Class: ConvexHull_ConvexHull */

class ConvexHull_ConvexHull {
    constructor() {
        this.tolerance = -1,
        this.faces = [],
        this.newFaces = [],
        this.assigned = new VertexList,
        this.unassigned = new VertexList,
        this.vertices = []
    }
    setFromPoints(o) {
        if (o.length >= 4) {
            this.makeEmpty();
            for (let c = 0, h = o.length; c < h; c++)
                this.vertices.push(new VertexNode(o[c]));
            this.compute()
        }
        return this
    }
    setFromObject(o) {
        const c = [];
        return o.updateMatrixWorld(!0),
        o.traverse(function(h) {
            const _ = h.geometry;
            if (_ !== void 0) {
                const b = _.attributes.position;
                if (b !== void 0)
                    for (let _e = 0, nt = b.count; _e < nt; _e++) {
                        const it = new three_module.Pq0;
                        it.fromBufferAttribute(b, _e).applyMatrix4(h.matrixWorld),
                        c.push(it)
                    }
            }
        }),
        this.setFromPoints(c)
    }
    containsPoint(o) {
        const c = this.faces;
        for (let h = 0, _ = c.length; h < _; h++)
            if (c[h].distanceToPoint(o) > this.tolerance)
                return !1;
        return !0
    }
    intersectRay(o, c) {
        const h = this.faces;
        let _ = -1 / 0
          , b = 1 / 0;
        for (let _e = 0, nt = h.length; _e < nt; _e++) {
            const it = h[_e]
              , at = it.distanceToPoint(o.origin)
              , ut = it.normal.dot(o.direction);
            if (at > 0 && ut >= 0)
                return null;
            const pt = ut !== 0 ? -at / ut : 0;
            if (!(pt <= 0) && (ut > 0 ? b = Math.min(pt, b) : _ = Math.max(pt, _),
            _ > b))
                return null
        }
        return _ !== -1 / 0 ? o.at(_, c) : o.at(b, c),
        c
    }
    intersectsRay(o) {
        return this.intersectRay(o, ConvexHull_v1) !== null
    }
    makeEmpty() {
        return this.faces = [],
        this.vertices = [],
        this
    }
    addVertexToFace(o, c) {
        return o.face = c,
        c.outside === null ? this.assigned.append(o) : this.assigned.insertBefore(c.outside, o),
        c.outside = o,
        this
    }
    removeVertexFromFace(o, c) {
        return o === c.outside && (o.next !== null && o.next.face === c ? c.outside = o.next : c.outside = null),
        this.assigned.remove(o),
        this
    }
    removeAllVerticesFromFace(o) {
        if (o.outside !== null) {
            const c = o.outside;
            let h = o.outside;
            for (; h.next !== null && h.next.face === o; )
                h = h.next;
            return this.assigned.removeSubList(c, h),
            c.prev = h.next = null,
            o.outside = null,
            c
        }
    }
    deleteFaceVertices(o, c) {
        const h = this.removeAllVerticesFromFace(o);
        if (h !== void 0)
            if (c === void 0)
                this.unassigned.appendChain(h);
            else {
                let _ = h;
                do {
                    const b = _.next;
                    c.distanceToPoint(_.point) > this.tolerance ? this.addVertexToFace(_, c) : this.unassigned.append(_),
                    _ = b
                } while (_ !== null)
            }
        return this
    }
    resolveUnassignedPoints(o) {
        if (this.unassigned.isEmpty() === !1) {
            let c = this.unassigned.first();
            do {
                const h = c.next;
                let _ = this.tolerance
                  , b = null;
                for (let _e = 0; _e < o.length; _e++) {
                    const nt = o[_e];
                    if (nt.mark === Visible) {
                        const it = nt.distanceToPoint(c.point);
                        if (it > _ && (_ = it,
                        b = nt),
                        _ > 1e3 * this.tolerance)
                            break
                    }
                }
                b !== null && this.addVertexToFace(c, b),
                c = h
            } while (c !== null)
        }
        return this
    }
    computeExtremes() {
        const o = new three_module.Pq0
          , c = new three_module.Pq0
          , h = []
          , _ = [];
        for (let b = 0; b < 3; b++)
            h[b] = _[b] = this.vertices[0];
        o.copy(this.vertices[0].point),
        c.copy(this.vertices[0].point);
        for (let b = 0, _e = this.vertices.length; b < _e; b++) {
            const nt = this.vertices[b]
              , it = nt.point;
            for (let at = 0; at < 3; at++)
                it.getComponent(at) < o.getComponent(at) && (o.setComponent(at, it.getComponent(at)),
                h[at] = nt);
            for (let at = 0; at < 3; at++)
                it.getComponent(at) > c.getComponent(at) && (c.setComponent(at, it.getComponent(at)),
                _[at] = nt)
        }
        return this.tolerance = 3 * Number.EPSILON * (Math.max(Math.abs(o.x), Math.abs(c.x)) + Math.max(Math.abs(o.y), Math.abs(c.y)) + Math.max(Math.abs(o.z), Math.abs(c.z))),
        {
            min: h,
            max: _
        }
    }
    computeInitialHull() {
        const o = this.vertices
          , c = this.computeExtremes()
          , h = c.min
          , _ = c.max;
        let b = 0
          , _e = 0;
        for (let ht = 0; ht < 3; ht++) {
            const _t = _[ht].point.getComponent(ht) - h[ht].point.getComponent(ht);
            _t > b && (b = _t,
            _e = ht)
        }
        const nt = h[_e]
          , it = _[_e];
        let at, ut;
        b = 0,
        _line3.set(nt.point, it.point);
        for (let ht = 0, _t = this.vertices.length; ht < _t; ht++) {
            const vt = o[ht];
            if (vt !== nt && vt !== it) {
                _line3.closestPointToPoint(vt.point, !0, ConvexHull_closestPoint);
                const bt = ConvexHull_closestPoint.distanceToSquared(vt.point);
                bt > b && (b = bt,
                at = vt)
            }
        }
        b = -1,
        ConvexHull_plane.setFromCoplanarPoints(nt.point, it.point, at.point);
        for (let ht = 0, _t = this.vertices.length; ht < _t; ht++) {
            const vt = o[ht];
            if (vt !== nt && vt !== it && vt !== at) {
                const bt = Math.abs(ConvexHull_plane.distanceToPoint(vt.point));
                bt > b && (b = bt,
                ut = vt)
            }
        }
        const pt = [];
        if (ConvexHull_plane.distanceToPoint(ut.point) < 0) {
            pt.push(Face.create(nt, it, at), Face.create(ut, it, nt), Face.create(ut, at, it), Face.create(ut, nt, at));
            for (let ht = 0; ht < 3; ht++) {
                const _t = (ht + 1) % 3;
                pt[ht + 1].getEdge(2).setTwin(pt[0].getEdge(_t)),
                pt[ht + 1].getEdge(1).setTwin(pt[_t + 1].getEdge(0))
            }
        } else {
            pt.push(Face.create(nt, at, it), Face.create(ut, nt, it), Face.create(ut, it, at), Face.create(ut, at, nt));
            for (let ht = 0; ht < 3; ht++) {
                const _t = (ht + 1) % 3;
                pt[ht + 1].getEdge(2).setTwin(pt[0].getEdge((3 - ht) % 3)),
                pt[ht + 1].getEdge(0).setTwin(pt[_t + 1].getEdge(1))
            }
        }
        for (let ht = 0; ht < 4; ht++)
            this.faces.push(pt[ht]);
        for (let ht = 0, _t = o.length; ht < _t; ht++) {
            const vt = o[ht];
            if (vt !== nt && vt !== it && vt !== at && vt !== ut) {
                b = this.tolerance;
                let bt = null;
                for (let St = 0; St < 4; St++) {
                    const At = this.faces[St].distanceToPoint(vt.point);
                    At > b && (b = At,
                    bt = this.faces[St])
                }
                bt !== null && this.addVertexToFace(vt, bt)
            }
        }
        return this
    }
    reindexFaces() {
        const o = [];
        for (let c = 0; c < this.faces.length; c++) {
            const h = this.faces[c];
            h.mark === Visible && o.push(h)
        }
        return this.faces = o,
        this
    }
    nextVertexToAdd() {
        if (this.assigned.isEmpty() === !1) {
            let o, c = 0;
            const h = this.assigned.first().face;
            let _ = h.outside;
            do {
                const b = h.distanceToPoint(_.point);
                b > c && (c = b,
                o = _),
                _ = _.next
            } while (_ !== null && _.face === h);
            return o
        }
    }
    computeHorizon(o, c, h, _) {
        let b;
        this.deleteFaceVertices(h),
        h.mark = Deleted,
        b = c === null ? c = h.getEdge(0) : c.next;
        do {
            const _e = b.twin
              , nt = _e.face;
            nt.mark === Visible && (nt.distanceToPoint(o) > this.tolerance ? this.computeHorizon(o, _e, nt, _) : _.push(b)),
            b = b.next
        } while (b !== c);
        return this
    }
    addAdjoiningFace(o, c) {
        const h = Face.create(o, c.tail(), c.head());
        return this.faces.push(h),
        h.getEdge(-1).setTwin(c.twin),
        h.getEdge(0)
    }
    addNewFaces(o, c) {
        this.newFaces = [];
        let h = null
          , _ = null;
        for (let b = 0; b < c.length; b++) {
            const _e = c[b]
              , nt = this.addAdjoiningFace(o, _e);
            h === null ? h = nt : nt.next.setTwin(_),
            this.newFaces.push(nt.face),
            _ = nt
        }
        return h.next.setTwin(_),
        this
    }
    addVertexToHull(o) {
        const c = [];
        return this.unassigned.clear(),
        this.removeVertexFromFace(o, o.face),
        this.computeHorizon(o.point, null, o.face, c),
        this.addNewFaces(o, c),
        this.resolveUnassignedPoints(this.newFaces),
        this
    }
    cleanup() {
        return this.assigned.clear(),
        this.unassigned.clear(),
        this.newFaces = [],
        this
    }
    compute() {
        let o;
        for (this.computeInitialHull(); (o = this.nextVertexToAdd()) !== void 0; )
            this.addVertexToHull(o);
        return this.reindexFaces(),
        this.cleanup(),
        this
    }
}

export default ConvexHull_ConvexHull;
