/* Standalone Function: applyBoxDelta */

function applyBoxDelta(d, {x: o, y: c}) {
    applyAxisDelta(d.x, o.translate, o.scale, o.originPoint),
    applyAxisDelta(d.y, c.translate, c.scale, c.originPoint)
}

export default applyBoxDelta;
