/* Standalone Function: hashVertex4 */

function hashVertex4(d) {
    return `${hashNumber(d.x)},${hashNumber(d.y)},${hashNumber(d.z)},${hashNumber(d.w)}`
}

export default hashVertex4;
