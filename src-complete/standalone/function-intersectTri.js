/* Standalone Function: intersectTri */

function intersectTri(d, o, c, h, _) {
    const b = 3 * h;
    let _e = b + 0
      , nt = b + 1
      , it = b + 2;
    const at = d.index;
    d.index && (_e = at.getX(_e),
    nt = at.getX(nt),
    it = at.getX(it));
    const {position: ut, normal: pt, uv: ht, uv1: _t} = d.attributes
      , vt = checkBufferGeometryIntersection(c, ut, pt, ht, _t, _e, nt, it, o);
    return vt ? (vt.faceIndex = h,
    _ && _.push(vt),
    vt) : null
}

export default intersectTri;
