/* Standalone Function: checkBufferGeometryIntersection */

function checkBufferGeometryIntersection(d, o, c, h, _, b, _e, nt, it) {
    ThreeRayIntersectUtilities_vA.fromBufferAttribute(o, b),
    ThreeRayIntersectUtilities_vB.fromBufferAttribute(o, _e),
    ThreeRayIntersectUtilities_vC.fromBufferAttribute(o, nt);
    const at = checkIntersection(d, ThreeRayIntersectUtilities_vA, ThreeRayIntersectUtilities_vB, ThreeRayIntersectUtilities_vC, _intersectionPoint, it);
    if (at) {
        h && (_uvA.fromBufferAttribute(h, b),
        _uvB.fromBufferAttribute(h, _e),
        _uvC.fromBufferAttribute(h, nt),
        at.uv = three_module.lMl.getInterpolation(_intersectionPoint, ThreeRayIntersectUtilities_vA, ThreeRayIntersectUtilities_vB, ThreeRayIntersectUtilities_vC, _uvA, _uvB, _uvC, new three_module.I9Y)),
        _ && (_uvA.fromBufferAttribute(_, b),
        _uvB.fromBufferAttribute(_, _e),
        _uvC.fromBufferAttribute(_, nt),
        at.uv1 = three_module.lMl.getInterpolation(_intersectionPoint, ThreeRayIntersectUtilities_vA, ThreeRayIntersectUtilities_vB, ThreeRayIntersectUtilities_vC, _uvA, _uvB, _uvC, new three_module.I9Y)),
        c && (_normalA.fromBufferAttribute(c, b),
        _normalB.fromBufferAttribute(c, _e),
        _normalC.fromBufferAttribute(c, nt),
        at.normal = three_module.lMl.getInterpolation(_intersectionPoint, ThreeRayIntersectUtilities_vA, ThreeRayIntersectUtilities_vB, ThreeRayIntersectUtilities_vC, _normalA, _normalB, _normalC, new three_module.Pq0),
        at.normal.dot(d.direction) > 0 && at.normal.multiplyScalar(-1));
        const ut = {
            a: b,
            b: _e,
            c: nt,
            normal: new three_module.Pq0,
            materialIndex: 0
        };
        three_module.lMl.getNormal(ThreeRayIntersectUtilities_vA, ThreeRayIntersectUtilities_vB, ThreeRayIntersectUtilities_vC, ut.normal),
        at.face = ut,
        at.faceIndex = b
    }
    return at
}

export default checkBufferGeometryIntersection;
