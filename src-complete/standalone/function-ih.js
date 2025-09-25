/* Standalone Function: ih */

function ih(d, o) {
    d.lanes |= o;
    var c = d.alternate;
    for (c !== null && (c.lanes |= o),
    c = d,
    d = d.return; d !== null; )
        d.childLanes |= o,
        c = d.alternate,
        c !== null && (c.childLanes |= o),
        c = d,
        d = d.return;
    return c.tag === 3 ? c.stateNode : null
}

export default ih;
