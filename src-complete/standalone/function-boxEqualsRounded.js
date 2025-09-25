/* Standalone Function: boxEqualsRounded */

function boxEqualsRounded(d, o) {
    return Math.round(d.x.min) === Math.round(o.x.min) && Math.round(d.x.max) === Math.round(o.x.max) && Math.round(d.y.min) === Math.round(o.y.min) && Math.round(d.y.max) === Math.round(o.y.max)
}

export default boxEqualsRounded;
