/* Standalone Function: closestPointToPoint */

function closestPointToPoint(d, o, c={}, h=0, _=1 / 0) {
    const b = h * h
      , _e = _ * _;
    let nt = 1 / 0
      , it = null;
    if (d.shapecast({
        boundsTraverseOrder: ut => (temp.copy(o).clamp(ut.min, ut.max),
        temp.distanceToSquared(o)),
        intersectsBounds: (ut, pt, ht) => ht < nt && ht < _e,
        intersectsTriangle: (ut, pt) => {
            ut.closestPointToPoint(o, temp);
            const ht = o.distanceToSquared(temp);
            return ht < nt && (temp1.copy(temp),
            nt = ht,
            it = pt),
            ht < b
        }
    }),
    nt === 1 / 0)
        return null;
    const at = Math.sqrt(nt);
    return c.point ? c.point.copy(temp1) : c.point = temp1.clone(),
    c.distance = at,
    c.faceIndex = it,
    c
}

export default closestPointToPoint;
