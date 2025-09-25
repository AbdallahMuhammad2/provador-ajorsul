/* Standalone Function: resampleDebug */

function resampleDebug(d, o, c, h=1e-4) {
    const _ = o.length / d.length
      , b = new Array(_).fill(0)
      , _e = new Array(_).fill(0)
      , nt = new Array(_).fill(0)
      , it = new Array(_).fill(0)
      , at = d.length - 1;
    let ut = 1;
    for (let pt = 1; pt < at; ++pt) {
        const ht = d[ut - 1]
          , _t = d[pt]
          , vt = d[pt + 1]
          , bt = (_t - ht) / (vt - ht);
        let St = !1;
        if (_t !== vt && (pt !== 1 || _t !== d[0]))
            if (getElement(o, ut - 1, it),
            getElement(o, pt, _e),
            getElement(o, pt + 1, nt),
            c === "slerp") {
                const At = functions_modern_slerp(b, it, nt, bt)
                  , Et = getAngle(it, _e) + getAngle(_e, nt);
                St = !eq(_e, At, h) || Et + Number.EPSILON >= Math.PI
            } else
                c === "lerp" ? St = !eq(_e, vlerp(b, it, nt, bt), h) : c === "step" && (St = !eq(_e, it) || !eq(_e, nt));
        St && (pt !== ut && (d[ut] = d[pt],
        setElement(o, ut, getElement(o, pt, b))),
        ut++)
    }
    return at > 0 && (d[ut] = d[at],
    setElement(o, ut, getElement(o, at, b)),
    ut++),
    ut
}

export default resampleDebug;
