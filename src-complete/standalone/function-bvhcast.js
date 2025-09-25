/* Standalone Function: bvhcast */

function bvhcast(d, o, c, h) {
    if (_active)
        throw new Error("MeshBVH: Recursive calls to bvhcast not supported.");
    _active = !0;
    const _ = d._roots
      , b = o._roots;
    let _e, nt = 0, it = 0;
    const at = new three_module.kn4().copy(c).invert();
    for (let ut = 0, pt = _.length; ut < pt; ut++) {
        _bufferStack1.setBuffer(_[ut]),
        it = 0;
        const ht = _boxPool.getPrimitive();
        arrayToBox(0, _bufferStack1.float32Array, ht),
        ht.applyMatrix4(at);
        for (let _t = 0, vt = b.length; _t < vt && (_bufferStack2.setBuffer(b[ut]),
        _e = _traverse(0, 0, c, at, h, nt, it, 0, 0, ht),
        _bufferStack2.clearBuffer(),
        it += b[_t].length,
        !_e); _t++)
            ;
        if (_boxPool.releasePrimitive(ht),
        _bufferStack1.clearBuffer(),
        nt += _[ut].length,
        _e)
            break
    }
    return _active = !1,
    _e
}

export default bvhcast;
