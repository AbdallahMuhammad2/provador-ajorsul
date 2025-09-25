/* Standalone Function: deinterleaveAttribute */

function deinterleaveAttribute(d) {
    const o = d.data.array.constructor
      , c = d.count
      , h = d.itemSize
      , _ = d.normalized
      , b = new o(c * h);
    let _e;
    _e = d.isInstancedInterleavedBufferAttribute ? new three_module.uWO(b,h,_,d.meshPerAttribute) : new three_module.THS(b,h,_);
    for (let nt = 0; nt < c; nt++)
        _e.setX(nt, d.getX(nt)),
        h >= 2 && _e.setY(nt, d.getY(nt)),
        h >= 3 && _e.setZ(nt, d.getZ(nt)),
        h >= 4 && _e.setW(nt, d.getW(nt));
    return _e
}

export default deinterleaveAttribute;
