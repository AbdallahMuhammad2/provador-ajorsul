/* Standalone Function: intersectClosestTri_indirect */

function intersectClosestTri_indirect(d, o, c, h, _) {
    const {geometry: b, _indirectBuffer: _e} = d;
    let nt = 1 / 0
      , it = null;
    for (let at = h, ut = h + _; at < ut; at++) {
        let pt;
        pt = intersectTri(b, o, c, _e ? _e[at] : at),
        pt && pt.distance < nt && (it = pt,
        nt = pt.distance)
    }
    return it
}

export default intersectClosestTri_indirect;
