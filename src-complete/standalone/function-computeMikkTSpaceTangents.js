/* Standalone Function: computeMikkTSpaceTangents */

function computeMikkTSpaceTangents(d, o, c=!0) {
    if (!o || !o.isReady)
        throw new Error("BufferGeometryUtils: Initialized MikkTSpace library required.");
    if (!d.hasAttribute("position") || !d.hasAttribute("normal") || !d.hasAttribute("uv"))
        throw new Error('BufferGeometryUtils: Tangents require "position", "normal", and "uv" attributes.');
    function h(_e) {
        if (_e.normalized || _e.isInterleavedBufferAttribute) {
            const nt = new Float32Array(_e.count * _e.itemSize);
            for (let it = 0, at = 0; it < _e.count; it++)
                nt[at++] = _e.getX(it),
                nt[at++] = _e.getY(it),
                _e.itemSize > 2 && (nt[at++] = _e.getZ(it));
            return nt
        }
        return _e.array instanceof Float32Array ? _e.array : new Float32Array(_e.array)
    }
    const _ = d.index ? d.toNonIndexed() : d
      , b = o.generateTangents(h(_.attributes.position), h(_.attributes.normal), h(_.attributes.uv));
    if (c)
        for (let _e = 3; _e < b.length; _e += 4)
            b[_e] *= -1;
    return _.setAttribute("tangent", new three_module.THS(b,4)),
    d !== _ && d.copy(_),
    d
}

export default computeMikkTSpaceTangents;
