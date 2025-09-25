/* Standalone Function: hslaToRgba */

function hslaToRgba({hue: d, saturation: o, lightness: c, alpha: h}) {
    d /= 360,
    o /= 100,
    c /= 100;
    let _ = 0
      , b = 0
      , _e = 0;
    if (!o)
        _ = b = _e = c;
    else {
        const nt = c < .5 ? c * (1 + o) : c + o - c * o
          , it = 2 * c - nt;
        _ = hueToRgb(it, nt, d + 1 / 3),
        b = hueToRgb(it, nt, d),
        _e = hueToRgb(it, nt, d - 1 / 3)
    }
    return {
        red: Math.round(_ * 255),
        green: Math.round(b * 255),
        blue: Math.round(_e * 255),
        alpha: h
    }
}

export default hslaToRgba;
