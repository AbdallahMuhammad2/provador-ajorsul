/* Standalone Function: computeSurfaceArea */

function computeSurfaceArea(d) {
    const o = d[3] - d[0]
      , c = d[4] - d[1]
      , h = d[5] - d[2];
    return 2 * (o * c + c * h + h * o)
}

export default computeSurfaceArea;
