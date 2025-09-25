/* Standalone Class: Shape */

class Shape {
    constructor(o) {
        o === void 0 && (o = {}),
        this.id = Shape.idCounter++,
        this.type = o.type || 0,
        this.boundingSphereRadius = 0,
        this.collisionResponse = !o.collisionResponse || o.collisionResponse,
        this.collisionFilterGroup = o.collisionFilterGroup !== void 0 ? o.collisionFilterGroup : 1,
        this.collisionFilterMask = o.collisionFilterMask !== void 0 ? o.collisionFilterMask : -1,
        this.material = o.material ? o.material : null,
        this.body = null
    }
    updateBoundingSphereRadius() {
        throw `computeBoundingSphereRadius() not implemented for shape type ${this.type}`
    }
    volume() {
        throw `volume() not implemented for shape type ${this.type}`
    }
    calculateLocalInertia(o, c) {
        throw `calculateLocalInertia() not implemented for shape type ${this.type}`
    }
    calculateWorldAABB(o, c, h, _) {
        throw `calculateWorldAABB() not implemented for shape type ${this.type}`
    }
}

export default Shape;
