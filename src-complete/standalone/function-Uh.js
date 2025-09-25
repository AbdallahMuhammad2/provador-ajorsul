/* Standalone Function: Uh */

function Uh() {
    if (N === null) {
        var d = M.alternate;
        d = d !== null ? d.memoizedState : null
    } else
        d = N.next;
    var o = O === null ? M.memoizedState : O.next;
    if (o !== null)
        O = o,
        N = d;
    else {
        if (d === null)
            throw Error(p(310));
        N = d,
        d = {
            memoizedState: N.memoizedState,
            baseState: N.baseState,
            baseQueue: N.baseQueue,
            queue: N.queue,
            next: null
        },
        O === null ? M.memoizedState = O = d : O = O.next = d
    }
    return O
}

export default Uh;
