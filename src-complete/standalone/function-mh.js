/* Standalone Function: Mh */

function Mh(d, o) {
    if (o === null)
        return !1;
    for (var c = 0; c < o.length && c < d.length; c++)
        if (!He(d[c], o[c]))
            return !1;
    return !0
}

export default Mh;
