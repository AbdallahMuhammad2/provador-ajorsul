/* Standalone Function: computeBoundsUtils_getBounds */

function computeBoundsUtils_getBounds(d, o, c, h, _=null) {
    let b = 1 / 0
      , _e = 1 / 0
      , nt = 1 / 0
      , it = -1 / 0
      , at = -1 / 0
      , ut = -1 / 0
      , pt = 1 / 0
      , ht = 1 / 0
      , _t = 1 / 0
      , vt = -1 / 0
      , bt = -1 / 0
      , St = -1 / 0;
    const At = _ !== null;
    for (let Et = 6 * o, Pt = 6 * (o + c); Et < Pt; Et += 6) {
        const It = d[Et + 0]
          , Dt = d[Et + 1]
          , Gt = It - Dt
          , Bt = It + Dt;
        Gt < b && (b = Gt),
        Bt > it && (it = Bt),
        At && It < pt && (pt = It),
        At && It > vt && (vt = It);
        const kt = d[Et + 2]
          , Ut = d[Et + 3]
          , Ht = kt - Ut
          , Kt = kt + Ut;
        Ht < _e && (_e = Ht),
        Kt > at && (at = Kt),
        At && kt < ht && (ht = kt),
        At && kt > bt && (bt = kt);
        const Jt = d[Et + 4]
          , or = d[Et + 5]
          , ir = Jt - or
          , lr = Jt + or;
        ir < nt && (nt = ir),
        lr > ut && (ut = lr),
        At && Jt < _t && (_t = Jt),
        At && Jt > St && (St = Jt)
    }
    h[0] = b,
    h[1] = _e,
    h[2] = nt,
    h[3] = it,
    h[4] = at,
    h[5] = ut,
    At && (_[0] = pt,
    _[1] = ht,
    _[2] = _t,
    _[3] = vt,
    _[4] = bt,
    _[5] = St)
}

export default computeBoundsUtils_getBounds;
