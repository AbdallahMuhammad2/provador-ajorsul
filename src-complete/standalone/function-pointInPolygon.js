/* Standalone Function: pointInPolygon */

function pointInPolygon(d, o, c) {
    let h = null;
    const _ = d.length;
    for (let b = 0; b !== _; b++) {
        const _e = d[b]
          , nt = pointInPolygon_edge;
        d[(b + 1) % _].vsub(_e, nt);
        const it = pointInPolygon_edge_x_normal;
        nt.cross(o, it);
        const at = pointInPolygon_vtp;
        c.vsub(_e, at);
        const ut = it.dot(at);
        if (!(h === null || ut > 0 && h === !0 || ut <= 0 && h === !1))
            return !1;
        h === null && (h = ut > 0)
    }
    return !0
}

export default pointInPolygon;
