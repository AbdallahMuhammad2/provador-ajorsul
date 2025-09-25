/* Standalone Function: getHitSideWithCoplanarCheck */

function getHitSideWithCoplanarCheck(d, o) {
    function c() {
        return Math.random() - .5
    }
    d.getNormal(_normal),
    operationsUtils_ray.direction.copy(_normal),
    d.getMidpoint(operationsUtils_ray.origin);
    let h = 0
      , _ = 1 / 0;
    for (let b = 0; b < 3; b++) {
        operationsUtils_ray.direction.x += c() * JITTER_EPSILON,
        operationsUtils_ray.direction.y += c() * JITTER_EPSILON,
        operationsUtils_ray.direction.z += c() * JITTER_EPSILON,
        operationsUtils_ray.direction.multiplyScalar(-1);
        const _e = o.raycastFirst(operationsUtils_ray, three_module.$EB);
        if (_e && operationsUtils_ray.direction.dot(_e.face.normal) > 0 && h++,
        _e !== null && (_ = Math.min(_, _e.distance)),
        _ <= OFFSET_EPSILON)
            return _e.face.normal.dot(_normal) > 0 ? COPLANAR_ALIGNED : COPLANAR_OPPOSITE;
        if (h / 3 > .5 || (b - h + 1) / 3 > .5)
            break
    }
    return h / 3 > .5 ? BACK_SIDE : FRONT_SIDE
}

export default getHitSideWithCoplanarCheck;
