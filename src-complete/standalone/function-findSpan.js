/* Standalone Function: findSpan */

function findSpan(d, o, c) {
    const h = c.length - d - 1;
    if (o >= c[h])
        return h - 1;
    if (o <= c[d])
        return d;
    let _ = d
      , b = h
      , _e = Math.floor((_ + b) / 2);
    for (; o < c[_e] || o >= c[_e + 1]; )
        o < c[_e] ? b = _e : _ = _e,
        _e = Math.floor((_ + b) / 2);
    return _e
}

export default findSpan;
