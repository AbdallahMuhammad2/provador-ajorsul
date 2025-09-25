/* Standalone Function: mixBox */

function mixBox(d, o, c, h) {
    mixAxis(d.x, o.x, c.x, h),
    mixAxis(d.y, o.y, c.y, h)
}

export default mixBox;
