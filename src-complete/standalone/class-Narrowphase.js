/* Standalone Class: Narrowphase */

class Narrowphase {
    get[COLLISION_TYPES.sphereSphere]() {
        return this.sphereSphere
    }
    get[COLLISION_TYPES.spherePlane]() {
        return this.spherePlane
    }
    get[COLLISION_TYPES.boxBox]() {
        return this.boxBox
    }
    get[COLLISION_TYPES.sphereBox]() {
        return this.sphereBox
    }
    get[COLLISION_TYPES.planeBox]() {
        return this.planeBox
    }
    get[COLLISION_TYPES.convexConvex]() {
        return this.convexConvex
    }
    get[COLLISION_TYPES.sphereConvex]() {
        return this.sphereConvex
    }
    get[COLLISION_TYPES.planeConvex]() {
        return this.planeConvex
    }
    get[COLLISION_TYPES.boxConvex]() {
        return this.boxConvex
    }
    get[COLLISION_TYPES.sphereHeightfield]() {
        return this.sphereHeightfield
    }
    get[COLLISION_TYPES.boxHeightfield]() {
        return this.boxHeightfield
    }
    get[COLLISION_TYPES.convexHeightfield]() {
        return this.convexHeightfield
    }
    get[COLLISION_TYPES.sphereParticle]() {
        return this.sphereParticle
    }
    get[COLLISION_TYPES.planeParticle]() {
        return this.planeParticle
    }
    get[COLLISION_TYPES.boxParticle]() {
        return this.boxParticle
    }
    get[COLLISION_TYPES.convexParticle]() {
        return this.convexParticle
    }
    get[COLLISION_TYPES.cylinderCylinder]() {
        return this.convexConvex
    }
    get[COLLISION_TYPES.sphereCylinder]() {
        return this.sphereConvex
    }
    get[COLLISION_TYPES.planeCylinder]() {
        return this.planeConvex
    }
    get[COLLISION_TYPES.boxCylinder]() {
        return this.boxConvex
    }
    get[COLLISION_TYPES.convexCylinder]() {
        return this.convexConvex
    }
    get[COLLISION_TYPES.heightfieldCylinder]() {
        return this.heightfieldCylinder
    }
    get[COLLISION_TYPES.particleCylinder]() {
        return this.particleCylinder
    }
    get[COLLISION_TYPES.sphereTrimesh]() {
        return this.sphereTrimesh
    }
    get[COLLISION_TYPES.planeTrimesh]() {
        return this.planeTrimesh
    }
    constructor(o) {
        this.contactPointPool = [],
        this.frictionEquationPool = [],
        this.result = [],
        this.frictionResult = [],
        this.v3pool = new Vec3Pool,
        this.world = o,
        this.currentContactMaterial = o.defaultContactMaterial,
        this.enableFrictionReduction = !1
    }
    createContactEquation(o, c, h, _, b, _e) {
        let nt;
        this.contactPointPool.length ? (nt = this.contactPointPool.pop(),
        nt.bi = o,
        nt.bj = c) : nt = new ContactEquation(o,c),
        nt.enabled = o.collisionResponse && c.collisionResponse && h.collisionResponse && _.collisionResponse;
        const it = this.currentContactMaterial;
        nt.restitution = it.restitution,
        nt.setSpookParams(it.contactEquationStiffness, it.contactEquationRelaxation, this.world.dt);
        const at = h.material || o.material
          , ut = _.material || c.material;
        return at && ut && at.restitution >= 0 && ut.restitution >= 0 && (nt.restitution = at.restitution * ut.restitution),
        nt.si = b || h,
        nt.sj = _e || _,
        nt
    }
    createFrictionEquationsFromContact(o, c) {
        const h = o.bi
          , _ = o.bj
          , b = o.si
          , _e = o.sj
          , nt = this.world
          , it = this.currentContactMaterial;
        let at = it.friction;
        const ut = b.material || h.material
          , pt = _e.material || _.material;
        if (ut && pt && ut.friction >= 0 && pt.friction >= 0 && (at = ut.friction * pt.friction),
        at > 0) {
            const ht = at * nt.gravity.length();
            let _t = h.invMass + _.invMass;
            _t > 0 && (_t = 1 / _t);
            const vt = this.frictionEquationPool
              , bt = vt.length ? vt.pop() : new FrictionEquation(h,_,ht * _t)
              , St = vt.length ? vt.pop() : new FrictionEquation(h,_,ht * _t);
            return bt.bi = St.bi = h,
            bt.bj = St.bj = _,
            bt.minForce = St.minForce = -ht * _t,
            bt.maxForce = St.maxForce = ht * _t,
            bt.ri.copy(o.ri),
            bt.rj.copy(o.rj),
            St.ri.copy(o.ri),
            St.rj.copy(o.rj),
            o.ni.tangents(bt.t, St.t),
            bt.setSpookParams(it.frictionEquationStiffness, it.frictionEquationRelaxation, nt.dt),
            St.setSpookParams(it.frictionEquationStiffness, it.frictionEquationRelaxation, nt.dt),
            bt.enabled = St.enabled = o.enabled,
            c.push(bt, St),
            !0
        }
        return !1
    }
    createFrictionFromAverage(o) {
        let c = this.result[this.result.length - 1];
        if (!this.createFrictionEquationsFromContact(c, this.frictionResult) || o === 1)
            return;
        const h = this.frictionResult[this.frictionResult.length - 2]
          , _ = this.frictionResult[this.frictionResult.length - 1];
        averageNormal.setZero(),
        averageContactPointA.setZero(),
        averageContactPointB.setZero();
        const b = c.bi;
        c.bj;
        for (let nt = 0; nt !== o; nt++)
            c = this.result[this.result.length - 1 - nt],
            c.bi !== b ? (averageNormal.vadd(c.ni, averageNormal),
            averageContactPointA.vadd(c.ri, averageContactPointA),
            averageContactPointB.vadd(c.rj, averageContactPointB)) : (averageNormal.vsub(c.ni, averageNormal),
            averageContactPointA.vadd(c.rj, averageContactPointA),
            averageContactPointB.vadd(c.ri, averageContactPointB));
        const _e = 1 / o;
        averageContactPointA.scale(_e, h.ri),
        averageContactPointB.scale(_e, h.rj),
        _.ri.copy(h.ri),
        _.rj.copy(h.rj),
        averageNormal.normalize(),
        averageNormal.tangents(h.t, _.t)
    }
    getContacts(o, c, h, _, b, _e, nt) {
        this.contactPointPool = b,
        this.frictionEquationPool = nt,
        this.result = _,
        this.frictionResult = _e;
        const it = tmpQuat1
          , at = tmpQuat2
          , ut = tmpVec1
          , pt = tmpVec2;
        for (let ht = 0, _t = o.length; ht !== _t; ht++) {
            const vt = o[ht]
              , bt = c[ht];
            let St = null;
            vt.material && bt.material && (St = h.getContactMaterial(vt.material, bt.material) || null);
            const At = vt.type & Body.KINEMATIC && bt.type & Body.STATIC || vt.type & Body.STATIC && bt.type & Body.KINEMATIC || vt.type & Body.KINEMATIC && bt.type & Body.KINEMATIC;
            for (let Et = 0; Et < vt.shapes.length; Et++) {
                vt.quaternion.mult(vt.shapeOrientations[Et], it),
                vt.quaternion.vmult(vt.shapeOffsets[Et], ut),
                ut.vadd(vt.position, ut);
                const Pt = vt.shapes[Et];
                for (let It = 0; It < bt.shapes.length; It++) {
                    bt.quaternion.mult(bt.shapeOrientations[It], at),
                    bt.quaternion.vmult(bt.shapeOffsets[It], pt),
                    pt.vadd(bt.position, pt);
                    const Dt = bt.shapes[It];
                    if (!(Pt.collisionFilterMask & Dt.collisionFilterGroup && Dt.collisionFilterMask & Pt.collisionFilterGroup) || ut.distanceTo(pt) > Pt.boundingSphereRadius + Dt.boundingSphereRadius)
                        continue;
                    let Gt = null;
                    Pt.material && Dt.material && (Gt = h.getContactMaterial(Pt.material, Dt.material) || null),
                    this.currentContactMaterial = Gt || St || h.defaultContactMaterial;
                    const Bt = this[Pt.type | Dt.type];
                    if (Bt) {
                        let kt = !1;
                        kt = Pt.type < Dt.type ? Bt.call(this, Pt, Dt, ut, pt, it, at, vt, bt, Pt, Dt, At) : Bt.call(this, Dt, Pt, pt, ut, at, it, bt, vt, Pt, Dt, At),
                        kt && At && (h.shapeOverlapKeeper.set(Pt.id, Dt.id),
                        h.bodyOverlapKeeper.set(vt.id, bt.id))
                    }
                }
            }
        }
    }
    sphereSphere(o, c, h, _, b, _e, nt, it, at, ut, pt) {
        if (pt)
            return h.distanceSquared(_) < (o.radius + c.radius) ** 2;
        const ht = this.createContactEquation(nt, it, o, c, at, ut);
        _.vsub(h, ht.ni),
        ht.ni.normalize(),
        ht.ri.copy(ht.ni),
        ht.rj.copy(ht.ni),
        ht.ri.scale(o.radius, ht.ri),
        ht.rj.scale(-c.radius, ht.rj),
        ht.ri.vadd(h, ht.ri),
        ht.ri.vsub(nt.position, ht.ri),
        ht.rj.vadd(_, ht.rj),
        ht.rj.vsub(it.position, ht.rj),
        this.result.push(ht),
        this.createFrictionEquationsFromContact(ht, this.frictionResult)
    }
    spherePlane(o, c, h, _, b, _e, nt, it, at, ut, pt) {
        const ht = this.createContactEquation(nt, it, o, c, at, ut);
        if (ht.ni.set(0, 0, 1),
        _e.vmult(ht.ni, ht.ni),
        ht.ni.negate(ht.ni),
        ht.ni.normalize(),
        ht.ni.scale(o.radius, ht.ri),
        h.vsub(_, point_on_plane_to_sphere),
        ht.ni.scale(ht.ni.dot(point_on_plane_to_sphere), plane_to_sphere_ortho),
        point_on_plane_to_sphere.vsub(plane_to_sphere_ortho, ht.rj),
        -point_on_plane_to_sphere.dot(ht.ni) <= o.radius) {
            if (pt)
                return !0;
            const _t = ht.ri
              , vt = ht.rj;
            _t.vadd(h, _t),
            _t.vsub(nt.position, _t),
            vt.vadd(_, vt),
            vt.vsub(it.position, vt),
            this.result.push(ht),
            this.createFrictionEquationsFromContact(ht, this.frictionResult)
        }
    }
    boxBox(o, c, h, _, b, _e, nt, it, at, ut, pt) {
        return o.convexPolyhedronRepresentation.material = o.material,
        c.convexPolyhedronRepresentation.material = c.material,
        o.convexPolyhedronRepresentation.collisionResponse = o.collisionResponse,
        c.convexPolyhedronRepresentation.collisionResponse = c.collisionResponse,
        this.convexConvex(o.convexPolyhedronRepresentation, c.convexPolyhedronRepresentation, h, _, b, _e, nt, it, o, c, pt)
    }
    sphereBox(o, c, h, _, b, _e, nt, it, at, ut, pt) {
        const ht = this.v3pool
          , _t = sphereBox_sides;
        h.vsub(_, box_to_sphere),
        c.getSideNormals(_t, _e);
        const vt = o.radius;
        let bt = !1;
        const St = sphereBox_side_ns
          , At = sphereBox_side_ns1
          , Et = sphereBox_side_ns2;
        let Pt = null
          , It = 0
          , Dt = 0
          , Gt = 0
          , Bt = null;
        for (let ar = 0, hr = _t.length; ar !== hr && bt === !1; ar++) {
            const gr = sphereBox_ns;
            gr.copy(_t[ar]);
            const dr = gr.length();
            gr.normalize();
            const cr = box_to_sphere.dot(gr);
            if (cr < dr + vt && cr > 0) {
                const Ar = sphereBox_ns1
                  , wr = sphereBox_ns2;
                Ar.copy(_t[(ar + 1) % 3]),
                wr.copy(_t[(ar + 2) % 3]);
                const Rr = Ar.length()
                  , Cr = wr.length();
                Ar.normalize(),
                wr.normalize();
                const tr = box_to_sphere.dot(Ar)
                  , fr = box_to_sphere.dot(wr);
                if (tr < Rr && tr > -Rr && fr < Cr && fr > -Cr) {
                    const vr = Math.abs(cr - dr - vt);
                    if ((Bt === null || vr < Bt) && (Bt = vr,
                    Dt = tr,
                    Gt = fr,
                    Pt = dr,
                    St.copy(gr),
                    At.copy(Ar),
                    Et.copy(wr),
                    It++,
                    pt))
                        return !0
                }
            }
        }
        if (It) {
            bt = !0;
            const ar = this.createContactEquation(nt, it, o, c, at, ut);
            St.scale(-vt, ar.ri),
            ar.ni.copy(St),
            ar.ni.negate(ar.ni),
            St.scale(Pt, St),
            At.scale(Dt, At),
            St.vadd(At, St),
            Et.scale(Gt, Et),
            St.vadd(Et, ar.rj),
            ar.ri.vadd(h, ar.ri),
            ar.ri.vsub(nt.position, ar.ri),
            ar.rj.vadd(_, ar.rj),
            ar.rj.vsub(it.position, ar.rj),
            this.result.push(ar),
            this.createFrictionEquationsFromContact(ar, this.frictionResult)
        }
        let kt = ht.get();
        const Ut = sphereBox_sphere_to_corner;
        for (let ar = 0; ar !== 2 && !bt; ar++)
            for (let hr = 0; hr !== 2 && !bt; hr++)
                for (let gr = 0; gr !== 2 && !bt; gr++)
                    if (kt.set(0, 0, 0),
                    ar ? kt.vadd(_t[0], kt) : kt.vsub(_t[0], kt),
                    hr ? kt.vadd(_t[1], kt) : kt.vsub(_t[1], kt),
                    gr ? kt.vadd(_t[2], kt) : kt.vsub(_t[2], kt),
                    _.vadd(kt, Ut),
                    Ut.vsub(h, Ut),
                    Ut.lengthSquared() < vt * vt) {
                        if (pt)
                            return !0;
                        bt = !0;
                        const dr = this.createContactEquation(nt, it, o, c, at, ut);
                        dr.ri.copy(Ut),
                        dr.ri.normalize(),
                        dr.ni.copy(dr.ri),
                        dr.ri.scale(vt, dr.ri),
                        dr.rj.copy(kt),
                        dr.ri.vadd(h, dr.ri),
                        dr.ri.vsub(nt.position, dr.ri),
                        dr.rj.vadd(_, dr.rj),
                        dr.rj.vsub(it.position, dr.rj),
                        this.result.push(dr),
                        this.createFrictionEquationsFromContact(dr, this.frictionResult)
                    }
        ht.release(kt),
        kt = null;
        const Ht = ht.get()
          , Kt = ht.get()
          , Jt = ht.get()
          , or = ht.get()
          , ir = ht.get()
          , lr = _t.length;
        for (let ar = 0; ar !== lr && !bt; ar++)
            for (let hr = 0; hr !== lr && !bt; hr++)
                if (ar % 3 != hr % 3) {
                    _t[hr].cross(_t[ar], Ht),
                    Ht.normalize(),
                    _t[ar].vadd(_t[hr], Kt),
                    Jt.copy(h),
                    Jt.vsub(Kt, Jt),
                    Jt.vsub(_, Jt);
                    const gr = Jt.dot(Ht);
                    Ht.scale(gr, or);
                    let dr = 0;
                    for (; dr === ar % 3 || dr === hr % 3; )
                        dr++;
                    ir.copy(h),
                    ir.vsub(or, ir),
                    ir.vsub(Kt, ir),
                    ir.vsub(_, ir);
                    const cr = Math.abs(gr)
                      , Ar = ir.length();
                    if (cr < _t[dr].length() && Ar < vt) {
                        if (pt)
                            return !0;
                        bt = !0;
                        const wr = this.createContactEquation(nt, it, o, c, at, ut);
                        Kt.vadd(or, wr.rj),
                        wr.rj.copy(wr.rj),
                        ir.negate(wr.ni),
                        wr.ni.normalize(),
                        wr.ri.copy(wr.rj),
                        wr.ri.vadd(_, wr.ri),
                        wr.ri.vsub(h, wr.ri),
                        wr.ri.normalize(),
                        wr.ri.scale(vt, wr.ri),
                        wr.ri.vadd(h, wr.ri),
                        wr.ri.vsub(nt.position, wr.ri),
                        wr.rj.vadd(_, wr.rj),
                        wr.rj.vsub(it.position, wr.rj),
                        this.result.push(wr),
                        this.createFrictionEquationsFromContact(wr, this.frictionResult)
                    }
                }
        ht.release(Ht, Kt, Jt, or, ir)
    }
    planeBox(o, c, h, _, b, _e, nt, it, at, ut, pt) {
        return c.convexPolyhedronRepresentation.material = c.material,
        c.convexPolyhedronRepresentation.collisionResponse = c.collisionResponse,
        c.convexPolyhedronRepresentation.id = c.id,
        this.planeConvex(o, c.convexPolyhedronRepresentation, h, _, b, _e, nt, it, o, c, pt)
    }
    convexConvex(o, c, h, _, b, _e, nt, it, at, ut, pt, ht, _t) {
        const vt = convexConvex_sepAxis;
        if (!(h.distanceTo(_) > o.boundingSphereRadius + c.boundingSphereRadius) && o.findSeparatingAxis(c, h, b, _, _e, vt, ht, _t)) {
            const bt = []
              , St = convexConvex_q;
            o.clipAgainstHull(h, b, c, _, _e, vt, -100, 100, bt);
            let At = 0;
            for (let Et = 0; Et !== bt.length; Et++) {
                if (pt)
                    return !0;
                const Pt = this.createContactEquation(nt, it, o, c, at, ut)
                  , It = Pt.ri
                  , Dt = Pt.rj;
                vt.negate(Pt.ni),
                bt[Et].normal.negate(St),
                St.scale(bt[Et].depth, St),
                bt[Et].point.vadd(St, It),
                Dt.copy(bt[Et].point),
                It.vsub(h, It),
                Dt.vsub(_, Dt),
                It.vadd(h, It),
                It.vsub(nt.position, It),
                Dt.vadd(_, Dt),
                Dt.vsub(it.position, Dt),
                this.result.push(Pt),
                At++,
                this.enableFrictionReduction || this.createFrictionEquationsFromContact(Pt, this.frictionResult)
            }
            this.enableFrictionReduction && At && this.createFrictionFromAverage(At)
        }
    }
    sphereConvex(o, c, h, _, b, _e, nt, it, at, ut, pt) {
        const ht = this.v3pool;
        h.vsub(_, convex_to_sphere);
        const _t = c.faceNormals
          , vt = c.faces
          , bt = c.vertices
          , St = o.radius;
        let At = !1;
        for (let Et = 0; Et !== bt.length; Et++) {
            const Pt = bt[Et]
              , It = sphereConvex_worldCorner;
            _e.vmult(Pt, It),
            _.vadd(It, It);
            const Dt = sphereConvex_sphereToCorner;
            if (It.vsub(h, Dt),
            Dt.lengthSquared() < St * St) {
                if (pt)
                    return !0;
                At = !0;
                const Gt = this.createContactEquation(nt, it, o, c, at, ut);
                return Gt.ri.copy(Dt),
                Gt.ri.normalize(),
                Gt.ni.copy(Gt.ri),
                Gt.ri.scale(St, Gt.ri),
                It.vsub(_, Gt.rj),
                Gt.ri.vadd(h, Gt.ri),
                Gt.ri.vsub(nt.position, Gt.ri),
                Gt.rj.vadd(_, Gt.rj),
                Gt.rj.vsub(it.position, Gt.rj),
                this.result.push(Gt),
                void this.createFrictionEquationsFromContact(Gt, this.frictionResult)
            }
        }
        for (let Et = 0, Pt = vt.length; Et !== Pt && At === !1; Et++) {
            const It = _t[Et]
              , Dt = vt[Et]
              , Gt = sphereConvex_worldNormal;
            _e.vmult(It, Gt);
            const Bt = sphereConvex_worldPoint;
            _e.vmult(bt[Dt[0]], Bt),
            Bt.vadd(_, Bt);
            const kt = sphereConvex_worldSpherePointClosestToPlane;
            Gt.scale(-St, kt),
            h.vadd(kt, kt);
            const Ut = sphereConvex_penetrationVec;
            kt.vsub(Bt, Ut);
            const Ht = Ut.dot(Gt)
              , Kt = sphereConvex_sphereToWorldPoint;
            if (h.vsub(Bt, Kt),
            Ht < 0 && Kt.dot(Gt) > 0) {
                const Jt = [];
                for (let or = 0, ir = Dt.length; or !== ir; or++) {
                    const lr = ht.get();
                    _e.vmult(bt[Dt[or]], lr),
                    _.vadd(lr, lr),
                    Jt.push(lr)
                }
                if (pointInPolygon(Jt, Gt, h)) {
                    if (pt)
                        return !0;
                    At = !0;
                    const or = this.createContactEquation(nt, it, o, c, at, ut);
                    Gt.scale(-St, or.ri),
                    Gt.negate(or.ni);
                    const ir = ht.get();
                    Gt.scale(-Ht, ir);
                    const lr = ht.get();
                    Gt.scale(-St, lr),
                    h.vsub(_, or.rj),
                    or.rj.vadd(lr, or.rj),
                    or.rj.vadd(ir, or.rj),
                    or.rj.vadd(_, or.rj),
                    or.rj.vsub(it.position, or.rj),
                    or.ri.vadd(h, or.ri),
                    or.ri.vsub(nt.position, or.ri),
                    ht.release(ir),
                    ht.release(lr),
                    this.result.push(or),
                    this.createFrictionEquationsFromContact(or, this.frictionResult);
                    for (let ar = 0, hr = Jt.length; ar !== hr; ar++)
                        ht.release(Jt[ar]);
                    return
                }
                for (let or = 0; or !== Dt.length; or++) {
                    const ir = ht.get()
                      , lr = ht.get();
                    _e.vmult(bt[Dt[(or + 1) % Dt.length]], ir),
                    _e.vmult(bt[Dt[(or + 2) % Dt.length]], lr),
                    _.vadd(ir, ir),
                    _.vadd(lr, lr);
                    const ar = sphereConvex_edge;
                    lr.vsub(ir, ar);
                    const hr = sphereConvex_edgeUnit;
                    ar.unit(hr);
                    const gr = ht.get()
                      , dr = ht.get();
                    h.vsub(ir, dr);
                    const cr = dr.dot(hr);
                    hr.scale(cr, gr),
                    gr.vadd(ir, gr);
                    const Ar = ht.get();
                    if (gr.vsub(h, Ar),
                    cr > 0 && cr * cr < ar.lengthSquared() && Ar.lengthSquared() < St * St) {
                        if (pt)
                            return !0;
                        const wr = this.createContactEquation(nt, it, o, c, at, ut);
                        gr.vsub(_, wr.rj),
                        gr.vsub(h, wr.ni),
                        wr.ni.normalize(),
                        wr.ni.scale(St, wr.ri),
                        wr.rj.vadd(_, wr.rj),
                        wr.rj.vsub(it.position, wr.rj),
                        wr.ri.vadd(h, wr.ri),
                        wr.ri.vsub(nt.position, wr.ri),
                        this.result.push(wr),
                        this.createFrictionEquationsFromContact(wr, this.frictionResult);
                        for (let Rr = 0, Cr = Jt.length; Rr !== Cr; Rr++)
                            ht.release(Jt[Rr]);
                        return ht.release(ir),
                        ht.release(lr),
                        ht.release(gr),
                        ht.release(Ar),
                        void ht.release(dr)
                    }
                    ht.release(ir),
                    ht.release(lr),
                    ht.release(gr),
                    ht.release(Ar),
                    ht.release(dr)
                }
                for (let or = 0, ir = Jt.length; or !== ir; or++)
                    ht.release(Jt[or])
            }
        }
    }
    planeConvex(o, c, h, _, b, _e, nt, it, at, ut, pt) {
        const ht = planeConvex_v
          , _t = planeConvex_normal;
        _t.set(0, 0, 1),
        b.vmult(_t, _t);
        let vt = 0;
        const bt = planeConvex_relpos;
        for (let St = 0; St !== c.vertices.length; St++)
            if (ht.copy(c.vertices[St]),
            _e.vmult(ht, ht),
            _.vadd(ht, ht),
            ht.vsub(h, bt),
            _t.dot(bt) <= 0) {
                if (pt)
                    return !0;
                const At = this.createContactEquation(nt, it, o, c, at, ut)
                  , Et = planeConvex_projected;
                _t.scale(_t.dot(bt), Et),
                ht.vsub(Et, Et),
                Et.vsub(h, At.ri),
                At.ni.copy(_t),
                ht.vsub(_, At.rj),
                At.ri.vadd(h, At.ri),
                At.ri.vsub(nt.position, At.ri),
                At.rj.vadd(_, At.rj),
                At.rj.vsub(it.position, At.rj),
                this.result.push(At),
                vt++,
                this.enableFrictionReduction || this.createFrictionEquationsFromContact(At, this.frictionResult)
            }
        this.enableFrictionReduction && vt && this.createFrictionFromAverage(vt)
    }
    boxConvex(o, c, h, _, b, _e, nt, it, at, ut, pt) {
        return o.convexPolyhedronRepresentation.material = o.material,
        o.convexPolyhedronRepresentation.collisionResponse = o.collisionResponse,
        this.convexConvex(o.convexPolyhedronRepresentation, c, h, _, b, _e, nt, it, o, c, pt)
    }
    sphereHeightfield(o, c, h, _, b, _e, nt, it, at, ut, pt) {
        const ht = c.data
          , _t = o.radius
          , vt = c.elementSize
          , bt = sphereHeightfield_tmp2
          , St = sphereHeightfield_tmp1;
        cannon_es_Transform.pointToLocalFrame(_, _e, h, St);
        let At = Math.floor((St.x - _t) / vt) - 1
          , Et = Math.ceil((St.x + _t) / vt) + 1
          , Pt = Math.floor((St.y - _t) / vt) - 1
          , It = Math.ceil((St.y + _t) / vt) + 1;
        if (Et < 0 || It < 0 || At > ht.length || Pt > ht[0].length)
            return;
        At < 0 && (At = 0),
        Et < 0 && (Et = 0),
        Pt < 0 && (Pt = 0),
        It < 0 && (It = 0),
        At >= ht.length && (At = ht.length - 1),
        Et >= ht.length && (Et = ht.length - 1),
        It >= ht[0].length && (It = ht[0].length - 1),
        Pt >= ht[0].length && (Pt = ht[0].length - 1);
        const Dt = [];
        c.getRectMinMax(At, Pt, Et, It, Dt);
        const Gt = Dt[0]
          , Bt = Dt[1];
        if (St.z - _t > Bt || St.z + _t < Gt)
            return;
        const kt = this.result;
        for (let Ut = At; Ut < Et; Ut++)
            for (let Ht = Pt; Ht < It; Ht++) {
                const Kt = kt.length;
                let Jt = !1;
                if (c.getConvexTrianglePillar(Ut, Ht, !1),
                cannon_es_Transform.pointToWorldFrame(_, _e, c.pillarOffset, bt),
                h.distanceTo(bt) < c.pillarConvex.boundingSphereRadius + o.boundingSphereRadius && (Jt = this.sphereConvex(o, c.pillarConvex, h, bt, b, _e, nt, it, o, c, pt)),
                pt && Jt || (c.getConvexTrianglePillar(Ut, Ht, !0),
                cannon_es_Transform.pointToWorldFrame(_, _e, c.pillarOffset, bt),
                h.distanceTo(bt) < c.pillarConvex.boundingSphereRadius + o.boundingSphereRadius && (Jt = this.sphereConvex(o, c.pillarConvex, h, bt, b, _e, nt, it, o, c, pt)),
                pt && Jt))
                    return !0;
                if (kt.length - Kt > 2)
                    return
            }
    }
    boxHeightfield(o, c, h, _, b, _e, nt, it, at, ut, pt) {
        return o.convexPolyhedronRepresentation.material = o.material,
        o.convexPolyhedronRepresentation.collisionResponse = o.collisionResponse,
        this.convexHeightfield(o.convexPolyhedronRepresentation, c, h, _, b, _e, nt, it, o, c, pt)
    }
    convexHeightfield(o, c, h, _, b, _e, nt, it, at, ut, pt) {
        const ht = c.data
          , _t = c.elementSize
          , vt = o.boundingSphereRadius
          , bt = convexHeightfield_tmp2
          , St = convexHeightfield_faceList
          , At = convexHeightfield_tmp1;
        cannon_es_Transform.pointToLocalFrame(_, _e, h, At);
        let Et = Math.floor((At.x - vt) / _t) - 1
          , Pt = Math.ceil((At.x + vt) / _t) + 1
          , It = Math.floor((At.y - vt) / _t) - 1
          , Dt = Math.ceil((At.y + vt) / _t) + 1;
        if (Pt < 0 || Dt < 0 || Et > ht.length || It > ht[0].length)
            return;
        Et < 0 && (Et = 0),
        Pt < 0 && (Pt = 0),
        It < 0 && (It = 0),
        Dt < 0 && (Dt = 0),
        Et >= ht.length && (Et = ht.length - 1),
        Pt >= ht.length && (Pt = ht.length - 1),
        Dt >= ht[0].length && (Dt = ht[0].length - 1),
        It >= ht[0].length && (It = ht[0].length - 1);
        const Gt = [];
        c.getRectMinMax(Et, It, Pt, Dt, Gt);
        const Bt = Gt[0]
          , kt = Gt[1];
        if (!(At.z - vt > kt || At.z + vt < Bt))
            for (let Ut = Et; Ut < Pt; Ut++)
                for (let Ht = It; Ht < Dt; Ht++) {
                    let Kt = !1;
                    if (c.getConvexTrianglePillar(Ut, Ht, !1),
                    cannon_es_Transform.pointToWorldFrame(_, _e, c.pillarOffset, bt),
                    h.distanceTo(bt) < c.pillarConvex.boundingSphereRadius + o.boundingSphereRadius && (Kt = this.convexConvex(o, c.pillarConvex, h, bt, b, _e, nt, it, null, null, pt, St, null)),
                    pt && Kt || (c.getConvexTrianglePillar(Ut, Ht, !0),
                    cannon_es_Transform.pointToWorldFrame(_, _e, c.pillarOffset, bt),
                    h.distanceTo(bt) < c.pillarConvex.boundingSphereRadius + o.boundingSphereRadius && (Kt = this.convexConvex(o, c.pillarConvex, h, bt, b, _e, nt, it, null, null, pt, St, null)),
                    pt && Kt))
                        return !0
                }
    }
    sphereParticle(o, c, h, _, b, _e, nt, it, at, ut, pt) {
        const ht = particleSphere_normal;
        if (ht.set(0, 0, 1),
        _.vsub(h, ht),
        ht.lengthSquared() <= o.radius * o.radius) {
            if (pt)
                return !0;
            const _t = this.createContactEquation(it, nt, c, o, at, ut);
            ht.normalize(),
            _t.rj.copy(ht),
            _t.rj.scale(o.radius, _t.rj),
            _t.ni.copy(ht),
            _t.ni.negate(_t.ni),
            _t.ri.set(0, 0, 0),
            this.result.push(_t),
            this.createFrictionEquationsFromContact(_t, this.frictionResult)
        }
    }
    planeParticle(o, c, h, _, b, _e, nt, it, at, ut, pt) {
        const ht = particlePlane_normal;
        ht.set(0, 0, 1),
        nt.quaternion.vmult(ht, ht);
        const _t = particlePlane_relpos;
        if (_.vsub(nt.position, _t),
        ht.dot(_t) <= 0) {
            if (pt)
                return !0;
            const vt = this.createContactEquation(it, nt, c, o, at, ut);
            vt.ni.copy(ht),
            vt.ni.negate(vt.ni),
            vt.ri.set(0, 0, 0);
            const bt = particlePlane_projected;
            ht.scale(ht.dot(_), bt),
            _.vsub(bt, bt),
            vt.rj.copy(bt),
            this.result.push(vt),
            this.createFrictionEquationsFromContact(vt, this.frictionResult)
        }
    }
    boxParticle(o, c, h, _, b, _e, nt, it, at, ut, pt) {
        return o.convexPolyhedronRepresentation.material = o.material,
        o.convexPolyhedronRepresentation.collisionResponse = o.collisionResponse,
        this.convexParticle(o.convexPolyhedronRepresentation, c, h, _, b, _e, nt, it, o, c, pt)
    }
    convexParticle(o, c, h, _, b, _e, nt, it, at, ut, pt) {
        let ht = -1;
        const _t = convexParticle_penetratedFaceNormal
          , vt = convexParticle_worldPenetrationVec;
        let bt = null;
        const St = convexParticle_local;
        if (St.copy(_),
        St.vsub(h, St),
        b.conjugate(cqj),
        cqj.vmult(St, St),
        o.pointIsInside(St)) {
            o.worldVerticesNeedsUpdate && o.computeWorldVertices(h, b),
            o.worldFaceNormalsNeedsUpdate && o.computeWorldFaceNormals(b);
            for (let At = 0, Et = o.faces.length; At !== Et; At++) {
                const Pt = [o.worldVertices[o.faces[At][0]]]
                  , It = o.worldFaceNormals[At];
                _.vsub(Pt[0], convexParticle_vertexToParticle);
                const Dt = -It.dot(convexParticle_vertexToParticle);
                if (bt === null || Math.abs(Dt) < Math.abs(bt)) {
                    if (pt)
                        return !0;
                    bt = Dt,
                    ht = At,
                    _t.copy(It)
                }
            }
            if (ht !== -1) {
                const At = this.createContactEquation(it, nt, c, o, at, ut);
                _t.scale(bt, vt),
                vt.vadd(_, vt),
                vt.vsub(h, vt),
                At.rj.copy(vt),
                _t.negate(At.ni),
                At.ri.set(0, 0, 0);
                const Et = At.ri
                  , Pt = At.rj;
                Et.vadd(_, Et),
                Et.vsub(it.position, Et),
                Pt.vadd(h, Pt),
                Pt.vsub(nt.position, Pt),
                this.result.push(At),
                this.createFrictionEquationsFromContact(At, this.frictionResult)
            } else
                console.warn("Point found inside convex, but did not find penetrating face!")
        }
    }
    heightfieldCylinder(o, c, h, _, b, _e, nt, it, at, ut, pt) {
        return this.convexHeightfield(c, o, _, h, _e, b, it, nt, at, ut, pt)
    }
    particleCylinder(o, c, h, _, b, _e, nt, it, at, ut, pt) {
        return this.convexParticle(c, o, _, h, _e, b, it, nt, at, ut, pt)
    }
    sphereTrimesh(o, c, h, _, b, _e, nt, it, at, ut, pt) {
        const ht = sphereTrimesh_edgeVertexA
          , _t = sphereTrimesh_edgeVertexB
          , vt = sphereTrimesh_edgeVector
          , bt = sphereTrimesh_edgeVectorUnit
          , St = sphereTrimesh_localSpherePos
          , At = sphereTrimesh_tmp
          , Et = sphereTrimesh_localSphereAABB
          , Pt = sphereTrimesh_v2
          , It = sphereTrimesh_relpos
          , Dt = sphereTrimesh_triangles;
        cannon_es_Transform.pointToLocalFrame(_, _e, h, St);
        const Gt = o.radius;
        Et.lowerBound.set(St.x - Gt, St.y - Gt, St.z - Gt),
        Et.upperBound.set(St.x + Gt, St.y + Gt, St.z + Gt),
        c.getTrianglesInAABB(Et, Dt);
        const Bt = sphereTrimesh_v
          , kt = o.radius * o.radius;
        for (let or = 0; or < Dt.length; or++)
            for (let ir = 0; ir < 3; ir++)
                if (c.getVertex(c.indices[3 * Dt[or] + ir], Bt),
                Bt.vsub(St, It),
                It.lengthSquared() <= kt) {
                    if (Pt.copy(Bt),
                    cannon_es_Transform.pointToWorldFrame(_, _e, Pt, Bt),
                    Bt.vsub(h, It),
                    pt)
                        return !0;
                    let lr = this.createContactEquation(nt, it, o, c, at, ut);
                    lr.ni.copy(It),
                    lr.ni.normalize(),
                    lr.ri.copy(lr.ni),
                    lr.ri.scale(o.radius, lr.ri),
                    lr.ri.vadd(h, lr.ri),
                    lr.ri.vsub(nt.position, lr.ri),
                    lr.rj.copy(Bt),
                    lr.rj.vsub(it.position, lr.rj),
                    this.result.push(lr),
                    this.createFrictionEquationsFromContact(lr, this.frictionResult)
                }
        for (let or = 0; or < Dt.length; or++)
            for (let ir = 0; ir < 3; ir++) {
                c.getVertex(c.indices[3 * Dt[or] + ir], ht),
                c.getVertex(c.indices[3 * Dt[or] + (ir + 1) % 3], _t),
                _t.vsub(ht, vt),
                St.vsub(_t, At);
                const lr = At.dot(vt);
                St.vsub(ht, At);
                let ar = At.dot(vt);
                if (ar > 0 && lr < 0 && (St.vsub(ht, At),
                bt.copy(vt),
                bt.normalize(),
                ar = At.dot(bt),
                bt.scale(ar, At),
                At.vadd(ht, At),
                At.distanceTo(St) < o.radius)) {
                    if (pt)
                        return !0;
                    const hr = this.createContactEquation(nt, it, o, c, at, ut);
                    At.vsub(St, hr.ni),
                    hr.ni.normalize(),
                    hr.ni.scale(o.radius, hr.ri),
                    hr.ri.vadd(h, hr.ri),
                    hr.ri.vsub(nt.position, hr.ri),
                    cannon_es_Transform.pointToWorldFrame(_, _e, At, At),
                    At.vsub(it.position, hr.rj),
                    cannon_es_Transform.vectorToWorldFrame(_e, hr.ni, hr.ni),
                    cannon_es_Transform.vectorToWorldFrame(_e, hr.ri, hr.ri),
                    this.result.push(hr),
                    this.createFrictionEquationsFromContact(hr, this.frictionResult)
                }
            }
        const Ut = sphereTrimesh_va
          , Ht = sphereTrimesh_vb
          , Kt = sphereTrimesh_vc
          , Jt = sphereTrimesh_normal;
        for (let or = 0, ir = Dt.length; or !== ir; or++) {
            c.getTriangleVertices(Dt[or], Ut, Ht, Kt),
            c.getNormal(Dt[or], Jt),
            St.vsub(Ut, At);
            let lr = At.dot(Jt);
            if (Jt.scale(lr, At),
            St.vsub(At, At),
            lr = At.distanceTo(St),
            Ray.pointInTriangle(At, Ut, Ht, Kt) && lr < o.radius) {
                if (pt)
                    return !0;
                let ar = this.createContactEquation(nt, it, o, c, at, ut);
                At.vsub(St, ar.ni),
                ar.ni.normalize(),
                ar.ni.scale(o.radius, ar.ri),
                ar.ri.vadd(h, ar.ri),
                ar.ri.vsub(nt.position, ar.ri),
                cannon_es_Transform.pointToWorldFrame(_, _e, At, At),
                At.vsub(it.position, ar.rj),
                cannon_es_Transform.vectorToWorldFrame(_e, ar.ni, ar.ni),
                cannon_es_Transform.vectorToWorldFrame(_e, ar.ri, ar.ri),
                this.result.push(ar),
                this.createFrictionEquationsFromContact(ar, this.frictionResult)
            }
        }
        Dt.length = 0
    }
    planeTrimesh(o, c, h, _, b, _e, nt, it, at, ut, pt) {
        const ht = new Vec3
          , _t = planeTrimesh_normal;
        _t.set(0, 0, 1),
        b.vmult(_t, _t);
        for (let vt = 0; vt < c.vertices.length / 3; vt++) {
            c.getVertex(vt, ht);
            const bt = new Vec3;
            bt.copy(ht),
            cannon_es_Transform.pointToWorldFrame(_, _e, bt, ht);
            const St = planeTrimesh_relpos;
            if (ht.vsub(h, St),
            _t.dot(St) <= 0) {
                if (pt)
                    return !0;
                const At = this.createContactEquation(nt, it, o, c, at, ut);
                At.ni.copy(_t);
                const Et = planeTrimesh_projected;
                _t.scale(St.dot(_t), Et),
                ht.vsub(Et, Et),
                At.ri.copy(Et),
                At.ri.vsub(nt.position, At.ri),
                At.rj.copy(ht),
                At.rj.vsub(it.position, At.rj),
                this.result.push(At),
                this.createFrictionEquationsFromContact(At, this.frictionResult)
            }
        }
    }
}

export default Narrowphase;
