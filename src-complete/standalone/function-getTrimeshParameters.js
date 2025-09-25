/* Standalone Function: getTrimeshParameters */

function getTrimeshParameters(d) {
    const o = getVertices(d);
    if (!o.length)
        return null;
    const c = new Uint32Array(o.length);
    for (let h = 0; h < o.length; h++)
        c[h] = h;
    return {
        type: ShapeType.MESH,
        params: {
            vertices: o,
            indices: c
        }
    }
}

export default getTrimeshParameters;
