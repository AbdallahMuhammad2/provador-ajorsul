/* Standalone Function: hasTransform */

function hasTransform(d) {
    return hasScale(d) || has2DTranslate(d) || d.z || d.rotate || d.rotateX || d.rotateY || d.skewX || d.skewY
}

export default hasTransform;
