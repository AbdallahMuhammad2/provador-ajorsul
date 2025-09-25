/* Standalone Function: Ok */

function Ok(d) {
    for (var o = d; ; ) {
        if (o.flags & 16384) {
            var c = o.updateQueue;
            if (c !== null && (c = c.stores,
            c !== null))
                for (var h = 0; h < c.length; h++) {
                    var _ = c[h]
                      , b = _.getSnapshot;
                    _ = _.value;
                    try {
                        if (!He(b(), _))
                            return !1
                    } catch {
                        return !1
                    }
                }
        }
        if (c = o.child,
        o.subtreeFlags & 16384 && c !== null)
            c.return = o,
            o = c;
        else {
            if (o === d)
                break;
            for (; o.sibling === null; ) {
                if (o.return === null || o.return === d)
                    return !0;
                o = o.return
            }
            o.sibling.return = o.return,
            o = o.sibling
        }
    }
    return !0
}

export default Ok;
