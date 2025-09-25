/*
 * Module 537 (Pattern 0)
 * Params: b
 * Size: 906 chars
 */

// === MODULE CONTENT ===
function module537(b) {
b.exports = function(_e) {
                        var nt = _e[1]
                          , it = _e[3];
                        if (!it)
                            return nt;
                        if (typeof btoa == "function") {
                            var at = btoa(unescape(encodeURIComponent(JSON.stringify(it))))
                              , ut = "sourceMappingURL=data:application/json;
charset=utf-8;
base64,".concat(at)
                              , pt = "/*# ".concat(ut, " */")
                              , ht = it.sources.map(function(_t) {
                                return "/*# sourceURL=".concat(it.sourceRoot || "").concat(_t, " */")
                            });
                            return [nt].concat(ht).concat([pt]).join(`
`)
                        }
                        return [nt].join(`
`)
                    }
}

export default module537;
