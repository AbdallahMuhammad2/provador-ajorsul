/* Standalone Function: padNormals */

function padNormals(d) {
    const o = new Float32Array(4 * d.length / 3);
    for (let c = 0, h = d.length / 3; c < h; c++)
        o[4 * c] = d[3 * c],
        o[4 * c + 1] = d[3 * c + 1],
        o[4 * c + 2] = d[3 * c + 2];
    return o
}

export default padNormals;
