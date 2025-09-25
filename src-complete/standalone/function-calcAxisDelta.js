/* Standalone Function: calcAxisDelta */

function calcAxisDelta(d, o, c, h=.5) {
    d.origin = h,
    d.originPoint = mixNumber$1(o.min, o.max, d.origin),
    d.scale = calcLength(c) / calcLength(o),
    (isNear(d.scale, 1, 1e-4) || isNaN(d.scale)) && (d.scale = 1),
    d.translate = mixNumber$1(c.min, c.max, d.origin) - d.originPoint,
    (isNear(d.translate) || isNaN(d.translate)) && (d.translate = 0)
}

export default calcAxisDelta;
