/* Standalone Function: Sj */

function Sj(d) {
    var o = d.alternate;
    o !== null && (d.alternate = null,
    Sj(o)),
    d.child = null,
    d.deletions = null,
    d.sibling = null,
    d.tag === 5 && (o = d.stateNode,
    o !== null && (delete o[Of],
    delete o[Pf],
    delete o[of],
    delete o[Qf],
    delete o[Rf])),
    d.stateNode = null,
    d.return = null,
    d.dependencies = null,
    d.memoizedProps = null,
    d.memoizedState = null,
    d.pendingProps = null,
    d.stateNode = null,
    d.updateQueue = null
}

export default Sj;
