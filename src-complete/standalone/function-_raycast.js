/* Standalone Function: _raycast */

function _raycast(d, o, c, h, _) {
    const {float32Array: b, uint16Array: _e, uint32Array: nt} = BufferStack
      , it = 2 * d;
    if (IS_LEAF(it, _e))
        intersectTris(o, c, h, OFFSET(d, nt), COUNT(it, _e), _);
    else {
        const at = LEFT_NODE(d);
        intersectRay(at, b, h, _boxIntersection) && _raycast(at, o, c, h, _);
        const ut = RIGHT_NODE(d, nt);
        intersectRay(ut, b, h, _boxIntersection) && _raycast(ut, o, c, h, _)
    }
}

export default _raycast;
