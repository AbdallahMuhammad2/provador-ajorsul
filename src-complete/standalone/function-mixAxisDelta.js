/* Standalone Function: mixAxisDelta */

function mixAxisDelta(d, o, c) {
    d.translate = mixNumber$1(o.translate, 0, c),
    d.scale = mixNumber$1(o.scale, 1, c),
    d.origin = o.origin,
    d.originPoint = o.originPoint
}

export default mixAxisDelta;
