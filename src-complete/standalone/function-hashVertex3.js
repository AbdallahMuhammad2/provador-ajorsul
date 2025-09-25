/* Standalone Function: hashVertex3 */

function hashVertex3(d) {
    return `${hashNumber(d.x)},${hashNumber(d.y)},${hashNumber(d.z)}`
}

export default hashVertex3;
