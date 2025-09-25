/* Standalone Function: transform */

function transform(...d) {
    const o = !Array.isArray(d[0])
      , c = o ? 0 : -1
      , h = d[0 + c]
      , _ = d[1 + c]
      , b = d[2 + c]
      , _e = d[3 + c]
      , nt = interpolate(_, b, {
        mixer: getMixer(b[0]),
        ..._e
    });
    return o ? nt(h) : nt
}

export default transform;
