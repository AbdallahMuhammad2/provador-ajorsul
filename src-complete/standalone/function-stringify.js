/* Standalone Function: stringify */

function stringify(d) {
    var o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0
      , c = (byteToHex[d[o + 0]] + byteToHex[d[o + 1]] + byteToHex[d[o + 2]] + byteToHex[d[o + 3]] + "-" + byteToHex[d[o + 4]] + byteToHex[d[o + 5]] + "-" + byteToHex[d[o + 6]] + byteToHex[d[o + 7]] + "-" + byteToHex[d[o + 8]] + byteToHex[d[o + 9]] + "-" + byteToHex[d[o + 10]] + byteToHex[d[o + 11]] + byteToHex[d[o + 12]] + byteToHex[d[o + 13]] + byteToHex[d[o + 14]] + byteToHex[d[o + 15]]).toLowerCase();
    if (!esm_browser_validate(c))
        throw TypeError("Stringified UUID is invalid");
    return c
}

export default stringify;
