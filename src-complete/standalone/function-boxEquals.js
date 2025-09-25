/* Standalone Function: boxEquals */

function boxEquals(d, o) {
    return d.x.min === o.x.min && d.x.max === o.x.max && d.y.min === o.y.min && d.y.max === o.y.max
}

export default boxEquals;
