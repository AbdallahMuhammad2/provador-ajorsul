/* Standalone Class: Sphere */

class Sphere extends Shape {
    constructor(o) {
        if (super({
            type: Shape.types.SPHERE
        }),
        this.radius = o !== void 0 ? o : 1,
        this.radius < 0)
            throw new Error("The sphere radius cannot be negative.");
        this.updateBoundingSphereRadius()
    }
    calculateLocalInertia(o, c) {
        c === void 0 && (c = new Vec3);
        const h = 2 * o * this.radius * this.radius / 5;
        return c.x = h,
        c.y = h,
        c.z = h,
        c
    }
    volume() {
        return 4 * Math.PI * Math.pow(this.radius, 3) / 3
    }
    updateBoundingSphereRadius() {
        this.boundingSphereRadius = this.radius
    }
    calculateWorldAABB(o, c, h, _) {
        const b = this.radius
          , _e = ["x", "y", "z"];
        for (let nt = 0; nt < _e.length; nt++) {
            const it = _e[nt];
            h[it] = o[it] - b,
            _[it] = o[it] + b
        }
    }
}

export default Sphere;
