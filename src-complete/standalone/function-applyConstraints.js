/* Standalone Function: applyConstraints */

function applyConstraints(d, {min: o, max: c}, h) {
    return o !== void 0 && d < o ? d = h ? mixNumber$1(o, d, h.min) : Math.max(d, o) : c !== void 0 && d > c && (d = h ? mixNumber$1(c, d, h.max) : Math.min(d, c)),
    d
}

export default applyConstraints;
