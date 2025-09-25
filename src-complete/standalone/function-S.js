/* Standalone Function: S */

function S(d) {
    var o = d.alternate !== null && d.alternate.child === d.child
      , c = 0
      , h = 0;
    if (o)
        for (var _ = d.child; _ !== null; )
            c |= _.lanes | _.childLanes,
            h |= _.subtreeFlags & 14680064,
            h |= _.flags & 14680064,
            _.return = d,
            _ = _.sibling;
    else
        for (_ = d.child; _ !== null; )
            c |= _.lanes | _.childLanes,
            h |= _.subtreeFlags,
            h |= _.flags,
            _.return = d,
            _ = _.sibling;
    return d.subtreeFlags |= h,
    d.childLanes = c,
    o
}

export default S;
