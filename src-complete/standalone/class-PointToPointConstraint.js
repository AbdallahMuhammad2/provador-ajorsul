/* Standalone Class: PointToPointConstraint */

class PointToPointConstraint extends Constraint {
    constructor(o, c, h, _, b) {
        c === void 0 && (c = new Vec3),
        _ === void 0 && (_ = new Vec3),
        b === void 0 && (b = 1e6),
        super(o, h),
        this.pivotA = c.clone(),
        this.pivotB = _.clone();
        const _e = this.equationX = new ContactEquation(o,h)
          , nt = this.equationY = new ContactEquation(o,h)
          , it = this.equationZ = new ContactEquation(o,h);
        this.equations.push(_e, nt, it),
        _e.minForce = nt.minForce = it.minForce = -b,
        _e.maxForce = nt.maxForce = it.maxForce = b,
        _e.ni.set(1, 0, 0),
        nt.ni.set(0, 1, 0),
        it.ni.set(0, 0, 1)
    }
    update() {
        const o = this.bodyA
          , c = this.bodyB
          , h = this.equationX
          , _ = this.equationY
          , b = this.equationZ;
        o.quaternion.vmult(this.pivotA, h.ri),
        c.quaternion.vmult(this.pivotB, h.rj),
        _.ri.copy(h.ri),
        _.rj.copy(h.rj),
        b.ri.copy(h.ri),
        b.rj.copy(h.rj)
    }
}

export default PointToPointConstraint;
