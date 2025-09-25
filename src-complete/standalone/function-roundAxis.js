/* Standalone Function: roundAxis */

function roundAxis(d) {
    d.min = roundPoint(d.min),
    d.max = roundPoint(d.max)
}

export default roundAxis;
