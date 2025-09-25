/* Standalone Function: _ */

function _() {
        this.tolerance = -1,
        this.faces = [],
        this.newFaces = [],
        this.assigned = new it,
        this.unassigned = new it,
        this.vertices = []
    }
    function b() {
        this.normal = new three_module.Pq0,
        this.midpoint = new three_module.Pq0,
        this.area = 0,
        this.constant = 0,
        this.outside = null,
        this.mark = 0,
        this.edge = null
    }
    function _e(at, ut) {
        this.vertex = at,
        this.prev = null,
        this.next = null,
        this.twin = null,
        this.face = ut
    }
    function nt(at, ut) {
        this.point = at,
        this.index = ut,
        this.prev = null,
        this.next = null,
        this.face = null
    }
    function it() {
        this.head = null,
        this.tail = null
    }
    return Object.assign(_.prototype, {
        toJSON: function() {
            const at = this.faces.map(vt => vt.toArray())
              , ut = Array.from(new Set(at.flat())).sort()
              , pt = [];
            for (let vt = 0; vt < ut.length; vt++)
                pt.push(this.vertices[ut[vt]].point.x, this.vertices[ut[vt]].point.y, this.vertices[ut[vt]].point.z);
            const ht = new Map;
            for (let vt = 0; vt < ut.length; vt++)
                ht.set(ut[vt], vt);
            const _t = [];
            for (let vt = 0; vt < at.length; vt++)
                _t.push([ht.get(at[vt][0]), ht.get(at[vt][1]), ht.get(at[vt][2])]);
            return [pt, _t]
        },
        setFromPoints: function(at) {
            Array.isArray(at) !== !0 && console.error("THREE.ConvexHull: Points parameter is not an array."),
            at.length < 4 && console.error("THREE.ConvexHull: The algorithm needs at least four points."),
            this.makeEmpty();
            for (var ut = 0, pt = at.length; ut < pt; ut++)
                this.vertices.push(new nt(at[ut],ut));
            return this.compute(),
            this
        },
        setFromObject: function(at) {
            var ut = [];
            return at.updateMatrixWorld(!0),
            at.traverse(function(pt) {
                var ht, _t, vt, bt = pt.geometry;
                if (bt !== void 0 && (bt.isGeometry && (bt = bt.toBufferGeometry ? bt.toBufferGeometry() : new BufferGeometry().fromGeometry(bt)),
                bt.isBufferGeometry)) {
                    var St = bt.attributes.position;
                    if (St !== void 0)
                        for (ht = 0,
                        _t = St.count; ht < _t; ht++)
                            (vt = new three_module.Pq0).fromBufferAttribute(St, ht).applyMatrix4(pt.matrixWorld),
                            ut.push(vt)
                }
            }),
            this.setFromPoints(ut)
        },
        containsPoint: function(at) {
            for (var ut = this.faces, pt = 0, ht = ut.length; pt < ht; pt++)
                if (ut[pt].distanceToPoint(at) > this.tolerance)
                    return !1;
            return !0
        },
        intersectRay: function(at, ut) {
            for (var pt = this.faces, ht = -1 / 0, _t = 1 / 0, vt = 0, bt = pt.length; vt < bt; vt++) {
                var St = pt[vt]
                  , At = St.distanceToPoint(at.origin)
                  , Et = St.normal.dot(at.direction);
                if (At > 0 && Et >= 0)
                    return null;
                var Pt = Et !== 0 ? -At / Et : 0;
                if (!(Pt <= 0) && (Et > 0 ? _t = Math.min(Pt, _t) : ht = Math.max(Pt, ht),
                ht > _t))
                    return null
            }
            return ht !== -1 / 0 ? at.at(ht, ut) : at.at(_t, ut),
            ut
        },
        intersectsRay: function(at) {
            return this.intersectRay(at, h) !== null
        },
        makeEmpty: function() {
            return this.faces = [],
            this.vertices = [],
            this
        },
        addVertexToFace: function(at, ut) {
            return at.face = ut,
            ut.outside === null ? this.assigned.append(at) : this.assigned.insertBefore(ut.outside, at),
            ut.outside = at,
            this
        },
        removeVertexFromFace: function(at, ut) {
            return at === ut.outside && (at.next !== null && at.next.face === ut ? ut.outside = at.next : ut.outside = null),
            this.assigned.remove(at),
            this
        },
        removeAllVerticesFromFace: function(at) {
            if (at.outside !== null) {
                for (var ut = at.outside, pt = at.outside; pt.next !== null && pt.next.face === at; )
                    pt = pt.next;
                return this.assigned.removeSubList(ut, pt),
                ut.prev = pt.next = null,
                at.outside = null,
                ut
            }
        },
        deleteFaceVertices: function(at, ut) {
            var pt = this.removeAllVerticesFromFace(at);
            if (pt !== void 0)
                if (ut === void 0)
                    this.unassigned.appendChain(pt);
                else {
                    var ht = pt;
                    do {
                        var _t = ht.next;
                        ut.distanceToPoint(ht.point) > this.tolerance ? this.addVertexToFace(ht, ut) : this.unassigned.append(ht),
                        ht = _t
                    } while (ht !== null)
                }
            return this
        },
        resolveUnassignedPoints: function(at) {
            if (this.unassigned.isEmpty() === !1) {
                var ut = this.unassigned.first();
                do {
                    for (var pt = ut.next, ht = this.tolerance, _t = null, vt = 0; vt < at.length; vt++) {
                        var bt = at[vt];
                        if (bt.mark === 0) {
                            var St = bt.distanceToPoint(ut.point);
                            if (St > ht && (ht = St,
                            _t = bt),
                            ht > 1e3 * this.tolerance)
                                break
                        }
                    }
                    _t !== null && this.addVertexToFace(ut, _t),
                    ut = pt
                } while (ut !== null)
            }
            return this
        },
        computeExtremes: function() {
            var at, ut, pt, ht = new three_module.Pq0, _t = new three_module.Pq0, vt = [], bt = [];
            for (at = 0; at < 3; at++)
                vt[at] = bt[at] = this.vertices[0];
            for (ht.copy(this.vertices[0].point),
            _t.copy(this.vertices[0].point),
            at = 0,
            ut = this.vertices.length; at < ut; at++) {
                var St = this.vertices[at]
                  , At = St.point;
                for (pt = 0; pt < 3; pt++)
                    At.getComponent(pt) < ht.getComponent(pt) && (ht.setComponent(pt, At.getComponent(pt)),
                    vt[pt] = St);
                for (pt = 0; pt < 3; pt++)
                    At.getComponent(pt) > _t.getComponent(pt) && (_t.setComponent(pt, At.getComponent(pt)),
                    bt[pt] = St)
            }
            return this.tolerance = 3 * Number.EPSILON * (Math.max(Math.abs(ht.x), Math.abs(_t.x)) + Math.max(Math.abs(ht.y), Math.abs(_t.y)) + Math.max(Math.abs(ht.z), Math.abs(_t.z))),
            {
                min: vt,
                max: bt
            }
        },
        computeInitialHull: function() {
            d === void 0 && (d = new three_module.cZY,
            o = new three_module.Zcv,
            c = new three_module.Pq0);
            var at, ut, pt, ht, _t, vt, bt, St, At, Et = this.vertices, Pt = this.computeExtremes(), It = Pt.min, Dt = Pt.max, Gt = 0, Bt = 0;
            for (vt = 0; vt < 3; vt++)
                (At = Dt[vt].point.getComponent(vt) - It[vt].point.getComponent(vt)) > Gt && (Gt = At,
                Bt = vt);
            for (ut = It[Bt],
            pt = Dt[Bt],
            Gt = 0,
            d.set(ut.point, pt.point),
            vt = 0,
            bt = this.vertices.length; vt < bt; vt++)
                (at = Et[vt]) !== ut && at !== pt && (d.closestPointToPoint(at.point, !0, c),
                (At = c.distanceToSquared(at.point)) > Gt && (Gt = At,
                ht = at));
            for (Gt = -1,
            o.setFromCoplanarPoints(ut.point, pt.point, ht.point),
            vt = 0,
            bt = this.vertices.length; vt < bt; vt++)
                (at = Et[vt]) !== ut && at !== pt && at !== ht && (At = Math.abs(o.distanceToPoint(at.point))) > Gt && (Gt = At,
                _t = at);
            var kt = [];
            if (o.distanceToPoint(_t.point) < 0)
                for (kt.push(b.create(ut, pt, ht), b.create(_t, pt, ut), b.create(_t, ht, pt), b.create(_t, ut, ht)),
                vt = 0; vt < 3; vt++)
                    St = (vt + 1) % 3,
                    kt[vt + 1].getEdge(2).setTwin(kt[0].getEdge(St)),
                    kt[vt + 1].getEdge(1).setTwin(kt[St + 1].getEdge(0));
            else
                for (kt.push(b.create(ut, ht, pt), b.create(_t, ut, pt), b.create(_t, pt, ht), b.create(_t, ht, ut)),
                vt = 0; vt < 3; vt++)
                    St = (vt + 1) % 3,
                    kt[vt + 1].getEdge(2).setTwin(kt[0].getEdge((3 - vt) % 3)),
                    kt[vt + 1].getEdge(0).setTwin(kt[St + 1].getEdge(1));
            for (vt = 0; vt < 4; vt++)
                this.faces.push(kt[vt]);
            for (vt = 0,
            bt = Et.length; vt < bt; vt++)
                if ((at = Et[vt]) !== ut && at !== pt && at !== ht && at !== _t) {
                    Gt = this.tolerance;
                    var Ut = null;
                    for (St = 0; St < 4; St++)
                        (At = this.faces[St].distanceToPoint(at.point)) > Gt && (Gt = At,
                        Ut = this.faces[St]);
                    Ut !== null && this.addVertexToFace(at, Ut)
                }
            return this
        },
        reindexFaces: function() {
            for (var at = [], ut = 0; ut < this.faces.length; ut++) {
                var pt = this.faces[ut];
                pt.mark === 0 && at.push(pt)
            }
            return this.faces = at,
            this
        },
        nextVertexToAdd: function() {
            if (this.assigned.isEmpty() === !1) {
                var at, ut = 0, pt = this.assigned.first().face, ht = pt.outside;
                do {
                    var _t = pt.distanceToPoint(ht.point);
                    _t > ut && (ut = _t,
                    at = ht),
                    ht = ht.next
                } while (ht !== null && ht.face === pt);
                return at
            }
        },
        computeHorizon: function(at, ut, pt, ht) {
            var _t;
            this.deleteFaceVertices(pt),
            pt.mark = 1,
            _t = ut === null ? ut = pt.getEdge(0) : ut.next;
            do {
                var vt = _t.twin
                  , bt = vt.face;
                bt.mark === 0 && (bt.distanceToPoint(at) > this.tolerance ? this.computeHorizon(at, vt, bt, ht) : ht.push(_t)),
                _t = _t.next
            } while (_t !== ut);
            return this
        },
        addAdjoiningFace: function(at, ut) {
            var pt = b.create(at, ut.tail(), ut.head());
            return this.faces.push(pt),
            pt.getEdge(-1).setTwin(ut.twin),
            pt.getEdge(0)
        },
        addNewFaces: function(at, ut) {
            this.newFaces = [];
            for (var pt = null, ht = null, _t = 0; _t < ut.length; _t++) {
                var vt = ut[_t]
                  , bt = this.addAdjoiningFace(at, vt);
                pt === null ? pt = bt : bt.next.setTwin(ht),
                this.newFaces.push(bt.face),
                ht = bt
            }
            return pt.next.setTwin(ht),
            this
        },
        addVertexToHull: function(at) {
            var ut = [];
            return this.unassigned.clear(),
            this.removeVertexFromFace(at, at.face),
            this.computeHorizon(at.point, null, at.face, ut),
            this.addNewFaces(at, ut),
            this.resolveUnassignedPoints(this.newFaces),
            this
        },
        cleanup: function() {
            return this.assigned.clear(),
            this.unassigned.clear(),
            this.newFaces = [],
            this
        },
        compute: function() {
            var at;
            for (this.computeInitialHull(); (at = this.nextVertexToAdd()) !== void 0; )
                this.addVertexToHull(at);
            return this.reindexFaces(),
            this.cleanup(),
            this
        }
    }),
    Object.assign(b, {
        create: function(at, ut, pt) {
            var ht = new b
              , _t = new _e(at,ht)
              , vt = new _e(ut,ht)
              , bt = new _e(pt,ht);
            return _t.next = bt.prev = vt,
            vt.next = _t.prev = bt,
            bt.next = vt.prev = _t,
            ht.edge = _t,
            ht.compute()
        }
    }),
    Object.assign(b.prototype, {
        toArray: function() {
            const at = [];
            let ut = this.edge;
            do
                at.push(ut.head().index),
                ut = ut.next;
            while (ut !== this.edge);
            return at
        },
        getEdge: function(at) {
            for (var ut = this.edge; at > 0; )
                ut = ut.next,
                at--;
            for (; at < 0; )
                ut = ut.prev,
                at++;
            return ut
        },
        compute: function() {
            var at;
            return function() {
                at === void 0 && (at = new three_module.lMl);
                var ut = this.edge.tail()
                  , pt = this.edge.head()
                  , ht = this.edge.next.head();
                return at.set(ut.point, pt.point, ht.point),
                at.getNormal(this.normal),
                at.getMidpoint(this.midpoint),
                this.area = at.getArea(),
                this.constant = this.normal.dot(this.midpoint),
                this
            }
        }(),
        distanceToPoint: function(at) {
            return this.normal.dot(at) - this.constant
        }
    }),
    Object.assign(_e.prototype, {
        head: function() {
            return this.vertex
        },
        tail: function() {
            return this.prev ? this.prev.vertex : null
        },
        length: function() {
            var at = this.head()
              , ut = this.tail();
            return ut !== null ? ut.point.distanceTo(at.point) : -1
        },
        lengthSquared: function() {
            var at = this.head()
              , ut = this.tail();
            return ut !== null ? ut.point.distanceToSquared(at.point) : -1
        },
        setTwin: function(at) {
            return this.twin = at,
            at.twin = this,
            this
        }
    }),
    Object.assign(it.prototype, {
        first: function() {
            return this.head
        },
        last: function() {
            return this.tail
        },
        clear: function() {
            return this.head = this.tail = null,
            this
        },
        insertBefore: function(at, ut) {
            return ut.prev = at.prev,
            ut.next = at,
            ut.prev === null ? this.head = ut : ut.prev.next = ut,
            at.prev = ut,
            this
        },
        insertAfter: function(at, ut) {
            return ut.prev = at,
            ut.next = at.next,
            ut.next === null ? this.tail = ut : ut.next.prev = ut,
            at.next = ut,
            this
        },
        append: function(at) {
            return this.head === null ? this.head = at : this.tail.next = at,
            at.prev = this.tail,
            at.next = null,
            this.tail = at,
            this
        },
        appendChain: function(at) {
            for (this.head === null ? this.head = at : this.tail.next = at,
            at.prev = this.tail; at.next !== null; )
                at = at.next;
            return this.tail = at,
            this
        },
        remove: function(at) {
            return at.prev === null ? this.head = at.next : at.prev.next = at.next,
            at.next === null ? this.tail = at.prev : at.next.prev = at.prev,
            this
        },
        removeSubList: function(at, ut) {
            return at.prev === null ? this.head = ut.next : at.prev.next = ut.next,
            ut.next === null ? this.tail = at.prev : ut.next.prev = at.prev,
            this
        },
        isEmpty: function() {
            return this.head === null
        }
    }),
    _
}

export default _;
