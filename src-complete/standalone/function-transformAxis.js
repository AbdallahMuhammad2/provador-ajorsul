/* Standalone Function: transformAxis */

function transformAxis(d, o, [c,h,_]) {
    const b = o[_] !== void 0 ? o[_] : .5
      , _e = mixNumber$1(d.min, d.max, b);
    applyAxisDelta(d, o[c], o[h], _e, o.scale)
}

export default transformAxis;
