/* Standalone Class: Equation */

class Equation {
    constructor(o, c, h, _) {
        h === void 0 && (h = -1e6),
        _ === void 0 && (_ = 1e6),
        this.id = Equation.idCounter++,
        this.minForce = h,
        this.maxForce = _,
        this.bi = o,
        this.bj = c,
        this.a = 0,
        this.b = 0,
        this.eps = 0,
        this.jacobianElementA = new JacobianElement,
        this.jacobianElementB = new JacobianElement,
        this.enabled = !0,
        this.multiplier = 0,
        this.setSpookParams(1e7, 4, 1 / 60)
    }
    setSpookParams(o, c, h) {
        const _ = c
          , b = o
          , _e = h;
        this.a = 4 / (_e * (1 + 4 * _)),
        this.b = 4 * _ / (1 + 4 * _),
        this.eps = 4 / (_e * _e * b * (1 + 4 * _))
    }
    computeB(o, c, h) {
        const _ = this.computeGW();
        return -this.computeGq() * o - _ * c - this.computeGiMf() * h
    }
    computeGq() {
        const o = this.jacobianElementA
          , c = this.jacobianElementB
          , h = this.bi
          , _ = this.bj
          , b = h.position
          , _e = _.position;
        return o.spatial.dot(b) + c.spatial.dot(_e)
    }
    computeGW() {
        const o = this.jacobianElementA
          , c = this.jacobianElementB
          , h = this.bi
          , _ = this.bj
          , b = h.velocity
          , _e = _.velocity
          , nt = h.angularVelocity
          , it = _.angularVelocity;
        return o.multiplyVectors(b, nt) + c.multiplyVectors(_e, it)
    }
    computeGWlambda() {
        const o = this.jacobianElementA
          , c = this.jacobianElementB
          , h = this.bi
          , _ = this.bj
          , b = h.vlambda
          , _e = _.vlambda
          , nt = h.wlambda
          , it = _.wlambda;
        return o.multiplyVectors(b, nt) + c.multiplyVectors(_e, it)
    }
    computeGiMf() {
        const o = this.jacobianElementA
          , c = this.jacobianElementB
          , h = this.bi
          , _ = this.bj
          , b = h.force
          , _e = h.torque
          , nt = _.force
          , it = _.torque
          , at = h.invMassSolve
          , ut = _.invMassSolve;
        return b.scale(at, iMfi),
        nt.scale(ut, iMfj),
        h.invInertiaWorldSolve.vmult(_e, invIi_vmult_taui),
        _.invInertiaWorldSolve.vmult(it, invIj_vmult_tauj),
        o.multiplyVectors(iMfi, invIi_vmult_taui) + c.multiplyVectors(iMfj, invIj_vmult_tauj)
    }
    computeGiMGt() {
        const o = this.jacobianElementA
          , c = this.jacobianElementB
          , h = this.bi
          , _ = this.bj
          , b = h.invMassSolve
          , _e = _.invMassSolve
          , nt = h.invInertiaWorldSolve
          , it = _.invInertiaWorldSolve;
        let at = b + _e;
        return nt.vmult(o.rotational, tmp),
        at += tmp.dot(o.rotational),
        it.vmult(c.rotational, tmp),
        at += tmp.dot(c.rotational),
        at
    }
    addToWlambda(o) {
        const c = this.jacobianElementA
          , h = this.jacobianElementB
          , _ = this.bi
          , b = this.bj
          , _e = addToWlambda_temp;
        _.vlambda.addScaledVector(_.invMassSolve * o, c.spatial, _.vlambda),
        b.vlambda.addScaledVector(b.invMassSolve * o, h.spatial, b.vlambda),
        _.invInertiaWorldSolve.vmult(c.rotational, _e),
        _.wlambda.addScaledVector(o, _e, _.wlambda),
        b.invInertiaWorldSolve.vmult(h.rotational, _e),
        b.wlambda.addScaledVector(o, _e, b.wlambda)
    }
    computeC() {
        return this.computeGiMGt() + this.eps
    }
}

export default Equation;
