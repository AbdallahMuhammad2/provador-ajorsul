/* Standalone Function: calcBSplineDerivatives */

function calcBSplineDerivatives(d, o, c, h, _) {
    const b = _ < d ? _ : d
      , _e = []
      , nt = findSpan(d, h, o)
      , it = calcBasisFunctionDerivatives(nt, h, d, b, o)
      , at = [];
    for (let ut = 0; ut < c.length; ++ut) {
        const pt = c[ut].clone()
          , ht = pt.w;
        pt.x *= ht,
        pt.y *= ht,
        pt.z *= ht,
        at[ut] = pt
    }
    for (let ut = 0; ut <= b; ++ut) {
        const pt = at[nt - d].clone().multiplyScalar(it[ut][0]);
        for (let ht = 1; ht <= d; ++ht)
            pt.add(at[nt - d + ht].clone().multiplyScalar(it[ut][ht]));
        _e[ut] = pt
    }
    for (let ut = b + 1; ut <= _ + 1; ++ut)
        _e[ut] = new three_module.IUQ(0,0,0);
    return _e
}

export default calcBSplineDerivatives;
