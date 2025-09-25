/* Standalone Function: setUint64 */

function setUint64(d, o, c) {
    d.setBigUint64(c.value, BigInt(o), !0),
    c.value += 8
}

export default setUint64;
