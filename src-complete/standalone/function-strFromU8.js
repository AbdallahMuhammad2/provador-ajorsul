/* Standalone Function: strFromU8 */

function strFromU8(d, o) {
    if (o) {
        for (var c = "", h = 0; h < d.length; h += 16384)
            c += String.fromCharCode.apply(null, d.subarray(h, h + 16384));
        return c
    }
    if (td$1)
        return td$1.decode(d);
    var _ = dutf8(d)
      , b = _[0];
    if (_[1].length)
        throw "invalid utf-8 data";
    return b
}

export default strFromU8;
