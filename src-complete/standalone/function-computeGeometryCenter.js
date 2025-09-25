/* Standalone Function: computeGeometryCenter */

function computeGeometryCenter(d) {
    if (d.geometry.userData.geometryCenter)
        return d.geometry.userData.geometryCenter;
    const o = d.geometry;
    if (!o)
        return new three_module.Pq0(0,0,0);
    o.boundingBox || o.computeBoundingBox();
    const c = o.boundingBox.getCenter(new three_module.Pq0);
    return d.geometry.userData.geometryCenter = c,
    c
}

export default computeGeometryCenter;
