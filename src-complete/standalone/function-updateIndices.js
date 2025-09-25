/* Standalone Function: updateIndices */

function updateIndices(d, o) {
    const c = d.index;
    c && c.count === o.length ? (c.set(o),
    c.needsUpdate = !0) : d.setIndex(o)
}

export default updateIndices;
