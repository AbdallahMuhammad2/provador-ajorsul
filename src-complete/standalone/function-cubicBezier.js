/* Standalone Function: cubicBezier */

function cubicBezier(d, o, c, h) {
    if (d === o && c === h)
        return noop;
    const _ = b => binarySubdivide(b, 0, 1, d, c);
    return b => b === 0 || b === 1 ? b : calcBezier(_(b), o, h)
}

export default cubicBezier;
