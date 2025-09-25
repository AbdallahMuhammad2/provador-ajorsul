/* Standalone Function: calcBoxDelta */

function calcBoxDelta(d, o, c, h) {
    calcAxisDelta(d.x, o.x, c.x, h ? h.originX : void 0),
    calcAxisDelta(d.y, o.y, c.y, h ? h.originY : void 0)
}

export default calcBoxDelta;
