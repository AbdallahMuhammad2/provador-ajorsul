/* Standalone Function: raycast_indirect_generated_raycast */

function raycast_indirect_generated_raycast(d, o, c, h, _) {
    const {float32Array: b, uint16Array: _e, uint32Array: nt} = BufferStack
      , it = 2 * d;
    if (IS_LEAF(it, _e))
        intersectTris_indirect(o, c, h, OFFSET(d, nt), COUNT(it, _e), _);
    else {
        const at = LEFT_NODE(d);
        intersectRay(at, b, h, raycast_indirect_generated_boxIntersection) && raycast_indirect_generated_raycast(at, o, c, h, _);
        const ut = RIGHT_NODE(d, nt);
        intersectRay(ut, b, h, raycast_indirect_generated_boxIntersection) && raycast_indirect_generated_raycast(ut, o, c, h, _)
    }
}

export default raycast_indirect_generated_raycast;
