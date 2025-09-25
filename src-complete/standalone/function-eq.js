/* Standalone Function: eq */

function eq(d, o, c=0) {
    if (d.length !== o.length)
        return !1;
    for (let h = 0; h < d.length; h++)
        if (Math.abs(d[h] - o[h]) > c)
            return !1;
    return !0
}

export default eq;
