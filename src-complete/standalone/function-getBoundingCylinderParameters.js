/* Standalone Function: getBoundingCylinderParameters */

function getBoundingCylinderParameters(d, o) {
    const c = ["x", "y", "z"]
      , h = o.cylinderAxis || "y"
      , _ = c.splice(c.indexOf(h), 1) && c
      , b = new three_module.NRn().setFromObject(d);
    if (!isFinite(b.min.lengthSq()))
        return null;
    const _e = b.max[h] - b.min[h]
      , nt = .5 * Math.max(getComponent(b.max, _[0]) - getComponent(b.min, _[0]), getComponent(b.max, _[1]) - getComponent(b.min, _[1]))
      , it = h === "y" ? PI_2 : 0
      , at = h === "z" ? PI_2 : 0;
    return {
        type: ShapeType.CYLINDER,
        params: {
            radiusTop: nt,
            radiusBottom: nt,
            height: _e,
            segments: 12
        },
        orientation: new Quaternion().setFromEuler(it, at, 0, "XYZ").normalize()
    }
}

export default getBoundingCylinderParameters;
