/* Standalone Function: getBoundingBoxParameters */

function getBoundingBoxParameters(d) {
    const o = d.clone();
    o.quaternion.set(0, 0, 0, 1),
    o.updateMatrixWorld();
    const c = new three_module.NRn().setFromObject(o);
    if (!isFinite(c.min.lengthSq()))
        return null;
    const h = c.translate(o.position.negate()).getCenter(new three_module.Pq0);
    return {
        type: ShapeType.BOX,
        params: {
            x: (c.max.x - c.min.x) / 2,
            y: (c.max.y - c.min.y) / 2,
            z: (c.max.z - c.min.z) / 2
        },
        offset: h.lengthSq() ? new Vec3(h.x,h.y,h.z) : void 0
    }
}

export default getBoundingBoxParameters;
