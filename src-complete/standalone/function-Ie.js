/* Standalone Function: Ie */

function Ie(d, o) {
    if (He(d, o))
        return !0;
    if (typeof d != "object" || d === null || typeof o != "object" || o === null)
        return !1;
    var c = Object.keys(d)
      , h = Object.keys(o);
    if (c.length !== h.length)
        return !1;
    for (h = 0; h < c.length; h++) {
        var _ = c[h];
        if (!ja.call(o, _) || !He(d[_], o[_]))
            return !1
    }
    return !0
}

export default Ie;
