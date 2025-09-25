/* Standalone Function: distance2D */

function distance2D(d, o) {
    const c = distance(d.x, o.x)
      , h = distance(d.y, o.y);
    return Math.sqrt(c ** 2 + h ** 2)
}

export default distance2D;
