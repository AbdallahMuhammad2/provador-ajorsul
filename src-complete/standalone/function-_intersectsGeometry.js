/* Standalone Function: _intersectsGeometry */

function _intersectsGeometry(d, o, c, h, _=null) {
    const {float32Array: b, uint16Array: _e, uint32Array: nt} = BufferStack;
    let it = 2 * d;
    if (_ === null && (c.boundingBox || c.computeBoundingBox(),
    obb.set(c.boundingBox.min, c.boundingBox.max, h),
    _ = obb),
    !IS_LEAF(it, _e)) {
        const at = d + 8
          , ut = nt[d + 6];
        return arrayToBox(at, b, boundingBox),
        _.intersectsBox(boundingBox) && _intersectsGeometry(at, o, c, h, _) ? !0 : (arrayToBox(ut, b, boundingBox),
        !(!_.intersectsBox(boundingBox) || !_intersectsGeometry(ut, o, c, h, _)))
    }
    {
        const at = o.geometry
          , ut = at.index
          , pt = at.attributes.position
          , ht = c.index
          , _t = c.attributes.position
          , vt = OFFSET(d, nt)
          , bt = COUNT(it, _e);
        if (invertedMat.copy(h).invert(),
        c.boundsTree)
            return arrayToBox(d, b, obb2),
            obb2.matrix.copy(invertedMat),
            obb2.needsUpdate = !0,
            c.boundsTree.shapecast({
                intersectsBounds: At => obb2.intersectsBox(At),
                intersectsTriangle: At => {
                    At.a.applyMatrix4(h),
                    At.b.applyMatrix4(h),
                    At.c.applyMatrix4(h),
                    At.needsUpdate = !0;
                    for (let Et = 3 * vt, Pt = 3 * (bt + vt); Et < Pt; Et += 3)
                        if (setTriangle(triangle2, Et, ut, pt),
                        triangle2.needsUpdate = !0,
                        At.intersectsTriangle(triangle2))
                            return !0;
                    return !1
                }
            });
        for (let St = 3 * vt, At = 3 * (bt + vt); St < At; St += 3) {
            setTriangle(triangle, St, ut, pt),
            triangle.a.applyMatrix4(invertedMat),
            triangle.b.applyMatrix4(invertedMat),
            triangle.c.applyMatrix4(invertedMat),
            triangle.needsUpdate = !0;
            for (let Et = 0, Pt = ht.count; Et < Pt; Et += 3)
                if (setTriangle(triangle2, Et, ht, _t),
                triangle2.needsUpdate = !0,
                triangle.intersectsTriangle(triangle2))
                    return !0
        }
    }
}

export default _intersectsGeometry;
