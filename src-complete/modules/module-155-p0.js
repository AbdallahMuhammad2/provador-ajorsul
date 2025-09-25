/*
 * Module 155 (Pattern 0)
 * Params: d
 * Size: 1471 chars
 */

// === MODULE CONTENT ===
function module155(d) {
d.exports = function(o) {
            var c = o.insertStyleElement(o);
            return {
                update: function(h) {
                    (function(_, b, _e) {
                        var nt = "";
                        _e.supports && (nt += "@supports (".concat(_e.supports, ") {")),
                        _e.media && (nt += "@media ".concat(_e.media, " {"));
                        var it = _e.layer !== void 0;
                        it && (nt += "@layer".concat(_e.layer.length > 0 ? " ".concat(_e.layer) : "", " {")),
                        nt += _e.css,
                        it && (nt += "}"),
                        _e.media && (nt += "}"),
                        _e.supports && (nt += "}");
                        var at = _e.sourceMap;
                        at && typeof btoa < "u" && (nt += `
/`,
                        nt += "*# sourceMappingURL=data:application/json;
base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(at)))), " *"),
                        nt += "/"),
                        b.styleTagTransform(nt, _, b.options)
                    }
                    )(c, o, h)
                },
                remove: function() {
                    (function(h) {
                        if (h.parentNode === null)
                            return !1;
                        h.parentNode.removeChild(h)
                    }
                    )(c)
                }
            }
        }
}

export default module155;
