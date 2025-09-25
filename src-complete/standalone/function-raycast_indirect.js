/* Standalone Function: raycast_indirect */

function raycast_indirect(d, o, c, h, _) {
    BufferStack.setBuffer(d._roots[o]),
    raycast_indirect_generated_raycast(0, d, c, h, _),
    BufferStack.clearBuffer()
}

export default raycast_indirect;
