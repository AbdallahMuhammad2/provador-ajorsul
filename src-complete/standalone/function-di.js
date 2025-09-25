/* Standalone Function: Di */

function Di(d, o, c, h) {
    o = d.memoizedState,
    c = c(h, o),
    c = c == null ? o : A({}, o, c),
    d.memoizedState = c,
    d.lanes === 0 && (d.updateQueue.baseState = c)
}

export default Di;
