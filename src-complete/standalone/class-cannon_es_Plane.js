/* Standalone Class: cannon_es_Plane */

class cannon_es_Plane extends Shape {
    constructor() {
        super({
            type: Shape.types.PLANE
        }),
        this.worldNormal = new Vec3,
        this.worldNormalNeedsUpdate = !0,
        this.boundingSphereRadius = Number.MAX_VALUE
    }
    computeWorldNormal(o) {
        const c = this.worldNormal;
        c.set(0, 0, 1),
        o.vmult(c, c),
        this.worldNormalNeedsUpdate = !1
    }
    calculateLocalInertia(o, c) {
        return c === void 0 && (c = new Vec3),
        c
    }
    volume() {
        return Number.MAX_VALUE
    }
    calculateWorldAABB(o, c, h, _) {
        tempNormal.set(0, 0, 1),
        c.vmult(tempNormal, tempNormal);
        const b = Number.MAX_VALUE;
        h.set(-b, -b, -b),
        _.set(b, b, b),
        tempNormal.x === 1 ? _.x = o.x : tempNormal.x === -1 && (h.x = o.x),
        tempNormal.y === 1 ? _.y = o.y : tempNormal.y === -1 && (h.y = o.y),
        tempNormal.z === 1 ? _.z = o.z : tempNormal.z === -1 && (h.z = o.z)
    }
    updateBoundingSphereRadius() {
        this.boundingSphereRadius = Number.MAX_VALUE
    }
}

export default cannon_es_Plane;
