/* Standalone Function: pixelsToPercent */

function pixelsToPercent(d, o) {
    return o.max === o.min ? 0 : d / (o.max - o.min) * 100
}

export default pixelsToPercent;
