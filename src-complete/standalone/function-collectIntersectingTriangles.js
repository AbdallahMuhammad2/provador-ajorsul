/* Standalone Function: collectIntersectingTriangles */

function collectIntersectingTriangles(d, o) {
    const c = new IntersectionMap
      , h = new IntersectionMap;
    return operationsUtils_matrix.copy(d.matrixWorld).invert().multiply(o.matrixWorld),
    d.geometry.boundsTree.bvhcast(o.geometry.boundsTree, operationsUtils_matrix, {
        intersectsTriangles(_, b, _e, nt) {
            if (!isTriDegenerate(_) && !isTriDegenerate(b)) {
                let it = _.intersectsTriangle(b, operationsUtils_edge, !0);
                if (!it) {
                    const at = _.plane
                      , ut = b.plane
                      , pt = at.normal
                      , ht = ut.normal;
                    pt.dot(ht) === 1 && Math.abs(at.constant - ut.constant) < FLOATING_COPLANAR_EPSILON && (it = !0)
                }
                if (it) {
                    let at = d.geometry.boundsTree.resolveTriangleIndex(_e)
                      , ut = o.geometry.boundsTree.resolveTriangleIndex(nt);
                    c.add(at, ut),
                    h.add(ut, at),
                    _debugContext && (_debugContext.addEdge(operationsUtils_edge),
                    _debugContext.addIntersectingTriangles(_e, _, nt, b))
                }
            }
            return !1
        }
    }),
    {
        aIntersections: c,
        bIntersections: h
    }
}

export default collectIntersectingTriangles;
