/* Standalone Function: intersectsGeometry_indirect_generated_intersectsGeometry */

function intersectsGeometry_indirect_generated_intersectsGeometry(d, o, c, h, _=null) {
    const {float32Array: b, uint16Array: _e, uint32Array: nt} = BufferStack;
    let it = 2 * d;
    if (_ === null && (c.boundingBox || c.computeBoundingBox(),
    intersectsGeometry_indirect_generated_obb.set(c.boundingBox.min, c.boundingBox.max, h),
    _ = intersectsGeometry_indirect_generated_obb),
    !IS_LEAF(it, _e)) {
        const at = d + 8
          , ut = nt[d + 6];
        return arrayToBox(at, b, intersectsGeometry_indirect_generated_boundingBox),
        _.intersectsBox(intersectsGeometry_indirect_generated_boundingBox) && intersectsGeometry_indirect_generated_intersectsGeometry(at, o, c, h, _) ? !0 : (arrayToBox(ut, b, intersectsGeometry_indirect_generated_boundingBox),
        !(!_.intersectsBox(intersectsGeometry_indirect_generated_boundingBox) || !intersectsGeometry_indirect_generated_intersectsGeometry(ut, o, c, h, _)))
    }
    {
        const at = o.geometry
          , ut = at.index
          , pt = at.attributes.position
          , ht = c.index
          , _t = c.attributes.position
          , vt = OFFSET(d, nt)
          , bt = COUNT(it, _e);
        if (intersectsGeometry_indirect_generated_invertedMat.copy(h).invert(),
        c.boundsTree)
            return arrayToBox(d, b, intersectsGeometry_indirect_generated_obb2),
            intersectsGeometry_indirect_generated_obb2.matrix.copy(intersectsGeometry_indirect_generated_invertedMat),
            intersectsGeometry_indirect_generated_obb2.needsUpdate = !0,
            c.boundsTree.shapecast({
                intersectsBounds: At => intersectsGeometry_indirect_generated_obb2.intersectsBox(At),
                intersectsTriangle: At => {
                    At.a.applyMatrix4(h),
                    At.b.applyMatrix4(h),
                    At.c.applyMatrix4(h),
                    At.needsUpdate = !0;
                    for (let Et = vt, Pt = bt + vt; Et < Pt; Et++)
                        if (setTriangle(intersectsGeometry_indirect_generated_triangle2, 3 * o.resolveTriangleIndex(Et), ut, pt),
                        intersectsGeometry_indirect_generated_triangle2.needsUpdate = !0,
                        At.intersectsTriangle(intersectsGeometry_indirect_generated_triangle2))
                            return !0;
                    return !1
                }
            });
        for (let St = vt, At = bt + vt; St < At; St++) {
            const Et = o.resolveTriangleIndex(St);
            setTriangle(intersectsGeometry_indirect_generated_triangle, 3 * Et, ut, pt),
            intersectsGeometry_indirect_generated_triangle.a.applyMatrix4(intersectsGeometry_indirect_generated_invertedMat),
            intersectsGeometry_indirect_generated_triangle.b.applyMatrix4(intersectsGeometry_indirect_generated_invertedMat),
            intersectsGeometry_indirect_generated_triangle.c.applyMatrix4(intersectsGeometry_indirect_generated_invertedMat),
            intersectsGeometry_indirect_generated_triangle.needsUpdate = !0;
            for (let Pt = 0, It = ht.count; Pt < It; Pt += 3)
                if (setTriangle(intersectsGeometry_indirect_generated_triangle2, Pt, ht, _t),
                intersectsGeometry_indirect_generated_triangle2.needsUpdate = !0,
                intersectsGeometry_indirect_generated_triangle.intersectsTriangle(intersectsGeometry_indirect_generated_triangle2))
                    return !0
        }
    }
}

export default intersectsGeometry_indirect_generated_intersectsGeometry;
