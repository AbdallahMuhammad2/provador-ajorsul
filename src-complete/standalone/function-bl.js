/* Standalone Function: bl */

function bl(d, o, c, h, _, b, _e, nt, it) {
    return d = new al(d,o,c,nt,it),
    o === 1 ? (o = 1,
    b === !0 && (o |= 8)) : o = 0,
    b = Bg(3, null, null, o),
    d.current = b,
    b.stateNode = d,
    b.memoizedState = {
        element: h,
        isDehydrated: c,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null
    },
    kh(b),
    d
}

export default bl;
