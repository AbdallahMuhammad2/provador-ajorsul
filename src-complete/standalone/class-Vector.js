/* Standalone Class: Vector */

class Vector {
    constructor(o=0, c=0, h=0) {
        this.x = o,
        this.y = c,
        this.z = h
    }
    copy(o) {
        return this.x = o.x,
        this.y = o.y,
        this.z = o.z,
        this
    }
    clone() {
        return new Vector(this.x,this.y,this.z)
    }
    negate() {
        return this.x *= -1,
        this.y *= -1,
        this.z *= -1,
        this
    }
    add(o) {
        return this.x += o.x,
        this.y += o.y,
        this.z += o.z,
        this
    }
    sub(o) {
        return this.x -= o.x,
        this.y -= o.y,
        this.z -= o.z,
        this
    }
    times(o) {
        return this.x *= o,
        this.y *= o,
        this.z *= o,
        this
    }
    dividedBy(o) {
        return this.x /= o,
        this.y /= o,
        this.z /= o,
        this
    }
    lerp(o, c) {
        return this.add(new Vector().copy(o).sub(this).times(c))
    }
    unit() {
        return this.dividedBy(this.length())
    }
    length() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2))
    }
    normalize() {
        return this.unit()
    }
    cross(o) {
        const c = this.clone()
          , h = c.x
          , _ = c.y
          , b = c.z
          , _e = o.x
          , nt = o.y
          , it = o.z;
        return this.x = _ * it - b * nt,
        this.y = b * _e - h * it,
        this.z = h * nt - _ * _e,
        this
    }
    dot(o) {
        return this.x * o.x + this.y * o.y + this.z * o.z
    }
    toVector3() {
        return new three_module.Pq0(this.x,this.y,this.z)
    }
}

export default Vector;
