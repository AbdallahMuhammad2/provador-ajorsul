/* Standalone Function: pl */

function pl() {}
function ql(d, o, c, h, _) {
    if (_) {
        if (typeof h == "function") {
            var b = h;
            h = function() {
                var at = gl(_e);
                b.call(at)
            }
        }
        var _e = el(o, h, d, 0, null, !1, !1, "", pl);
        return d._reactRootContainer = _e,
        d[uf] = _e.current,
        sf(d.nodeType === 8 ? d.parentNode : d),
        Rk(),
        _e
    }
    for (; _ = d.lastChild; )
        d.removeChild(_);
    if (typeof h == "function") {
        var nt = h;
        h = function() {
            var at = gl(it);
            nt.call(at)
        }
    }
    var it = bl(d, 0, !1, null, null, !1, !1, "", pl);
    return d._reactRootContainer = it,
    d[uf] = it.current,
    sf(d.nodeType === 8 ? d.parentNode : d),
    Rk(function() {
        fl(o, it, c, h)
    }),
    it
}

export default pl;
