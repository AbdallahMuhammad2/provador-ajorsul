/* Standalone Function: Bi */

function Bi(d, o, c) {
    if (c & 4194240) {
        var h = o.lanes;
        h &= d.pendingLanes,
        c |= h,
        o.lanes = c,
        Cc(d, c)
    }
}

export default Bi;
