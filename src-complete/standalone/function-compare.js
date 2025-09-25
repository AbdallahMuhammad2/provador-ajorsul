/* Standalone Function: compare */

function compare(d, o) {
    return typeof d == typeof o && (typeof d == "object" || Array.isArray(d) ? Array.isArray(d) ? d.length === o.length && d.every( (c, h) => compare(c, o[h])) : typeof d.equals == "function" ? !!d.equals(o) : d.toArray && o.toArray ? compare(d.toArray(), o.toArray()) : d === o : d === o)
}

export default compare;
