/* Standalone Function: deepCloneAttribute */

function deepCloneAttribute(d) {
    return d.isInstancedInterleavedBufferAttribute || d.isInterleavedBufferAttribute ? deinterleaveAttribute(d) : d.isInstancedBufferAttribute ? new three_module.uWO().copy(d) : new three_module.THS().copy(d)
}

export default deepCloneAttribute;
