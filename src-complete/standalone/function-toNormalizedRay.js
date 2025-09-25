/* Standalone Function: toNormalizedRay */

function toNormalizedRay(d, o, c) {
    c.direction.subVectors(o, d).normalize();
    const h = d.dot(c.direction);
    return c.origin.copy(d).addScaledVector(c.direction, -h),
    c
}

export default toNormalizedRay;
