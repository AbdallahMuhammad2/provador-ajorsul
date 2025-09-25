/* Standalone Function: getFullGeometryRange */

function getFullGeometryRange(d) {
    const o = geometryUtils_getTriCount(d)
      , c = d.drawRange
      , h = c.start / 3
      , _ = (c.start + c.count) / 3
      , b = Math.max(0, h)
      , _e = Math.min(o, _) - b;
    return [{
        offset: Math.floor(b),
        count: Math.floor(_e)
    }]
}

export default getFullGeometryRange;
