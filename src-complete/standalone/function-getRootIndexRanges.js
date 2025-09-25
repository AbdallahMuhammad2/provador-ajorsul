/* Standalone Function: getRootIndexRanges */

function getRootIndexRanges(d) {
    if (!d.groups || !d.groups.length)
        return getFullGeometryRange(d);
    const o = []
      , c = new Set
      , h = d.drawRange
      , _ = h.start / 3
      , b = (h.start + h.count) / 3;
    for (const nt of d.groups) {
        const it = nt.start / 3
          , at = (nt.start + nt.count) / 3;
        c.add(Math.max(_, it)),
        c.add(Math.min(b, at))
    }
    const _e = Array.from(c.values()).sort( (nt, it) => nt - it);
    for (let nt = 0; nt < _e.length - 1; nt++) {
        const it = _e[nt]
          , at = _e[nt + 1];
        o.push({
            offset: Math.floor(it),
            count: Math.floor(at - it)
        })
    }
    return o
}

export default getRootIndexRanges;
