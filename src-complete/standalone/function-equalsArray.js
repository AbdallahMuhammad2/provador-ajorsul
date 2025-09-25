/* Standalone Function: equalsArray */

function equalsArray(d, o) {
    if (d === o)
        return !0;
    if (!!d != !!o || !d || !o || d.length !== o.length)
        return !1;
    for (let c = 0; c < d.length; c++)
        if (d[c] !== o[c])
            return !1;
    return !0
}

export default equalsArray;
