/* Standalone Function: calcBSplinePoint */

function calcBSplinePoint(d, o, c, h) {
    const _ = findSpan(d, h, o)
      , b = calcBasisFunctions(_, h, d, o)
      , _e = new three_module.IUQ(0,0,0,0);
    for (let nt = 0; nt <= d; ++nt) {
        const it = c[_ - d + nt]
          , at = b[nt]
          , ut = it.w * at;
        _e.x += it.x * ut,
        _e.y += it.y * ut,
        _e.z += it.z * ut,
        _e.w += it.w * at
    }
    return _e
}

export default calcBSplinePoint;
