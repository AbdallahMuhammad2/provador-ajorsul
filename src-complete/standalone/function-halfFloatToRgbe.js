/* Standalone Function: halfFloatToRgbe */

function halfFloatToRgbe(d, o=3, c) {
    let h, _, b, _e, nt;
    const it = d.byteLength / (2 * o) | 0;
    c = c || new Uint8ClampedArray(4 * it);
    for (let at = 0; at < it; at++) {
        h = d[at * o],
        _ = d[at * o + 1],
        b = d[at * o + 2],
        _e = Math.max(Math.max(h, _), b);
        const ut = Math.ceil(Math.log2(_e));
        nt = Math.pow(2, ut - 8),
        c[4 * at] = h / nt | 0,
        c[4 * at + 1] = _ / nt | 0,
        c[4 * at + 2] = b / nt | 0,
        c[4 * at + 3] = ut + 128
    }
    return c
}

export default halfFloatToRgbe;
