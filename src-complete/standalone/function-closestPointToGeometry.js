/* Standalone Function: closestPointToGeometry */

function closestPointToGeometry(d, o, c, h={}, _={}, b=0, _e=1 / 0) {
    o.boundingBox || o.computeBoundingBox(),
    closestPointToGeometry_generated_obb.set(o.boundingBox.min, o.boundingBox.max, c),
    closestPointToGeometry_generated_obb.needsUpdate = !0;
    const nt = d.geometry
      , it = nt.attributes.position
      , at = nt.index
      , ut = o.attributes.position
      , pt = o.index
      , ht = ExtendedTrianglePool.getPrimitive()
      , _t = ExtendedTrianglePool.getPrimitive();
    let vt = closestPointToGeometry_generated_temp1
      , bt = temp2
      , St = null
      , At = null;
    _ && (St = temp3,
    At = temp4);
    let Et = 1 / 0
      , Pt = null
      , It = null;
    return tempMatrix.copy(c).invert(),
    closestPointToGeometry_generated_obb2.matrix.copy(tempMatrix),
    d.shapecast({
        boundsTraverseOrder: Dt => closestPointToGeometry_generated_obb.distanceToBox(Dt),
        intersectsBounds: (Dt, Gt, Bt) => Bt < Et && Bt < _e && (Gt && (closestPointToGeometry_generated_obb2.min.copy(Dt.min),
        closestPointToGeometry_generated_obb2.max.copy(Dt.max),
        closestPointToGeometry_generated_obb2.needsUpdate = !0),
        !0),
        intersectsRange: (Dt, Gt) => {
            if (o.boundsTree)
                return o.boundsTree.shapecast({
                    boundsTraverseOrder: Bt => closestPointToGeometry_generated_obb2.distanceToBox(Bt),
                    intersectsBounds: (Bt, kt, Ut) => Ut < Et && Ut < _e,
                    intersectsRange: (Bt, kt) => {
                        for (let Ut = Bt, Ht = Bt + kt; Ut < Ht; Ut++) {
                            setTriangle(_t, 3 * Ut, pt, ut),
                            _t.a.applyMatrix4(c),
                            _t.b.applyMatrix4(c),
                            _t.c.applyMatrix4(c),
                            _t.needsUpdate = !0;
                            for (let Kt = Dt, Jt = Dt + Gt; Kt < Jt; Kt++) {
                                setTriangle(ht, 3 * Kt, at, it),
                                ht.needsUpdate = !0;
                                const or = ht.distanceToTriangle(_t, vt, St);
                                if (or < Et && (bt.copy(vt),
                                At && At.copy(St),
                                Et = or,
                                Pt = Kt,
                                It = Ut),
                                or < b)
                                    return !0
                            }
                        }
                    }
                });
            for (let Bt = 0, kt = geometryUtils_getTriCount(o); Bt < kt; Bt++) {
                setTriangle(_t, 3 * Bt, pt, ut),
                _t.a.applyMatrix4(c),
                _t.b.applyMatrix4(c),
                _t.c.applyMatrix4(c),
                _t.needsUpdate = !0;
                for (let Ut = Dt, Ht = Dt + Gt; Ut < Ht; Ut++) {
                    setTriangle(ht, 3 * Ut, at, it),
                    ht.needsUpdate = !0;
                    const Kt = ht.distanceToTriangle(_t, vt, St);
                    if (Kt < Et && (bt.copy(vt),
                    At && At.copy(St),
                    Et = Kt,
                    Pt = Ut,
                    It = Bt),
                    Kt < b)
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
    _.point.applyMatrix4(tempMatrix),
    bt.applyMatrix4(tempMatrix),
    _.distance = bt.sub(_.point).length(),
    _.faceIndex = It),
    h)
}

export default closestPointToGeometry;
