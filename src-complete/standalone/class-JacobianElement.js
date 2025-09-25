/* Standalone Class: JacobianElement */

class JacobianElement {
    constructor() {
        this.spatial = new Vec3,
        this.rotational = new Vec3
    }
    multiplyElement(o) {
        return o.spatial.dot(this.spatial) + o.rotational.dot(this.rotational)
    }
    multiplyVectors(o, c) {
        return o.dot(this.spatial) + c.dot(this.rotational)
    }
}

export default JacobianElement;
