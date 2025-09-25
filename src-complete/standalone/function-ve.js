/* Standalone Function: Ve */

function Ve(d, o) {
    var c = {};
    return c[d.toLowerCase()] = o.toLowerCase(),
    c["Webkit" + d] = "webkit" + o,
    c["Moz" + d] = "moz" + o,
    c
}

export default Ve;
