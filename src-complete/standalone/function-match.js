/* Standalone Function: match */

function match(d, o) {
    const c = typeof d == "string" ? d : d.path;
    return c === (typeof o == "string" ? o : o.path) && c || typeof d != "string" && typeof o != "string" && d.id && d.id === o.id
}

export default match;
