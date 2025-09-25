/*
 * Module 516 (Pattern 0)
 * Params: d
 * Size: 83678 chars
 */

// === MODULE CONTENT ===
function module516(d) {
d.exports = function o(c, h, _) {
            function b(it, at) {
                if (!h[it]) {
                    if (!c[it]) {
                        if (_e)
                            return _e(it, !0);
                        throw new Error("Cannot find module '" + it + "'")
                    }
                    var ut = h[it] = {
                        exports: {}
                    };
                    c[it][0].call(ut.exports, function(pt) {
                        return b(c[it][1][pt] || pt)
                    }, ut, ut.exports, o, c, h, _)
                }
                return h[it].exports
            }
            for (var _e = void 0, nt = 0; nt < _.length; nt++)
                b(_[nt]);
            return b
        }({
            1: [function(o, c, h) {
                (function(_, b, _e, nt, it, at, ut, pt, ht) {
                    var _t = o("crypto");
                    function vt(Dt, Gt) {
                        return function(Bt, kt) {
                            var Ut;
                            if ((Ut = kt.algorithm !== "passthrough" ? _t.createHash(kt.algorithm) : new It).write === void 0 && (Ut.write = Ut.update,
                            Ut.end = Ut.update),
                            Pt(kt, Ut).dispatch(Bt),
                            Ut.update || Ut.end(""),
                            Ut.digest)
                                return Ut.digest(kt.encoding === "buffer" ? void 0 : kt.encoding);
                            var Ht = Ut.read();
                            return kt.encoding !== "buffer" ? Ht.toString(kt.encoding) : Ht
                        }(Dt, Gt = At(Dt, Gt))
                    }
                    (h = c.exports = vt).sha1 = function(Dt) {
                        return vt(Dt)
                    }
                    ,
                    h.keys = function(Dt) {
                        return vt(Dt, {
                            excludeValues: !0,
                            algorithm: "sha1",
                            encoding: "hex"
                        })
                    }
                    ,
                    h.MD5 = function(Dt) {
                        return vt(Dt, {
                            algorithm: "md5",
                            encoding: "hex"
                        })
                    }
                    ,
                    h.keysMD5 = function(Dt) {
                        return vt(Dt, {
                            algorithm: "md5",
                            encoding: "hex",
                            excludeValues: !0
                        })
                    }
                    ;
                    var bt = _t.getHashes ? _t.getHashes().slice() : ["sha1", "md5"];
                    bt.push("passthrough");
                    var St = ["buffer", "hex", "binary", "base64"];
                    function At(Dt, Gt) {
                        Gt = Gt || {};
                        var Bt = {};
                        if (Bt.algorithm = Gt.algorithm || "sha1",
                        Bt.encoding = Gt.encoding || "hex",
                        Bt.excludeValues = !!Gt.excludeValues,
                        Bt.algorithm = Bt.algorithm.toLowerCase(),
                        Bt.encoding = Bt.encoding.toLowerCase(),
                        Bt.ignoreUnknown = Gt.ignoreUnknown === !0,
                        Bt.respectType = Gt.respectType !== !1,
                        Bt.respectFunctionNames = Gt.respectFunctionNames !== !1,
                        Bt.respectFunctionProperties = Gt.respectFunctionProperties !== !1,
                        Bt.unorderedArrays = Gt.unorderedArrays === !0,
                        Bt.unorderedSets = Gt.unorderedSets !== !1,
                        Bt.unorderedObjects = Gt.unorderedObjects !== !1,
                        Bt.replacer = Gt.replacer || void 0,
                        Bt.excludeKeys = Gt.excludeKeys || void 0,
                        Dt === void 0)
                            throw new Error("Object argument required.");
                        for (var kt = 0; kt < bt.length; ++kt)
                            bt[kt].toLowerCase() === Bt.algorithm.toLowerCase() && (Bt.algorithm = bt[kt]);
                        if (bt.indexOf(Bt.algorithm) === -1)
                            throw new Error('Algorithm "' + Bt.algorithm + '"  not supported. supported values: ' + bt.join(", "));
                        if (St.indexOf(Bt.encoding) === -1 && Bt.algorithm !== "passthrough")
                            throw new Error('Encoding "' + Bt.encoding + '"  not supported. supported values: ' + St.join(", "));
                        return Bt
                    }
                    function Et(Dt) {
                        if (typeof Dt == "function")
                            return /^function\s+\w*\s*\(\s*\)\s*{\s+\[native code\]\s+}$/i.exec(Function.prototype.toString.call(Dt)) != null
                    }
                    function Pt(Dt, Gt, Bt) {
                        function kt(Ut) {
                            return Gt.update ? Gt.update(Ut, "utf8") : Gt.write(Ut, "utf8")
                        }
                        return Bt = Bt || [],
                        {
                            dispatch: function(Ut) {
                                return Dt.replacer && (Ut = Dt.replacer(Ut)),
                                this["_" + (Ut === null ? "null" : typeof Ut)](Ut)
                            },
                            _object: function(Ut) {
                                var Ht, Kt = Object.prototype.toString.call(Ut), Jt = /\[object (.*)\]/i.exec(Kt);
                                if (Jt = (Jt = Jt ? Jt[1] : "unknown:[" + Kt + "]").toLowerCase(),
                                0 <= (Ht = Bt.indexOf(Ut)))
                                    return this.dispatch("[CIRCULAR:" + Ht + "]");
                                if (Bt.push(Ut),
                                _e !== void 0 && _e.isBuffer && _e.isBuffer(Ut))
                                    return kt("buffer:"),
                                    kt(Ut);
                                if (Jt === "object" || Jt === "function" || Jt === "asyncfunction") {
                                    var or = Object.keys(Ut);
                                    Dt.unorderedObjects && (or = or.sort()),
                                    Dt.respectType === !1 || Et(Ut) || or.splice(0, 0, "prototype", "__proto__", "constructor"),
                                    Dt.excludeKeys && (or = or.filter(function(lr) {
                                        return !Dt.excludeKeys(lr)
                                    })),
                                    kt("object:" + or.length + ":");
                                    var ir = this;
                                    return or.forEach(function(lr) {
                                        ir.dispatch(lr),
                                        kt(":"),
                                        Dt.excludeValues || ir.dispatch(Ut[lr]),
                                        kt(",")
                                    })
                                }
                                if (!this["_" + Jt]) {
                                    if (Dt.ignoreUnknown)
                                        return kt("[" + Jt + "]");
                                    throw new Error('Unknown object type "' + Jt + '"')
                                }
                                this["_" + Jt](Ut)
                            },
                            _array: function(Ut, Ht) {
                                Ht = Ht !== void 0 ? Ht : Dt.unorderedArrays !== !1;
                                var Kt = this;
                                if (kt("array:" + Ut.length + ":"),
                                !Ht || Ut.length <= 1)
                                    return Ut.forEach(function(ir) {
                                        return Kt.dispatch(ir)
                                    });
                                var Jt = []
                                  , or = Ut.map(function(ir) {
                                    var lr = new It
                                      , ar = Bt.slice();
                                    return Pt(Dt, lr, ar).dispatch(ir),
                                    Jt = Jt.concat(ar.slice(Bt.length)),
                                    lr.read().toString()
                                });
                                return Bt = Bt.concat(Jt),
                                or.sort(),
                                this._array(or, !1)
                            },
                            _date: function(Ut) {
                                return kt("date:" + Ut.toJSON())
                            },
                            _symbol: function(Ut) {
                                return kt("symbol:" + Ut.toString())
                            },
                            _error: function(Ut) {
                                return kt("error:" + Ut.toString())
                            },
                            _boolean: function(Ut) {
                                return kt("bool:" + Ut.toString())
                            },
                            _string: function(Ut) {
                                kt("string:" + Ut.length + ":"),
                                kt(Ut.toString())
                            },
                            _function: function(Ut) {
                                kt("fn:"),
                                Et(Ut) ? this.dispatch("[native]") : this.dispatch(Ut.toString()),
                                Dt.respectFunctionNames !== !1 && this.dispatch("function-name:" + String(Ut.name)),
                                Dt.respectFunctionProperties && this._object(Ut)
                            },
                            _number: function(Ut) {
                                return kt("number:" + Ut.toString())
                            },
                            _xml: function(Ut) {
                                return kt("xml:" + Ut.toString())
                            },
                            _null: function() {
                                return kt("Null")
                            },
                            _undefined: function() {
                                return kt("Undefined")
                            },
                            _regexp: function(Ut) {
                                return kt("regex:" + Ut.toString())
                            },
                            _uint8array: function(Ut) {
                                return kt("uint8array:"),
                                this.dispatch(Array.prototype.slice.call(Ut))
                            },
                            _uint8clampedarray: function(Ut) {
                                return kt("uint8clampedarray:"),
                                this.dispatch(Array.prototype.slice.call(Ut))
                            },
                            _int8array: function(Ut) {
                                return kt("uint8array:"),
                                this.dispatch(Array.prototype.slice.call(Ut))
                            },
                            _uint16array: function(Ut) {
                                return kt("uint16array:"),
                                this.dispatch(Array.prototype.slice.call(Ut))
                            },
                            _int16array: function(Ut) {
                                return kt("uint16array:"),
                                this.dispatch(Array.prototype.slice.call(Ut))
                            },
                            _uint32array: function(Ut) {
                                return kt("uint32array:"),
                                this.dispatch(Array.prototype.slice.call(Ut))
                            },
                            _int32array: function(Ut) {
                                return kt("uint32array:"),
                                this.dispatch(Array.prototype.slice.call(Ut))
                            },
                            _float32array: function(Ut) {
                                return kt("float32array:"),
                                this.dispatch(Array.prototype.slice.call(Ut))
                            },
                            _float64array: function(Ut) {
                                return kt("float64array:"),
                                this.dispatch(Array.prototype.slice.call(Ut))
                            },
                            _arraybuffer: function(Ut) {
                                return kt("arraybuffer:"),
                                this.dispatch(new Uint8Array(Ut))
                            },
                            _url: function(Ut) {
                                return kt("url:" + Ut.toString())
                            },
                            _map: function(Ut) {
                                kt("map:");
                                var Ht = Array.from(Ut);
                                return this._array(Ht, Dt.unorderedSets !== !1)
                            },
                            _set: function(Ut) {
                                kt("set:");
                                var Ht = Array.from(Ut);
                                return this._array(Ht, Dt.unorderedSets !== !1)
                            },
                            _file: function(Ut) {
                                return kt("file:"),
                                this.dispatch([Ut.name, Ut.size, Ut.type, Ut.lastModfied])
                            },
                            _blob: function() {
                                if (Dt.ignoreUnknown)
                                    return kt("[blob]");
                                throw Error(`Hashing Blob objects is currently not supported
(see https://github.com/puleos/object-hash/issues/26)
Use "options.replacer" or "options.ignoreUnknown"
`)
                            },
                            _domwindow: function() {
                                return kt("domwindow")
                            },
                            _bigint: function(Ut) {
                                return kt("bigint:" + Ut.toString())
                            },
                            _process: function() {
                                return kt("process")
                            },
                            _timer: function() {
                                return kt("timer")
                            },
                            _pipe: function() {
                                return kt("pipe")
                            },
                            _tcp: function() {
                                return kt("tcp")
                            },
                            _udp: function() {
                                return kt("udp")
                            },
                            _tty: function() {
                                return kt("tty")
                            },
                            _statwatcher: function() {
                                return kt("statwatcher")
                            },
                            _securecontext: function() {
                                return kt("securecontext")
                            },
                            _connection: function() {
                                return kt("connection")
                            },
                            _zlib: function() {
                                return kt("zlib")
                            },
                            _context: function() {
                                return kt("context")
                            },
                            _nodescript: function() {
                                return kt("nodescript")
                            },
                            _httpparser: function() {
                                return kt("httpparser")
                            },
                            _dataview: function() {
                                return kt("dataview")
                            },
                            _signal: function() {
                                return kt("signal")
                            },
                            _fsevent: function() {
                                return kt("fsevent")
                            },
                            _tlswrap: function() {
                                return kt("tlswrap")
                            }
                        }
                    }
                    function It() {
                        return {
                            buf: "",
                            write: function(Dt) {
                                this.buf += Dt
                            },
                            end: function(Dt) {
                                this.buf += Dt
                            },
                            read: function() {
                                return this.buf
                            }
                        }
                    }
                    h.writeToStream = function(Dt, Gt, Bt) {
                        return Bt === void 0 && (Bt = Gt,
                        Gt = {}),
                        Pt(Gt = At(Dt, Gt), Bt).dispatch(Dt)
                    }
                }
                ).call(this, o("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, o("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/fake_7eac155c.js", "/")
            }
            , {
                buffer: 3,
                crypto: 5,
                lYpoI2: 10
            }],
            2: [function(o, c, h) {
                (function(_, b, _e, nt, it, at, ut, pt, ht) {
                    (function(_t) {
                        var vt = typeof Uint8Array < "u" ? Uint8Array : Array
                          , bt = 43
                          , St = 47
                          , At = 48
                          , Et = 97
                          , Pt = 65
                          , It = 45
                          , Dt = 95;
                        function Gt(Bt) {
                            var kt = Bt.charCodeAt(0);
                            return kt === bt || kt === It ? 62 : kt === St || kt === Dt ? 63 : kt < At ? -1 : kt < At + 10 ? kt - At + 26 + 26 : kt < Pt + 26 ? kt - Pt : kt < Et + 26 ? kt - Et + 26 : void 0
                        }
                        _t.toByteArray = function(Bt) {
                            var kt, Ut;
                            if (0 < Bt.length % 4)
                                throw new Error("Invalid string. Length must be a multiple of 4");
                            var Ht = Bt.length
                              , Kt = Bt.charAt(Ht - 2) === "=" ? 2 : Bt.charAt(Ht - 1) === "=" ? 1 : 0
                              , Jt = new vt(3 * Bt.length / 4 - Kt)
                              , or = 0 < Kt ? Bt.length - 4 : Bt.length
                              , ir = 0;
                            function lr(ar) {
                                Jt[ir++] = ar
                            }
                            for (kt = 0; kt < or; kt += 4,
                            0)
                                lr((16711680 & (Ut = Gt(Bt.charAt(kt)) << 18 | Gt(Bt.charAt(kt + 1)) << 12 | Gt(Bt.charAt(kt + 2)) << 6 | Gt(Bt.charAt(kt + 3)))) >> 16),
                                lr((65280 & Ut) >> 8),
                                lr(255 & Ut);
                            return Kt == 2 ? lr(255 & (Ut = Gt(Bt.charAt(kt)) << 2 | Gt(Bt.charAt(kt + 1)) >> 4)) : Kt == 1 && (lr((Ut = Gt(Bt.charAt(kt)) << 10 | Gt(Bt.charAt(kt + 1)) << 4 | Gt(Bt.charAt(kt + 2)) >> 2) >> 8 & 255),
                            lr(255 & Ut)),
                            Jt
                        }
                        ,
                        _t.fromByteArray = function(Bt) {
                            var kt, Ut, Ht, Kt, Jt = Bt.length % 3, or = "";
                            function ir(lr) {
                                return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(lr)
                            }
                            for (kt = 0,
                            Ht = Bt.length - Jt; kt < Ht; kt += 3)
                                or += ir((Kt = Ut = (Bt[kt] << 16) + (Bt[kt + 1] << 8) + Bt[kt + 2]) >> 18 & 63) + ir(Kt >> 12 & 63) + ir(Kt >> 6 & 63) + ir(63 & Kt);
                            switch (Jt) {
                            case 1:
                                or += ir((Ut = Bt[Bt.length - 1]) >> 2),
                                or += ir(Ut << 4 & 63),
                                or += "==";
                                break;
                            case 2:
                                or += ir((Ut = (Bt[Bt.length - 2] << 8) + Bt[Bt.length - 1]) >> 10),
                                or += ir(Ut >> 4 & 63),
                                or += ir(Ut << 2 & 63),
                                or += "="
                            }
                            return or
                        }
                    }
                    )(h === void 0 ? this.base64js = {} : h)
                }
                ).call(this, o("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, o("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/base64-js/lib/b64.js", "/node_modules/gulp-browserify/node_modules/base64-js/lib")
            }
            , {
                buffer: 3,
                lYpoI2: 10
            }],
            3: [function(o, c, h) {
                (function(_, b, bt, nt, it, at, ut, pt, ht) {
                    var _t = o("base64-js")
                      , vt = o("ieee754");
                    function bt(tr, fr, vr) {
                        if (!(this instanceof bt))
                            return new bt(tr,fr,vr);
                        var Zr, rn, hn, Nn, Wn, qn = typeof tr;
                        if (fr === "base64" && qn == "string")
                            for (tr = (Zr = tr).trim ? Zr.trim() : Zr.replace(/^\s+|\s+$/g, ""); tr.length % 4 != 0; )
                                tr += "=";
                        if (qn == "number")
                            rn = ir(tr);
                        else if (qn == "string")
                            rn = bt.byteLength(tr, fr);
                        else {
                            if (qn != "object")
                                throw new Error("First argument needs to be a number, array or string.");
                            rn = ir(tr.length)
                        }
                        if (bt._useTypedArrays ? hn = bt._augment(new Uint8Array(rn)) : ((hn = this).length = rn,
                        hn._isBuffer = !0),
                        bt._useTypedArrays && typeof tr.byteLength == "number")
                            hn._set(tr);
                        else if (lr(Wn = tr) || bt.isBuffer(Wn) || Wn && typeof Wn == "object" && typeof Wn.length == "number")
                            for (Nn = 0; Nn < rn; Nn++)
                                bt.isBuffer(tr) ? hn[Nn] = tr.readUInt8(Nn) : hn[Nn] = tr[Nn];
                        else if (qn == "string")
                            hn.write(tr, 0, fr);
                        else if (qn == "number" && !bt._useTypedArrays && !vr)
                            for (Nn = 0; Nn < rn; Nn++)
                                hn[Nn] = 0;
                        return hn
                    }
                    function St(tr, fr, vr, Zr) {
                        Zr || (Cr(typeof vr == "boolean", "missing or invalid endian"),
                        Cr(fr != null, "missing offset"),
                        Cr(fr + 1 < tr.length, "Trying to read beyond buffer length"));
                        var rn, hn = tr.length;
                        if (!(hn <= fr))
                            return vr ? (rn = tr[fr],
                            fr + 1 < hn && (rn |= tr[fr + 1] << 8)) : (rn = tr[fr] << 8,
                            fr + 1 < hn && (rn |= tr[fr + 1])),
                            rn
                    }
                    function At(tr, fr, vr, Zr) {
                        Zr || (Cr(typeof vr == "boolean", "missing or invalid endian"),
                        Cr(fr != null, "missing offset"),
                        Cr(fr + 3 < tr.length, "Trying to read beyond buffer length"));
                        var rn, hn = tr.length;
                        if (!(hn <= fr))
                            return vr ? (fr + 2 < hn && (rn = tr[fr + 2] << 16),
                            fr + 1 < hn && (rn |= tr[fr + 1] << 8),
                            rn |= tr[fr],
                            fr + 3 < hn && (rn += tr[fr + 3] << 24 >>> 0)) : (fr + 1 < hn && (rn = tr[fr + 1] << 16),
                            fr + 2 < hn && (rn |= tr[fr + 2] << 8),
                            fr + 3 < hn && (rn |= tr[fr + 3]),
                            rn += tr[fr] << 24 >>> 0),
                            rn
                    }
                    function Et(tr, fr, vr, Zr) {
                        if (Zr || (Cr(typeof vr == "boolean", "missing or invalid endian"),
                        Cr(fr != null, "missing offset"),
                        Cr(fr + 1 < tr.length, "Trying to read beyond buffer length")),
                        !(tr.length <= fr)) {
                            var rn = St(tr, fr, vr, !0);
                            return 32768 & rn ? -1 * (65535 - rn + 1) : rn
                        }
                    }
                    function Pt(tr, fr, vr, Zr) {
                        if (Zr || (Cr(typeof vr == "boolean", "missing or invalid endian"),
                        Cr(fr != null, "missing offset"),
                        Cr(fr + 3 < tr.length, "Trying to read beyond buffer length")),
                        !(tr.length <= fr)) {
                            var rn = At(tr, fr, vr, !0);
                            return 2147483648 & rn ? -1 * (4294967295 - rn + 1) : rn
                        }
                    }
                    function It(tr, fr, vr, Zr) {
                        return Zr || (Cr(typeof vr == "boolean", "missing or invalid endian"),
                        Cr(fr + 3 < tr.length, "Trying to read beyond buffer length")),
                        vt.read(tr, fr, vr, 23, 4)
                    }
                    function Dt(tr, fr, vr, Zr) {
                        return Zr || (Cr(typeof vr == "boolean", "missing or invalid endian"),
                        Cr(fr + 7 < tr.length, "Trying to read beyond buffer length")),
                        vt.read(tr, fr, vr, 52, 8)
                    }
                    function Gt(tr, fr, vr, Zr, rn) {
                        rn || (Cr(fr != null, "missing value"),
                        Cr(typeof Zr == "boolean", "missing or invalid endian"),
                        Cr(vr != null, "missing offset"),
                        Cr(vr + 1 < tr.length, "trying to write beyond buffer length"),
                        Ar(fr, 65535));
                        var hn = tr.length;
                        if (!(hn <= vr))
                            for (var Nn = 0, Wn = Math.min(hn - vr, 2); Nn < Wn; Nn++)
                                tr[vr + Nn] = (fr & 255 << 8 * (Zr ? Nn : 1 - Nn)) >>> 8 * (Zr ? Nn : 1 - Nn)
                    }
                    function Bt(tr, fr, vr, Zr, rn) {
                        rn || (Cr(fr != null, "missing value"),
                        Cr(typeof Zr == "boolean", "missing or invalid endian"),
                        Cr(vr != null, "missing offset"),
                        Cr(vr + 3 < tr.length, "trying to write beyond buffer length"),
                        Ar(fr, 4294967295));
                        var hn = tr.length;
                        if (!(hn <= vr))
                            for (var Nn = 0, Wn = Math.min(hn - vr, 4); Nn < Wn; Nn++)
                                tr[vr + Nn] = fr >>> 8 * (Zr ? Nn : 3 - Nn) & 255
                    }
                    function kt(tr, fr, vr, Zr, rn) {
                        rn || (Cr(fr != null, "missing value"),
                        Cr(typeof Zr == "boolean", "missing or invalid endian"),
                        Cr(vr != null, "missing offset"),
                        Cr(vr + 1 < tr.length, "Trying to write beyond buffer length"),
                        wr(fr, 32767, -32768)),
                        tr.length <= vr || Gt(tr, 0 <= fr ? fr : 65535 + fr + 1, vr, Zr, rn)
                    }
                    function Ut(tr, fr, vr, Zr, rn) {
                        rn || (Cr(fr != null, "missing value"),
                        Cr(typeof Zr == "boolean", "missing or invalid endian"),
                        Cr(vr != null, "missing offset"),
                        Cr(vr + 3 < tr.length, "Trying to write beyond buffer length"),
                        wr(fr, 2147483647, -2147483648)),
                        tr.length <= vr || Bt(tr, 0 <= fr ? fr : 4294967295 + fr + 1, vr, Zr, rn)
                    }
                    function Ht(tr, fr, vr, Zr, rn) {
                        rn || (Cr(fr != null, "missing value"),
                        Cr(typeof Zr == "boolean", "missing or invalid endian"),
                        Cr(vr != null, "missing offset"),
                        Cr(vr + 3 < tr.length, "Trying to write beyond buffer length"),
                        Rr(fr, 34028234663852886e22, -34028234663852886e22)),
                        tr.length <= vr || vt.write(tr, fr, vr, Zr, 23, 4)
                    }
                    function Kt(tr, fr, vr, Zr, rn) {
                        rn || (Cr(fr != null, "missing value"),
                        Cr(typeof Zr == "boolean", "missing or invalid endian"),
                        Cr(vr != null, "missing offset"),
                        Cr(vr + 7 < tr.length, "Trying to write beyond buffer length"),
                        Rr(fr, 17976931348623157e292, -17976931348623157e292)),
                        tr.length <= vr || vt.write(tr, fr, vr, Zr, 52, 8)
                    }
                    h.Buffer = bt,
                    h.SlowBuffer = bt,
                    h.INSPECT_MAX_BYTES = 50,
                    bt.poolSize = 8192,
                    bt._useTypedArrays = function() {
                        try {
                            var tr = new ArrayBuffer(0)
                              , fr = new Uint8Array(tr);
                            return fr.foo = function() {
                                return 42
                            }
                            ,
                            fr.foo() === 42 && typeof fr.subarray == "function"
                        } catch {
                            return !1
                        }
                    }(),
                    bt.isEncoding = function(tr) {
                        switch (String(tr).toLowerCase()) {
                        case "hex":
                        case "utf8":
                        case "utf-8":
                        case "ascii":
                        case "binary":
                        case "base64":
                        case "raw":
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return !0;
                        default:
                            return !1
                        }
                    }
                    ,
                    bt.isBuffer = function(tr) {
                        return !(tr == null || !tr._isBuffer)
                    }
                    ,
                    bt.byteLength = function(tr, fr) {
                        var vr;
                        switch (tr += "",
                        fr || "utf8") {
                        case "hex":
                            vr = tr.length / 2;
                            break;
                        case "utf8":
                        case "utf-8":
                            vr = hr(tr).length;
                            break;
                        case "ascii":
                        case "binary":
                        case "raw":
                            vr = tr.length;
                            break;
                        case "base64":
                            vr = gr(tr).length;
                            break;
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            vr = 2 * tr.length;
                            break;
                        default:
                            throw new Error("Unknown encoding")
                        }
                        return vr
                    }
                    ,
                    bt.concat = function(tr, fr) {
                        if (Cr(lr(tr), `Usage: Buffer.concat(list, [totalLength])
list should be an Array.`),
                        tr.length === 0)
                            return new bt(0);
                        if (tr.length === 1)
                            return tr[0];
                        if (typeof fr != "number")
                            for (rn = fr = 0; rn < tr.length; rn++)
                                fr += tr[rn].length;
                        for (var vr = new bt(fr), Zr = 0, rn = 0; rn < tr.length; rn++) {
                            var hn = tr[rn];
                            hn.copy(vr, Zr),
                            Zr += hn.length
                        }
                        return vr
                    }
                    ,
                    bt.prototype.write = function(tr, fr, vr, Zr) {
                        var rn;
                        isFinite(fr) ? isFinite(vr) || (Zr = vr,
                        vr = void 0) : (rn = Zr,
                        Zr = fr,
                        fr = vr,
                        vr = rn),
                        fr = Number(fr) || 0;
                        var hn, Nn, Wn, qn, mo, Ur, nn, xn = this.length - fr;
                        switch ((!vr || xn < (vr = Number(vr))) && (vr = xn),
                        Zr = String(Zr || "utf8").toLowerCase()) {
                        case "hex":
                            hn = function(ur, pr, Ir, jr) {
                                Ir = Number(Ir) || 0;
                                var Qr = ur.length - Ir;
                                (!jr || Qr < (jr = Number(jr))) && (jr = Qr);
                                var Or = pr.length;
                                Cr(Or % 2 == 0, "Invalid hex string"),
                                Or / 2 < jr && (jr = Or / 2);
                                for (var qr = 0; qr < jr; qr++) {
                                    var gn = parseInt(pr.substr(2 * qr, 2), 16);
                                    Cr(!isNaN(gn), "Invalid hex string"),
                                    ur[Ir + qr] = gn
                                }
                                return bt._charsWritten = 2 * qr,
                                qr
                            }(this, tr, fr, vr);
                            break;
                        case "utf8":
                        case "utf-8":
                            mo = tr,
                            Ur = fr,
                            nn = vr,
                            hn = bt._charsWritten = dr(hr(mo), this, Ur, nn);
                            break;
                        case "ascii":
                        case "binary":
                            hn = function(ur, pr, Ir, jr) {
                                return bt._charsWritten = dr(function(Qr) {
                                    for (var Or = [], qr = 0; qr < Qr.length; qr++)
                                        Or.push(255 & Qr.charCodeAt(qr));
                                    return Or
                                }(pr), ur, Ir, jr)
                            }(this, tr, fr, vr);
                            break;
                        case "base64":
                            Nn = tr,
                            Wn = fr,
                            qn = vr,
                            hn = bt._charsWritten = dr(gr(Nn), this, Wn, qn);
                            break;
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            hn = function(ur, pr, Ir, jr) {
                                return bt._charsWritten = dr(function(Qr) {
                                    for (var Or, qr, gn, Mn = [], Tn = 0; Tn < Qr.length; Tn++)
                                        qr = (Or = Qr.charCodeAt(Tn)) >> 8,
                                        gn = Or % 256,
                                        Mn.push(gn),
                                        Mn.push(qr);
                                    return Mn
                                }(pr), ur, Ir, jr)
                            }(this, tr, fr, vr);
                            break;
                        default:
                            throw new Error("Unknown encoding")
                        }
                        return hn
                    }
                    ,
                    bt.prototype.toString = function(tr, fr, vr) {
                        var Zr, rn, hn, Nn, Wn = this;
                        if (tr = String(tr || "utf8").toLowerCase(),
                        fr = Number(fr) || 0,
                        (vr = vr !== void 0 ? Number(vr) : vr = Wn.length) === fr)
                            return "";
                        switch (tr) {
                        case "hex":
                            Zr = function(qn, mo, Ur) {
                                var nn = qn.length;
                                (!mo || mo < 0) && (mo = 0),
                                (!Ur || Ur < 0 || nn < Ur) && (Ur = nn);
                                for (var xn = "", ur = mo; ur < Ur; ur++)
                                    xn += ar(qn[ur]);
                                return xn
                            }(Wn, fr, vr);
                            break;
                        case "utf8":
                        case "utf-8":
                            Zr = function(qn, mo, Ur) {
                                var nn = ""
                                  , xn = "";
                                Ur = Math.min(qn.length, Ur);
                                for (var ur = mo; ur < Ur; ur++)
                                    qn[ur] <= 127 ? (nn += cr(xn) + String.fromCharCode(qn[ur]),
                                    xn = "") : xn += "%" + qn[ur].toString(16);
                                return nn + cr(xn)
                            }(Wn, fr, vr);
                            break;
                        case "ascii":
                        case "binary":
                            Zr = function(qn, mo, Ur) {
                                var nn = "";
                                Ur = Math.min(qn.length, Ur);
                                for (var xn = mo; xn < Ur; xn++)
                                    nn += String.fromCharCode(qn[xn]);
                                return nn
                            }(Wn, fr, vr);
                            break;
                        case "base64":
                            rn = Wn,
                            Nn = vr,
                            Zr = (hn = fr) === 0 && Nn === rn.length ? _t.fromByteArray(rn) : _t.fromByteArray(rn.slice(hn, Nn));
                            break;
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            Zr = function(qn, mo, Ur) {
                                for (var nn = qn.slice(mo, Ur), xn = "", ur = 0; ur < nn.length; ur += 2)
                                    xn += String.fromCharCode(nn[ur] + 256 * nn[ur + 1]);
                                return xn
                            }(Wn, fr, vr);
                            break;
                        default:
                            throw new Error("Unknown encoding")
                        }
                        return Zr
                    }
                    ,
                    bt.prototype.toJSON = function() {
                        return {
                            type: "Buffer",
                            data: Array.prototype.slice.call(this._arr || this, 0)
                        }
                    }
                    ,
                    bt.prototype.copy = function(tr, fr, vr, Zr) {
                        if (vr = vr || 0,
                        Zr || Zr === 0 || (Zr = this.length),
                        fr = fr || 0,
                        Zr !== vr && tr.length !== 0 && this.length !== 0) {
                            Cr(vr <= Zr, "sourceEnd < sourceStart"),
                            Cr(0 <= fr && fr < tr.length, "targetStart out of bounds"),
                            Cr(0 <= vr && vr < this.length, "sourceStart out of bounds"),
                            Cr(0 <= Zr && Zr <= this.length, "sourceEnd out of bounds"),
                            Zr > this.length && (Zr = this.length),
                            tr.length - fr < Zr - vr && (Zr = tr.length - fr + vr);
                            var rn = Zr - vr;
                            if (rn < 100 || !bt._useTypedArrays)
                                for (var hn = 0; hn < rn; hn++)
                                    tr[hn + fr] = this[hn + vr];
                            else
                                tr._set(this.subarray(vr, vr + rn), fr)
                        }
                    }
                    ,
                    bt.prototype.slice = function(tr, fr) {
                        var vr = this.length;
                        if (tr = or(tr, vr, 0),
                        fr = or(fr, vr, vr),
                        bt._useTypedArrays)
                            return bt._augment(this.subarray(tr, fr));
                        for (var Zr = fr - tr, rn = new bt(Zr,void 0,!0), hn = 0; hn < Zr; hn++)
                            rn[hn] = this[hn + tr];
                        return rn
                    }
                    ,
                    bt.prototype.get = function(tr) {
                        return console.log(".get() is deprecated. Access using array indexes instead."),
                        this.readUInt8(tr)
                    }
                    ,
                    bt.prototype.set = function(tr, fr) {
                        return console.log(".set() is deprecated. Access using array indexes instead."),
                        this.writeUInt8(tr, fr)
                    }
                    ,
                    bt.prototype.readUInt8 = function(tr, fr) {
                        if (fr || (Cr(tr != null, "missing offset"),
                        Cr(tr < this.length, "Trying to read beyond buffer length")),
                        !(tr >= this.length))
                            return this[tr]
                    }
                    ,
                    bt.prototype.readUInt16LE = function(tr, fr) {
                        return St(this, tr, !0, fr)
                    }
                    ,
                    bt.prototype.readUInt16BE = function(tr, fr) {
                        return St(this, tr, !1, fr)
                    }
                    ,
                    bt.prototype.readUInt32LE = function(tr, fr) {
                        return At(this, tr, !0, fr)
                    }
                    ,
                    bt.prototype.readUInt32BE = function(tr, fr) {
                        return At(this, tr, !1, fr)
                    }
                    ,
                    bt.prototype.readInt8 = function(tr, fr) {
                        if (fr || (Cr(tr != null, "missing offset"),
                        Cr(tr < this.length, "Trying to read beyond buffer length")),
                        !(tr >= this.length))
                            return 128 & this[tr] ? -1 * (255 - this[tr] + 1) : this[tr]
                    }
                    ,
                    bt.prototype.readInt16LE = function(tr, fr) {
                        return Et(this, tr, !0, fr)
                    }
                    ,
                    bt.prototype.readInt16BE = function(tr, fr) {
                        return Et(this, tr, !1, fr)
                    }
                    ,
                    bt.prototype.readInt32LE = function(tr, fr) {
                        return Pt(this, tr, !0, fr)
                    }
                    ,
                    bt.prototype.readInt32BE = function(tr, fr) {
                        return Pt(this, tr, !1, fr)
                    }
                    ,
                    bt.prototype.readFloatLE = function(tr, fr) {
                        return It(this, tr, !0, fr)
                    }
                    ,
                    bt.prototype.readFloatBE = function(tr, fr) {
                        return It(this, tr, !1, fr)
                    }
                    ,
                    bt.prototype.readDoubleLE = function(tr, fr) {
                        return Dt(this, tr, !0, fr)
                    }
                    ,
                    bt.prototype.readDoubleBE = function(tr, fr) {
                        return Dt(this, tr, !1, fr)
                    }
                    ,
                    bt.prototype.writeUInt8 = function(tr, fr, vr) {
                        vr || (Cr(tr != null, "missing value"),
                        Cr(fr != null, "missing offset"),
                        Cr(fr < this.length, "trying to write beyond buffer length"),
                        Ar(tr, 255)),
                        fr >= this.length || (this[fr] = tr)
                    }
                    ,
                    bt.prototype.writeUInt16LE = function(tr, fr, vr) {
                        Gt(this, tr, fr, !0, vr)
                    }
                    ,
                    bt.prototype.writeUInt16BE = function(tr, fr, vr) {
                        Gt(this, tr, fr, !1, vr)
                    }
                    ,
                    bt.prototype.writeUInt32LE = function(tr, fr, vr) {
                        Bt(this, tr, fr, !0, vr)
                    }
                    ,
                    bt.prototype.writeUInt32BE = function(tr, fr, vr) {
                        Bt(this, tr, fr, !1, vr)
                    }
                    ,
                    bt.prototype.writeInt8 = function(tr, fr, vr) {
                        vr || (Cr(tr != null, "missing value"),
                        Cr(fr != null, "missing offset"),
                        Cr(fr < this.length, "Trying to write beyond buffer length"),
                        wr(tr, 127, -128)),
                        fr >= this.length || (0 <= tr ? this.writeUInt8(tr, fr, vr) : this.writeUInt8(255 + tr + 1, fr, vr))
                    }
                    ,
                    bt.prototype.writeInt16LE = function(tr, fr, vr) {
                        kt(this, tr, fr, !0, vr)
                    }
                    ,
                    bt.prototype.writeInt16BE = function(tr, fr, vr) {
                        kt(this, tr, fr, !1, vr)
                    }
                    ,
                    bt.prototype.writeInt32LE = function(tr, fr, vr) {
                        Ut(this, tr, fr, !0, vr)
                    }
                    ,
                    bt.prototype.writeInt32BE = function(tr, fr, vr) {
                        Ut(this, tr, fr, !1, vr)
                    }
                    ,
                    bt.prototype.writeFloatLE = function(tr, fr, vr) {
                        Ht(this, tr, fr, !0, vr)
                    }
                    ,
                    bt.prototype.writeFloatBE = function(tr, fr, vr) {
                        Ht(this, tr, fr, !1, vr)
                    }
                    ,
                    bt.prototype.writeDoubleLE = function(tr, fr, vr) {
                        Kt(this, tr, fr, !0, vr)
                    }
                    ,
                    bt.prototype.writeDoubleBE = function(tr, fr, vr) {
                        Kt(this, tr, fr, !1, vr)
                    }
                    ,
                    bt.prototype.fill = function(tr, fr, vr) {
                        if (tr = tr || 0,
                        fr = fr || 0,
                        vr = vr || this.length,
                        typeof tr == "string" && (tr = tr.charCodeAt(0)),
                        Cr(typeof tr == "number" && !isNaN(tr), "value is not a number"),
                        Cr(fr <= vr, "end < start"),
                        vr !== fr && this.length !== 0) {
                            Cr(0 <= fr && fr < this.length, "start out of bounds"),
                            Cr(0 <= vr && vr <= this.length, "end out of bounds");
                            for (var Zr = fr; Zr < vr; Zr++)
                                this[Zr] = tr
                        }
                    }
                    ,
                    bt.prototype.inspect = function() {
                        for (var tr = [], fr = this.length, vr = 0; vr < fr; vr++)
                            if (tr[vr] = ar(this[vr]),
                            vr === h.INSPECT_MAX_BYTES) {
                                tr[vr + 1] = "...";
                                break
                            }
                        return "<Buffer " + tr.join(" ") + ">"
                    }
                    ,
                    bt.prototype.toArrayBuffer = function() {
                        if (typeof Uint8Array > "u")
                            throw new Error("Buffer.toArrayBuffer not supported in this browser");
                        if (bt._useTypedArrays)
                            return new bt(this).buffer;
                        for (var tr = new Uint8Array(this.length), fr = 0, vr = tr.length; fr < vr; fr += 1)
                            tr[fr] = this[fr];
                        return tr.buffer
                    }
                    ;
                    var Jt = bt.prototype;
                    function or(tr, fr, vr) {
                        return typeof tr != "number" ? vr : fr <= (tr = ~~tr) ? fr : 0 <= tr || 0 <= (tr += fr) ? tr : 0
                    }
                    function ir(tr) {
                        return (tr = ~~Math.ceil(+tr)) < 0 ? 0 : tr
                    }
                    function lr(tr) {
                        return (Array.isArray || function(fr) {
                            return Object.prototype.toString.call(fr) === "[object Array]"
                        }
                        )(tr)
                    }
                    function ar(tr) {
                        return tr < 16 ? "0" + tr.toString(16) : tr.toString(16)
                    }
                    function hr(tr) {
                        for (var fr = [], vr = 0; vr < tr.length; vr++) {
                            var Zr = tr.charCodeAt(vr);
                            if (Zr <= 127)
                                fr.push(tr.charCodeAt(vr));
                            else {
                                var rn = vr;
                                55296 <= Zr && Zr <= 57343 && vr++;
                                for (var hn = encodeURIComponent(tr.slice(rn, vr + 1)).substr(1).split("%"), Nn = 0; Nn < hn.length; Nn++)
                                    fr.push(parseInt(hn[Nn], 16))
                            }
                        }
                        return fr
                    }
                    function gr(tr) {
                        return _t.toByteArray(tr)
                    }
                    function dr(tr, fr, vr, Zr) {
                        for (var rn = 0; rn < Zr && !(rn + vr >= fr.length || rn >= tr.length); rn++)
                            fr[rn + vr] = tr[rn];
                        return rn
                    }
                    function cr(tr) {
                        try {
                            return decodeURIComponent(tr)
                        } catch {
                            return "�"
                        }
                    }
                    function Ar(tr, fr) {
                        Cr(typeof tr == "number", "cannot write a non-number as a number"),
                        Cr(0 <= tr, "specified a negative value for writing an unsigned value"),
                        Cr(tr <= fr, "value is larger than maximum value for type"),
                        Cr(Math.floor(tr) === tr, "value has a fractional component")
                    }
                    function wr(tr, fr, vr) {
                        Cr(typeof tr == "number", "cannot write a non-number as a number"),
                        Cr(tr <= fr, "value larger than maximum allowed value"),
                        Cr(vr <= tr, "value smaller than minimum allowed value"),
                        Cr(Math.floor(tr) === tr, "value has a fractional component")
                    }
                    function Rr(tr, fr, vr) {
                        Cr(typeof tr == "number", "cannot write a non-number as a number"),
                        Cr(tr <= fr, "value larger than maximum allowed value"),
                        Cr(vr <= tr, "value smaller than minimum allowed value")
                    }
                    function Cr(tr, fr) {
                        if (!tr)
                            throw new Error(fr || "Failed assertion")
                    }
                    bt._augment = function(tr) {
                        return tr._isBuffer = !0,
                        tr._get = tr.get,
                        tr._set = tr.set,
                        tr.get = Jt.get,
                        tr.set = Jt.set,
                        tr.write = Jt.write,
                        tr.toString = Jt.toString,
                        tr.toLocaleString = Jt.toString,
                        tr.toJSON = Jt.toJSON,
                        tr.copy = Jt.copy,
                        tr.slice = Jt.slice,
                        tr.readUInt8 = Jt.readUInt8,
                        tr.readUInt16LE = Jt.readUInt16LE,
                        tr.readUInt16BE = Jt.readUInt16BE,
                        tr.readUInt32LE = Jt.readUInt32LE,
                        tr.readUInt32BE = Jt.readUInt32BE,
                        tr.readInt8 = Jt.readInt8,
                        tr.readInt16LE = Jt.readInt16LE,
                        tr.readInt16BE = Jt.readInt16BE,
                        tr.readInt32LE = Jt.readInt32LE,
                        tr.readInt32BE = Jt.readInt32BE,
                        tr.readFloatLE = Jt.readFloatLE,
                        tr.readFloatBE = Jt.readFloatBE,
                        tr.readDoubleLE = Jt.readDoubleLE,
                        tr.readDoubleBE = Jt.readDoubleBE,
                        tr.writeUInt8 = Jt.writeUInt8,
                        tr.writeUInt16LE = Jt.writeUInt16LE,
                        tr.writeUInt16BE = Jt.writeUInt16BE,
                        tr.writeUInt32LE = Jt.writeUInt32LE,
                        tr.writeUInt32BE = Jt.writeUInt32BE,
                        tr.writeInt8 = Jt.writeInt8,
                        tr.writeInt16LE = Jt.writeInt16LE,
                        tr.writeInt16BE = Jt.writeInt16BE,
                        tr.writeInt32LE = Jt.writeInt32LE,
                        tr.writeInt32BE = Jt.writeInt32BE,
                        tr.writeFloatLE = Jt.writeFloatLE,
                        tr.writeFloatBE = Jt.writeFloatBE,
                        tr.writeDoubleLE = Jt.writeDoubleLE,
                        tr.writeDoubleBE = Jt.writeDoubleBE,
                        tr.fill = Jt.fill,
                        tr.inspect = Jt.inspect,
                        tr.toArrayBuffer = Jt.toArrayBuffer,
                        tr
                    }
                }
                ).call(this, o("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, o("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/buffer/index.js", "/node_modules/gulp-browserify/node_modules/buffer")
            }
            , {
                "base64-js": 2,
                buffer: 3,
                ieee754: 11,
                lYpoI2: 10
            }],
            4: [function(o, c, h) {
                (function(_, b, _e, nt, it, at, ut, pt, ht) {
                    _e = o("buffer").Buffer;
                    var _t = new _e(4);
                    _t.fill(0),
                    c.exports = {
                        hash: function(vt, bt, St, At) {
                            return _e.isBuffer(vt) || (vt = new _e(vt)),
                            function(Et, Pt, It) {
                                for (var Dt = new _e(Pt), Gt = It ? Dt.writeInt32BE : Dt.writeInt32LE, Bt = 0; Bt < Et.length; Bt++)
                                    Gt.call(Dt, Et[Bt], 4 * Bt, !0);
                                return Dt
                            }(bt(function(Et, Pt) {
                                var It;
                                Et.length % 4 != 0 && (It = Et.length + (4 - Et.length % 4),
                                Et = _e.concat([Et, _t], It));
                                for (var Dt = [], Gt = Pt ? Et.readInt32BE : Et.readInt32LE, Bt = 0; Bt < Et.length; Bt += 4)
                                    Dt.push(Gt.call(Et, Bt));
                                return Dt
                            }(vt, At), 8 * vt.length), St, At)
                        }
                    }
                }
                ).call(this, o("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, o("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/helpers.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify")
            }
            , {
                buffer: 3,
                lYpoI2: 10
            }],
            5: [function(o, c, h) {
                (function(_, b, _e, nt, it, at, ut, pt, ht) {
                    _e = o("buffer").Buffer;
                    var _t = o("./sha")
                      , vt = o("./sha256")
                      , bt = o("./rng")
                      , St = {
                        sha1: _t,
                        sha256: vt,
                        md5: o("./md5")
                    }
                      , At = 64
                      , Et = new _e(At);
                    function Pt(Dt, Gt) {
                        var Bt = St[Dt = Dt || "sha1"]
                          , kt = [];
                        return Bt || It("algorithm:", Dt, "is not yet supported"),
                        {
                            update: function(Ut) {
                                return _e.isBuffer(Ut) || (Ut = new _e(Ut)),
                                kt.push(Ut),
                                Ut.length,
                                this
                            },
                            digest: function(Ut) {
                                var Ht = _e.concat(kt)
                                  , Kt = Gt ? function(Jt, or, ir) {
                                    _e.isBuffer(or) || (or = new _e(or)),
                                    _e.isBuffer(ir) || (ir = new _e(ir)),
                                    or.length > At ? or = Jt(or) : or.length < At && (or = _e.concat([or, Et], At));
                                    for (var lr = new _e(At), ar = new _e(At), hr = 0; hr < At; hr++)
                                        lr[hr] = 54 ^ or[hr],
                                        ar[hr] = 92 ^ or[hr];
                                    var gr = Jt(_e.concat([lr, ir]));
                                    return Jt(_e.concat([ar, gr]))
                                }(Bt, Gt, Ht) : Bt(Ht);
                                return kt = null,
                                Ut ? Kt.toString(Ut) : Kt
                            }
                        }
                    }
                    function It() {
                        var Dt = [].slice.call(arguments).join(" ");
                        throw new Error([Dt, "we accept pull requests", "http://github.com/dominictarr/crypto-browserify"].join(`
`))
                    }
                    Et.fill(0),
                    h.createHash = function(Dt) {
                        return Pt(Dt)
                    }
                    ,
                    h.createHmac = Pt,
                    h.randomBytes = function(Dt, Gt) {
                        if (!Gt || !Gt.call)
                            return new _e(bt(Dt));
                        try {
                            Gt.call(this, void 0, new _e(bt(Dt)))
                        } catch (Bt) {
                            Gt(Bt)
                        }
                    }
                    ,
                    function(Dt, Gt) {
                        for (var Bt in Dt)
                            Gt(Dt[Bt])
                    }(["createCredentials", "createCipher", "createCipheriv", "createDecipher", "createDecipheriv", "createSign", "createVerify", "createDiffieHellman", "pbkdf2"], function(Dt) {
                        h[Dt] = function() {
                            It("sorry,", Dt, "is not implemented yet")
                        }
                    })
                }
                ).call(this, o("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, o("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/index.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify")
            }
            , {
                "./md5": 6,
                "./rng": 7,
                "./sha": 8,
                "./sha256": 9,
                buffer: 3,
                lYpoI2: 10
            }],
            6: [function(o, c, h) {
                (function(_, b, _e, nt, it, at, ut, pt, ht) {
                    var _t = o("./helpers");
                    function vt(Dt, Gt) {
                        Dt[Gt >> 5] |= 128 << Gt % 32,
                        Dt[14 + (Gt + 64 >>> 9 << 4)] = Gt;
                        for (var Bt = 1732584193, kt = -271733879, Ut = -1732584194, Ht = 271733878, Kt = 0; Kt < Dt.length; Kt += 16) {
                            var Jt = Bt
                              , or = kt
                              , ir = Ut
                              , lr = Ht;
                            Bt = St(Bt, kt, Ut, Ht, Dt[Kt + 0], 7, -680876936),
                            Ht = St(Ht, Bt, kt, Ut, Dt[Kt + 1], 12, -389564586),
                            Ut = St(Ut, Ht, Bt, kt, Dt[Kt + 2], 17, 606105819),
                            kt = St(kt, Ut, Ht, Bt, Dt[Kt + 3], 22, -1044525330),
                            Bt = St(Bt, kt, Ut, Ht, Dt[Kt + 4], 7, -176418897),
                            Ht = St(Ht, Bt, kt, Ut, Dt[Kt + 5], 12, 1200080426),
                            Ut = St(Ut, Ht, Bt, kt, Dt[Kt + 6], 17, -1473231341),
                            kt = St(kt, Ut, Ht, Bt, Dt[Kt + 7], 22, -45705983),
                            Bt = St(Bt, kt, Ut, Ht, Dt[Kt + 8], 7, 1770035416),
                            Ht = St(Ht, Bt, kt, Ut, Dt[Kt + 9], 12, -1958414417),
                            Ut = St(Ut, Ht, Bt, kt, Dt[Kt + 10], 17, -42063),
                            kt = St(kt, Ut, Ht, Bt, Dt[Kt + 11], 22, -1990404162),
                            Bt = St(Bt, kt, Ut, Ht, Dt[Kt + 12], 7, 1804603682),
                            Ht = St(Ht, Bt, kt, Ut, Dt[Kt + 13], 12, -40341101),
                            Ut = St(Ut, Ht, Bt, kt, Dt[Kt + 14], 17, -1502002290),
                            Bt = At(Bt, kt = St(kt, Ut, Ht, Bt, Dt[Kt + 15], 22, 1236535329), Ut, Ht, Dt[Kt + 1], 5, -165796510),
                            Ht = At(Ht, Bt, kt, Ut, Dt[Kt + 6], 9, -1069501632),
                            Ut = At(Ut, Ht, Bt, kt, Dt[Kt + 11], 14, 643717713),
                            kt = At(kt, Ut, Ht, Bt, Dt[Kt + 0], 20, -373897302),
                            Bt = At(Bt, kt, Ut, Ht, Dt[Kt + 5], 5, -701558691),
                            Ht = At(Ht, Bt, kt, Ut, Dt[Kt + 10], 9, 38016083),
                            Ut = At(Ut, Ht, Bt, kt, Dt[Kt + 15], 14, -660478335),
                            kt = At(kt, Ut, Ht, Bt, Dt[Kt + 4], 20, -405537848),
                            Bt = At(Bt, kt, Ut, Ht, Dt[Kt + 9], 5, 568446438),
                            Ht = At(Ht, Bt, kt, Ut, Dt[Kt + 14], 9, -1019803690),
                            Ut = At(Ut, Ht, Bt, kt, Dt[Kt + 3], 14, -187363961),
                            kt = At(kt, Ut, Ht, Bt, Dt[Kt + 8], 20, 1163531501),
                            Bt = At(Bt, kt, Ut, Ht, Dt[Kt + 13], 5, -1444681467),
                            Ht = At(Ht, Bt, kt, Ut, Dt[Kt + 2], 9, -51403784),
                            Ut = At(Ut, Ht, Bt, kt, Dt[Kt + 7], 14, 1735328473),
                            Bt = Et(Bt, kt = At(kt, Ut, Ht, Bt, Dt[Kt + 12], 20, -1926607734), Ut, Ht, Dt[Kt + 5], 4, -378558),
                            Ht = Et(Ht, Bt, kt, Ut, Dt[Kt + 8], 11, -2022574463),
                            Ut = Et(Ut, Ht, Bt, kt, Dt[Kt + 11], 16, 1839030562),
                            kt = Et(kt, Ut, Ht, Bt, Dt[Kt + 14], 23, -35309556),
                            Bt = Et(Bt, kt, Ut, Ht, Dt[Kt + 1], 4, -1530992060),
                            Ht = Et(Ht, Bt, kt, Ut, Dt[Kt + 4], 11, 1272893353),
                            Ut = Et(Ut, Ht, Bt, kt, Dt[Kt + 7], 16, -155497632),
                            kt = Et(kt, Ut, Ht, Bt, Dt[Kt + 10], 23, -1094730640),
                            Bt = Et(Bt, kt, Ut, Ht, Dt[Kt + 13], 4, 681279174),
                            Ht = Et(Ht, Bt, kt, Ut, Dt[Kt + 0], 11, -358537222),
                            Ut = Et(Ut, Ht, Bt, kt, Dt[Kt + 3], 16, -722521979),
                            kt = Et(kt, Ut, Ht, Bt, Dt[Kt + 6], 23, 76029189),
                            Bt = Et(Bt, kt, Ut, Ht, Dt[Kt + 9], 4, -640364487),
                            Ht = Et(Ht, Bt, kt, Ut, Dt[Kt + 12], 11, -421815835),
                            Ut = Et(Ut, Ht, Bt, kt, Dt[Kt + 15], 16, 530742520),
                            Bt = Pt(Bt, kt = Et(kt, Ut, Ht, Bt, Dt[Kt + 2], 23, -995338651), Ut, Ht, Dt[Kt + 0], 6, -198630844),
                            Ht = Pt(Ht, Bt, kt, Ut, Dt[Kt + 7], 10, 1126891415),
                            Ut = Pt(Ut, Ht, Bt, kt, Dt[Kt + 14], 15, -1416354905),
                            kt = Pt(kt, Ut, Ht, Bt, Dt[Kt + 5], 21, -57434055),
                            Bt = Pt(Bt, kt, Ut, Ht, Dt[Kt + 12], 6, 1700485571),
                            Ht = Pt(Ht, Bt, kt, Ut, Dt[Kt + 3], 10, -1894986606),
                            Ut = Pt(Ut, Ht, Bt, kt, Dt[Kt + 10], 15, -1051523),
                            kt = Pt(kt, Ut, Ht, Bt, Dt[Kt + 1], 21, -2054922799),
                            Bt = Pt(Bt, kt, Ut, Ht, Dt[Kt + 8], 6, 1873313359),
                            Ht = Pt(Ht, Bt, kt, Ut, Dt[Kt + 15], 10, -30611744),
                            Ut = Pt(Ut, Ht, Bt, kt, Dt[Kt + 6], 15, -1560198380),
                            kt = Pt(kt, Ut, Ht, Bt, Dt[Kt + 13], 21, 1309151649),
                            Bt = Pt(Bt, kt, Ut, Ht, Dt[Kt + 4], 6, -145523070),
                            Ht = Pt(Ht, Bt, kt, Ut, Dt[Kt + 11], 10, -1120210379),
                            Ut = Pt(Ut, Ht, Bt, kt, Dt[Kt + 2], 15, 718787259),
                            kt = Pt(kt, Ut, Ht, Bt, Dt[Kt + 9], 21, -343485551),
                            Bt = It(Bt, Jt),
                            kt = It(kt, or),
                            Ut = It(Ut, ir),
                            Ht = It(Ht, lr)
                        }
                        return Array(Bt, kt, Ut, Ht)
                    }
                    function bt(Dt, Gt, Bt, kt, Ut, Ht) {
                        return It((Kt = It(It(Gt, Dt), It(kt, Ht))) << (Jt = Ut) | Kt >>> 32 - Jt, Bt);
                        var Kt, Jt
                    }
                    function St(Dt, Gt, Bt, kt, Ut, Ht, Kt) {
                        return bt(Gt & Bt | ~Gt & kt, Dt, Gt, Ut, Ht, Kt)
                    }
                    function At(Dt, Gt, Bt, kt, Ut, Ht, Kt) {
                        return bt(Gt & kt | Bt & ~kt, Dt, Gt, Ut, Ht, Kt)
                    }
                    function Et(Dt, Gt, Bt, kt, Ut, Ht, Kt) {
                        return bt(Gt ^ Bt ^ kt, Dt, Gt, Ut, Ht, Kt)
                    }
                    function Pt(Dt, Gt, Bt, kt, Ut, Ht, Kt) {
                        return bt(Bt ^ (Gt | ~kt), Dt, Gt, Ut, Ht, Kt)
                    }
                    function It(Dt, Gt) {
                        var Bt = (65535 & Dt) + (65535 & Gt);
                        return (Dt >> 16) + (Gt >> 16) + (Bt >> 16) << 16 | 65535 & Bt
                    }
                    c.exports = function(Dt) {
                        return _t.hash(Dt, vt, 16)
                    }
                }
                ).call(this, o("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, o("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/md5.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify")
            }
            , {
                "./helpers": 4,
                buffer: 3,
                lYpoI2: 10
            }],
            7: [function(o, c, h) {
                (function(_, b, _e, nt, it, at, ut, pt, ht) {
                    var _t;
                    _t = function(vt) {
                        for (var bt, St = new Array(vt), At = 0; At < vt; At++)
                            !(3 & At) && (bt = 4294967296 * Math.random()),
                            St[At] = bt >>> ((3 & At) << 3) & 255;
                        return St
                    }
                    ,
                    c.exports = _t
                }
                ).call(this, o("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, o("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/rng.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify")
            }
            , {
                buffer: 3,
                lYpoI2: 10
            }],
            8: [function(o, c, h) {
                (function(_, b, _e, nt, it, at, ut, pt, ht) {
                    var _t = o("./helpers");
                    function vt(At, Et) {
                        At[Et >> 5] |= 128 << 24 - Et % 32,
                        At[15 + (Et + 64 >> 9 << 4)] = Et;
                        for (var Pt, It, Dt, Gt, Bt, kt = Array(80), Ut = 1732584193, Ht = -271733879, Kt = -1732584194, Jt = 271733878, or = -1009589776, ir = 0; ir < At.length; ir += 16) {
                            for (var lr = Ut, ar = Ht, hr = Kt, gr = Jt, dr = or, cr = 0; cr < 80; cr++) {
                                kt[cr] = cr < 16 ? At[ir + cr] : St(kt[cr - 3] ^ kt[cr - 8] ^ kt[cr - 14] ^ kt[cr - 16], 1);
                                var Ar = bt(bt(St(Ut, 5), (Dt = Ht,
                                Gt = Kt,
                                Bt = Jt,
                                (It = cr) < 20 ? Dt & Gt | ~Dt & Bt : !(It < 40) && It < 60 ? Dt & Gt | Dt & Bt | Gt & Bt : Dt ^ Gt ^ Bt)), bt(bt(or, kt[cr]), (Pt = cr) < 20 ? 1518500249 : Pt < 40 ? 1859775393 : Pt < 60 ? -1894007588 : -899497514));
                                or = Jt,
                                Jt = Kt,
                                Kt = St(Ht, 30),
                                Ht = Ut,
                                Ut = Ar
                            }
                            Ut = bt(Ut, lr),
                            Ht = bt(Ht, ar),
                            Kt = bt(Kt, hr),
                            Jt = bt(Jt, gr),
                            or = bt(or, dr)
                        }
                        return Array(Ut, Ht, Kt, Jt, or)
                    }
                    function bt(At, Et) {
                        var Pt = (65535 & At) + (65535 & Et);
                        return (At >> 16) + (Et >> 16) + (Pt >> 16) << 16 | 65535 & Pt
                    }
                    function St(At, Et) {
                        return At << Et | At >>> 32 - Et
                    }
                    c.exports = function(At) {
                        return _t.hash(At, vt, 20, !0)
                    }
                }
                ).call(this, o("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, o("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/sha.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify")
            }
            , {
                "./helpers": 4,
                buffer: 3,
                lYpoI2: 10
            }],
            9: [function(o, c, h) {
                (function(_, b, _e, nt, it, at, ut, pt, ht) {
                    function _t(At, Et) {
                        var Pt = (65535 & At) + (65535 & Et);
                        return (At >> 16) + (Et >> 16) + (Pt >> 16) << 16 | 65535 & Pt
                    }
                    function vt(At, Et) {
                        return At >>> Et | At << 32 - Et
                    }
                    function bt(At, Et) {
                        var Pt, It, Dt, Gt, Bt, kt, Ut, Ht, Kt, Jt, or = new Array(1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298), ir = new Array(1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225), lr = new Array(64);
                        At[Et >> 5] |= 128 << 24 - Et % 32,
                        At[15 + (Et + 64 >> 9 << 4)] = Et;
                        for (var ar, hr, gr, dr, cr, Ar, wr, Rr, Cr = 0; Cr < At.length; Cr += 16) {
                            Pt = ir[0],
                            It = ir[1],
                            Dt = ir[2],
                            Gt = ir[3],
                            Bt = ir[4],
                            kt = ir[5],
                            Ut = ir[6],
                            Ht = ir[7];
                            for (var tr = 0; tr < 64; tr++)
                                lr[tr] = tr < 16 ? At[tr + Cr] : _t(_t(_t(vt(Rr = lr[tr - 2], 17) ^ vt(Rr, 19) ^ Rr >>> 10, lr[tr - 7]), vt(wr = lr[tr - 15], 7) ^ vt(wr, 18) ^ wr >>> 3), lr[tr - 16]),
                                Kt = _t(_t(_t(_t(Ht, vt(Ar = Bt, 6) ^ vt(Ar, 11) ^ vt(Ar, 25)), (cr = Bt) & kt ^ ~cr & Ut), or[tr]), lr[tr]),
                                Jt = _t(vt(dr = Pt, 2) ^ vt(dr, 13) ^ vt(dr, 22), (ar = Pt) & (hr = It) ^ ar & (gr = Dt) ^ hr & gr),
                                Ht = Ut,
                                Ut = kt,
                                kt = Bt,
                                Bt = _t(Gt, Kt),
                                Gt = Dt,
                                Dt = It,
                                It = Pt,
                                Pt = _t(Kt, Jt);
                            ir[0] = _t(Pt, ir[0]),
                            ir[1] = _t(It, ir[1]),
                            ir[2] = _t(Dt, ir[2]),
                            ir[3] = _t(Gt, ir[3]),
                            ir[4] = _t(Bt, ir[4]),
                            ir[5] = _t(kt, ir[5]),
                            ir[6] = _t(Ut, ir[6]),
                            ir[7] = _t(Ht, ir[7])
                        }
                        return ir
                    }
                    var St = o("./helpers");
                    c.exports = function(At) {
                        return St.hash(At, bt, 32, !0)
                    }
                }
                ).call(this, o("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, o("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/sha256.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify")
            }
            , {
                "./helpers": 4,
                buffer: 3,
                lYpoI2: 10
            }],
            10: [function(o, c, h) {
                (function(_, b, _e, nt, it, at, ut, pt, ht) {
                    function _t() {}
                    (_ = c.exports = {}).nextTick = function() {
                        var vt = typeof window < "u" && window.setImmediate
                          , bt = typeof window < "u" && window.postMessage && window.addEventListener;
                        if (vt)
                            return function(At) {
                                return window.setImmediate(At)
                            }
                            ;
                        if (bt) {
                            var St = [];
                            return window.addEventListener("message", function(At) {
                                var Et = At.source;
                                Et !== window && Et !== null || At.data !== "process-tick" || (At.stopPropagation(),
                                0 < St.length && St.shift()())
                            }, !0),
                            function(At) {
                                St.push(At),
                                window.postMessage("process-tick", "*")
                            }
                        }
                        return function(At) {
                            setTimeout(At, 0)
                        }
                    }(),
                    _.title = "browser",
                    _.browser = !0,
                    _.env = {},
                    _.argv = [],
                    _.on = _t,
                    _.addListener = _t,
                    _.once = _t,
                    _.off = _t,
                    _.removeListener = _t,
                    _.removeAllListeners = _t,
                    _.emit = _t,
                    _.binding = function(vt) {
                        throw new Error("process.binding is not supported")
                    }
                    ,
                    _.cwd = function() {
                        return "/"
                    }
                    ,
                    _.chdir = function(vt) {
                        throw new Error("process.chdir is not supported")
                    }
                }
                ).call(this, o("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, o("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/process/browser.js", "/node_modules/gulp-browserify/node_modules/process")
            }
            , {
                buffer: 3,
                lYpoI2: 10
            }],
            11: [function(o, c, h) {
                (function(_, b, _e, nt, it, at, ut, pt, ht) {
                    h.read = function(_t, vt, bt, St, At) {
                        var Et, Pt, It = 8 * At - St - 1, Dt = (1 << It) - 1, Gt = Dt >> 1, Bt = -7, kt = bt ? At - 1 : 0, Ut = bt ? -1 : 1, Ht = _t[vt + kt];
                        for (kt += Ut,
                        Et = Ht & (1 << -Bt) - 1,
                        Ht >>= -Bt,
                        Bt += It; 0 < Bt; Et = 256 * Et + _t[vt + kt],
                        kt += Ut,
                        Bt -= 8)
                            ;
                        for (Pt = Et & (1 << -Bt) - 1,
                        Et >>= -Bt,
                        Bt += St; 0 < Bt; Pt = 256 * Pt + _t[vt + kt],
                        kt += Ut,
                        Bt -= 8)
                            ;
                        if (Et === 0)
                            Et = 1 - Gt;
                        else {
                            if (Et === Dt)
                                return Pt ? NaN : 1 / 0 * (Ht ? -1 : 1);
                            Pt += Math.pow(2, St),
                            Et -= Gt
                        }
                        return (Ht ? -1 : 1) * Pt * Math.pow(2, Et - St)
                    }
                    ,
                    h.write = function(_t, vt, bt, St, At, Et) {
                        var Pt, It, Dt, Gt = 8 * Et - At - 1, Bt = (1 << Gt) - 1, kt = Bt >> 1, Ut = At === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0, Ht = St ? 0 : Et - 1, Kt = St ? 1 : -1, Jt = vt < 0 || vt === 0 && 1 / vt < 0 ? 1 : 0;
                        for (vt = Math.abs(vt),
                        isNaN(vt) || vt === 1 / 0 ? (It = isNaN(vt) ? 1 : 0,
                        Pt = Bt) : (Pt = Math.floor(Math.log(vt) / Math.LN2),
                        vt * (Dt = Math.pow(2, -Pt)) < 1 && (Pt--,
                        Dt *= 2),
                        2 <= (vt += 1 <= Pt + kt ? Ut / Dt : Ut * Math.pow(2, 1 - kt)) * Dt && (Pt++,
                        Dt /= 2),
                        Bt <= Pt + kt ? (It = 0,
                        Pt = Bt) : 1 <= Pt + kt ? (It = (vt * Dt - 1) * Math.pow(2, At),
                        Pt += kt) : (It = vt * Math.pow(2, kt - 1) * Math.pow(2, At),
                        Pt = 0)); 8 <= At; _t[bt + Ht] = 255 & It,
                        Ht += Kt,
                        It /= 256,
                        At -= 8)
                            ;
                        for (Pt = Pt << At | It,
                        Gt += At; 0 < Gt; _t[bt + Ht] = 255 & Pt,
                        Ht += Kt,
                        Pt /= 256,
                        Gt -= 8)
                            ;
                        _t[bt + Ht - Kt] |= 128 * Jt
                    }
                }
                ).call(this, o("lYpoI2"), typeof self < "u" ? self : typeof window < "u" ? window : {}, o("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/ieee754/index.js", "/node_modules/ieee754")
            }
            , {
                buffer: 3,
                lYpoI2: 10
            }]
        }, {}, [1])(1)
}

export default module516;
