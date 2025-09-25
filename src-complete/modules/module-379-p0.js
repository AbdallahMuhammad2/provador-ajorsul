/*
 * Module 379 (Pattern 0)
 * Params: b
 * Size: 3205 chars
 */

// === MODULE CONTENT ===
function module379(b) {
var _e = [];
                    function nt(ut) {
                        for (var pt = -1, ht = 0; ht < _e.length; ht++)
                            if (_e[ht].identifier === ut) {
                                pt = ht;
                                break
                            }
                        return pt
                    }
                    function it(ut, pt) {
                        for (var ht = {}, _t = [], vt = 0; vt < ut.length; vt++) {
                            var bt = ut[vt]
                              , St = pt.base ? bt[0] + pt.base : bt[0]
                              , At = ht[St] || 0
                              , Et = "".concat(St, " ").concat(At);
                            ht[St] = At + 1;
                            var Pt = nt(Et)
                              , It = {
                                css: bt[1],
                                media: bt[2],
                                sourceMap: bt[3],
                                supports: bt[4],
                                layer: bt[5]
                            };
                            if (Pt !== -1)
                                _e[Pt].references++,
                                _e[Pt].updater(It);
                            else {
                                var Dt = at(It, pt);
                                pt.byIndex = vt,
                                _e.splice(vt, 0, {
                                    identifier: Et,
                                    updater: Dt,
                                    references: 1
                                })
                            }
                            _t.push(Et)
                        }
                        return _t
                    }
                    function at(ut, pt) {
                        var ht = pt.domAPI(pt);
                        return ht.update(ut),
                        function(_t) {
                            if (_t) {
                                if (_t.css === ut.css && _t.media === ut.media && _t.sourceMap === ut.sourceMap && _t.supports === ut.supports && _t.layer === ut.layer)
                                    return;
                                ht.update(ut = _t)
                            } else
                                ht.remove()
                        }
                    }
                    b.exports = function(ut, pt) {
                        var ht = it(ut = ut || [], pt = pt || {});
                        return function(_t) {
                            _t = _t || [];
                            for (var vt = 0; vt < ht.length; vt++) {
                                var bt = nt(ht[vt]);
                                _e[bt].references--
                            }
                            for (var St = it(_t, pt), At = 0; At < ht.length; At++) {
                                var Et = nt(ht[At]);
                                _e[Et].references === 0 && (_e[Et].updater(),
                                _e.splice(Et, 1))
                            }
                            ht = St
                        }
                    }
}

export default module379;
