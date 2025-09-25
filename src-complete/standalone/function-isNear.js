/* Standalone Function: isNear */

function isNear(d, o=0, c=.01) {
    return Math.abs(d - o) <= c
}

export default isNear;
