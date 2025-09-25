/* Standalone Function: isTriDegenerate */

function isTriDegenerate(d, o=EPSILON) {
    _AB.subVectors(d.b, d.a),
    _AC.subVectors(d.c, d.a),
    _CB.subVectors(d.b, d.c);
    const c = _AB.angleTo(_AC)
      , h = _AB.angleTo(_CB)
      , _ = Math.PI - c - h;
    return Math.abs(c) < o || Math.abs(h) < o || Math.abs(_) < o || d.a.distanceToSquared(d.b) < o || d.a.distanceToSquared(d.c) < o || d.b.distanceToSquared(d.c) < o
}

export default isTriDegenerate;
