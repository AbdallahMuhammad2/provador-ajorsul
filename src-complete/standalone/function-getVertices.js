/* Standalone Function: getVertices */

function getVertices(d) {
    const o = d.attributes.position
      , c = new Float32Array(3 * o.count);
    for (let h = 0; h < o.count; h++)
        c[3 * h] = o.getX(h),
        c[3 * h + 1] = o.getY(h),
        c[3 * h + 2] = o.getZ(h);
    return c
}

export default getVertices;
