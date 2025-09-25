/* Standalone Function: intersectsGeometry */

function intersectsGeometry(d, o, c, h) {
    BufferStack.setBuffer(d._roots[o]);
    const _ = _intersectsGeometry(0, d, c, h);
    return BufferStack.clearBuffer(),
    _
}

export default intersectsGeometry;
