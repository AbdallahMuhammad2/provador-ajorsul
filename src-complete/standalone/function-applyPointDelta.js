/* Standalone Function: applyPointDelta */

function applyPointDelta(d, o, c, h, _) {
    return _ !== void 0 && (d = scalePoint(d, _, h)),
    scalePoint(d, c, h) + o
}

export default applyPointDelta;
