/* Standalone Function: oh */

function oh(d, o, c) {
    if (o = o.updateQueue,
    o !== null && (o = o.shared,
    (c & 4194240) !== 0)) {
        var h = o.lanes;
        h &= d.pendingLanes,
        c |= h,
        o.lanes = c,
        Cc(d, c)
    }
}

export default oh;
