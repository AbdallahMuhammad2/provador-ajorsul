/* Standalone Function: getAngle */

function getAngle(d, o) {
    const c = dot(d, o);
    return Math.acos(2 * c * c - 1)
}

export default getAngle;
