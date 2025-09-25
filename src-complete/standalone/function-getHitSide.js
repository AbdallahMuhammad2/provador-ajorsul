/* Standalone Function: getHitSide */

function getHitSide(d, o) {
    d.getMidpoint(operationsUtils_ray.origin),
    d.getNormal(operationsUtils_ray.direction);
    const c = o.raycastFirst(operationsUtils_ray, three_module.$EB);
    return c && operationsUtils_ray.direction.dot(c.face.normal) > 0 ? BACK_SIDE : FRONT_SIDE
}

export default getHitSide;
