/* Standalone Function: determinant */

function determinant(d) {
    var o = d[0]
      , c = d[1]
      , h = d[2]
      , _ = d[3]
      , b = d[4]
      , _e = d[5]
      , nt = d[6]
      , it = d[7]
      , at = d[8]
      , ut = d[9]
      , pt = d[10]
      , ht = d[11]
      , _t = d[12]
      , vt = d[13]
      , bt = d[14]
      , St = d[15];
    return (o * _e - c * b) * (pt * St - ht * bt) - (o * nt - h * b) * (ut * St - ht * vt) + (o * it - _ * b) * (ut * bt - pt * vt) + (c * nt - h * _e) * (at * St - ht * _t) - (c * it - _ * _e) * (at * bt - pt * _t) + (h * it - _ * nt) * (at * vt - ut * _t)
}

export default determinant;
