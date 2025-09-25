/* Standalone Function: getDirection */

function getDirection(d, o, c, h) {
    return d > o ? c > 0 ? RIGHT : LEFT : h > 0 ? DOWN : UP
}

export default getDirection;
