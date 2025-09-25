/* Standalone Function: fastInterpolate */

function fastInterpolate(d, o) {
    var c = d[0]
      , h = d[1]
      , _ = o[0];
    return function(b) {
        return _(progress$1(c, h, b))
    }
}

export default fastInterpolate;
