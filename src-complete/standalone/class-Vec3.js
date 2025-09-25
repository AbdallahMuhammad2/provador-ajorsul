/* Standalone Class: Vec3 */

class Vec3 {
    constructor(o, c, h) {
        o === void 0 && (o = 0),
        c === void 0 && (c = 0),
        h === void 0 && (h = 0),
        this.x = o,
        this.y = c,
        this.z = h
    }
    cross(o, c) {
        c === void 0 && (c = new Vec3);
        const h = o.x
          , _ = o.y
          , b = o.z
          , _e = this.x
          , nt = this.y
          , it = this.z;
        return c.x = nt * b - it * _,
        c.y = it * h - _e * b,
        c.z = _e * _ - nt * h,
        c
    }
    set(o, c, h) {
        return this.x = o,
        this.y = c,
        this.z = h,
        this
    }
    setZero() {
        this.x = this.y = this.z = 0
    }
    vadd(o, c) {
        if (!c)
            return new Vec3(this.x + o.x,this.y + o.y,this.z + o.z);
        c.x = o.x + this.x,
        c.y = o.y + this.y,
        c.z = o.z + this.z
    }
    vsub(o, c) {
        if (!c)
            return new Vec3(this.x - o.x,this.y - o.y,this.z - o.z);
        c.x = this.x - o.x,
        c.y = this.y - o.y,
        c.z = this.z - o.z
    }
    crossmat() {
        return new Mat3([0, -this.z, this.y, this.z, 0, -this.x, -this.y, this.x, 0])
    }
    normalize() {
        const o = this.x
          , c = this.y
          , h = this.z
          , _ = Math.sqrt(o * o + c * c + h * h);
        if (_ > 0) {
            const b = 1 / _;
            this.x *= b,
            this.y *= b,
            this.z *= b
        } else
            this.x = 0,
            this.y = 0,
            this.z = 0;
        return _
    }
    unit(o) {
        o === void 0 && (o = new Vec3);
        const c = this.x
          , h = this.y
          , _ = this.z;
        let b = Math.sqrt(c * c + h * h + _ * _);
        return b > 0 ? (b = 1 / b,
        o.x = c * b,
        o.y = h * b,
        o.z = _ * b) : (o.x = 1,
        o.y = 0,
        o.z = 0),
        o
    }
    length() {
        const o = this.x
          , c = this.y
          , h = this.z;
        return Math.sqrt(o * o + c * c + h * h)
    }
    lengthSquared() {
        return this.dot(this)
    }
    distanceTo(o) {
        const c = this.x
          , h = this.y
          , _ = this.z
          , b = o.x
          , _e = o.y
          , nt = o.z;
        return Math.sqrt((b - c) * (b - c) + (_e - h) * (_e - h) + (nt - _) * (nt - _))
    }
    distanceSquared(o) {
        const c = this.x
          , h = this.y
          , _ = this.z
          , b = o.x
          , _e = o.y
          , nt = o.z;
        return (b - c) * (b - c) + (_e - h) * (_e - h) + (nt - _) * (nt - _)
    }
    scale(o, c) {
        c === void 0 && (c = new Vec3);
        const h = this.x
          , _ = this.y
          , b = this.z;
        return c.x = o * h,
        c.y = o * _,
        c.z = o * b,
        c
    }
    vmul(o, c) {
        return c === void 0 && (c = new Vec3),
        c.x = o.x * this.x,
        c.y = o.y * this.y,
        c.z = o.z * this.z,
        c
    }
    addScaledVector(o, c, h) {
        return h === void 0 && (h = new Vec3),
        h.x = this.x + o * c.x,
        h.y = this.y + o * c.y,
        h.z = this.z + o * c.z,
        h
    }
    dot(o) {
        return this.x * o.x + this.y * o.y + this.z * o.z
    }
    isZero() {
        return this.x === 0 && this.y === 0 && this.z === 0
    }
    negate(o) {
        return o === void 0 && (o = new Vec3),
        o.x = -this.x,
        o.y = -this.y,
        o.z = -this.z,
        o
    }
    tangents(o, c) {
        const h = this.length();
        if (h > 0) {
            const _ = Vec3_tangents_n
              , b = 1 / h;
            _.set(this.x * b, this.y * b, this.z * b);
            const _e = Vec3_tangents_randVec;
            Math.abs(_.x) < .9 ? (_e.set(1, 0, 0),
            _.cross(_e, o)) : (_e.set(0, 1, 0),
            _.cross(_e, o)),
            _.cross(o, c)
        } else
            o.set(1, 0, 0),
            c.set(0, 1, 0)
    }
    toString() {
        return `${this.x},${this.y},${this.z}`
    }
    toArray() {
        return [this.x, this.y, this.z]
    }
    copy(o) {
        return this.x = o.x,
        this.y = o.y,
        this.z = o.z,
        this
    }
    lerp(o, c, h) {
        const _ = this.x
          , b = this.y
          , _e = this.z;
        h.x = _ + (o.x - _) * c,
        h.y = b + (o.y - b) * c,
        h.z = _e + (o.z - _e) * c
    }
    almostEquals(o, c) {
        return c === void 0 && (c = 1e-6),
        !(Math.abs(this.x - o.x) > c || Math.abs(this.y - o.y) > c || Math.abs(this.z - o.z) > c)
    }
    almostZero(o) {
        return o === void 0 && (o = 1e-6),
        !(Math.abs(this.x) > o || Math.abs(this.y) > o || Math.abs(this.z) > o)
    }
    isAntiparallelTo(o, c) {
        return this.negate(antip_neg),
        antip_neg.almostEquals(o, c)
    }
    clone() {
        return new Vec3(this.x,this.y,this.z)
    }
}

export default Vec3;
