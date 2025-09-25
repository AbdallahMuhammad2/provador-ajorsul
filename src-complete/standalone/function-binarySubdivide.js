/* Standalone Function: binarySubdivide */

function binarySubdivide(d, o, c, h, _) {
    let b, _e, nt = 0;
    do
        _e = o + (c - o) / 2,
        b = calcBezier(_e, h, _) - d,
        b > 0 ? c = _e : o = _e;
    while (Math.abs(b) > subdivisionPrecision && ++nt < subdivisionMaxIterations);
    return _e
}

export default binarySubdivide;
