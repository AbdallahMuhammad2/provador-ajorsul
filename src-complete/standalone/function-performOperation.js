/* Standalone Function: performOperation */

function performOperation(d, o, c, h, _, b={}) {
    const {useGroups: _e=!0} = b
      , {aIntersections: nt, bIntersections: it} = collectIntersectingTriangles(d, o);
    let at;
    return at = _e ? 0 : -1,
    performSplitTriangleOperations(d, o, nt, c, !1, h, _, at),
    performWholeTriangleOperations(d, o, nt, c, !1, _, at),
    c.findIndex(ut => ut !== HOLLOW_INTERSECTION && ut !== HOLLOW_SUBTRACTION) !== -1 && (at = _e ? d.geometry.groups.length || 1 : -1,
    performSplitTriangleOperations(o, d, it, c, !0, h, _, at),
    performWholeTriangleOperations(o, d, it, c, !0, _, at)),
    _attr.length = 0,
    _actions.length = 0,
    {
        groups: [],
        materials: null
    }
}

export default performOperation;
