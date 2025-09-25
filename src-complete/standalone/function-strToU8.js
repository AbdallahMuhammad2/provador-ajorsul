/* Standalone Function: strToU8 */

function strToU8(d, o) {
    if (o) {
        for (var c = new u8(d.length), h = 0; h < d.length; ++h)
            c[h] = d.charCodeAt(h);
        return c
    }
    if (browser_te)
        return browser_te.encode(d);
    var _ = d.length
      , b = new u8(d.length + (d.length >> 1))
      , _e = 0
      , nt = function(ut) {
        b[_e++] = ut
    };
    for (h = 0; h < _; ++h) {
        if (_e + 5 > b.length) {
            var it = new u8(_e + 8 + (_ - h << 1));
            it.set(b),
            b = it
        }
        var at = d.charCodeAt(h);
        at < 128 || o ? nt(at) : at < 2048 ? (nt(192 | at >> 6),
        nt(128 | 63 & at)) : at > 55295 && at < 57344 ? (nt(240 | (at = 65536 + (1047552 & at) | 1023 & d.charCodeAt(++h)) >> 18),
        nt(128 | at >> 12 & 63),
        nt(128 | at >> 6 & 63),
        nt(128 | 63 & at)) : (nt(224 | at >> 12),
        nt(128 | at >> 6 & 63),
        nt(128 | 63 & at))
    }
    return slc(b, 0, _e)
}

export default strToU8;
