/* Standalone Function: calcBasisFunctions */

function calcBasisFunctions(d, o, c, h) {
    const _ = []
      , b = []
      , _e = [];
    _[0] = 1;
    for (let nt = 1; nt <= c; ++nt) {
        b[nt] = o - h[d + 1 - nt],
        _e[nt] = h[d + nt] - o;
        let it = 0;
        for (let at = 0; at < nt; ++at) {
            const ut = _e[at + 1]
              , pt = b[nt - at]
              , ht = _[at] / (ut + pt);
            _[at] = it + ut * ht,
            it = pt * ht
        }
        _[nt] = it
    }
    return _
}

export default calcBasisFunctions;
