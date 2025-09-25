/* Standalone Class: ConvexPolyhedron */

class ConvexPolyhedron extends Shape {
    constructor(o) {
        o === void 0 && (o = {});
        const {vertices: c=[], faces: h=[], normals: _=[], axes: b, boundingSphereRadius: _e} = o;
        super({
            type: Shape.types.CONVEXPOLYHEDRON
        }),
        this.vertices = c,
        this.faces = h,
        this.faceNormals = _,
        this.faceNormals.length === 0 && this.computeNormals(),
        _e ? this.boundingSphereRadius = _e : this.updateBoundingSphereRadius(),
        this.worldVertices = [],
        this.worldVerticesNeedsUpdate = !0,
        this.worldFaceNormals = [],
        this.worldFaceNormalsNeedsUpdate = !0,
        this.uniqueAxes = b ? b.slice() : null,
        this.uniqueEdges = [],
        this.computeEdges()
    }
    computeEdges() {
        const o = this.faces
          , c = this.vertices
          , h = this.uniqueEdges;
        h.length = 0;
        const _ = new Vec3;
        for (let b = 0; b !== o.length; b++) {
            const _e = o[b]
              , nt = _e.length;
            for (let it = 0; it !== nt; it++) {
                const at = (it + 1) % nt;
                c[_e[it]].vsub(c[_e[at]], _),
                _.normalize();
                let ut = !1;
                for (let pt = 0; pt !== h.length; pt++)
                    if (h[pt].almostEquals(_) || h[pt].almostEquals(_)) {
                        ut = !0;
                        break
                    }
                ut || h.push(_.clone())
            }
        }
    }
    computeNormals() {
        this.faceNormals.length = this.faces.length;
        for (let o = 0; o < this.faces.length; o++) {
            for (let _ = 0; _ < this.faces[o].length; _++)
                if (!this.vertices[this.faces[o][_]])
                    throw new Error(`Vertex ${this.faces[o][_]} not found!`);
            const c = this.faceNormals[o] || new Vec3;
            this.getFaceNormal(o, c),
            c.negate(c),
            this.faceNormals[o] = c;
            const h = this.vertices[this.faces[o][0]];
            if (c.dot(h) < 0) {
                console.error(`.faceNormals[${o}] = Vec3(${c.toString()}) looks like it points into the shape? The vertices follow. Make sure they are ordered CCW around the normal, using the right hand rule.`);
                for (let _ = 0; _ < this.faces[o].length; _++)
                    console.warn(`.vertices[${this.faces[o][_]}] = Vec3(${this.vertices[this.faces[o][_]].toString()})`)
            }
        }
    }
    getFaceNormal(o, c) {
        const h = this.faces[o]
          , _ = this.vertices[h[0]]
          , b = this.vertices[h[1]]
          , _e = this.vertices[h[2]];
        ConvexPolyhedron.computeNormal(_, b, _e, c)
    }
    static computeNormal(o, c, h, _) {
        const b = new Vec3
          , _e = new Vec3;
        c.vsub(o, _e),
        h.vsub(c, b),
        b.cross(_e, _),
        _.isZero() || _.normalize()
    }
    clipAgainstHull(o, c, h, _, b, _e, nt, it, at) {
        const ut = new Vec3;
        let pt = -1
          , ht = -Number.MAX_VALUE;
        for (let vt = 0; vt < h.faces.length; vt++) {
            ut.copy(h.faceNormals[vt]),
            b.vmult(ut, ut);
            const bt = ut.dot(_e);
            bt > ht && (ht = bt,
            pt = vt)
        }
        const _t = [];
        for (let vt = 0; vt < h.faces[pt].length; vt++) {
            const bt = h.vertices[h.faces[pt][vt]]
              , St = new Vec3;
            St.copy(bt),
            b.vmult(St, St),
            _.vadd(St, St),
            _t.push(St)
        }
        pt >= 0 && this.clipFaceAgainstHull(_e, o, c, _t, nt, it, at)
    }
    findSeparatingAxis(o, c, h, _, b, _e, nt, it) {
        const at = new Vec3
          , ut = new Vec3
          , pt = new Vec3
          , ht = new Vec3
          , _t = new Vec3
          , vt = new Vec3;
        let bt = Number.MAX_VALUE;
        const St = this;
        if (St.uniqueAxes)
            for (let At = 0; At !== St.uniqueAxes.length; At++) {
                h.vmult(St.uniqueAxes[At], at);
                const Et = St.testSepAxis(at, o, c, h, _, b);
                if (Et === !1)
                    return !1;
                Et < bt && (bt = Et,
                _e.copy(at))
            }
        else {
            const At = nt ? nt.length : St.faces.length;
            for (let Et = 0; Et < At; Et++) {
                const Pt = nt ? nt[Et] : Et;
                at.copy(St.faceNormals[Pt]),
                h.vmult(at, at);
                const It = St.testSepAxis(at, o, c, h, _, b);
                if (It === !1)
                    return !1;
                It < bt && (bt = It,
                _e.copy(at))
            }
        }
        if (o.uniqueAxes)
            for (let At = 0; At !== o.uniqueAxes.length; At++) {
                b.vmult(o.uniqueAxes[At], ut);
                const Et = St.testSepAxis(ut, o, c, h, _, b);
                if (Et === !1)
                    return !1;
                Et < bt && (bt = Et,
                _e.copy(ut))
            }
        else {
            const At = it ? it.length : o.faces.length;
            for (let Et = 0; Et < At; Et++) {
                const Pt = it ? it[Et] : Et;
                ut.copy(o.faceNormals[Pt]),
                b.vmult(ut, ut);
                const It = St.testSepAxis(ut, o, c, h, _, b);
                if (It === !1)
                    return !1;
                It < bt && (bt = It,
                _e.copy(ut))
            }
        }
        for (let At = 0; At !== St.uniqueEdges.length; At++) {
            h.vmult(St.uniqueEdges[At], ht);
            for (let Et = 0; Et !== o.uniqueEdges.length; Et++)
                if (b.vmult(o.uniqueEdges[Et], _t),
                ht.cross(_t, vt),
                !vt.almostZero()) {
                    vt.normalize();
                    const Pt = St.testSepAxis(vt, o, c, h, _, b);
                    if (Pt === !1)
                        return !1;
                    Pt < bt && (bt = Pt,
                    _e.copy(vt))
                }
        }
        return _.vsub(c, pt),
        pt.dot(_e) > 0 && _e.negate(_e),
        !0
    }
    testSepAxis(o, c, h, _, b, _e) {
        ConvexPolyhedron.project(this, o, h, _, maxminA),
        ConvexPolyhedron.project(c, o, b, _e, maxminB);
        const nt = maxminA[0]
          , it = maxminA[1]
          , at = maxminB[0]
          , ut = maxminB[1];
        if (nt < ut || at < it)
            return !1;
        const pt = nt - ut
          , ht = at - it;
        return pt < ht ? pt : ht
    }
    calculateLocalInertia(o, c) {
        const h = new Vec3
          , _ = new Vec3;
        this.computeLocalAABB(_, h);
        const b = h.x - _.x
          , _e = h.y - _.y
          , nt = h.z - _.z;
        c.x = 1 / 12 * o * (2 * _e * 2 * _e + 2 * nt * 2 * nt),
        c.y = 1 / 12 * o * (2 * b * 2 * b + 2 * nt * 2 * nt),
        c.z = 1 / 12 * o * (2 * _e * 2 * _e + 2 * b * 2 * b)
    }
    getPlaneConstantOfFace(o) {
        const c = this.faces[o]
          , h = this.faceNormals[o]
          , _ = this.vertices[c[0]];
        return -h.dot(_)
    }
    clipFaceAgainstHull(o, c, h, _, b, _e, nt) {
        const it = new Vec3
          , at = new Vec3
          , ut = new Vec3
          , pt = new Vec3
          , ht = new Vec3
          , _t = new Vec3
          , vt = new Vec3
          , bt = new Vec3
          , St = this
          , At = _
          , Et = [];
        let Pt = -1
          , It = Number.MAX_VALUE;
        for (let Ut = 0; Ut < St.faces.length; Ut++) {
            it.copy(St.faceNormals[Ut]),
            h.vmult(it, it);
            const Ht = it.dot(o);
            Ht < It && (It = Ht,
            Pt = Ut)
        }
        if (Pt < 0)
            return;
        const Dt = St.faces[Pt];
        Dt.connectedFaces = [];
        for (let Ut = 0; Ut < St.faces.length; Ut++)
            for (let Ht = 0; Ht < St.faces[Ut].length; Ht++)
                Dt.indexOf(St.faces[Ut][Ht]) !== -1 && Ut !== Pt && Dt.connectedFaces.indexOf(Ut) === -1 && Dt.connectedFaces.push(Ut);
        const Gt = Dt.length;
        for (let Ut = 0; Ut < Gt; Ut++) {
            const Ht = St.vertices[Dt[Ut]]
              , Kt = St.vertices[Dt[(Ut + 1) % Gt]];
            Ht.vsub(Kt, at),
            ut.copy(at),
            h.vmult(ut, ut),
            c.vadd(ut, ut),
            pt.copy(this.faceNormals[Pt]),
            h.vmult(pt, pt),
            c.vadd(pt, pt),
            ut.cross(pt, ht),
            ht.negate(ht),
            _t.copy(Ht),
            h.vmult(_t, _t),
            c.vadd(_t, _t);
            const Jt = Dt.connectedFaces[Ut];
            vt.copy(this.faceNormals[Jt]);
            const or = this.getPlaneConstantOfFace(Jt);
            bt.copy(vt),
            h.vmult(bt, bt);
            const ir = or - bt.dot(c);
            for (this.clipFaceAgainstPlane(At, Et, bt, ir); At.length; )
                At.shift();
            for (; Et.length; )
                At.push(Et.shift())
        }
        vt.copy(this.faceNormals[Pt]);
        const Bt = this.getPlaneConstantOfFace(Pt);
        bt.copy(vt),
        h.vmult(bt, bt);
        const kt = Bt - bt.dot(c);
        for (let Ut = 0; Ut < At.length; Ut++) {
            let Ht = bt.dot(At[Ut]) + kt;
            if (Ht <= b && (console.log(`clamped: depth=${Ht} to minDist=${b}`),
            Ht = b),
            Ht <= _e) {
                const Kt = At[Ut];
                if (Ht <= 1e-6) {
                    const Jt = {
                        point: Kt,
                        normal: bt,
                        depth: Ht
                    };
                    nt.push(Jt)
                }
            }
        }
    }
    clipFaceAgainstPlane(o, c, h, _) {
        let b, _e;
        const nt = o.length;
        if (nt < 2)
            return c;
        let it = o[o.length - 1]
          , at = o[0];
        b = h.dot(it) + _;
        for (let ut = 0; ut < nt; ut++) {
            if (at = o[ut],
            _e = h.dot(at) + _,
            b < 0)
                if (_e < 0) {
                    const pt = new Vec3;
                    pt.copy(at),
                    c.push(pt)
                } else {
                    const pt = new Vec3;
                    it.lerp(at, b / (b - _e), pt),
                    c.push(pt)
                }
            else if (_e < 0) {
                const pt = new Vec3;
                it.lerp(at, b / (b - _e), pt),
                c.push(pt),
                c.push(at)
            }
            it = at,
            b = _e
        }
        return c
    }
    computeWorldVertices(o, c) {
        for (; this.worldVertices.length < this.vertices.length; )
            this.worldVertices.push(new Vec3);
        const h = this.vertices
          , _ = this.worldVertices;
        for (let b = 0; b !== this.vertices.length; b++)
            c.vmult(h[b], _[b]),
            o.vadd(_[b], _[b]);
        this.worldVerticesNeedsUpdate = !1
    }
    computeLocalAABB(o, c) {
        const h = this.vertices;
        o.set(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE),
        c.set(-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE);
        for (let _ = 0; _ < this.vertices.length; _++) {
            const b = h[_];
            b.x < o.x ? o.x = b.x : b.x > c.x && (c.x = b.x),
            b.y < o.y ? o.y = b.y : b.y > c.y && (c.y = b.y),
            b.z < o.z ? o.z = b.z : b.z > c.z && (c.z = b.z)
        }
    }
    computeWorldFaceNormals(o) {
        const c = this.faceNormals.length;
        for (; this.worldFaceNormals.length < c; )
            this.worldFaceNormals.push(new Vec3);
        const h = this.faceNormals
          , _ = this.worldFaceNormals;
        for (let b = 0; b !== c; b++)
            o.vmult(h[b], _[b]);
        this.worldFaceNormalsNeedsUpdate = !1
    }
    updateBoundingSphereRadius() {
        let o = 0;
        const c = this.vertices;
        for (let h = 0; h !== c.length; h++) {
            const _ = c[h].lengthSquared();
            _ > o && (o = _)
        }
        this.boundingSphereRadius = Math.sqrt(o)
    }
    calculateWorldAABB(o, c, h, _) {
        const b = this.vertices;
        let _e, nt, it, at, ut, pt, ht = new Vec3;
        for (let _t = 0; _t < b.length; _t++) {
            ht.copy(b[_t]),
            c.vmult(ht, ht),
            o.vadd(ht, ht);
            const vt = ht;
            (_e === void 0 || vt.x < _e) && (_e = vt.x),
            (at === void 0 || vt.x > at) && (at = vt.x),
            (nt === void 0 || vt.y < nt) && (nt = vt.y),
            (ut === void 0 || vt.y > ut) && (ut = vt.y),
            (it === void 0 || vt.z < it) && (it = vt.z),
            (pt === void 0 || vt.z > pt) && (pt = vt.z)
        }
        h.set(_e, nt, it),
        _.set(at, ut, pt)
    }
    volume() {
        return 4 * Math.PI * this.boundingSphereRadius / 3
    }
    getAveragePointLocal(o) {
        o === void 0 && (o = new Vec3);
        const c = this.vertices;
        for (let h = 0; h < c.length; h++)
            o.vadd(c[h], o);
        return o.scale(1 / c.length, o),
        o
    }
    transformAllPoints(o, c) {
        const h = this.vertices.length
          , _ = this.vertices;
        if (c) {
            for (let b = 0; b < h; b++) {
                const _e = _[b];
                c.vmult(_e, _e)
            }
            for (let b = 0; b < this.faceNormals.length; b++) {
                const _e = this.faceNormals[b];
                c.vmult(_e, _e)
            }
        }
        if (o)
            for (let b = 0; b < h; b++) {
                const _e = _[b];
                _e.vadd(o, _e)
            }
    }
    pointIsInside(o) {
        const c = this.vertices
          , h = this.faces
          , _ = this.faceNormals
          , b = new Vec3;
        this.getAveragePointLocal(b);
        for (let _e = 0; _e < this.faces.length; _e++) {
            let nt = _[_e];
            const it = c[h[_e][0]]
              , at = new Vec3;
            o.vsub(it, at);
            const ut = nt.dot(at)
              , pt = new Vec3;
            b.vsub(it, pt);
            const ht = nt.dot(pt);
            if (ut < 0 && ht > 0 || ut > 0 && ht < 0)
                return !1
        }
        return -1
    }
    static project(o, c, h, _, b) {
        const _e = o.vertices.length
          , nt = project_localAxis;
        let it = 0
          , at = 0;
        const ut = project_localOrigin
          , pt = o.vertices;
        ut.setZero(),
        cannon_es_Transform.vectorToLocalFrame(h, _, c, nt),
        cannon_es_Transform.pointToLocalFrame(h, _, ut, ut);
        const ht = ut.dot(nt);
        at = it = pt[0].dot(nt);
        for (let _t = 1; _t < _e; _t++) {
            const vt = pt[_t].dot(nt);
            vt > it && (it = vt),
            vt < at && (at = vt)
        }
        if (at -= ht,
        it -= ht,
        at > it) {
            const _t = at;
            at = it,
            it = _t
        }
        b[0] = it,
        b[1] = at
    }
}

export default ConvexPolyhedron;
