/* Standalone Class: Ray */

class Ray {
    get[_Shape$types$SPHERE]() {
        return this._intersectSphere
    }
    get[_Shape$types$PLANE]() {
        return this._intersectPlane
    }
    get[_Shape$types$BOX]() {
        return this._intersectBox
    }
    get[_Shape$types$CYLINDER]() {
        return this._intersectConvex
    }
    get[_Shape$types$CONVEXPO]() {
        return this._intersectConvex
    }
    get[_Shape$types$HEIGHTFI]() {
        return this._intersectHeightfield
    }
    get[_Shape$types$TRIMESH]() {
        return this._intersectTrimesh
    }
    constructor(o, c) {
        o === void 0 && (o = new Vec3),
        c === void 0 && (c = new Vec3),
        this.from = o.clone(),
        this.to = c.clone(),
        this.direction = new Vec3,
        this.precision = 1e-4,
        this.checkCollisionResponse = !0,
        this.skipBackfaces = !1,
        this.collisionFilterMask = -1,
        this.collisionFilterGroup = -1,
        this.mode = Ray.ANY,
        this.result = new RaycastResult,
        this.hasHit = !1,
        this.callback = h => {}
    }
    intersectWorld(o, c) {
        return this.mode = c.mode || Ray.ANY,
        this.result = c.result || new RaycastResult,
        this.skipBackfaces = !!c.skipBackfaces,
        this.collisionFilterMask = c.collisionFilterMask !== void 0 ? c.collisionFilterMask : -1,
        this.collisionFilterGroup = c.collisionFilterGroup !== void 0 ? c.collisionFilterGroup : -1,
        this.checkCollisionResponse = c.checkCollisionResponse === void 0 || c.checkCollisionResponse,
        c.from && this.from.copy(c.from),
        c.to && this.to.copy(c.to),
        this.callback = c.callback || ( () => {}
        ),
        this.hasHit = !1,
        this.result.reset(),
        this.updateDirection(),
        this.getAABB(tmpAABB$1),
        tmpArray.length = 0,
        o.broadphase.aabbQuery(o, tmpAABB$1, tmpArray),
        this.intersectBodies(tmpArray),
        this.hasHit
    }
    intersectBody(o, c) {
        c && (this.result = c,
        this.updateDirection());
        const h = this.checkCollisionResponse;
        if (h && !o.collisionResponse || !(this.collisionFilterGroup & o.collisionFilterMask && o.collisionFilterGroup & this.collisionFilterMask))
            return;
        const _ = intersectBody_xi
          , b = intersectBody_qi;
        for (let _e = 0, nt = o.shapes.length; _e < nt; _e++) {
            const it = o.shapes[_e];
            if ((!h || it.collisionResponse) && (o.quaternion.mult(o.shapeOrientations[_e], b),
            o.quaternion.vmult(o.shapeOffsets[_e], _),
            _.vadd(o.position, _),
            this.intersectShape(it, b, _, o),
            this.result.shouldStop))
                break
        }
    }
    intersectBodies(o, c) {
        c && (this.result = c,
        this.updateDirection());
        for (let h = 0, _ = o.length; !this.result.shouldStop && h < _; h++)
            this.intersectBody(o[h])
    }
    updateDirection() {
        this.to.vsub(this.from, this.direction),
        this.direction.normalize()
    }
    intersectShape(o, c, h, _) {
        if (distanceFromIntersection(this.from, this.direction, h) > o.boundingSphereRadius)
            return;
        const b = this[o.type];
        b && b.call(this, o, c, h, _, o)
    }
    _intersectBox(o, c, h, _, b) {
        return this._intersectConvex(o.convexPolyhedronRepresentation, c, h, _, b)
    }
    _intersectPlane(o, c, h, _, b) {
        const _e = this.from
          , nt = this.to
          , it = this.direction
          , at = new Vec3(0,0,1);
        c.vmult(at, at);
        const ut = new Vec3;
        _e.vsub(h, ut);
        const pt = ut.dot(at);
        if (nt.vsub(h, ut),
        pt * ut.dot(at) > 0 || _e.distanceTo(nt) < pt)
            return;
        const ht = at.dot(it);
        if (Math.abs(ht) < this.precision)
            return;
        const _t = new Vec3
          , vt = new Vec3
          , bt = new Vec3;
        _e.vsub(h, _t);
        const St = -at.dot(_t) / ht;
        it.scale(St, vt),
        _e.vadd(vt, bt),
        this.reportIntersection(at, bt, b, _, -1)
    }
    getAABB(o) {
        const {lowerBound: c, upperBound: h} = o
          , _ = this.to
          , b = this.from;
        c.x = Math.min(_.x, b.x),
        c.y = Math.min(_.y, b.y),
        c.z = Math.min(_.z, b.z),
        h.x = Math.max(_.x, b.x),
        h.y = Math.max(_.y, b.y),
        h.z = Math.max(_.z, b.z)
    }
    _intersectHeightfield(o, c, h, _, b) {
        o.data,
        o.elementSize;
        const _e = intersectHeightfield_localRay;
        _e.from.copy(this.from),
        _e.to.copy(this.to),
        cannon_es_Transform.pointToLocalFrame(h, c, _e.from, _e.from),
        cannon_es_Transform.pointToLocalFrame(h, c, _e.to, _e.to),
        _e.updateDirection();
        const nt = intersectHeightfield_index;
        let it, at, ut, pt;
        it = at = 0,
        ut = pt = o.data.length - 1;
        const ht = new AABB;
        _e.getAABB(ht),
        o.getIndexOfPosition(ht.lowerBound.x, ht.lowerBound.y, nt, !0),
        it = Math.max(it, nt[0]),
        at = Math.max(at, nt[1]),
        o.getIndexOfPosition(ht.upperBound.x, ht.upperBound.y, nt, !0),
        ut = Math.min(ut, nt[0] + 1),
        pt = Math.min(pt, nt[1] + 1);
        for (let _t = it; _t < ut; _t++)
            for (let vt = at; vt < pt; vt++) {
                if (this.result.shouldStop)
                    return;
                if (o.getAabbAtIndex(_t, vt, ht),
                ht.overlapsRay(_e)) {
                    if (o.getConvexTrianglePillar(_t, vt, !1),
                    cannon_es_Transform.pointToWorldFrame(h, c, o.pillarOffset, worldPillarOffset),
                    this._intersectConvex(o.pillarConvex, c, worldPillarOffset, _, b, intersectConvexOptions),
                    this.result.shouldStop)
                        return;
                    o.getConvexTrianglePillar(_t, vt, !0),
                    cannon_es_Transform.pointToWorldFrame(h, c, o.pillarOffset, worldPillarOffset),
                    this._intersectConvex(o.pillarConvex, c, worldPillarOffset, _, b, intersectConvexOptions)
                }
            }
    }
    _intersectSphere(o, c, h, _, b) {
        const _e = this.from
          , nt = this.to
          , it = o.radius
          , at = (nt.x - _e.x) ** 2 + (nt.y - _e.y) ** 2 + (nt.z - _e.z) ** 2
          , ut = 2 * ((nt.x - _e.x) * (_e.x - h.x) + (nt.y - _e.y) * (_e.y - h.y) + (nt.z - _e.z) * (_e.z - h.z))
          , pt = ut ** 2 - 4 * at * ((_e.x - h.x) ** 2 + (_e.y - h.y) ** 2 + (_e.z - h.z) ** 2 - it ** 2)
          , ht = Ray_intersectSphere_intersectionPoint
          , _t = Ray_intersectSphere_normal;
        if (!(pt < 0))
            if (pt === 0)
                _e.lerp(nt, pt, ht),
                ht.vsub(h, _t),
                _t.normalize(),
                this.reportIntersection(_t, ht, b, _, -1);
            else {
                const vt = (-ut - Math.sqrt(pt)) / (2 * at)
                  , bt = (-ut + Math.sqrt(pt)) / (2 * at);
                if (vt >= 0 && vt <= 1 && (_e.lerp(nt, vt, ht),
                ht.vsub(h, _t),
                _t.normalize(),
                this.reportIntersection(_t, ht, b, _, -1)),
                this.result.shouldStop)
                    return;
                bt >= 0 && bt <= 1 && (_e.lerp(nt, bt, ht),
                ht.vsub(h, _t),
                _t.normalize(),
                this.reportIntersection(_t, ht, b, _, -1))
            }
    }
    _intersectConvex(o, c, h, _, b, _e) {
        const nt = intersectConvex_normal
          , it = intersectConvex_vector
          , at = _e && _e.faceList || null
          , ut = o.faces
          , pt = o.vertices
          , ht = o.faceNormals
          , _t = this.direction
          , vt = this.from
          , bt = this.to
          , St = vt.distanceTo(bt)
          , At = at ? at.length : ut.length
          , Et = this.result;
        for (let Pt = 0; !Et.shouldStop && Pt < At; Pt++) {
            const It = at ? at[Pt] : Pt
              , Dt = ut[It]
              , Gt = ht[It]
              , Bt = c
              , kt = h;
            it.copy(pt[Dt[0]]),
            Bt.vmult(it, it),
            it.vadd(kt, it),
            it.vsub(vt, it),
            Bt.vmult(Gt, nt);
            const Ut = _t.dot(nt);
            if (Math.abs(Ut) < this.precision)
                continue;
            const Ht = nt.dot(it) / Ut;
            if (!(Ht < 0)) {
                _t.scale(Ht, intersectPoint),
                intersectPoint.vadd(vt, intersectPoint),
                cannon_es_a.copy(pt[Dt[0]]),
                Bt.vmult(cannon_es_a, cannon_es_a),
                kt.vadd(cannon_es_a, cannon_es_a);
                for (let Kt = 1; !Et.shouldStop && Kt < Dt.length - 1; Kt++) {
                    cannon_es_b.copy(pt[Dt[Kt]]),
                    cannon_es_c.copy(pt[Dt[Kt + 1]]),
                    Bt.vmult(cannon_es_b, cannon_es_b),
                    Bt.vmult(cannon_es_c, cannon_es_c),
                    kt.vadd(cannon_es_b, cannon_es_b),
                    kt.vadd(cannon_es_c, cannon_es_c);
                    const Jt = intersectPoint.distanceTo(vt);
                    !Ray.pointInTriangle(intersectPoint, cannon_es_a, cannon_es_b, cannon_es_c) && !Ray.pointInTriangle(intersectPoint, cannon_es_b, cannon_es_a, cannon_es_c) || Jt > St || this.reportIntersection(nt, intersectPoint, b, _, It)
                }
            }
        }
    }
    _intersectTrimesh(o, c, h, _, b, _e) {
        const nt = intersectTrimesh_normal
          , it = intersectTrimesh_triangles
          , at = intersectTrimesh_treeTransform
          , ut = intersectConvex_vector
          , pt = intersectTrimesh_localDirection
          , ht = intersectTrimesh_localFrom
          , _t = intersectTrimesh_localTo
          , vt = intersectTrimesh_worldIntersectPoint
          , bt = intersectTrimesh_worldNormal
          , St = o.indices;
        o.vertices;
        const At = this.from
          , Et = this.to
          , Pt = this.direction;
        at.position.copy(h),
        at.quaternion.copy(c),
        cannon_es_Transform.vectorToLocalFrame(h, c, Pt, pt),
        cannon_es_Transform.pointToLocalFrame(h, c, At, ht),
        cannon_es_Transform.pointToLocalFrame(h, c, Et, _t),
        _t.x *= o.scale.x,
        _t.y *= o.scale.y,
        _t.z *= o.scale.z,
        ht.x *= o.scale.x,
        ht.y *= o.scale.y,
        ht.z *= o.scale.z,
        _t.vsub(ht, pt),
        pt.normalize();
        const It = ht.distanceSquared(_t);
        o.tree.rayQuery(this, at, it);
        for (let Dt = 0, Gt = it.length; !this.result.shouldStop && Dt !== Gt; Dt++) {
            const Bt = it[Dt];
            o.getNormal(Bt, nt),
            o.getVertex(St[3 * Bt], cannon_es_a),
            cannon_es_a.vsub(ht, ut);
            const kt = pt.dot(nt)
              , Ut = nt.dot(ut) / kt;
            if (Ut < 0)
                continue;
            pt.scale(Ut, intersectPoint),
            intersectPoint.vadd(ht, intersectPoint),
            o.getVertex(St[3 * Bt + 1], cannon_es_b),
            o.getVertex(St[3 * Bt + 2], cannon_es_c);
            const Ht = intersectPoint.distanceSquared(ht);
            !Ray.pointInTriangle(intersectPoint, cannon_es_b, cannon_es_a, cannon_es_c) && !Ray.pointInTriangle(intersectPoint, cannon_es_a, cannon_es_b, cannon_es_c) || Ht > It || (cannon_es_Transform.vectorToWorldFrame(c, nt, bt),
            cannon_es_Transform.pointToWorldFrame(h, c, intersectPoint, vt),
            this.reportIntersection(bt, vt, b, _, Bt))
        }
        it.length = 0
    }
    reportIntersection(o, c, h, _, b) {
        const _e = this.from
          , nt = this.to
          , it = _e.distanceTo(c)
          , at = this.result;
        if (!(this.skipBackfaces && o.dot(this.direction) > 0))
            switch (at.hitFaceIndex = b !== void 0 ? b : -1,
            this.mode) {
            case Ray.ALL:
                this.hasHit = !0,
                at.set(_e, nt, o, c, h, _, it),
                at.hasHit = !0,
                this.callback(at);
                break;
            case Ray.CLOSEST:
                (it < at.distance || !at.hasHit) && (this.hasHit = !0,
                at.hasHit = !0,
                at.set(_e, nt, o, c, h, _, it));
                break;
            case Ray.ANY:
                this.hasHit = !0,
                at.hasHit = !0,
                at.set(_e, nt, o, c, h, _, it),
                at.shouldStop = !0
            }
    }
    static pointInTriangle(o, c, h, _) {
        _.vsub(c, v0),
        h.vsub(c, v1),
        o.vsub(c, v2);
        const b = v0.dot(v0)
          , _e = v0.dot(v1)
          , nt = v0.dot(v2)
          , it = v1.dot(v1)
          , at = v1.dot(v2);
        let ut, pt;
        return (ut = it * nt - _e * at) >= 0 && (pt = b * at - _e * nt) >= 0 && ut + pt < b * it - _e * _e
    }
}

export default Ray;
