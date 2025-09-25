/* Standalone Function: createCylinder */

function createCylinder(d) {
    const {radiusTop: o, radiusBottom: c, height: h, segments: _} = d
      , b = new Cylinder(o,c,h,_);
    return b.radiusTop = c,
    b.radiusBottom = c,
    b.height = h,
    b.numSegments = _,
    b
}

export default createCylinder;
