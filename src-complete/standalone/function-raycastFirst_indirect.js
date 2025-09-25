/* Standalone Function: raycastFirst_indirect */

function raycastFirst_indirect(d, o, c, h) {
    BufferStack.setBuffer(d._roots[o]);
    const _ = raycastFirst_indirect_generated_raycastFirst(0, d, c, h);
    return BufferStack.clearBuffer(),
    _
}

export default raycastFirst_indirect;
