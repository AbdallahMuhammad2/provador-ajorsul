/* Standalone Function: asRGBA */

function asRGBA(d) {
    const o = getColorType(d);
    let c = o.parse(d);
    return o === hsla && (c = hslaToRgba(c)),
    c
}

export default asRGBA;
