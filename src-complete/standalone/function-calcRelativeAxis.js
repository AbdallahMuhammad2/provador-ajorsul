/* Standalone Function: calcRelativeAxis */

function calcRelativeAxis(d, o, c) {
    d.min = c.min + o.min,
    d.max = d.min + calcLength(o)
}

export default calcRelativeAxis;
