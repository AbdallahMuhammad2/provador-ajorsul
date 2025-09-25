/* Standalone Function: compressZIP */

function compressZIP(d, o) {
    let c = 0
      , h = Math.floor((d.length + 1) / 2)
      , _ = 0;
    const b = d.length - 1;
    for (; !(_ > b || (o[c++] = d[_++],
    _ > b)); )
        o[h++] = d[_++];
    let _e = o[0];
    for (let nt = 1; nt < o.length; nt++) {
        const it = o[nt] - _e + 384;
        _e = o[nt],
        o[nt] = it
    }
    return fflate_module_zlibSync(o)
}

export default compressZIP;
