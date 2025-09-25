/* Standalone Function: removePointDelta */

function removePointDelta(d, o, c, h, _) {
    return d -= o,
    d = scalePoint(d, 1 / c, h),
    _ !== void 0 && (d = scalePoint(d, 1 / _, h)),
    d
}

export default removePointDelta;
