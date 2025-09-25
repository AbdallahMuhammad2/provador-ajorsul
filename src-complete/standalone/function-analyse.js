/* Standalone Function: analyse */

function analyse(d) {
    typeof d == "number" && (d = "" + d);
    var o = []
      , c = 0
      , h = d.match(colorRegex$1);
    h && (c = h.length,
    d = d.replace(colorRegex$1, colorToken),
    o.push.apply(o, h.map(color$1.parse)));
    var _ = d.match(floatRegex$1);
    return _ && (d = d.replace(floatRegex$1, numberToken),
    o.push.apply(o, _.map(number$1.parse))),
    {
        values: o,
        numColors: c,
        tokenised: d
    }
}

export default analyse;
