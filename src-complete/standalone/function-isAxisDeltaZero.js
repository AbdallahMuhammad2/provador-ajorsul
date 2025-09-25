/* Standalone Function: isAxisDeltaZero */

function isAxisDeltaZero(d) {
    return d.translate === 0 && d.scale === 1
}

export default isAxisDeltaZero;
