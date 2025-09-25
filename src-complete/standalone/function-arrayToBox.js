/* Standalone Function: arrayToBox */

function arrayToBox(d, o, c) {
    return c.min.x = o[d],
    c.min.y = o[d + 1],
    c.min.z = o[d + 2],
    c.max.x = o[d + 3],
    c.max.y = o[d + 4],
    c.max.z = o[d + 5],
    c
}

export default arrayToBox;
