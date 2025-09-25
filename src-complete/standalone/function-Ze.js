/* Standalone Function: Ze */

function Ze(d) {
    if (Xe[d])
        return Xe[d];
    if (!We[d])
        return d;
    var o = We[d], c;
    for (c in o)
        if (o.hasOwnProperty(c) && c in Ye)
            return Xe[d] = o[c];
    return d
}

export default Ze;
