/* Standalone Function: raycastFirst */

function raycastFirst(d, o, c, h) {
    BufferStack.setBuffer(d._roots[o]);
    const _ = _raycastFirst(0, d, c, h);
    return BufferStack.clearBuffer(),
    _
}

export default raycastFirst;
