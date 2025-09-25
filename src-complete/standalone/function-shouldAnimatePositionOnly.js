/* Standalone Function: shouldAnimatePositionOnly */

function shouldAnimatePositionOnly(d, o, c) {
    return d === "position" || d === "preserve-aspect" && !isNear(aspectRatio(o), aspectRatio(c), .2)
}

export default shouldAnimatePositionOnly;
