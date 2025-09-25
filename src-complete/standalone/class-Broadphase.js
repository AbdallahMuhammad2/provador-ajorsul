/* Standalone Class: Broadphase */

class Broadphase {
    constructor() {
        this.world = null,
        this.useBoundingBoxes = !1,
        this.dirty = !0
    }
    collisionPairs(o, c, h) {
        throw new Error("collisionPairs not implemented for this BroadPhase class!")
    }
    needBroadphaseCollision(o, c) {
        return !(!(o.collisionFilterGroup & c.collisionFilterMask && c.collisionFilterGroup & o.collisionFilterMask) || (o.type & Body.STATIC || o.sleepState === Body.SLEEPING) && (c.type & Body.STATIC || c.sleepState === Body.SLEEPING))
    }
    intersectionTest(o, c, h, _) {
        this.useBoundingBoxes ? this.doBoundingBoxBroadphase(o, c, h, _) : this.doBoundingSphereBroadphase(o, c, h, _)
    }
    doBoundingSphereBroadphase(o, c, h, _) {
        const b = Broadphase_collisionPairs_r;
        c.position.vsub(o.position, b);
        const _e = (o.boundingRadius + c.boundingRadius) ** 2;
        b.lengthSquared() < _e && (h.push(o),
        _.push(c))
    }
    doBoundingBoxBroadphase(o, c, h, _) {
        o.aabbNeedsUpdate && o.updateAABB(),
        c.aabbNeedsUpdate && c.updateAABB(),
        o.aabb.overlaps(c.aabb) && (h.push(o),
        _.push(c))
    }
    makePairsUnique(o, c) {
        const h = Broadphase_makePairsUnique_temp
          , _ = Broadphase_makePairsUnique_p1
          , b = Broadphase_makePairsUnique_p2
          , _e = o.length;
        for (let nt = 0; nt !== _e; nt++)
            _[nt] = o[nt],
            b[nt] = c[nt];
        o.length = 0,
        c.length = 0;
        for (let nt = 0; nt !== _e; nt++) {
            const it = _[nt].id
              , at = b[nt].id
              , ut = it < at ? `${it},${at}` : `${at},${it}`;
            h[ut] = nt,
            h.keys.push(ut)
        }
        for (let nt = 0; nt !== h.keys.length; nt++) {
            const it = h.keys.pop()
              , at = h[it];
            o.push(_[at]),
            c.push(b[at]),
            delete h[it]
        }
    }
    setWorld(o) {}
    static boundingSphereCheck(o, c) {
        const h = new Vec3;
        o.position.vsub(c.position, h);
        const _ = o.shapes[0]
          , b = c.shapes[0];
        return Math.pow(_.boundingSphereRadius + b.boundingSphereRadius, 2) > h.lengthSquared()
    }
    aabbQuery(o, c, h) {
        return console.warn(".aabbQuery is not implemented in this Broadphase subclass."),
        []
    }
}

export default Broadphase;
