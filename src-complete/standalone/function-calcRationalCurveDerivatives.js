/* Standalone Function: calcRationalCurveDerivatives */

function calcRationalCurveDerivatives(d) {
    const o = d.length
      , c = []
      , h = [];
    for (let b = 0; b < o; ++b) {
        const _e = d[b];
        c[b] = new three_module.Pq0(_e.x,_e.y,_e.z),
        h[b] = _e.w
    }
    const _ = [];
    for (let b = 0; b < o; ++b) {
        const _e = c[b].clone();
        for (let nt = 1; nt <= b; ++nt)
            _e.sub(_[b - nt].clone().multiplyScalar(calcKoverI(b, nt) * h[nt]));
        _[b] = _e.divideScalar(h[0])
    }
    return _
}

export default calcRationalCurveDerivatives;
