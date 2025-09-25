/* Standalone Function: animateSingleValue */

function animateSingleValue(d, o, c) {
    const h = isMotionValue(d) ? d : motionValue(d);
    return h.start(animateMotionValue("", h, o, c)),
    h.animation
}

export default animateSingleValue;
