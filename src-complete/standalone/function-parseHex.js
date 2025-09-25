/* Standalone Function: parseHex */

function parseHex(d) {
    let o = ""
      , c = ""
      , h = ""
      , _ = "";
    return d.length > 5 ? (o = d.substring(1, 3),
    c = d.substring(3, 5),
    h = d.substring(5, 7),
    _ = d.substring(7, 9)) : (o = d.substring(1, 2),
    c = d.substring(2, 3),
    h = d.substring(3, 4),
    _ = d.substring(4, 5),
    o += o,
    c += c,
    h += h,
    _ += _),
    {
        red: parseInt(o, 16),
        green: parseInt(c, 16),
        blue: parseInt(h, 16),
        alpha: _ ? parseInt(_, 16) / 255 : 1
    }
}

export default parseHex;
