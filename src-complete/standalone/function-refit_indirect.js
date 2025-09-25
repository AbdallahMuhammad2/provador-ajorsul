/* Standalone Function: refit_indirect */

function refit_indirect(d, o=null) {
    o && Array.isArray(o) && (o = new Set(o));
    const c = d.geometry
      , h = c.index ? c.index.array : null
      , _ = c.attributes.position;
    let b, _e, nt, it, at = 0;
    const ut = d._roots;
    for (let ht = 0, _t = ut.length; ht < _t; ht++)
        b = ut[ht],
        _e = new Uint32Array(b),
        nt = new Uint16Array(b),
        it = new Float32Array(b),
        pt(0, at),
        at += b.byteLength;
    function pt(ht, _t, vt=!1) {
        const bt = 2 * ht;
        if (nt[bt + 15] === IS_LEAFNODE_FLAG) {
            const St = _e[ht + 6];
            let At = 1 / 0
              , Et = 1 / 0
              , Pt = 1 / 0
              , It = -1 / 0
              , Dt = -1 / 0
              , Gt = -1 / 0;
            for (let Bt = St, kt = St + nt[bt + 14]; Bt < kt; Bt++) {
                const Ut = 3 * d.resolveTriangleIndex(Bt);
                for (let Ht = 0; Ht < 3; Ht++) {
                    let Kt = Ut + Ht;
                    Kt = h ? h[Kt] : Kt;
                    const Jt = _.getX(Kt)
                      , or = _.getY(Kt)
                      , ir = _.getZ(Kt);
                    Jt < At && (At = Jt),
                    Jt > It && (It = Jt),
                    or < Et && (Et = or),
                    or > Dt && (Dt = or),
                    ir < Pt && (Pt = ir),
                    ir > Gt && (Gt = ir)
                }
            }
            return (it[ht + 0] !== At || it[ht + 1] !== Et || it[ht + 2] !== Pt || it[ht + 3] !== It || it[ht + 4] !== Dt || it[ht + 5] !== Gt) && (it[ht + 0] = At,
            it[ht + 1] = Et,
            it[ht + 2] = Pt,
            it[ht + 3] = It,
            it[ht + 4] = Dt,
            it[ht + 5] = Gt,
            !0)
        }
        {
            const St = ht + 8
              , At = _e[ht + 6]
              , Et = St + _t
              , Pt = At + _t;
            let It = vt
              , Dt = !1
              , Gt = !1;
            o ? It || (Dt = o.has(Et),
            Gt = o.has(Pt),
            It = !Dt && !Gt) : (Dt = !0,
            Gt = !0);
            const Bt = It || Gt;
            let kt = !1;
            (It || Dt) && (kt = pt(St, _t, It));
            let Ut = !1;
            Bt && (Ut = pt(At, _t, It));
            const Ht = kt || Ut;
            if (Ht)
                for (let Kt = 0; Kt < 3; Kt++) {
                    const Jt = St + Kt
                      , or = At + Kt
                      , ir = it[Jt]
                      , lr = it[Jt + 3]
                      , ar = it[or]
                      , hr = it[or + 3];
                    it[ht + Kt] = ir < ar ? ir : ar,
                    it[ht + Kt + 3] = lr > hr ? lr : hr
                }
            return Ht
        }
    }
}

export default refit_indirect;
