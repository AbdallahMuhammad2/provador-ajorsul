/* Standalone Function: xj */

function xj(d, o, c) {
    var h = o.pendingProps
      , _ = h.revealOrder
      , b = h.tail;
    if (Xi(d, o, h.children, c),
    h = L.current,
    h & 2)
        h = h & 1 | 2,
        o.flags |= 128;
    else {
        if (d !== null && d.flags & 128)
            e: for (d = o.child; d !== null; ) {
                if (d.tag === 13)
                    d.memoizedState !== null && vj(d, c, o);
                else if (d.tag === 19)
                    vj(d, c, o);
                else if (d.child !== null) {
                    d.child.return = d,
                    d = d.child;
                    continue
                }
                if (d === o)
                    break e;
                for (; d.sibling === null; ) {
                    if (d.return === null || d.return === o)
                        break e;
                    d = d.return
                }
                d.sibling.return = d.return,
                d = d.sibling
            }
        h &= 1
    }
    if (G(L, h),
    !(o.mode & 1))
        o.memoizedState = null;
    else
        switch (_) {
        case "forwards":
            for (c = o.child,
            _ = null; c !== null; )
                d = c.alternate,
                d !== null && Ch(d) === null && (_ = c),
                c = c.sibling;
            c = _,
            c === null ? (_ = o.child,
            o.child = null) : (_ = c.sibling,
            c.sibling = null),
            wj(o, !1, _, c, b);
            break;
        case "backwards":
            for (c = null,
            _ = o.child,
            o.child = null; _ !== null; ) {
                if (d = _.alternate,
                d !== null && Ch(d) === null) {
                    o.child = _;
                    break
                }
                d = _.sibling,
                _.sibling = c,
                c = _,
                _ = d
            }
            wj(o, !0, c, null, b);
            break;
        case "together":
            wj(o, !1, null, null, void 0);
            break;
        default:
            o.memoizedState = null
        }
    return o.child
}

export default xj;
