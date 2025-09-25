/* Standalone Function: iterateOverTriangles */

function iterateOverTriangles(d, o, c, h, _, b, _e) {
    const {geometry: nt} = c
      , {index: it} = nt
      , at = nt.attributes.position;
    for (let ut = d, pt = o + d; ut < pt; ut++) {
        let ht;
        if (ht = ut,
        setTriangle(_e, 3 * ht, it, at),
        _e.needsUpdate = !0,
        h(_e, ht, _, b))
            return !0
    }
    return !1
}

export default iterateOverTriangles;
