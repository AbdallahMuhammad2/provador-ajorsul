/* Standalone Function: isDeltaZero */

function isDeltaZero(d) {
    return isAxisDeltaZero(d.x) && isAxisDeltaZero(d.y)
}

export default isDeltaZero;
