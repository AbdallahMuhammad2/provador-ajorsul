/* Standalone Function: equalsObject */

function equalsObject(d, o) {
    if (d === o)
        return !0;
    if (!!d != !!o)
        return !1;
    if (!isPlainObject(d) || !isPlainObject(o))
        return d === o;
    const c = d
      , h = o;
    let _, b = 0, _e = 0;
    for (_ in c)
        b++;
    for (_ in h)
        _e++;
    if (b !== _e)
        return !1;
    for (_ in c) {
        const nt = c[_]
          , it = h[_];
        if (isArray(nt) && isArray(it)) {
            if (!equalsArray(nt, it))
                return !1
        } else if (isPlainObject(nt) && isPlainObject(it)) {
            if (!equalsObject(nt, it))
                return !1
        } else if (nt !== it)
            return !1
    }
    return !0
}

export default equalsObject;
