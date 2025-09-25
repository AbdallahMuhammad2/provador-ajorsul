/*
 * Module 161 (Pattern 0)
 * Params: d
 * Size: 1090 chars
 */

// === MODULE CONTENT ===
function module161(d) {
d.exports = function(o, c, h) {
            return o.length === 0 ? o : c ? (h || o.sort(c),
            function(_, b) {
                for (var _e = 1, nt = _.length, it = _[0], at = _[0], ut = 1; ut < nt; ++ut)
                    if (at = it,
                    b(it = _[ut], at)) {
                        if (ut === _e) {
                            _e++;
                            continue
                        }
                        _[_e++] = it
                    }
                return _.length = _e,
                _
            }(o, c)) : (h || o.sort(),
            function(_) {
                for (var b = 1, _e = _.length, nt = _[0], it = _[0], at = 1; at < _e; ++at,
                it = nt)
                    if (it = nt,
                    (nt = _[at]) !== it) {
                        if (at === b) {
                            b++;
                            continue
                        }
                        _[b++] = nt
                    }
                return _.length = b,
                _
            }(o))
        }
}

export default module161;
