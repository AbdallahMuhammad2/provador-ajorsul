/* Standalone Function: lerpAngle2 */

function lerpAngle2(d, o, c) {
    const h = (1 - c) * Math.cos(d) + c * Math.cos(o)
      , _ = (1 - c) * Math.sin(d) + c * Math.sin(o);
    return Math.atan2(_, h)
}

export default lerpAngle2;
