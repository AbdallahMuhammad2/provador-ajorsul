/* Standalone Function: shallowCompare */

function shallowCompare(d, o) {
    if (!Array.isArray(o))
        return !1;
    const c = o.length;
    if (c !== d.length)
        return !1;
    for (let h = 0; h < c; h++)
        if (o[h] !== d[h])
            return !1;
    return !0
}

export default shallowCompare;
