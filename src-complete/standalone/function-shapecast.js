/* Standalone Function: shapecast */

function shapecast(d, o, c, h, _, b) {
    _box1 = boxPool.getPrimitive(),
    _box2 = boxPool.getPrimitive(),
    boxStack.push(_box1, _box2),
    BufferStack.setBuffer(d._roots[o]);
    const _e = shapecastTraverse(0, d.geometry, c, h, _, b);
    BufferStack.clearBuffer(),
    boxPool.releasePrimitive(_box1),
    boxPool.releasePrimitive(_box2),
    boxStack.pop(),
    boxStack.pop();
    const nt = boxStack.length;
    return nt > 0 && (_box2 = boxStack[nt - 1],
    _box1 = boxStack[nt - 2]),
    _e
}

export default shapecast;
