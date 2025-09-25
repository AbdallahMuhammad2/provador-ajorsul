/* Standalone Constant: Broadphase_makePairsUnique_temp */

const Broadphase_makePairsUnique_temp = {
    keys: []
}
  , Broadphase_makePairsUnique_p1 = []
  , Broadphase_makePairsUnique_p2 = [];
new Vec3;
new Vec3;
new Vec3;
class NaiveBroadphase extends Broadphase {
    constructor() {
        super()
    }
    collisionPairs(o, c, h) {
        const _ = o.bodies
          , b = _.length;
        let _e, nt;
        for (let it = 0; it !== b; it++)
            for (let at = 0; at !== it; at++)
                _e = _[it],
                nt = _[at],
                this.needBroadphaseCollision(_e, nt) && this.intersectionTest(_e, nt, c, h)
    }
    aabbQuery(o, c, h) {
        h === void 0 && (h = []);
        for (let _ = 0; _ < o.bodies.length; _++) {
            const b = o.bodies[_];
            b.aabbNeedsUpdate && b.updateAABB(),
            b.aabb.overlaps(c) && h.push(b)
        }
        return h
    }
}
class RaycastResult {
    constructor() {
        this.rayFromWorld = new Vec3,
        this.rayToWorld = new Vec3,
        this.hitNormalWorld = new Vec3,
        this.hitPointWorld = new Vec3,
        this.hasHit = !1,
        this.shape = null,
        this.body = null,
        this.hitFaceIndex = -1,
        this.distance = -1,
        this.shouldStop = !1
    }
    reset() {
        this.rayFromWorld.setZero(),
        this.rayToWorld.setZero(),
        this.hitNormalWorld.setZero(),
        this.hitPointWorld.setZero(),
        this.hasHit = !1,
        this.shape = null,
        this.body = null,
        this.hitFaceIndex = -1,
        this.distance = -1,
        this.shouldStop = !1
    }
    abort() {
        this.shouldStop = !0
    }
    set(o, c, h, _, b, _e, nt) {
        this.rayFromWorld.copy(o),
        this.rayToWorld.copy(c),
        this.hitNormalWorld.copy(h),
        this.hitPointWorld.copy(_),
        this.shape = b,
        this.body = _e,
        this.distance = nt
    }
}
let _Shape$types$SPHERE, _Shape$types$PLANE, _Shape$types$BOX, _Shape$types$CYLINDER, _Shape$types$CONVEXPO, _Shape$types$HEIGHTFI, _Shape$types$TRIMESH;
const RAY_MODES = {
    CLOSEST: 1,
    ANY: 2,
    ALL: 4
};

export default Broadphase_makePairsUnique_temp;
