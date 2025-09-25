/* Standalone Class: ContactEquation */

class ContactEquation extends Equation {
    constructor(o, c, h) {
        h === void 0 && (h = 1e6),
        super(o, c, 0, h),
        this.restitution = 0,
        this.ri = new Vec3,
        this.rj = new Vec3,
        this.ni = new Vec3
    }
    computeB(o) {
        const c = this.a
          , h = this.b
          , _ = this.bi
          , b = this.bj
          , _e = this.ri
          , nt = this.rj
          , it = ContactEquation_computeB_temp1
          , at = ContactEquation_computeB_temp2
          , ut = _.velocity
          , pt = _.angularVelocity;
        _.force,
        _.torque;
        const ht = b.velocity
          , _t = b.angularVelocity;
        b.force,
        b.torque;
        const vt = ContactEquation_computeB_temp3
          , bt = this.jacobianElementA
          , St = this.jacobianElementB
          , At = this.ni;
        _e.cross(At, it),
        nt.cross(At, at),
        At.negate(bt.spatial),
        it.negate(bt.rotational),
        St.spatial.copy(At),
        St.rotational.copy(at),
        vt.copy(b.position),
        vt.vadd(nt, vt),
        vt.vsub(_.position, vt),
        vt.vsub(_e, vt);
        const Et = At.dot(vt)
          , Pt = this.restitution + 1;
        return -Et * c - (Pt * ht.dot(At) - Pt * ut.dot(At) + _t.dot(at) - pt.dot(it)) * h - o * this.computeGiMf()
    }
    getImpactVelocityAlongNormal() {
        const o = ContactEquation_getImpactVelocityAlongNormal_vi
          , c = ContactEquation_getImpactVelocityAlongNormal_vj
          , h = ContactEquation_getImpactVelocityAlongNormal_xi
          , _ = ContactEquation_getImpactVelocityAlongNormal_xj
          , b = ContactEquation_getImpactVelocityAlongNormal_relVel;
        return this.bi.position.vadd(this.ri, h),
        this.bj.position.vadd(this.rj, _),
        this.bi.getVelocityAtWorldPoint(h, o),
        this.bj.getVelocityAtWorldPoint(_, c),
        o.vsub(c, b),
        this.ni.dot(b)
    }
}

export default ContactEquation;
