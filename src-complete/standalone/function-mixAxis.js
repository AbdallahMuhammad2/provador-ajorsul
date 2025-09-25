/* Standalone Function: mixAxis */

function mixAxis(d, o, c, h) {
    d.min = mixNumber$1(o.min, c.min, h),
    d.max = mixNumber$1(o.max, c.max, h)
}

export default mixAxis;
