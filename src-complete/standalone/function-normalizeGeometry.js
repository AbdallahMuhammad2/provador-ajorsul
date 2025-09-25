/* Standalone Function: normalizeGeometry */

function normalizeGeometry(d) {
    let o = d.geometry;
    return o = o.toBufferGeometry ? o.toBufferGeometry() : o.clone(),
    d.updateMatrixWorld(),
    d.matrixWorld.decompose(three_to_cannon_modern_v1, three_to_cannon_modern_q1, _v2),
    o.scale(_v2.x, _v2.y, _v2.z),
    o
}

export default normalizeGeometry;
