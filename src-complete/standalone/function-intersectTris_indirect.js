/* Standalone Function: intersectTris_indirect */

function intersectTris_indirect(d, o, c, h, _, b) {
    const {geometry: _e, _indirectBuffer: nt} = d;
    for (let it = h, at = h + _; it < at; it++)
        intersectTri(_e, o, c, nt ? nt[it] : it, b)
}

export default intersectTris_indirect;
