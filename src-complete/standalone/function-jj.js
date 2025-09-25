/* Standalone Function: jj */

function jj(d, o, c, h, _, b) {
    gj(d, o);
    var _e = (o.flags & 128) !== 0;
    if (!h && !_e)
        return _ && dg(o, c, !1),
        Zi(d, o, b);
    h = o.stateNode,
    Wi.current = o;
    var nt = _e && typeof c.getDerivedStateFromError != "function" ? null : h.render();
    return o.flags |= 1,
    d !== null && _e ? (o.child = Ug(o, d.child, null, b),
    o.child = Ug(o, null, nt, b)) : Xi(d, o, nt, b),
    o.memoizedState = h.state,
    _ && dg(o, c, !0),
    o.child
}

export default jj;
