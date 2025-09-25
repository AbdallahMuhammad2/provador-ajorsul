/*
 * Module 795 (Pattern 0)
 * Params: b
 * Size: 1885 chars
 */

// === MODULE CONTENT ===
function module795(b) {
b.exports = function(_e) {
                        var nt = _e.insertStyleElement(_e);
                        return {
                            update: function(it) {
                                (function(at, ut, pt) {
                                    var ht = "";
                                    pt.supports && (ht += "@supports (".concat(pt.supports, ") {")),
                                    pt.media && (ht += "@media ".concat(pt.media, " {"));
                                    var _t = pt.layer !== void 0;
                                    _t && (ht += "@layer".concat(pt.layer.length > 0 ? " ".concat(pt.layer) : "", " {")),
                                    ht += pt.css,
                                    _t && (ht += "}"),
                                    pt.media && (ht += "}"),
                                    pt.supports && (ht += "}");
                                    var vt = pt.sourceMap;
                                    vt && typeof btoa < "u" && (ht += `
/`,
                                    ht += "*# sourceMappingURL=data:application/json;
base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(vt)))), " *"),
                                    ht += "/"),
                                    ut.styleTagTransform(ht, at, ut.options)
                                }
                                )(nt, _e, it)
                            },
                            remove: function() {
                                (function(it) {
                                    if (it.parentNode === null)
                                        return !1;
                                    it.parentNode.removeChild(it)
                                }
                                )(nt)
                            }
                        }
                    }
}

export default module795;
