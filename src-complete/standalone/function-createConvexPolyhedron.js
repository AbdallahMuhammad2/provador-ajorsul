/* Standalone Function: createConvexPolyhedron */

function createConvexPolyhedron(d) {
    const {faces: o, vertices: c} = d
      , h = [];
    for (let _ = 0; _ < c.length; _ += 3)
        h.push(new Vec3(c[_],c[_ + 1],c[_ + 2]));
    return new ConvexPolyhedron({
        faces: o,
        vertices: h
    })
}

export default createConvexPolyhedron;
