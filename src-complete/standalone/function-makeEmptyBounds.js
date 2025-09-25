/* Standalone Function: makeEmptyBounds */

function makeEmptyBounds(d) {
    d[0] = d[1] = d[2] = 1 / 0,
    d[3] = d[4] = d[5] = -1 / 0
}

export default makeEmptyBounds;
