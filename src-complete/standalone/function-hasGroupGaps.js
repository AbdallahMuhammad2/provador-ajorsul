/* Standalone Function: hasGroupGaps */

function hasGroupGaps(d) {
    if (d.groups.length === 0)
        return !1;
    const o = geometryUtils_getTriCount(d)
      , c = getRootIndexRanges(d).sort( (b, _e) => b.offset - _e.offset)
      , h = c[c.length - 1];
    h.count = Math.min(o - h.offset, h.count);
    let _ = 0;
    return c.forEach( ({count: b}) => _ += b),
    o !== _
}

export default hasGroupGaps;
