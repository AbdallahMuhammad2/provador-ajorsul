/* Standalone Function: cj */

function cj(d, o, c, h, _) {
    var b = Zf(c) ? Xf : H.current;
    return b = Yf(o, b),
    ch(o, _),
    c = Nh(d, o, c, h, b, _),
    h = Sh(),
    d !== null && !dh ? (o.updateQueue = d.updateQueue,
    o.flags &= -2053,
    d.lanes &= ~_,
    Zi(d, o, _)) : (I && h && vg(o),
    o.flags |= 1,
    Xi(d, o, c, _),
    o.child)
}

export default cj;
