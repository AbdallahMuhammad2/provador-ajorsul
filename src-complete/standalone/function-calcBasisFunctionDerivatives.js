/* Standalone Function: calcBasisFunctionDerivatives */

function calcBasisFunctionDerivatives(d, o, c, h, _) {
    const b = [];
    for (let pt = 0; pt <= c; ++pt)
        b[pt] = 0;
    const _e = [];
    for (let pt = 0; pt <= h; ++pt)
        _e[pt] = b.slice(0);
    const nt = [];
    for (let pt = 0; pt <= c; ++pt)
        nt[pt] = b.slice(0);
    nt[0][0] = 1;
    const it = b.slice(0)
      , at = b.slice(0);
    for (let pt = 1; pt <= c; ++pt) {
        it[pt] = o - _[d + 1 - pt],
        at[pt] = _[d + pt] - o;
        let ht = 0;
        for (let _t = 0; _t < pt; ++_t) {
            const vt = at[_t + 1]
              , bt = it[pt - _t];
            nt[pt][_t] = vt + bt;
            const St = nt[_t][pt - 1] / nt[pt][_t];
            nt[_t][pt] = ht + vt * St,
            ht = bt * St
        }
        nt[pt][pt] = ht
    }
    for (let pt = 0; pt <= c; ++pt)
        _e[0][pt] = nt[pt][c];
    for (let pt = 0; pt <= c; ++pt) {
        let ht = 0
          , _t = 1;
        const vt = [];
        for (let bt = 0; bt <= c; ++bt)
            vt[bt] = b.slice(0);
        vt[0][0] = 1;
        for (let bt = 1; bt <= h; ++bt) {
            let St = 0;
            const At = pt - bt
              , Et = c - bt;
            pt >= bt && (vt[_t][0] = vt[ht][0] / nt[Et + 1][At],
            St = vt[_t][0] * nt[At][Et]);
            const Pt = pt - 1 <= Et ? bt - 1 : c - pt;
            for (let Dt = At >= -1 ? 1 : -At; Dt <= Pt; ++Dt)
                vt[_t][Dt] = (vt[ht][Dt] - vt[ht][Dt - 1]) / nt[Et + 1][At + Dt],
                St += vt[_t][Dt] * nt[At + Dt][Et];
            pt <= Et && (vt[_t][bt] = -vt[ht][bt - 1] / nt[Et + 1][pt],
            St += vt[_t][bt] * nt[pt][Et]),
            _e[bt][pt] = St;
            const It = ht;
            ht = _t,
            _t = It
        }
    }
    let ut = c;
    for (let pt = 1; pt <= h; ++pt) {
        for (let ht = 0; ht <= c; ++ht)
            _e[pt][ht] *= ut;
        ut *= c - pt
    }
    return _e
}

export default calcBasisFunctionDerivatives;
