/* Standalone Function: test */

function test(d) {
    var o, c;
    return isNaN(d) && isString(d) && (((o = d.match(floatRegex)) === null || o === void 0 ? void 0 : o.length) || 0) + (((c = d.match(colorRegex)) === null || c === void 0 ? void 0 : c.length) || 0) > 0
}

export default test;
