/* Standalone Function: computeAverageGeometryNormal */

function computeAverageGeometryNormal(d) {
    if (d.geometry.userData.geometryNormal)
        return d.geometry.userData.geometryNormal;
    const o = d.geometry.attributes.normal
      , c = new three_module.Pq0
      , h = new three_module.Pq0;
    for (let _ = 0, b = o.count; _ < b; _++)
        c.fromBufferAttribute(o, _),
        h.add(c);
    return h.normalize(),
    d.geometry.userData.geometryNormal = h,
    h
}

export default computeAverageGeometryNormal;
