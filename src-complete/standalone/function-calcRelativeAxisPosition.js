/* Standalone Function: calcRelativeAxisPosition */

function calcRelativeAxisPosition(d, o, c) {
    d.min = o.min - c.min,
    d.max = d.min + calcLength(o)
}

export default calcRelativeAxisPosition;
