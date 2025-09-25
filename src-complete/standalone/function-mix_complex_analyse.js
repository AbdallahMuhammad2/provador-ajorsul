/* Standalone Function: mix_complex_analyse */

function mix_complex_analyse(d) {
    for (var o = complex$1.parse(d), c = o.length, h = 0, _ = 0, b = 0, _e = 0; _e < c; _e++)
        h || typeof o[_e] == "number" ? h++ : o[_e].hue !== void 0 ? b++ : _++;
    return {
        parsed: o,
        numNumbers: h,
        numRGB: _,
        numHSL: b
    }
}

export default mix_complex_analyse;
