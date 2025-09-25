/* Standalone Class: NaiveBroadphase */

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

export default NaiveBroadphase;
