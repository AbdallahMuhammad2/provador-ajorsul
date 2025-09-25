/* Standalone Function: rotateXYByAngle */

function rotateXYByAngle(d, o) {
    if (o === 0)
        return d;
    const c = Math.PI / 180 * o
      , h = d[0] * Math.cos(c) + d[1] * Math.sin(c)
      , _ = d[1] * Math.cos(c) - d[0] * Math.sin(c);
    return [h, _]
}

export default rotateXYByAngle;
