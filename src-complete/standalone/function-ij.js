/* Standalone Function: Ij */

function Ij(d, o) {
    switch (wg(o),
    o.tag) {
    case 1:
        return Zf(o.type) && $f(),
        d = o.flags,
        d & 65536 ? (o.flags = d & -65537 | 128,
        o) : null;
    case 3:
        return zh(),
        E(Wf),
        E(H),
        Eh(),
        d = o.flags,
        d & 65536 && !(d & 128) ? (o.flags = d & -65537 | 128,
        o) : null;
    case 5:
        return Bh(o),
        null;
    case 13:
        if (E(L),
        d = o.memoizedState,
        d !== null && d.dehydrated !== null) {
            if (o.alternate === null)
                throw Error(p(340));
            Ig()
        }
        return d = o.flags,
        d & 65536 ? (o.flags = d & -65537 | 128,
        o) : null;
    case 19:
        return E(L),
        null;
    case 4:
        return zh(),
        null;
    case 10:
        return ah(o.type._context),
        null;
    case 22:
    case 23:
        return Hj(),
        null;
    case 24:
        return null;
    default:
        return null
    }
}

export default Ij;
