/* Standalone Class: RaySet */

class RaySet {
    constructor() {
        this._rays = []
    }
    addRay(o) {
        this._rays.push(o)
    }
    findClosestRay(o) {
        const c = this._rays
          , h = o.clone();
        h.direction.multiplyScalar(-1);
        let _ = 1 / 0
          , b = null;
        for (let it = 0, at = c.length; it < at; it++) {
            const ut = c[it];
            if (_e(ut, o) && _e(ut, h))
                continue;
            const pt = nt(ut, o)
              , ht = nt(ut, h)
              , _t = Math.min(pt, ht);
            _t < _ && (_ = _t,
            b = ut)
        }
        return b;
        function _e(it, at) {
            const ut = it.origin.distanceTo(at.origin) > DIST_EPSILON;
            return it.direction.angleTo(at.direction) > ANGLE_EPSILON || ut
        }
        function nt(it, at) {
            const ut = it.origin.distanceTo(at.origin)
              , pt = it.direction.angleTo(at.direction);
            return ut / DIST_EPSILON + pt / ANGLE_EPSILON
        }
    }
}

export default RaySet;
