/* Standalone Function: raycast */

function raycast(d, o, c, h, _) {
    BufferStack.setBuffer(d._roots[o]),
    _raycast(0, d, c, h, _),
    BufferStack.clearBuffer()
}

export default raycast;
