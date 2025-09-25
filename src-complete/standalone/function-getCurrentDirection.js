/* Standalone Function: getCurrentDirection */

function getCurrentDirection(d, o=10) {
    let c = null;
    return Math.abs(d.y) > o ? c = "y" : Math.abs(d.x) > o && (c = "x"),
    c
}

export default getCurrentDirection;
