/* Standalone Function: unzipSync */

function unzipSync(d) {
    for (var o = {}, c = d.length - 22; b4(d, c) != 101010256; --c)
        if (!c || d.length - c > 65558)
            throw "invalid zip file";
    var h = b2(d, c + 8);
    if (!h)
        return {};
    var _ = b4(d, c + 16)
      , b = _ == 4294967295;
    if (b) {
        if (c = b4(d, c - 12),
        b4(d, c) != 101075792)
            throw "invalid zip file";
        h = b4(d, c + 32),
        _ = b4(d, c + 48)
    }
    for (var _e = 0; _e < h; ++_e) {
        var nt = zh$1(d, _, b)
          , it = nt[0]
          , at = nt[1]
          , ut = nt[2]
          , pt = nt[3]
          , ht = nt[4]
          , _t = nt[5]
          , vt = slzh(d, _t);
        if (_ = ht,
        it) {
            if (it != 8)
                throw "unknown compression type " + it;
            o[pt] = inflateSync(d.subarray(vt, vt + at), new u8(ut))
        } else
            o[pt] = slc(d, vt, vt + at)
    }
    return o
}

export default unzipSync;
