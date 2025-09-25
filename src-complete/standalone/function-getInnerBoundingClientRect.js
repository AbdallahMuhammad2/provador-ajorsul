/* Standalone Function: getInnerBoundingClientRect */

function getInnerBoundingClientRect(d, o) {
    var c = getBoundingClientRect(d, !1, o === "fixed");
    return c.top = c.top + d.clientTop,
    c.left = c.left + d.clientLeft,
    c.bottom = c.top + d.clientHeight,
    c.right = c.left + d.clientWidth,
    c.width = d.clientWidth,
    c.height = d.clientHeight,
    c.x = c.left,
    c.y = c.top,
    c
}

export default getInnerBoundingClientRect;
