/* Standalone Function: getScaling */

function getScaling(d, o) {
    var c = o[0]
      , h = o[1]
      , _ = o[2]
      , b = o[4]
      , _e = o[5]
      , nt = o[6]
      , it = o[8]
      , at = o[9]
      , ut = o[10];
    return d[0] = Math.hypot(c, h, _),
    d[1] = Math.hypot(b, _e, nt),
    d[2] = Math.hypot(it, at, ut),
    d
}

export default getScaling;
