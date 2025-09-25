/* Standalone Function: getValueAtIndexOrReturn */

function getValueAtIndexOrReturn(d, o, c) {
    if (Array.isArray(d)) {
        var h = d[o];
        return h ?? (Array.isArray(c) ? c[o] : c)
    }
    return d
}

export default getValueAtIndexOrReturn;
