/* Standalone Function: Vi */

function Vi(d, o, c, h, _) {
    return d.mode & 1 ? (d.flags |= 65536,
    d.lanes = _,
    d) : (d === o ? d.flags |= 65536 : (d.flags |= 128,
    c.flags |= 131072,
    c.flags &= -52805,
    c.tag === 1 && (c.alternate === null ? c.tag = 17 : (o = mh(-1, 1),
    o.tag = 2,
    nh(c, o, 1))),
    c.lanes |= 1),
    d)
}

export default Vi;
