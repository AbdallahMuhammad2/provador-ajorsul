/* Standalone Function: _raycastFirst */

function _raycastFirst(d, o, c, h) {
    const {float32Array: _, uint16Array: b, uint32Array: _e} = BufferStack;
    let nt = 2 * d;
    if (IS_LEAF(nt, b))
        return intersectClosestTri(o, c, h, OFFSET(d, _e), COUNT(nt, b));
    {
        const it = SPLIT_AXIS(d, _e)
          , at = _xyzFields[it]
          , ut = h.direction[at] >= 0;
        let pt, ht;
        ut ? (pt = LEFT_NODE(d),
        ht = RIGHT_NODE(d, _e)) : (pt = RIGHT_NODE(d, _e),
        ht = LEFT_NODE(d));
        const _t = intersectRay(pt, _, h, raycastFirst_generated_boxIntersection) ? _raycastFirst(pt, o, c, h) : null;
        if (_t) {
            const bt = _t.point[at];
            if (ut ? bt <= _[ht + it] : bt >= _[ht + it + 3])
                return _t
        }
        const vt = intersectRay(ht, _, h, raycastFirst_generated_boxIntersection) ? _raycastFirst(ht, o, c, h) : null;
        return _t && vt ? _t.distance <= vt.distance ? _t : vt : _t || vt || null
    }
}

export default _raycastFirst;
