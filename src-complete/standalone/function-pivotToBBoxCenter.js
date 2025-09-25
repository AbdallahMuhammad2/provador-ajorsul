/* Standalone Function: pivotToBBoxCenter */

function pivotToBBoxCenter(d) {
    return pivotToPoint(d, new Box3B().expandByObject(d, !0, !0).getCenter(new three_module.Pq0))
}

export default pivotToBBoxCenter;
