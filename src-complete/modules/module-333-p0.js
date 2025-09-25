/*
 * Module 333 (Pattern 0)
 * Params: d
 * Size: 19832 chars
 */

// === MODULE CONTENT ===
function module333(d) {
var o;
        o = function() {
            return function(c) {
                var h = {};
                function _(b) {
                    if (h[b])
                        return h[b].exports;
                    var _e = h[b] = {
                        i: b,
                        l: !1,
                        exports: {}
                    };
                    return c[b].call(_e.exports, _e, _e.exports, _),
                    _e.l = !0,
                    _e.exports
                }
                return _.m = c,
                _.c = h,
                _.i = function(b) {
                    return b
                }
                ,
                _.d = function(b, _e, nt) {
                    _.o(b, _e) || Object.defineProperty(b, _e, {
                        configurable: !1,
                        enumerable: !0,
                        get: nt
                    })
                }
                ,
                _.n = function(b) {
                    var _e = b && b.__esModule ? function() {
                        return b.default
                    }
                    : function() {
                        return b
                    }
                    ;
                    return _.d(_e, "a", _e),
                    _e
                }
                ,
                _.o = function(b, _e) {
                    return Object.prototype.hasOwnProperty.call(b, _e)
                }
                ,
                _.p = "",
                _(_.s = 5)
            }([function(c, h, _) {
                Object.defineProperty(h, "__esModule", {
                    value: !0
                });
                var b = {
                    convertToObject: function(_e) {
                        var nt = _e.substring(_e.indexOf("{") + 1).trim().slice(0, -1)
                          , it = {};
                        return nt.split(";").map(function(at) {
                            if (at = at.trim()) {
                                var ut = at.split(":");
                                it[ut[0].trim()] = ut[1].trim()
                            }
                        }),
                        it
                    },
                    getFromSheets: function(_e) {
                        var nt = document.styleSheets;
                        for (var it in nt) {
                            var at = null;
                            try {
                                at = nt[it].rules || nt[it].cssRules
                            } catch {}
                            if (at) {
                                for (var ut in at)
                                    if (at[ut].selectorText && at[ut].selectorText.split(",").indexOf(_e) != -1)
                                        return at[ut].cssText ? b.convertToObject(at[ut].cssText) : b.convertToObject(at[ut].style.cssText)
                            }
                        }
                        return {}
                    },
                    getPropertyDefault: function(_e) {
                        return _e == "timing-function" ? "ease" : _e == "iteration-count" ? 1 : _e == "direction" ? "normal" : _e == "fill-mode" ? "none" : null
                    }
                };
                h.default = b
            }
            , function(c, h, _) {
                Object.defineProperty(h, "__esModule", {
                    value: !0
                });
                var b = {
                    generateId: function() {
                        for (var _e = "", nt = 0; nt < 8; ++nt)
                            _e += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(62 * Math.random()));
                        return _e
                    },
                    frameToString: function(_e) {
                        var nt = "";
                        for (var it in _e)
                            nt += it + ":" + _e[it] + ";";
                        return nt
                    },
                    convertTimeToMs: function(_e) {
                        if (!_e)
                            return 0;
                        if (typeof _e == "number")
                            return _e;
                        var nt = parseFloat(_e);
                        return _e.indexOf("ms") != -1 ? nt : 1e3 * nt
                    },
                    prefixes: ["", "-webkit-", "-moz-", "-o-"]
                };
                h.default = b
            }
            , function(c, h, _) {
                Object.defineProperty(h, "__esModule", {
                    value: !0
                });
                var b, _e = (b = _(0)) && b.__esModule ? b : {
                    default: b
                };
                h.default = function nt(it, at) {
                    if (function(ht, _t) {
                        if (!(ht instanceof _t))
                            throw new TypeError("Cannot call a class as a function")
                    }(this, nt),
                    this.styles = typeof it == "string" ? _e.default.getFromSheets(it) : it,
                    typeof at == "string") {
                        var ut = _e.default.getFromSheets(at);
                        for (var pt in this.options = {},
                        ut)
                            this.options[pt.replace("animation-", "")] = ut[pt]
                    } else
                        this.options = typeof at == "number" ? {
                            duration: at
                        } : at
                }
            }
            , function(c, h, _) {
                Object.defineProperty(h, "__esModule", {
                    value: !0
                });
                var b = function() {
                    function pt(ht, _t) {
                        for (var vt = 0; vt < _t.length; vt++) {
                            var bt = _t[vt];
                            bt.enumerable = bt.enumerable || !1,
                            bt.configurable = !0,
                            "value"in bt && (bt.writable = !0),
                            Object.defineProperty(ht, bt.key, bt)
                        }
                    }
                    return function(ht, _t, vt) {
                        return _t && pt(ht.prototype, _t),
                        vt && pt(ht, vt),
                        ht
                    }
                }()
                  , _e = at(_(4))
                  , nt = at(_(1))
                  , it = at(_(0));
                function at(pt) {
                    return pt && pt.__esModule ? pt : {
                        default: pt
                    }
                }
                var ut = function() {
                    function pt(ht, _t, vt, bt) {
                        if (function(Et, Pt) {
                            if (!(Et instanceof Pt))
                                throw new TypeError("Cannot call a class as a function")
                        }(this, pt),
                        ht.constructor === Array ? this.doms = ht : this.doms = [ht],
                        _t.constructor === Array ? this.frames = _t : this.frames = [_t],
                        this.options = {
                            startFrom: 0,
                            pauseAt: [],
                            prefix: !1,
                            count: 1,
                            clear: !0,
                            applyOnEnd: !1,
                            instant: !1
                        },
                        vt != null && vt != null)
                            if (typeof vt == "boolean")
                                this.options.instant = vt;
                            else if (typeof vt == "number")
                                this.options.count = vt,
                                typeof bt == "boolean" && (this.options.instant = bt);
                            else
                                for (var St in vt)
                                    St == "pauseAt" && vt.pauseAt.constructor !== Array ? this.options[St] = [vt[St]] : this.options[St] = vt[St];
                        for (var At in this.promiseSupported = typeof Promise < "u" && Promise.toString().indexOf("[native code]") !== -1,
                        this.countRemainder = [],
                        this.animations = [],
                        this.styleDoms = [],
                        this.superSets = [],
                        this.eventHandler = [],
                        this.options.prefix ? this.prefixes = nt.default.prefixes : this.prefixes = [""],
                        ht)
                            this.countRemainder[At] = this.options.count - 1;
                        this.options.instant && this.play()
                    }
                    return b(pt, [{
                        key: "play",
                        value: function() {
                            var ht = this;
                            for (var _t in this.clear(),
                            this.promiseSupported && (this.promise = new Promise(function(bt) {
                                ht.promiseResolve = bt
                            }
                            )),
                            this.doms) {
                                var vt = this.makeAnimation(this.doms[_t]);
                                this.animations[_t] = vt.names,
                                this.styleDoms[_t] = vt.styleDom,
                                this.superSets[_t] = this.makeSuperSet(this.doms[_t], this.animations[_t]),
                                this.playAnimation(this.doms[_t], this.superSets[_t]),
                                this.eventHandler[_t] = this.handleAnimationEnd.bind(this, _t),
                                this.doms[_t].addEventListener("animationend", this.eventHandler[_t])
                            }
                            if (this.promiseSupported)
                                return this.promise
                        }
                    }, {
                        key: "clear",
                        value: function(ht) {
                            if (!ht) {
                                for (var _t in this.doms)
                                    this.clear(_t);
                                return this.animationEnded = 0,
                                this.promise = void 0,
                                void (this.promiseResolve = void 0)
                            }
                            var vt = this.styleDoms[ht];
                            for (var bt in vt && vt.parentNode && vt.parentNode.removeChild(vt),
                            this.superSets[ht])
                                for (var St in this.prefixes)
                                    this.doms[ht].style[this.prefixes[St] + "animation-" + bt] = null;
                            for (var At in this.prefixes)
                                this.doms[ht].style[this.prefixes[At] + "animation-play-state"] = null;
                            this.doms[ht].removeEventListener("animationend", this.eventHandler[ht]),
                            this.countRemainder[ht] = this.options.count - 1
                        }
                    }, {
                        key: "replay",
                        value: function(ht) {
                            var _t = this.doms[ht]
                              , vt = _t.cloneNode(!0);
                            _t.parentNode.replaceChild(vt, _t),
                            this.doms[ht].removeEventListener("animationend", this.eventHandler[ht]),
                            this.doms[ht] = vt,
                            this.doms[ht].addEventListener("animationend", this.eventHandler[ht])
                        }
                    }, {
                        key: "pause",
                        value: function() {
                            for (var ht in this.doms)
                                this.pauseDom(this.doms[ht])
                        }
                    }, {
                        key: "resume",
                        value: function() {
                            for (var ht in this.doms)
                                this.resumeDom(this.doms[ht])
                        }
                    }, {
                        key: "getPromise",
                        value: function() {
                            return this.promise
                        }
                    }, {
                        key: "handleAnimationEnd",
                        value: function(ht, _t) {
                            var vt = _t.animationName
                              , bt = vt.substring(vt.lastIndexOf("-") + 1);
                            this.options.pauseAt.includes(parseInt(bt)) && this.pauseDom(this.doms[ht]),
                            bt == this.frames.length && (this.countRemainder[ht] == -1 ? this.replay(ht) : this.countRemainder[ht] > 0 ? (this.countRemainder[ht]--,
                            this.replay(ht)) : (this.options.applyOnEnd && this.applyOnEnd(ht),
                            this.animationEnded++,
                            this.animationEnded == this.doms.length && (this.promiseSupported && this.promiseResolve(),
                            this.options.clear && this.clear())))
                        }
                    }, {
                        key: "pauseDom",
                        value: function(ht) {
                            for (var _t in this.prefixes)
                                ht.style[this.prefixes[_t] + "animation-play-state"] = "paused"
                        }
                    }, {
                        key: "resumeDom",
                        value: function(ht) {
                            for (var _t in this.prefixes)
                                ht.style[this.prefixes[_t] + "animation-play-state"] = "running"
                        }
                    }, {
                        key: "applyOnEnd",
                        value: function(ht) {
                            var _t = this.newFrames[this.frames.length];
                            for (var vt in _t)
                                this.doms[ht].style[vt] = _t[vt]
                        }
                    }, {
                        key: "makeAnimation",
                        value: function(ht) {
                            var _t = {}
                              , vt = []
                              , bt = {};
                            for (var St in this.frames)
                                for (var At in vt.push(this.frames[St].styles),
                                vt[St])
                                    bt[At] = !0;
                            var Et = window.getComputedStyle(ht);
                            for (var Pt in bt)
                                _t[Pt] = Et[Pt];
                            vt.unshift(_t);
                            for (var It = [vt[0]], Dt = 1; Dt < vt.length; ++Dt) {
                                var Gt = JSON.parse(JSON.stringify(It[Dt - 1]));
                                for (var Bt in vt[Dt])
                                    Gt[Bt] = vt[Dt][Bt];
                                It.push(Gt)
                            }
                            return this.newFrames = It,
                            _e.default.make(It, this.prefixes)
                        }
                    }, {
                        key: "makeSuperSet",
                        value: function(ht, _t) {
                            var vt = 0
                              , bt = {};
                            for (var St in this.frames)
                                for (var At in this.frames[St].options)
                                    bt[At] = "";
                            bt.name = "",
                            bt.duration = "",
                            bt.delay = "";
                            for (var Et = 0; Et < this.frames.length; ++Et) {
                                if (Et)
                                    for (var Pt in bt)
                                        bt[Pt] += ",";
                                var It = nt.default.convertTimeToMs(this.frames[Et].options.duration)
                                  , Dt = nt.default.convertTimeToMs(this.frames[Et].options.delay);
                                for (var Gt in Et < this.options.startFrom && (It = 0,
                                Dt = 0),
                                bt.name += _t[Et],
                                bt.duration += It + "ms",
                                bt.delay += vt + Dt + "ms",
                                bt)
                                    Gt != "name" && Gt != "duration" && Gt != "delay" && (bt[Gt] += this.frames[Et].options[Gt] ? this.frames[Et].options[Gt] : it.default.getPropertyDefault(Gt));
                                var Bt = this.frames[Et].options["iteration-count"];
                                vt += It * parseInt(Bt || 1) + Dt
                            }
                            return bt
                        }
                    }, {
                        key: "playAnimation",
                        value: function(ht, _t) {
                            for (var vt in _t)
                                for (var bt in this.prefixes)
                                    ht.style[this.prefixes[bt] + "animation-" + vt] = _t[vt];
                            this.options.pauseAt.includes(0) && this.pauseDom(ht)
                        }
                    }]),
                    pt
                }();
                h.default = ut
            }
            , function(c, h, _) {
                Object.defineProperty(h, "__esModule", {
                    value: !0
                });
                var b, _e = (b = _(1)) && b.__esModule ? b : {
                    default: b
                }, nt = {
                    make: function(it, at) {
                        for (var ut = [], pt = "", ht = "atr-" + _e.default.generateId(), _t = document.createElement("style"), vt = 0; vt < it.length - 1; ++vt)
                            ut.push(ht + "-" + (vt + 1)),
                            pt += nt.makeFromTwoFrames(it[vt], it[vt + 1], ut[vt], at);
                        return _t.innerHTML = pt,
                        _t.class = "foo",
                        document.getElementsByTagName("head")[0].appendChild(_t),
                        {
                            names: ut,
                            styleDom: _t
                        }
                    },
                    makeFromTwoFrames: function(it, at, ut, pt) {
                        var ht = "";
                        for (var _t in pt)
                            ht += "@" + pt[_t] + "keyframes " + ut + " {",
                            ht += "0%",
                            ht += "{" + _e.default.frameToString(it) + "}",
                            ht += "100%",
                            ht += "{" + _e.default.frameToString(at) + "}",
                            ht += "}";
                        return ht
                    }
                };
                h.default = nt
            }
            , function(c, h, _) {
                Object.defineProperty(h, "__esModule", {
                    value: !0
                }),
                h.Queue = h.Frame = void 0;
                var b = nt(_(2))
                  , _e = nt(_(3));
                function nt(it) {
                    return it && it.__esModule ? it : {
                        default: it
                    }
                }
                h.Frame = b.default,
                h.Queue = _e.default
            }
            ])
        }
        ,
        d.exports = o()
}

export default module333;
