/* Standalone Function: intersectTris */

function intersectTris(d, o, c, h, _, b) {
    const {geometry: _e, _indirectBuffer: nt} = d;
    for (let it = h, at = h + _; it < at; it++)
        intersectTri(_e, o, c, it, b)
}

export default intersectTris;
