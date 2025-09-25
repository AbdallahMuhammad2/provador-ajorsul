/* Standalone Function: applyAxisDelta */

function applyAxisDelta(d, o=0, c=1, h, _) {
    d.min = applyPointDelta(d.min, o, c, h, _),
    d.max = applyPointDelta(d.max, o, c, h, _)
}

export default applyAxisDelta;
