/* Standalone Function: Cg */

function Cg(d, o) {
    switch (d.tag) {
    case 5:
        var c = d.type;
        return o = o.nodeType !== 1 || c.toLowerCase() !== o.nodeName.toLowerCase() ? null : o,
        o !== null ? (d.stateNode = o,
        xg = d,
        yg = Lf(o.firstChild),
        !0) : !1;
    case 6:
        return o = d.pendingProps === "" || o.nodeType !== 3 ? null : o,
        o !== null ? (d.stateNode = o,
        xg = d,
        yg = null,
        !0) : !1;
    case 13:
        return o = o.nodeType !== 8 ? null : o,
        o !== null ? (c = qg !== null ? {
            id: rg,
            overflow: sg
        } : null,
        d.memoizedState = {
            dehydrated: o,
            treeContext: c,
            retryLane: 1073741824
        },
        c = Bg(18, null, null, 0),
        c.stateNode = o,
        c.return = d,
        d.child = c,
        xg = d,
        yg = null,
        !0) : !1;
    default:
        return !1
    }
}

export default Cg;
