/* Standalone Function: hl */

function hl(d, o) {
    if (d = d.memoizedState,
    d !== null && d.dehydrated !== null) {
        var c = d.retryLane;
        d.retryLane = c !== 0 && c < o ? c : o
    }
}

export default hl;
