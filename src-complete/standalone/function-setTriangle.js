/* Standalone Function: setTriangle */

function setTriangle(d, o, c, h) {
    const _ = d.a
      , b = d.b
      , _e = d.c;
    let nt = o
      , it = o + 1
      , at = o + 2;
    c && (nt = c.getX(nt),
    it = c.getX(it),
    at = c.getX(at)),
    _.x = h.getX(nt),
    _.y = h.getY(nt),
    _.z = h.getZ(nt),
    b.x = h.getX(it),
    b.y = h.getY(it),
    b.z = h.getZ(it),
    _e.x = h.getX(at),
    _e.y = h.getY(at),
    _e.z = h.getZ(at)
}

export default setTriangle;
