/* Standalone Class: RaycastResult */

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

export default RaycastResult;
