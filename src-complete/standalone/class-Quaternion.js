/* Standalone Class: Quaternion */

class Quaternion {
    constructor(o, c, h, _) {
        o === void 0 && (o = 0),
        c === void 0 && (c = 0),
        h === void 0 && (h = 0),
        _ === void 0 && (_ = 1),
        this.x = o,
        this.y = c,
        this.z = h,
        this.w = _
    }
    set(o, c, h, _) {
        return this.x = o,
        this.y = c,
        this.z = h,
        this.w = _,
        this
    }
    toString() {
        return `${this.x},${this.y},${this.z},${this.w}`
    }
    toArray() {
        return [this.x, this.y, this.z, this.w]
    }
    setFromAxisAngle(o, c) {
        const h = Math.sin(.5 * c);
        return this.x = o.x * h,
        this.y = o.y * h,
        this.z = o.z * h,
        this.w = Math.cos(.5 * c),
        this
    }
    toAxisAngle(o) {
        o === void 0 && (o = new Vec3),
        this.normalize();
        const c = 2 * Math.acos(this.w)
          , h = Math.sqrt(1 - this.w * this.w);
        return h < .001 ? (o.x = this.x,
        o.y = this.y,
        o.z = this.z) : (o.x = this.x / h,
        o.y = this.y / h,
        o.z = this.z / h),
        [o, c]
    }
    setFromVectors(o, c) {
        if (o.isAntiparallelTo(c)) {
            const h = sfv_t1
              , _ = sfv_t2;
            o.tangents(h, _),
            this.setFromAxisAngle(h, Math.PI)
        } else {
            const h = o.cross(c);
            this.x = h.x,
            this.y = h.y,
            this.z = h.z,
            this.w = Math.sqrt(o.length() ** 2 * c.length() ** 2) + o.dot(c),
            this.normalize()
        }
        return this
    }
    mult(o, c) {
        c === void 0 && (c = new Quaternion);
        const h = this.x
          , _ = this.y
          , b = this.z
          , _e = this.w
          , nt = o.x
          , it = o.y
          , at = o.z
          , ut = o.w;
        return c.x = h * ut + _e * nt + _ * at - b * it,
        c.y = _ * ut + _e * it + b * nt - h * at,
        c.z = b * ut + _e * at + h * it - _ * nt,
        c.w = _e * ut - h * nt - _ * it - b * at,
        c
    }
    inverse(o) {
        o === void 0 && (o = new Quaternion);
        const c = this.x
          , h = this.y
          , _ = this.z
          , b = this.w;
        this.conjugate(o);
        const _e = 1 / (c * c + h * h + _ * _ + b * b);
        return o.x *= _e,
        o.y *= _e,
        o.z *= _e,
        o.w *= _e,
        o
    }
    conjugate(o) {
        return o === void 0 && (o = new Quaternion),
        o.x = -this.x,
        o.y = -this.y,
        o.z = -this.z,
        o.w = this.w,
        o
    }
    normalize() {
        let o = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
        return o === 0 ? (this.x = 0,
        this.y = 0,
        this.z = 0,
        this.w = 0) : (o = 1 / o,
        this.x *= o,
        this.y *= o,
        this.z *= o,
        this.w *= o),
        this
    }
    normalizeFast() {
        const o = (3 - (this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)) / 2;
        return o === 0 ? (this.x = 0,
        this.y = 0,
        this.z = 0,
        this.w = 0) : (this.x *= o,
        this.y *= o,
        this.z *= o,
        this.w *= o),
        this
    }
    vmult(o, c) {
        c === void 0 && (c = new Vec3);
        const h = o.x
          , _ = o.y
          , b = o.z
          , _e = this.x
          , nt = this.y
          , it = this.z
          , at = this.w
          , ut = at * h + nt * b - it * _
          , pt = at * _ + it * h - _e * b
          , ht = at * b + _e * _ - nt * h
          , _t = -_e * h - nt * _ - it * b;
        return c.x = ut * at + _t * -_e + pt * -it - ht * -nt,
        c.y = pt * at + _t * -nt + ht * -_e - ut * -it,
        c.z = ht * at + _t * -it + ut * -nt - pt * -_e,
        c
    }
    copy(o) {
        return this.x = o.x,
        this.y = o.y,
        this.z = o.z,
        this.w = o.w,
        this
    }
    toEuler(o, c) {
        let h, _, b;
        c === void 0 && (c = "YZX");
        const _e = this.x
          , nt = this.y
          , it = this.z
          , at = this.w;
        if (c !== "YZX")
            throw new Error(`Euler order ${c} not supported yet.`);
        {
            const ut = _e * nt + it * at;
            if (ut > .499 && (h = 2 * Math.atan2(_e, at),
            _ = Math.PI / 2,
            b = 0),
            ut < -.499 && (h = -2 * Math.atan2(_e, at),
            _ = -Math.PI / 2,
            b = 0),
            h === void 0) {
                const pt = _e * _e
                  , ht = nt * nt
                  , _t = it * it;
                h = Math.atan2(2 * nt * at - 2 * _e * it, 1 - 2 * ht - 2 * _t),
                _ = Math.asin(2 * ut),
                b = Math.atan2(2 * _e * at - 2 * nt * it, 1 - 2 * pt - 2 * _t)
            }
        }
        o.y = h,
        o.z = _,
        o.x = b
    }
    setFromEuler(o, c, h, _) {
        _ === void 0 && (_ = "XYZ");
        const b = Math.cos(o / 2)
          , _e = Math.cos(c / 2)
          , nt = Math.cos(h / 2)
          , it = Math.sin(o / 2)
          , at = Math.sin(c / 2)
          , ut = Math.sin(h / 2);
        return _ === "XYZ" ? (this.x = it * _e * nt + b * at * ut,
        this.y = b * at * nt - it * _e * ut,
        this.z = b * _e * ut + it * at * nt,
        this.w = b * _e * nt - it * at * ut) : _ === "YXZ" ? (this.x = it * _e * nt + b * at * ut,
        this.y = b * at * nt - it * _e * ut,
        this.z = b * _e * ut - it * at * nt,
        this.w = b * _e * nt + it * at * ut) : _ === "ZXY" ? (this.x = it * _e * nt - b * at * ut,
        this.y = b * at * nt + it * _e * ut,
        this.z = b * _e * ut + it * at * nt,
        this.w = b * _e * nt - it * at * ut) : _ === "ZYX" ? (this.x = it * _e * nt - b * at * ut,
        this.y = b * at * nt + it * _e * ut,
        this.z = b * _e * ut - it * at * nt,
        this.w = b * _e * nt + it * at * ut) : _ === "YZX" ? (this.x = it * _e * nt + b * at * ut,
        this.y = b * at * nt + it * _e * ut,
        this.z = b * _e * ut - it * at * nt,
        this.w = b * _e * nt - it * at * ut) : _ === "XZY" && (this.x = it * _e * nt - b * at * ut,
        this.y = b * at * nt - it * _e * ut,
        this.z = b * _e * ut + it * at * nt,
        this.w = b * _e * nt + it * at * ut),
        this
    }
    clone() {
        return new Quaternion(this.x,this.y,this.z,this.w)
    }
    slerp(o, c, h) {
        h === void 0 && (h = new Quaternion);
        const _ = this.x
          , b = this.y
          , _e = this.z
          , nt = this.w;
        let it, at, ut, pt, ht, _t = o.x, vt = o.y, bt = o.z, St = o.w;
        return at = _ * _t + b * vt + _e * bt + nt * St,
        at < 0 && (at = -at,
        _t = -_t,
        vt = -vt,
        bt = -bt,
        St = -St),
        1 - at > 1e-6 ? (it = Math.acos(at),
        ut = Math.sin(it),
        pt = Math.sin((1 - c) * it) / ut,
        ht = Math.sin(c * it) / ut) : (pt = 1 - c,
        ht = c),
        h.x = pt * _ + ht * _t,
        h.y = pt * b + ht * vt,
        h.z = pt * _e + ht * bt,
        h.w = pt * nt + ht * St,
        h
    }
    integrate(o, c, h, _) {
        _ === void 0 && (_ = new Quaternion);
        const b = o.x * h.x
          , _e = o.y * h.y
          , nt = o.z * h.z
          , it = this.x
          , at = this.y
          , ut = this.z
          , pt = this.w
          , ht = .5 * c;
        return _.x += ht * (b * pt + _e * ut - nt * at),
        _.y += ht * (_e * pt + nt * it - b * ut),
        _.z += ht * (nt * pt + b * at - _e * it),
        _.w += ht * (-b * it - _e * at - nt * ut),
        _
    }
}

export default Quaternion;
