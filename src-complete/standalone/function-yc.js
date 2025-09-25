/* Standalone Function: Yc */

function Yc(d, o, c, h) {
    if (id$2 = null,
    d = xb(h),
    d = Wc(d),
    d !== null)
        if (o = Vb(d),
        o === null)
            d = null;
        else if (c = o.tag,
        c === 13) {
            if (d = Wb(o),
            d !== null)
                return d;
            d = null
        } else if (c === 3) {
            if (o.stateNode.current.memoizedState.isDehydrated)
                return o.tag === 3 ? o.stateNode.containerInfo : null;
            d = null
        } else
            o !== d && (d = null);
    return id$2 = d,
    null
}

export default Yc;
