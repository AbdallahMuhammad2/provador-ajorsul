/* Standalone Function: generateIndirectBuffer */

function generateIndirectBuffer(d, o) {
    const c = (d.index ? d.index.count : d.attributes.position.count) / 3
      , h = c > 65536
      , _ = h ? 4 : 2
      , b = o ? new SharedArrayBuffer(c * _) : new ArrayBuffer(c * _)
      , _e = h ? new Uint32Array(b) : new Uint16Array(b);
    for (let nt = 0, it = _e.length; nt < it; nt++)
        _e[nt] = nt;
    return _e
}

export default generateIndirectBuffer;
