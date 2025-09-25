/* Standalone Function: hueToRgb */

function hueToRgb(d, o, c) {
    return c < 0 && (c += 1),
    c > 1 && (c -= 1),
    c < 1 / 6 ? d + (o - d) * 6 * c : c < 1 / 2 ? o : c < 2 / 3 ? d + (o - d) * (2 / 3 - c) * 6 : d
}

export default hueToRgb;
