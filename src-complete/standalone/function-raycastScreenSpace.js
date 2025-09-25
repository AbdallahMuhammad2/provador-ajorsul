/* Standalone Function: raycastScreenSpace */

function raycastScreenSpace(d, o, c) {
    const h = o.projectionMatrix
      , _ = d.material.resolution
      , b = d.matrixWorld
      , _e = d.geometry
      , nt = _e.attributes.instanceStart
      , it = _e.attributes.instanceEnd
      , at = Math.min(_e.instanceCount, nt.count)
      , ut = -o.near;
    LineSegments2_ray.at(1, _ssOrigin),
    _ssOrigin.w = 1,
    _ssOrigin.applyMatrix4(o.matrixWorldInverse),
    _ssOrigin.applyMatrix4(h),
    _ssOrigin.multiplyScalar(1 / _ssOrigin.w),
    _ssOrigin.x *= _.x / 2,
    _ssOrigin.y *= _.y / 2,
    _ssOrigin.z = 0,
    _ssOrigin3.copy(_ssOrigin),
    _mvMatrix.multiplyMatrices(o.matrixWorldInverse, b);
    for (let pt = 0, ht = at; pt < ht; pt++) {
        if (_start4.fromBufferAttribute(nt, pt),
        _end4.fromBufferAttribute(it, pt),
        _start4.w = 1,
        _end4.w = 1,
        _start4.applyMatrix4(_mvMatrix),
        _end4.applyMatrix4(_mvMatrix),
        _start4.z > ut && _end4.z > ut)
            continue;
        if (_start4.z > ut) {
            const At = _start4.z - _end4.z
              , Et = (_start4.z - ut) / At;
            _start4.lerp(_end4, Et)
        } else if (_end4.z > ut) {
            const At = _end4.z - _start4.z
              , Et = (_end4.z - ut) / At;
            _end4.lerp(_start4, Et)
        }
        _start4.applyMatrix4(h),
        _end4.applyMatrix4(h),
        _start4.multiplyScalar(1 / _start4.w),
        _end4.multiplyScalar(1 / _end4.w),
        _start4.x *= _.x / 2,
        _start4.y *= _.y / 2,
        _end4.x *= _.x / 2,
        _end4.y *= _.y / 2,
        _line.start.copy(_start4),
        _line.start.z = 0,
        _line.end.copy(_end4),
        _line.end.z = 0;
        const _t = _line.closestPointToPointParameter(_ssOrigin3, !0);
        _line.at(_t, _closestPoint);
        const vt = three_module.cj9.lerp(_start4.z, _end4.z, _t)
          , bt = vt >= -1 && vt <= 1
          , St = _ssOrigin3.distanceTo(_closestPoint) < .5 * _lineWidth;
        if (bt && St) {
            _line.start.fromBufferAttribute(nt, pt),
            _line.end.fromBufferAttribute(it, pt),
            _line.start.applyMatrix4(b),
            _line.end.applyMatrix4(b);
            const At = new three_module.Pq0
              , Et = new three_module.Pq0;
            LineSegments2_ray.distanceSqToSegment(_line.start, _line.end, Et, At),
            c.push({
                point: Et,
                pointOnLine: At,
                distance: LineSegments2_ray.origin.distanceTo(Et),
                object: d,
                face: null,
                faceIndex: pt,
                uv: null,
                uv1: null
            })
        }
    }
}

export default raycastScreenSpace;
