/* Standalone Function: pivotToPoint */

function pivotToPoint(d, o) {
    var c;
    const h = new three_module.Pq0().copy(o)
      , _ = new three_module.Pq0().copy(h)
      , b = new three_module.kn4().copy(d.matrixWorld).invert()
      , _e = (c = d.parent) === null || c === void 0 ? void 0 : c.matrixWorld
      , nt = new three_module.kn4;
    _e !== void 0 && nt.copy(_e).invert(),
    h.applyMatrix4(nt);
    const it = d.position.clone();
    return d.position.copy(h),
    _.applyMatrix4(b).negate(),
    d.geometry && d.geometry.translate(_.x, _.y, _.z),
    d.children.forEach(at => {
        at.position.add(_)
    }
    ),
    d.dispatchEvent({
        type: "objectUpdate"
    }),
    () => {
        d.position.copy(it),
        d.geometry && d.geometry.translate(-_.x, -_.y, -_.z),
        d.children.forEach(at => {
            at.position.sub(_)
        }
        ),
        d.dispatchEvent({
            type: "objectUpdate",
            undo: !0
        })
    }
}

export default pivotToPoint;
