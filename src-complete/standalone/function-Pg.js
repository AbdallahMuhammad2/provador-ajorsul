/* Standalone Function: Pg */

function Pg(d, o) {
    var c = d.alternate;
    return c === null ? (c = Bg(d.tag, o, d.key, d.mode),
    c.elementType = d.elementType,
    c.type = d.type,
    c.stateNode = d.stateNode,
    c.alternate = d,
    d.alternate = c) : (c.pendingProps = o,
    c.type = d.type,
    c.flags = 0,
    c.subtreeFlags = 0,
    c.deletions = null),
    c.flags = d.flags & 14680064,
    c.childLanes = d.childLanes,
    c.lanes = d.lanes,
    c.child = d.child,
    c.memoizedProps = d.memoizedProps,
    c.memoizedState = d.memoizedState,
    c.updateQueue = d.updateQueue,
    o = d.dependencies,
    c.dependencies = o === null ? null : {
        lanes: o.lanes,
        firstContext: o.firstContext
    },
    c.sibling = d.sibling,
    c.index = d.index,
    c.ref = d.ref,
    c
}

export default Pg;
