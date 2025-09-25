/* Standalone Function: createTrimesh */

function createTrimesh(d) {
    const {vertices: o, indices: c} = d;
    return new Trimesh(o,c)
}

export default createTrimesh;
