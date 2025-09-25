/* Standalone Class: FrictionEquation */

class FrictionEquation extends Equation {
    constructor(o, c, h) {
        super(o, c, -h, h),
        this.ri = new Vec3,
        this.rj = new Vec3,
        this.t = new Vec3
    }
    computeB(o) {
        this.a;
        const c = this.b;
        this.bi,
        this.bj;
        const h = this.ri
          , _ = this.rj
          , b = FrictionEquation_computeB_temp1
          , _e = FrictionEquation_computeB_temp2
          , nt = this.t;
        h.cross(nt, b),
        _.cross(nt, _e);
        const it = this.jacobianElementA
          , at = this.jacobianElementB;
        return nt.negate(it.spatial),
        b.negate(it.rotational),
        at.spatial.copy(nt),
        at.rotational.copy(_e),
        -this.computeGW() * c - o * this.computeGiMf()
    }
}

export default FrictionEquation;
