/* Standalone Function: Gg */

function Gg(d) {
    if (d !== xg)
        return !1;
    if (!I)
        return Fg(d),
        I = !0,
        !1;
    var o;
    if ((o = d.tag !== 3) && !(o = d.tag !== 5) && (o = d.type,
    o = o !== "head" && o !== "body" && !Ef(d.type, d.memoizedProps)),
    o && (o = yg)) {
        if (Dg(d))
            throw Hg(),
            Error(p(418));
        for (; o; )
            Ag(d, o),
            o = Lf(o.nextSibling)
    }
    if (Fg(d),
    d.tag === 13) {
        if (d = d.memoizedState,
        d = d !== null ? d.dehydrated : null,
        !d)
            throw Error(p(317));
        e: {
            for (d = d.nextSibling,
            o = 0; d; ) {
                if (d.nodeType === 8) {
                    var c = d.data;
                    if (c === "/$") {
                        if (o === 0) {
                            yg = Lf(d.nextSibling);
                            break e
                        }
                        o--
                    } else
                        c !== "$" && c !== "$!" && c !== "$?" || o++
                }
                d = d.nextSibling
            }
            yg = null
        }
    } else
        yg = xg ? Lf(d.stateNode.nextSibling) : null;
    return !0
}

export default Gg;
