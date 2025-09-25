/* Standalone Function: bj */

function bj(d, o, c, h, _) {
    if (d !== null) {
        var b = d.memoizedProps;
        if (Ie(b, h) && d.ref === o.ref)
            if (dh = !1,
            o.pendingProps = h = b,
            (d.lanes & _) !== 0)
                d.flags & 131072 && (dh = !0);
            else
                return o.lanes = d.lanes,
                Zi(d, o, _)
    }
    return cj(d, o, c, h, _)
}

export default bj;
