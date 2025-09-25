/*
 * Module 645 (Pattern 0)
 * Params: b
 * Size: 2258 chars
 */

// === MODULE CONTENT ===
function module645(b) {
b.exports = function(_e) {
                        var nt = [];
                        return nt.toString = function() {
                            return this.map(function(it) {
                                var at = ""
                                  , ut = it[5] !== void 0;
                                return it[4] && (at += "@supports (".concat(it[4], ") {")),
                                it[2] && (at += "@media ".concat(it[2], " {")),
                                ut && (at += "@layer".concat(it[5].length > 0 ? " ".concat(it[5]) : "", " {")),
                                at += _e(it),
                                ut && (at += "}"),
                                it[2] && (at += "}"),
                                it[4] && (at += "}"),
                                at
                            }).join("")
                        }
                        ,
                        nt.i = function(it, at, ut, pt, ht) {
                            typeof it == "string" && (it = [[null, it, void 0]]);
                            var _t = {};
                            if (ut)
                                for (var vt = 0; vt < this.length; vt++) {
                                    var bt = this[vt][0];
                                    bt != null && (_t[bt] = !0)
                                }
                            for (var St = 0; St < it.length; St++) {
                                var At = [].concat(it[St]);
                                ut && _t[At[0]] || (ht !== void 0 && (At[5] === void 0 || (At[1] = "@layer".concat(At[5].length > 0 ? " ".concat(At[5]) : "", " {").concat(At[1], "}")),
                                At[5] = ht),
                                at && (At[2] && (At[1] = "@media ".concat(At[2], " {").concat(At[1], "}")),
                                At[2] = at),
                                pt && (At[4] ? (At[1] = "@supports (".concat(At[4], ") {").concat(At[1], "}"),
                                At[4] = pt) : At[4] = "".concat(pt)),
                                nt.push(At))
                            }
                        }
                        ,
                        nt
                    }
}

export default module645;
