/* Standalone Function: slowInterpolate */

function slowInterpolate(d, o) {
    var c = d.length
      , h = c - 1;
    return function(_) {
        var b = 0
          , _e = !1;
        if (_ <= d[0] ? _e = !0 : _ >= d[h] && (b = h - 1,
        _e = !0),
        !_e) {
            for (var nt = 1; nt < c && !(d[nt] > _ || nt === h); nt++)
                ;
            b = nt - 1
        }
        var it = progress$1(d[b], d[b + 1], _);
        return o[b](it)
    }
}

export default slowInterpolate;
