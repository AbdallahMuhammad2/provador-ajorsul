/* Standalone Function: getRotation */

function getRotation(d, o) {
    var c = new ARRAY_TYPE(3);
    getScaling(c, o);
    var h = 1 / c[0]
      , _ = 1 / c[1]
      , b = 1 / c[2]
      , _e = o[0] * h
      , nt = o[1] * _
      , it = o[2] * b
      , at = o[4] * h
      , ut = o[5] * _
      , pt = o[6] * b
      , ht = o[8] * h
      , _t = o[9] * _
      , vt = o[10] * b
      , bt = _e + ut + vt
      , St = 0;
    return bt > 0 ? (St = 2 * Math.sqrt(bt + 1),
    d[3] = .25 * St,
    d[0] = (pt - _t) / St,
    d[1] = (ht - it) / St,
    d[2] = (nt - at) / St) : _e > ut && _e > vt ? (St = 2 * Math.sqrt(1 + _e - ut - vt),
    d[3] = (pt - _t) / St,
    d[0] = .25 * St,
    d[1] = (nt + at) / St,
    d[2] = (ht + it) / St) : ut > vt ? (St = 2 * Math.sqrt(1 + ut - _e - vt),
    d[3] = (ht - it) / St,
    d[0] = (nt + at) / St,
    d[1] = .25 * St,
    d[2] = (pt + _t) / St) : (St = 2 * Math.sqrt(1 + vt - _e - ut),
    d[3] = (nt - at) / St,
    d[0] = (ht + it) / St,
    d[1] = (pt + _t) / St,
    d[2] = .25 * St),
    d
}

export default getRotation;
