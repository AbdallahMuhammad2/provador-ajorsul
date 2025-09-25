/* Standalone Function: getProjectedDistance */

function getProjectedDistance(d, o) {
    return _tempVec.subVectors(o, d.origin).dot(d.direction)
}

export default getProjectedDistance;
