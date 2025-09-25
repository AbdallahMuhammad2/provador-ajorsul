/* Standalone Function: Zi */

function Zi(d, o, c) {
    if (d !== null && (o.dependencies = d.dependencies),
    rh |= o.lanes,
    !(c & o.childLanes))
        return null;
    if (d !== null && o.child !== d.child)
        throw Error(p(153));
    if (o.child !== null) {
        for (d = o.child,
        c = Pg(d, d.pendingProps),
        o.child = c,
        c.return = o; d.sibling !== null; )
            d = d.sibling,
            c = c.sibling = Pg(d, d.pendingProps),
            c.return = o;
        c.sibling = null
    }
    return o.child
}

export default Zi;
