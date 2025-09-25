/* Standalone Function: setFloat16 */

function setFloat16(d, o, c) {
    d.setUint16(c.value, three_module.GxU.toHalfFloat(o), !0),
    c.value += 2
}

export default setFloat16;
