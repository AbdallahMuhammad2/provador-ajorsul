/* Standalone Function: getCentroidBounds */

function getCentroidBounds(d, o, c, h) {
    let _ = 1 / 0
      , b = 1 / 0
      , _e = 1 / 0
      , nt = -1 / 0
      , it = -1 / 0
      , at = -1 / 0;
    for (let ut = 6 * o, pt = 6 * (o + c); ut < pt; ut += 6) {
        const ht = d[ut + 0];
        ht < _ && (_ = ht),
        ht > nt && (nt = ht);
        const _t = d[ut + 2];
        _t < b && (b = _t),
        _t > it && (it = _t);
        const vt = d[ut + 4];
        vt < _e && (_e = vt),
        vt > at && (at = vt)
    }
    h[0] = _,
    h[1] = b,
    h[2] = _e,
    h[3] = nt,
    h[4] = it,
    h[5] = at
}

export default getCentroidBounds;
