/* Standalone Function: el */

function el(d, o, c, h, _, b, _e, nt, it) {
    return d = bl(c, h, !0, d, _, b, _e, nt, it),
    d.context = dl(null),
    c = d.current,
    h = R(),
    _ = yi(c),
    b = mh(h, _),
    b.callback = o ?? null,
    nh(c, b, _),
    d.current.lanes = _,
    Ac(d, _, h),
    Dk(d, h),
    d
}

export default el;
