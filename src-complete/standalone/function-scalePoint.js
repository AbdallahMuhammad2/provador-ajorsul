/* Standalone Function: scalePoint */

function scalePoint(d, o, c) {
    const h = d - c
      , _ = o * h;
    return c + _
}

export default scalePoint;
