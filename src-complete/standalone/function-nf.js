/* Standalone Function: nf */

function nf(d, o, c) {
    var h = d.type || "unknown-event";
    d.currentTarget = c,
    Ub(h, o, void 0, d),
    d.currentTarget = null
}

export default nf;
