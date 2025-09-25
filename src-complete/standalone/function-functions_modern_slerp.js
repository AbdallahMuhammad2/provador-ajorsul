/* Standalone Function: functions_modern_slerp */

function functions_modern_slerp(d, o, c, h) {
    let _, b, _e, nt, it, at = o[0], ut = o[1], pt = o[2], ht = o[3], _t = c[0], vt = c[1], bt = c[2], St = c[3];
    return b = at * _t + ut * vt + pt * bt + ht * St,
    b < 0 && (b = -b,
    _t = -_t,
    vt = -vt,
    bt = -bt,
    St = -St),
    1 - b > functions_modern_EPSILON ? (_ = Math.acos(b),
    _e = Math.sin(_),
    nt = Math.sin((1 - h) * _) / _e,
    it = Math.sin(h * _) / _e) : (nt = 1 - h,
    it = h),
    d[0] = nt * at + it * _t,
    d[1] = nt * ut + it * vt,
    d[2] = nt * pt + it * bt,
    d[3] = nt * ht + it * St,
    d
}

export default functions_modern_slerp;
