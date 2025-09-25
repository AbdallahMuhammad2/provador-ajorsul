/*
 * Module 186 (Pattern 0)
 * Params: d
 * Size: 2342 chars
 */

// === MODULE CONTENT ===
function module186(d) {
var o = [];
        function c(b) {
            for (var _e = -1, nt = 0; nt < o.length; nt++)
                if (o[nt].identifier === b) {
                    _e = nt;
                    break
                }
            return _e
        }
        function h(b, _e) {
            for (var nt = {}, it = [], at = 0; at < b.length; at++) {
                var ut = b[at]
                  , pt = _e.base ? ut[0] + _e.base : ut[0]
                  , ht = nt[pt] || 0
                  , _t = "".concat(pt, " ").concat(ht);
                nt[pt] = ht + 1;
                var vt = c(_t)
                  , bt = {
                    css: ut[1],
                    media: ut[2],
                    sourceMap: ut[3],
                    supports: ut[4],
                    layer: ut[5]
                };
                if (vt !== -1)
                    o[vt].references++,
                    o[vt].updater(bt);
                else {
                    var St = _(bt, _e);
                    _e.byIndex = at,
                    o.splice(at, 0, {
                        identifier: _t,
                        updater: St,
                        references: 1
                    })
                }
                it.push(_t)
            }
            return it
        }
        function _(b, _e) {
            var nt = _e.domAPI(_e);
            return nt.update(b),
            function(it) {
                if (it) {
                    if (it.css === b.css && it.media === b.media && it.sourceMap === b.sourceMap && it.supports === b.supports && it.layer === b.layer)
                        return;
                    nt.update(b = it)
                } else
                    nt.remove()
            }
        }
        d.exports = function(b, _e) {
            var nt = h(b = b || [], _e = _e || {});
            return function(it) {
                it = it || [];
                for (var at = 0; at < nt.length; at++) {
                    var ut = c(nt[at]);
                    o[ut].references--
                }
                for (var pt = h(it, _e), ht = 0; ht < nt.length; ht++) {
                    var _t = c(nt[ht]);
                    o[_t].references === 0 && (o[_t].updater(),
                    o.splice(_t, 1))
                }
                nt = pt
            }
        }
}

export default module186;
