/* Standalone Function: has2DTranslate */

function has2DTranslate(d) {
    return is2DTranslate(d.x) || is2DTranslate(d.y)
}

export default has2DTranslate;
