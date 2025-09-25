/* Standalone Class: AABB */

class AABB {
    constructor(o) {
        o === void 0 && (o = {}),
        this.lowerBound = new Vec3,
        this.upperBound = new Vec3,
        o.lowerBound && this.lowerBound.copy(o.lowerBound),
        o.upperBound && this.upperBound.copy(o.upperBound)
    }
    setFromPoints(o, c, h, _) {
        const b = this.lowerBound
          , _e = this.upperBound
          , nt = h;
        b.copy(o[0]),
        nt && nt.vmult(b, b),
        _e.copy(b);
        for (let it = 1; it < o.length; it++) {
            let at = o[it];
            nt && (nt.vmult(at, tmp$1),
            at = tmp$1),
            at.x > _e.x && (_e.x = at.x),
            at.x < b.x && (b.x = at.x),
            at.y > _e.y && (_e.y = at.y),
            at.y < b.y && (b.y = at.y),
            at.z > _e.z && (_e.z = at.z),
            at.z < b.z && (b.z = at.z)
        }
        return c && (c.vadd(b, b),
        c.vadd(_e, _e)),
        _ && (b.x -= _,
        b.y -= _,
        b.z -= _,
        _e.x += _,
        _e.y += _,
        _e.z += _),
        this
    }
    copy(o) {
        return this.lowerBound.copy(o.lowerBound),
        this.upperBound.copy(o.upperBound),
        this
    }
    clone() {
        return new AABB().copy(this)
    }
    extend(o) {
        this.lowerBound.x = Math.min(this.lowerBound.x, o.lowerBound.x),
        this.upperBound.x = Math.max(this.upperBound.x, o.upperBound.x),
        this.lowerBound.y = Math.min(this.lowerBound.y, o.lowerBound.y),
        this.upperBound.y = Math.max(this.upperBound.y, o.upperBound.y),
        this.lowerBound.z = Math.min(this.lowerBound.z, o.lowerBound.z),
        this.upperBound.z = Math.max(this.upperBound.z, o.upperBound.z)
    }
    overlaps(o) {
        const c = this.lowerBound
          , h = this.upperBound
          , _ = o.lowerBound
          , b = o.upperBound
          , _e = _.x <= h.x && h.x <= b.x || c.x <= b.x && b.x <= h.x
          , nt = _.y <= h.y && h.y <= b.y || c.y <= b.y && b.y <= h.y
          , it = _.z <= h.z && h.z <= b.z || c.z <= b.z && b.z <= h.z;
        return _e && nt && it
    }
    volume() {
        const o = this.lowerBound
          , c = this.upperBound;
        return (c.x - o.x) * (c.y - o.y) * (c.z - o.z)
    }
    contains(o) {
        const c = this.lowerBound
          , h = this.upperBound
          , _ = o.lowerBound
          , b = o.upperBound;
        return c.x <= _.x && h.x >= b.x && c.y <= _.y && h.y >= b.y && c.z <= _.z && h.z >= b.z
    }
    getCorners(o, c, h, _, b, _e, nt, it) {
        const at = this.lowerBound
          , ut = this.upperBound;
        o.copy(at),
        c.set(ut.x, at.y, at.z),
        h.set(ut.x, ut.y, at.z),
        _.set(at.x, ut.y, ut.z),
        b.set(ut.x, at.y, ut.z),
        _e.set(at.x, ut.y, at.z),
        nt.set(at.x, at.y, ut.z),
        it.copy(ut)
    }
    toLocalFrame(o, c) {
        const h = transformIntoFrame_corners
          , _ = h[0]
          , b = h[1]
          , _e = h[2]
          , nt = h[3]
          , it = h[4]
          , at = h[5]
          , ut = h[6]
          , pt = h[7];
        this.getCorners(_, b, _e, nt, it, at, ut, pt);
        for (let ht = 0; ht !== 8; ht++) {
            const _t = h[ht];
            o.pointToLocal(_t, _t)
        }
        return c.setFromPoints(h)
    }
    toWorldFrame(o, c) {
        const h = transformIntoFrame_corners
          , _ = h[0]
          , b = h[1]
          , _e = h[2]
          , nt = h[3]
          , it = h[4]
          , at = h[5]
          , ut = h[6]
          , pt = h[7];
        this.getCorners(_, b, _e, nt, it, at, ut, pt);
        for (let ht = 0; ht !== 8; ht++) {
            const _t = h[ht];
            o.pointToWorld(_t, _t)
        }
        return c.setFromPoints(h)
    }
    overlapsRay(o) {
        const {direction: c, from: h} = o
          , _ = 1 / c.x
          , b = 1 / c.y
          , _e = 1 / c.z
          , nt = (this.lowerBound.x - h.x) * _
          , it = (this.upperBound.x - h.x) * _
          , at = (this.lowerBound.y - h.y) * b
          , ut = (this.upperBound.y - h.y) * b
          , pt = (this.lowerBound.z - h.z) * _e
          , ht = (this.upperBound.z - h.z) * _e
          , _t = Math.max(Math.max(Math.min(nt, it), Math.min(at, ut)), Math.min(pt, ht))
          , vt = Math.min(Math.min(Math.max(nt, it), Math.max(at, ut)), Math.max(pt, ht));
        return !(vt < 0 || _t > vt)
    }
}

export default AABB;
