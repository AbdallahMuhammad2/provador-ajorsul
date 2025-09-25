/* Standalone Function: isGLB */

function isGLB(d) {
    if (d.byteLength < 3 * Uint32Array.BYTES_PER_ELEMENT)
        return !1;
    const o = new Uint32Array(d.buffer,d.byteOffset,3);
    return o[0] === 1179937895 && o[1] === 2
}

export default isGLB;
