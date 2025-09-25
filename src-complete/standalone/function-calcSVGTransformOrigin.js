/* Standalone Function: calcSVGTransformOrigin */

function calcSVGTransformOrigin(d, o, c) {
    const h = calcOrigin$1(o, d.x, d.width)
      , _ = calcOrigin$1(c, d.y, d.height);
    return `${h} ${_}`
}

export default calcSVGTransformOrigin;
