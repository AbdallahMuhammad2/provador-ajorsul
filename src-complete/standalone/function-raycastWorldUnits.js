/* Standalone Function: raycastWorldUnits */

function raycastWorldUnits(d, o) {
    const c = d.matrixWorld
      , h = d.geometry
      , _ = h.attributes.instanceStart
      , b = h.attributes.instanceEnd;
    for (let _e = 0, nt = Math.min(h.instanceCount, _.count); _e < nt; _e++) {
        _line.start.fromBufferAttribute(_, _e),
        _line.end.fromBufferAttribute(b, _e),
        _line.applyMatrix4(c);
        const it = new three_module.Pq0
          , at = new three_module.Pq0;
        LineSegments2_ray.distanceSqToSegment(_line.start, _line.end, at, it),
        at.distanceTo(it) < .5 * _lineWidth && o.push({
            point: at,
            pointOnLine: it,
            distance: LineSegments2_ray.origin.distanceTo(at),
            object: d,
            face: null,
            faceIndex: _e,
            uv: null,
            uv1: null
        })
    }
}

export default raycastWorldUnits;
