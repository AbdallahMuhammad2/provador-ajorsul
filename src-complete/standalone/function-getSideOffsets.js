/* Standalone Function: getSideOffsets */

function getSideOffsets(d, o, c) {
    return c === void 0 && (c = {
        x: 0,
        y: 0
    }),
    {
        top: d.top - o.height - c.y,
        right: d.right - o.width + c.x,
        bottom: d.bottom - o.height + c.y,
        left: d.left - o.width - c.x
    }
}

export default getSideOffsets;
