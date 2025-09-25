/* Standalone Function: intersectsGeometry_indirect */

function intersectsGeometry_indirect(d, o, c, h) {
    BufferStack.setBuffer(d._roots[o]);
    const _ = intersectsGeometry_indirect_generated_intersectsGeometry(0, d, c, h);
    return BufferStack.clearBuffer(),
    _
}

export default intersectsGeometry_indirect;
