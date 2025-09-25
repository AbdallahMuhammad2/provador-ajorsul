/* Standalone Class: GSSolver */

class GSSolver extends Solver {
    constructor() {
        super(),
        this.iterations = 10,
        this.tolerance = 1e-7
    }
    solve(o, c) {
        let h = 0;
        const _ = this.iterations
          , b = this.tolerance * this.tolerance
          , _e = this.equations
          , nt = _e.length
          , it = c.bodies
          , at = it.length
          , ut = o;
        let pt, ht, _t, vt, bt, St;
        if (nt !== 0)
            for (let It = 0; It !== at; It++)
                it[It].updateSolveMassProperties();
        const At = GSSolver_solve_invCs
          , Et = GSSolver_solve_Bs
          , Pt = GSSolver_solve_lambda;
        At.length = nt,
        Et.length = nt,
        Pt.length = nt;
        for (let It = 0; It !== nt; It++) {
            const Dt = _e[It];
            Pt[It] = 0,
            Et[It] = Dt.computeB(ut),
            At[It] = 1 / Dt.computeC()
        }
        if (nt !== 0) {
            for (let Gt = 0; Gt !== at; Gt++) {
                const Bt = it[Gt]
                  , kt = Bt.vlambda
                  , Ut = Bt.wlambda;
                kt.set(0, 0, 0),
                Ut.set(0, 0, 0)
            }
            for (h = 0; h !== _; h++) {
                vt = 0;
                for (let Gt = 0; Gt !== nt; Gt++) {
                    const Bt = _e[Gt];
                    pt = Et[Gt],
                    ht = At[Gt],
                    St = Pt[Gt],
                    bt = Bt.computeGWlambda(),
                    _t = ht * (pt - bt - Bt.eps * St),
                    St + _t < Bt.minForce ? _t = Bt.minForce - St : St + _t > Bt.maxForce && (_t = Bt.maxForce - St),
                    Pt[Gt] += _t,
                    vt += _t > 0 ? _t : -_t,
                    Bt.addToWlambda(_t)
                }
                if (vt * vt < b)
                    break
            }
            for (let Gt = 0; Gt !== at; Gt++) {
                const Bt = it[Gt]
                  , kt = Bt.velocity
                  , Ut = Bt.angularVelocity;
                Bt.vlambda.vmul(Bt.linearFactor, Bt.vlambda),
                kt.vadd(Bt.vlambda, kt),
                Bt.wlambda.vmul(Bt.angularFactor, Bt.wlambda),
                Ut.vadd(Bt.wlambda, Ut)
            }
            let It = _e.length;
            const Dt = 1 / ut;
            for (; It--; )
                _e[It].multiplier = Pt[It] * Dt
        }
        return h
    }
}

export default GSSolver;
