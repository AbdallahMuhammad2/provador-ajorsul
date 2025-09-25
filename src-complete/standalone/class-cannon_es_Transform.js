/* Standalone Class: cannon_es_Transform */

class cannon_es_Transform {
    constructor(o) {
        o === void 0 && (o = {}),
        this.position = new Vec3,
        this.quaternion = new Quaternion,
        o.position && this.position.copy(o.position),
        o.quaternion && this.quaternion.copy(o.quaternion)
    }
    pointToLocal(o, c) {
        return cannon_es_Transform.pointToLocalFrame(this.position, this.quaternion, o, c)
    }
    pointToWorld(o, c) {
        return cannon_es_Transform.pointToWorldFrame(this.position, this.quaternion, o, c)
    }
    vectorToWorldFrame(o, c) {
        return c === void 0 && (c = new Vec3),
        this.quaternion.vmult(o, c),
        c
    }
    static pointToLocalFrame(o, c, h, _) {
        return _ === void 0 && (_ = new Vec3),
        h.vsub(o, _),
        c.conjugate(tmpQuat$1),
        tmpQuat$1.vmult(_, _),
        _
    }
    static pointToWorldFrame(o, c, h, _) {
        return _ === void 0 && (_ = new Vec3),
        c.vmult(h, _),
        _.vadd(o, _),
        _
    }
    static vectorToWorldFrame(o, c, h) {
        return h === void 0 && (h = new Vec3),
        o.vmult(c, h),
        h
    }
    static vectorToLocalFrame(o, c, h, _) {
        return _ === void 0 && (_ = new Vec3),
        c.w *= -1,
        c.vmult(h, _),
        c.w *= -1,
        _
    }
}

export default cannon_es_Transform;
