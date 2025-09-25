/* Standalone Function: __rest */

function __rest(d, o) {
    var c = {};
    for (var h in d)
        Object.prototype.hasOwnProperty.call(d, h) && o.indexOf(h) < 0 && (c[h] = d[h]);
    if (d != null && typeof Object.getOwnPropertySymbols == "function") {
        var _ = 0;
        for (h = Object.getOwnPropertySymbols(d); _ < h.length; _++)
            o.indexOf(h[_]) < 0 && Object.prototype.propertyIsEnumerable.call(d, h[_]) && (c[h[_]] = d[h[_]])
    }
    return c
}

export default __rest;
