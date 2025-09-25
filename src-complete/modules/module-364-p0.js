/*
 * Module 364 (Pattern 0)
 * Params: d
 * Size: 978 chars
 */

// === MODULE CONTENT ===
function module364(d) {
d.exports = function(o) {
            var c = [];
            return c.toString = function() {
                return this.map(function(h) {
                    var _ = o(h);
                    return h[2] ? "@media ".concat(h[2], " {").concat(_, "}") : _
                }).join("")
            }
            ,
            c.i = function(h, _, b) {
                typeof h == "string" && (h = [[null, h, ""]]);
                var _e = {};
                if (b)
                    for (var nt = 0; nt < this.length; nt++) {
                        var it = this[nt][0];
                        it != null && (_e[it] = !0)
                    }
                for (var at = 0; at < h.length; at++) {
                    var ut = [].concat(h[at]);
                    b && _e[ut[0]] || (_ && (ut[2] ? ut[2] = "".concat(_, " and ").concat(ut[2]) : ut[2] = _),
                    c.push(ut))
                }
            }
            ,
            c
        }
}

export default module364;
