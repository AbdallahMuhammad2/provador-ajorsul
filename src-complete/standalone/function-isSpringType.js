/* Standalone Function: isSpringType */

function isSpringType(d, o) {
    return o.some(c => d[c] !== void 0)
}

export default isSpringType;
