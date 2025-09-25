/* Standalone Function: closestPointToGeometry_indirect */

function closestPointToGeometry_indirect(d, o, c, h={}, _={}, b=0, _e=1 / 0) {
    o.boundingBox || o.computeBoundingBox(),
    closestPointToGeometry_indirect_generated_obb.set(o.boundingBox.min, o.boundingBox.max, c),
    closestPointToGeometry_indirect_generated_obb.needsUpdate = !0;
    const nt = d.geometry
      , it = nt.attributes.position
      , at = nt.index
      , ut = o.attributes.position
      , pt = o.index
      , ht = ExtendedTrianglePool.getPrimitive()
      , _t = ExtendedTrianglePool.getPrimitive();
    let vt = closestPointToGeometry_indirect_generated_temp1
      , bt = closestPointToGeometry_indirect_generated_temp2
      , St = null
      , At = null;
    _ && (St = closestPointToGeometry_indirect_generated_temp3,
    At = closestPointToGeometry_indirect_generated_temp4);
    let Et = 1 / 0
      , Pt = null
      , It = null;
    return closestPointToGeometry_indirect_generated_tempMatrix.copy(c).invert(),
    closestPointToGeometry_indirect_generated_obb2.matrix.copy(closestPointToGeometry_indirect_generated_tempMatrix),
    d.shapecast({
        boundsTraverseOrder: Dt => closestPointToGeometry_indirect_generated_obb.distanceToBox(Dt),
        intersectsBounds: (Dt, Gt, Bt) => Bt < Et && Bt < _e && (Gt && (closestPointToGeometry_indirect_generated_obb2.min.copy(Dt.min),
        closestPointToGeometry_indirect_generated_obb2.max.copy(Dt.max),
        closestPointToGeometry_indirect_generated_obb2.needsUpdate = !0),
        !0),
        intersectsRange: (Dt, Gt) => {
            if (o.boundsTree) {
                const Bt = o.boundsTree;
                return Bt.shapecast({
                    boundsTraverseOrder: kt => closestPointToGeometry_indirect_generated_obb2.distanceToBox(kt),
                    intersectsBounds: (kt, Ut, Ht) => Ht < Et && Ht < _e,
                    intersectsRange: (kt, Ut) => {
                        for (let Ht = kt, Kt = kt + Ut; Ht < Kt; Ht++) {
                            const Jt = Bt.resolveTriangleIndex(Ht);
                            setTriangle(_t, 3 * Jt, pt, ut),
                            _t.a.applyMatrix4(c),
                            _t.b.applyMatrix4(c),
                            _t.c.applyMatrix4(c),
                            _t.needsUpdate = !0;
                            for (let or = Dt, ir = Dt + Gt; or < ir; or++) {
                                const lr = d.resolveTriangleIndex(or);
                                setTriangle(ht, 3 * lr, at, it),
                                ht.needsUpdate = !0;
                                const ar = ht.distanceToTriangle(_t, vt, St);
                                if (ar < Et && (bt.copy(vt),
                                At && At.copy(St),
                                Et = ar,
                                Pt = or,
                                It = Ht),
                                ar < b)
                                    return !0
                            }
                        }
                    }
                })
            }
            for (let Bt = 0, kt = geometryUtils_getTriCount(o); Bt < kt; Bt++) {
                setTriangle(_t, 3 * Bt, pt, ut),
                _t.a.applyMatrix4(c),
                _t.b.applyMatrix4(c),
                _t.c.applyMatrix4(c),
                _t.needsUpdate = !0;
                for (let Ut = Dt, Ht = Dt + Gt; Ut < Ht; Ut++) {
                    const Kt = d.resolveTriangleIndex(Ut);
                    setTriangle(ht, 3 * Kt, at, it),
                    ht.needsUpdate = !0;
                    const Jt = ht.distanceToTriangle(_t, vt, St);
                    if (Jt < Et && (bt.copy(vt),
                    At && At.copy(St),
                    Et = Jt,
                    Pt = Ut,
                    It = Bt),
                    Jt < b)
                        return !0
                }
            }
        }
    }),
    ExtendedTrianglePool.releasePrimitive(ht),
    ExtendedTrianglePool.releasePrimitive(_t),
    Et === 1 / 0 ? null : (h.point ? h.point.copy(bt) : h.point = bt.clone(),
    h.distance = Et,
    h.faceIndex = Pt,
    _ && (_.point ? _.point.copy(At) : _.point = At.clone(),
    _.point.applyMatrix4(closestPointToGeometry_indirect_generated_tempMatrix),
    bt.applyMatrix4(closestPointToGeometry_indirect_generated_tempMatrix),
    _.distance = bt.sub(_.point).length(),
    _.faceIndex = It),
    h)
}

export default closestPointToGeometry_indirect;
