/* Standalone Function: computeTriangleBounds */

function computeTriangleBounds(d, o) {
    makeEmptyBounds(o);
    const c = d.attributes.position
      , h = d.index ? d.index.array : null
      , _ = geometryUtils_getTriCount(d)
      , b = new Float32Array(6 * _)
      , _e = c.normalized
      , nt = c.array
      , it = c.offset || 0;
    let at = 3;
    c.isInterleavedBufferAttribute && (at = c.data.stride);
    const ut = ["getX", "getY", "getZ"];
    for (let pt = 0; pt < _; pt++) {
        const ht = 3 * pt
          , _t = 6 * pt;
        let vt = ht + 0
          , bt = ht + 1
          , St = ht + 2;
        h && (vt = h[vt],
        bt = h[bt],
        St = h[St]),
        _e || (vt = vt * at + it,
        bt = bt * at + it,
        St = St * at + it);
        for (let At = 0; At < 3; At++) {
            let Et, Pt, It;
            _e ? (Et = c[ut[At]](vt),
            Pt = c[ut[At]](bt),
            It = c[ut[At]](St)) : (Et = nt[vt + At],
            Pt = nt[bt + At],
            It = nt[St + At]);
            let Dt = Et;
            Pt < Dt && (Dt = Pt),
            It < Dt && (Dt = It);
            let Gt = Et;
            Pt > Gt && (Gt = Pt),
            It > Gt && (Gt = It);
            const Bt = (Gt - Dt) / 2
              , kt = 2 * At;
            b[_t + kt + 0] = Dt + Bt,
            b[_t + kt + 1] = Bt + (Math.abs(Dt) + Bt) * FLOAT32_EPSILON,
            Dt < o[At] && (o[At] = Dt),
            Gt > o[At + 3] && (o[At + 3] = Gt)
        }
    }
    return b
}

export default computeTriangleBounds;
