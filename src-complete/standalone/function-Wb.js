/* Standalone Function: Wb */

function Wb(d) {
    if (d.tag === 13) {
        var o = d.memoizedState;
        if (o === null && (d = d.alternate,
        d !== null && (o = d.memoizedState)),
        o !== null)
            return o.dehydrated
    }
    return null
}

export default Wb;
