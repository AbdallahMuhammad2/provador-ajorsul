/* Standalone Function: Zj */

function Zj(d, o, c) {
    if (lc && typeof lc.onCommitFiberUnmount == "function")
        try {
            lc.onCommitFiberUnmount(kc, c)
        } catch {}
    switch (c.tag) {
    case 5:
        U || Lj(c, o);
    case 6:
        var h = X
          , _ = Xj;
        X = null,
        Yj(d, o, c),
        X = h,
        Xj = _,
        X !== null && (Xj ? (d = X,
        c = c.stateNode,
        d.nodeType === 8 ? d.parentNode.removeChild(c) : d.removeChild(c)) : X.removeChild(c.stateNode));
        break;
    case 18:
        X !== null && (Xj ? (d = X,
        c = c.stateNode,
        d.nodeType === 8 ? Kf(d.parentNode, c) : d.nodeType === 1 && Kf(d, c),
        bd(d)) : Kf(X, c.stateNode));
        break;
    case 4:
        h = X,
        _ = Xj,
        X = c.stateNode.containerInfo,
        Xj = !0,
        Yj(d, o, c),
        X = h,
        Xj = _;
        break;
    case 0:
    case 11:
    case 14:
    case 15:
        if (!U && (h = c.updateQueue,
        h !== null && (h = h.lastEffect,
        h !== null))) {
            _ = h = h.next;
            do {
                var b = _
                  , _e = b.destroy;
                b = b.tag,
                _e !== void 0 && (b & 2 || b & 4) && Mj(c, o, _e),
                _ = _.next
            } while (_ !== h)
        }
        Yj(d, o, c);
        break;
    case 1:
        if (!U && (Lj(c, o),
        h = c.stateNode,
        typeof h.componentWillUnmount == "function"))
            try {
                h.props = c.memoizedProps,
                h.state = c.memoizedState,
                h.componentWillUnmount()
            } catch (nt) {
                W(c, o, nt)
            }
        Yj(d, o, c);
        break;
    case 21:
        Yj(d, o, c);
        break;
    case 22:
        c.mode & 1 ? (U = (h = U) || c.memoizedState !== null,
        Yj(d, o, c),
        U = h) : Yj(d, o, c);
        break;
    default:
        Yj(d, o, c)
    }
}

export default Zj;
