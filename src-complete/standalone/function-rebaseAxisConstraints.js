/* Standalone Function: rebaseAxisConstraints */

function rebaseAxisConstraints(d, o) {
    const c = {};
    return o.min !== void 0 && (c.min = o.min - d.min),
    o.max !== void 0 && (c.max = o.max - d.min),
    c
}

export default rebaseAxisConstraints;
