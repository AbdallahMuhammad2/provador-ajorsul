/* Standalone Function: ug */

function ug(d, o, c) {
    og[pg++] = rg,
    og[pg++] = sg,
    og[pg++] = qg,
    qg = d;
    var h = rg;
    d = sg;
    var _ = 32 - oc(h) - 1;
    h &= ~(1 << _),
    c += 1;
    var b = 32 - oc(o) + _;
    if (30 < b) {
        var _e = _ - _ % 5;
        b = (h & (1 << _e) - 1).toString(32),
        h >>= _e,
        _ -= _e,
        rg = 1 << 32 - oc(o) + _ | c << _ | h,
        sg = b + d
    } else
        rg = 1 << b | c << _ | h,
        sg = d
}

export default ug;
