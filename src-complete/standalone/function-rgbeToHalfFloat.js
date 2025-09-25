/* Standalone Function: rgbeToHalfFloat */

function rgbeToHalfFloat(d, o=3, c=Uint16Array, h=!1) {
    let _;
    const b = d.byteLength >> 2
      , _e = new c(b * o);
    for (let nt = 0; nt < b; nt++)
        _ = Math.pow(2, d[4 * nt + 3] - 136),
        h ? (_e[nt * o] = Math.min(d[4 * nt] * _, 65504),
        _e[nt * o + 1] = Math.min(d[4 * nt + 1] * _, 65504),
        _e[nt * o + 2] = Math.min(d[4 * nt + 2] * _, 65504)) : (_e[nt * o] = three_module.GxU.toHalfFloat(Math.min(d[4 * nt] * _, 65504)),
        _e[nt * o + 1] = three_module.GxU.toHalfFloat(Math.min(d[4 * nt + 1] * _, 65504)),
        _e[nt * o + 2] = three_module.GxU.toHalfFloat(Math.min(d[4 * nt + 2] * _, 65504))),
        o === 4 && (_e[nt * o + 3] = three_module.GxU.toHalfFloat(1));
    return _e
}

export default rgbeToHalfFloat;
