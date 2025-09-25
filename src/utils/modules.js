/**
 * UTILS Modules
 * Extracted from webpack bundle
 */


// Module 151
function module151(d, o, c) {

        var h = c(161);
        function _(nt, it, at) {
            var ut, pt, ht = nt.length, _t = it.arrayArgs.length, vt = it.indexArgs.length > 0, bt = [], St = [], At = 0, Et = 0;
            for (ut = 0; ut < ht; ++ut)
                St.push(["i", ut, "=0"].join(""));
            for (pt = 0; pt < _t; ++pt)
                for (ut = 0; ut < ht; ++ut)
                    Et = At,
                    At = nt[ut],
                    ut === 0 ? St.push(["d", pt, "s", ut, "=t", pt, "p", At].join("")) : St.push(["d", pt, "s", ut, "=(t", pt, "p", At, "-s", Et, "*t", pt, "p", Et, ")"].join(""));
            for (St.length > 0 && bt.push("var " + St.join(",")),
            ut = ht - 1; ut >= 0; --ut)
                At = nt[ut],
                bt.push(["for(i", ut, "=0;i", ut, "<s", At, ";++i", ut, "){"].join(""));
            for (bt.push(at),
            ut = 0; ut < ht; ++ut) {
                for (Et = At,
                At = nt[ut],
                pt = 0; pt < _t; ++pt)
                    bt.push(["p", pt, "+=d", pt, "s", ut].join(""));
                vt && (ut > 0 && bt.push(["index[", Et, "]-=s", Et].join("")),
                bt.push(["++index[", At, "]"].join(""))),
                bt.push("}")
            }
            return bt.join(`
`)
        }
        function b(nt, it, at) {
            for (var ut = nt.body, pt = [], ht = [], _t = 0; _t < nt.args.length; ++_t) {
                var vt = nt.args[_t];
                if (!(vt.count <= 0)) {
                    var bt = new RegExp(vt.name,"g")
                      , St = ""
                      , At = it.arrayArgs.indexOf(_t);
                    switch (it.argTypes[_t]) {
                    case "offset":
                        var Et = it.offsetArgIndex.indexOf(_t);
                        At = it.offsetArgs[Et].array,
                        St = "+q" + Et;
                    case "array":
                        St = "p" + At + St;
                        var Pt = "l" + _t
                          , It = "a" + At;
                        if (it.arrayBlockIndices[At] === 0)
                            vt.count === 1 ? at[At] === "generic" ? vt.lvalue ? (pt.push(["var ", Pt, "=", It, ".get(", St, ")"].join("")),
                            ut = ut.replace(bt, Pt),
                            ht.push([It, ".set(", St, ",", Pt, ")"].join(""))) : ut = ut.replace(bt, [It, ".get(", St, ")"].join("")) : ut = ut.replace(bt, [It, "[", St, "]"].join("")) : at[At] === "generic" ? (pt.push(["var ", Pt, "=", It, ".get(", St, ")"].join("")),
                            ut = ut.replace(bt, Pt),
                            vt.lvalue && ht.push([It, ".set(", St, ",", Pt, ")"].join(""))) : (pt.push(["var ", Pt, "=", It, "[", St, "]"].join("")),
                            ut = ut.replace(bt, Pt),
                            vt.lvalue && ht.push([It, "[", St, "]=", Pt].join("")));
                        else {
                            for (var Dt = [vt.name], Gt = [St], Bt = 0; Bt < Math.abs(it.arrayBlockIndices[At]); Bt++)
                                Dt.push("\\s*\\[([^\\]]+)\\]"),
                                Gt.push("$" + (Bt + 1) + "*t" + At + "b" + Bt);
                            if (bt = new RegExp(Dt.join(""),"g"),
                            St = Gt.join("+"),
                            at[At] === "generic")
                                throw new Error("cwise: Generic arrays not supported in combination with blocks!");
                            ut = ut.replace(bt, [It, "[", St, "]"].join(""))
                        }
                        break;
                    case "scalar":
                        ut = ut.replace(bt, "Y" + it.scalarArgs.indexOf(_t));
                        break;
                    case "index":
                        ut = ut.replace(bt, "index");
                        break;
                    case "shape":
                        ut = ut.replace(bt, "shape")
                    }
                }
            }
            return [pt.join(`
`), ut, ht.join(`
`)].join(`
`).trim()
        }
        function _e(nt) {
            for (var it = new Array(nt.length), at = !0, ut = 0; ut < nt.length; ++ut) {
                var pt = nt[ut]
                  , ht = pt.match(/\d+/);
                ht = ht ? ht[0] : "",
                pt.charAt(0) === 0 ? it[ut] = "u" + pt.charAt(1) + ht : it[ut] = pt.charAt(0) + ht,
                ut > 0 && (at = at && it[ut] === it[ut - 1])
            }
            return at ? it[0] : it.join("")
        }
        d.exports = function(nt, it) {
            for (var at = it[1].length - Math.abs(nt.arrayBlockIndices[0]) | 0, ut = new Array(nt.arrayArgs.length), pt = new Array(nt.arrayArgs.length), ht = 0; ht < nt.arrayArgs.length; ++ht)
                pt[ht] = it[2 * ht],
                ut[ht] = it[2 * ht + 1];
            var _t = []
              , vt = []
              , bt = []
              , St = []
              , At = [];
            for (ht = 0; ht < nt.arrayArgs.length; ++ht) {
                nt.arrayBlockIndices[ht] < 0 ? (bt.push(0),
                St.push(at),
                _t.push(at),
                vt.push(at + nt.arrayBlockIndices[ht])) : (bt.push(nt.arrayBlockIndices[ht]),
                St.push(nt.arrayBlockIndices[ht] + at),
                _t.push(0),
                vt.push(nt.arrayBlockIndices[ht]));
                for (var Et = [], Pt = 0; Pt < ut[ht].length; Pt++)
                    bt[ht] <= ut[ht][Pt] && ut[ht][Pt] < St[ht] && Et.push(ut[ht][Pt] - bt[ht]);
                At.push(Et)
            }
            var It = ["SS"]
              , Dt = ["'use strict'"]
              , Gt = [];
            for (Pt = 0; Pt < at; ++Pt)
                Gt.push(["s", Pt, "=SS[", Pt, "]"].join(""));
            for (ht = 0; ht < nt.arrayArgs.length; ++ht) {
                for (It.push("a" + ht),
                It.push("t" + ht),
                It.push("p" + ht),
                Pt = 0; Pt < at; ++Pt)
                    Gt.push(["t", ht, "p", Pt, "=t", ht, "[", bt[ht] + Pt, "]"].join(""));
                for (Pt = 0; Pt < Math.abs(nt.arrayBlockIndices[ht]); ++Pt)
                    Gt.push(["t", ht, "b", Pt, "=t", ht, "[", _t[ht] + Pt, "]"].join(""))
            }
            for (ht = 0; ht < nt.scalarArgs.length; ++ht)
                It.push("Y" + ht);
            if (nt.shapeArgs.length > 0 && Gt.push("shape=SS.slice(0)"),
            nt.indexArgs.length > 0) {
                var Bt = new Array(at);
                for (ht = 0; ht < at; ++ht)
                    Bt[ht] = "0";
                Gt.push(["index=[", Bt.join(","), "]"].join(""))
            }
            for (ht = 0; ht < nt.offsetArgs.length; ++ht) {
                var kt = nt.offsetArgs[ht]
                  , Ut = [];
                for (Pt = 0; Pt < kt.offset.length; ++Pt)
                    kt.offset[Pt] !== 0 && (kt.offset[Pt] === 1 ? Ut.push(["t", kt.array, "p", Pt].join("")) : Ut.push([kt.offset[Pt], "*t", kt.array, "p", Pt].join("")));
                Ut.length === 0 ? Gt.push("q" + ht + "=0") : Gt.push(["q", ht, "=", Ut.join("+")].join(""))
            }
            var Ht = h([].concat(nt.pre.thisVars).concat(nt.body.thisVars).concat(nt.post.thisVars));
            for ((Gt = Gt.concat(Ht)).length > 0 && Dt.push("var " + Gt.join(",")),
            ht = 0; ht < nt.arrayArgs.length; ++ht)
                Dt.push("p" + ht + "|=0");
            nt.pre.body.length > 3 && Dt.push(b(nt.pre, nt, pt));
            var Kt = b(nt.body, nt, pt)
              , Jt = function(ir) {
                for (var lr = 0, ar = ir[0].length; lr < ar; ) {
                    for (var hr = 1; hr < ir.length; ++hr)
                        if (ir[hr][lr] !== ir[0][lr])
                            return lr;
                    ++lr
                }
                return lr
            }(At);
            Jt < at ? Dt.push(function(ir, lr, ar, hr) {
                for (var gr = lr.length, dr = ar.arrayArgs.length, cr = ar.blockSize, Ar = ar.indexArgs.length > 0, wr = [], Rr = 0; Rr < dr; ++Rr)
                    wr.push(["var offset", Rr, "=p", Rr].join(""));
                for (Rr = ir; Rr < gr; ++Rr)
                    wr.push(["for(var j" + Rr + "=SS[", lr[Rr], "]|0;j", Rr, ">0;){"].join("")),
                    wr.push(["if(j", Rr, "<", cr, "){"].join("")),
                    wr.push(["s", lr[Rr], "=j", Rr].join("")),
                    wr.push(["j", Rr, "=0"].join("")),
                    wr.push(["}else{s", lr[Rr], "=", cr].join("")),
                    wr.push(["j", Rr, "-=", cr, "}"].join("")),
                    Ar && wr.push(["index[", lr[Rr], "]=j", Rr].join(""));
                for (Rr = 0; Rr < dr; ++Rr) {
                    for (var Cr = ["offset" + Rr], tr = ir; tr < gr; ++tr)
                        Cr.push(["j", tr, "*t", Rr, "p", lr[tr]].join(""));
                    wr.push(["p", Rr, "=(", Cr.join("+"), ")"].join(""))
                }
                for (wr.push(_(lr, ar, hr)),
                Rr = ir; Rr < gr; ++Rr)
                    wr.push("}");
                return wr.join(`
`)
            }(Jt, At[0], nt, Kt)) : Dt.push(_(At[0], nt, Kt)),
            nt.post.body.length > 3 && Dt.push(b(nt.post, nt, pt)),
            nt.debug && console.log("-----Generated cwise routine for ", it, `:
` + Dt.join(`
`) + `
----------`);
            var or = [nt.funcName || "unnamed", "_cwise_loop_", ut[0].join("s"), "m", Jt, _e(pt)].join("");
            return new Function(["function ", or, "(", It.join(","), "){", Dt.join(`
`), "} return ", or].join(""))()
        }
    
}


// Module 986
function module986(d, o, c) {

        var h = c(151);
        d.exports = function(_) {
            var b = ["'use strict'", "var CACHED={}"]
              , _e = []
              , nt = _.funcName + "_cwise_thunk";
            b.push(["return function ", nt, "(", _.shimArgs.join(","), "){"].join(""));
            for (var it = [], at = [], ut = [["array", _.arrayArgs[0], ".shape.slice(", Math.max(0, _.arrayBlockIndices[0]), _.arrayBlockIndices[0] < 0 ? "," + _.arrayBlockIndices[0] + ")" : ")"].join("")], pt = [], ht = [], _t = 0; _t < _.arrayArgs.length; ++_t) {
                var vt = _.arrayArgs[_t];
                _e.push(["t", vt, "=array", vt, ".dtype,", "r", vt, "=array", vt, ".order"].join("")),
                it.push("t" + vt),
                it.push("r" + vt),
                at.push("t" + vt),
                at.push("r" + vt + ".join()"),
                ut.push("array" + vt + ".data"),
                ut.push("array" + vt + ".stride"),
                ut.push("array" + vt + ".offset|0"),
                _t > 0 && (pt.push("array" + _.arrayArgs[0] + ".shape.length===array" + vt + ".shape.length+" + (Math.abs(_.arrayBlockIndices[0]) - Math.abs(_.arrayBlockIndices[_t]))),
                ht.push("array" + _.arrayArgs[0] + ".shape[shapeIndex+" + Math.max(0, _.arrayBlockIndices[0]) + "]===array" + vt + ".shape[shapeIndex+" + Math.max(0, _.arrayBlockIndices[_t]) + "]"))
            }
            for (_.arrayArgs.length > 1 && (b.push("if (!(" + pt.join(" && ") + ")) throw new Error('cwise: Arrays do not all have the same dimensionality!')"),
            b.push("for(var shapeIndex=array" + _.arrayArgs[0] + ".shape.length-" + Math.abs(_.arrayBlockIndices[0]) + "; shapeIndex-->0;) {"),
            b.push("if (!(" + ht.join(" && ") + ")) throw new Error('cwise: Arrays do not all have the same shape!')"),
            b.push("}")),
            _t = 0; _t < _.scalarArgs.length; ++_t)
                ut.push("scalar" + _.scalarArgs[_t]);
            return _e.push(["type=[", at.join(","), "].join()"].join("")),
            _e.push("proc=CACHED[type]"),
            b.push("var " + _e.join(",")),
            b.push(["if(!proc){", "CACHED[type]=proc=compile([", it.join(","), "])}", "return proc(", ut.join(","), ")}"].join("")),
            _.debug && console.log(`-----Generated thunk:
` + b.join(`
`) + `
----------`),
            new Function("compile",b.join(`
`))(h.bind(void 0, _))
        }
    
}


// Module 49
function module49(d, o, c) {

        var h = c(101)
          , _ = {
            body: "",
            args: [],
            thisVars: [],
            localVars: []
        };
        function b(_t) {
            if (!_t)
                return _;
            for (var vt = 0; vt < _t.args.length; ++vt) {
                var bt = _t.args[vt];
                _t.args[vt] = vt === 0 ? {
                    name: bt,
                    lvalue: !0,
                    rvalue: !!_t.rvalue,
                    count: _t.count || 1
                } : {
                    name: bt,
                    lvalue: !1,
                    rvalue: !0,
                    count: 1
                }
            }
            return _t.thisVars || (_t.thisVars = []),
            _t.localVars || (_t.localVars = []),
            _t
        }
        function _e(_t) {
            for (var vt = [], bt = 0; bt < _t.args.length; ++bt)
                vt.push("a" + bt);
            return new Function("P",["return function ", _t.funcName, "_ndarrayops(", vt.join(","), ") {P(", vt.join(","), ");return a0}"].join(""))(function(St) {
                return h({
                    args: St.args,
                    pre: b(St.pre),
                    body: b(St.body),
                    post: b(St.proc),
                    funcName: St.funcName
                })
            }(_t))
        }
        var nt = {
            add: "+",
            sub: "-",
            mul: "*",
            div: "/",
            mod: "%",
            band: "&",
            bor: "|",
            bxor: "^",
            lshift: "<<",
            rshift: ">>",
            rrshift: ">>>"
        };
        (function() {
            for (var _t in nt) {
                var vt = nt[_t];
                o[_t] = _e({
                    args: ["array", "array", "array"],
                    body: {
                        args: ["a", "b", "c"],
                        body: "a=b" + vt + "c"
                    },
                    funcName: _t
                }),
                o[_t + "eq"] = _e({
                    args: ["array", "array"],
                    body: {
                        args: ["a", "b"],
                        body: "a" + vt + "=b"
                    },
                    rvalue: !0,
                    funcName: _t + "eq"
                }),
                o[_t + "s"] = _e({
                    args: ["array", "array", "scalar"],
                    body: {
                        args: ["a", "b", "s"],
                        body: "a=b" + vt + "s"
                    },
                    funcName: _t + "s"
                }),
                o[_t + "seq"] = _e({
                    args: ["array", "scalar"],
                    body: {
                        args: ["a", "s"],
                        body: "a" + vt + "=s"
                    },
                    rvalue: !0,
                    funcName: _t + "seq"
                })
            }
        }
        )();
        var it = {
            not: "!",
            bnot: "~",
            neg: "-",
            recip: "1.0/"
        };
        (function() {
            for (var _t in it) {
                var vt = it[_t];
                o[_t] = _e({
                    args: ["array", "array"],
                    body: {
                        args: ["a", "b"],
                        body: "a=" + vt + "b"
                    },
                    funcName: _t
                }),
                o[_t + "eq"] = _e({
                    args: ["array"],
                    body: {
                        args: ["a"],
                        body: "a=" + vt + "a"
                    },
                    rvalue: !0,
                    count: 2,
                    funcName: _t + "eq"
                })
            }
        }
        )();
        var at = {
            and: "&&",
            or: "||",
            eq: "===",
            neq: "!==",
            lt: "<",
            gt: ">",
            leq: "<=",
            geq: ">="
        };
        (function() {
            for (var _t in at) {
                var vt = at[_t];
                o[_t] = _e({
                    args: ["array", "array", "array"],
                    body: {
                        args: ["a", "b", "c"],
                        body: "a=b" + vt + "c"
                    },
                    funcName: _t
                }),
                o[_t + "s"] = _e({
                    args: ["array", "array", "scalar"],
                    body: {
                        args: ["a", "b", "s"],
                        body: "a=b" + vt + "s"
                    },
                    funcName: _t + "s"
                }),
                o[_t + "eq"] = _e({
                    args: ["array", "array"],
                    body: {
                        args: ["a", "b"],
                        body: "a=a" + vt + "b"
                    },
                    rvalue: !0,
                    count: 2,
                    funcName: _t + "eq"
                }),
                o[_t + "seq"] = _e({
                    args: ["array", "scalar"],
                    body: {
                        args: ["a", "s"],
                        body: "a=a" + vt + "s"
                    },
                    rvalue: !0,
                    count: 2,
                    funcName: _t + "seq"
                })
            }
        }
        )();
        var ut = ["abs", "acos", "asin", "atan", "ceil", "cos", "exp", "floor", "log", "round", "sin", "sqrt", "tan"];
        (function() {
            for (var _t = 0; _t < ut.length; ++_t) {
                var vt = ut[_t];
                o[vt] = _e({
                    args: ["array", "array"],
                    pre: {
                        args: [],
                        body: "this_f=Math." + vt,
                        thisVars: ["this_f"]
                    },
                    body: {
                        args: ["a", "b"],
                        body: "a=this_f(b)",
                        thisVars: ["this_f"]
                    },
                    funcName: vt
                }),
                o[vt + "eq"] = _e({
                    args: ["array"],
                    pre: {
                        args: [],
                        body: "this_f=Math." + vt,
                        thisVars: ["this_f"]
                    },
                    body: {
                        args: ["a"],
                        body: "a=this_f(a)",
                        thisVars: ["this_f"]
                    },
                    rvalue: !0,
                    count: 2,
                    funcName: vt + "eq"
                })
            }
        }
        )();
        var pt = ["max", "min", "atan2", "pow"];
        (function() {
            for (var _t = 0; _t < pt.length; ++_t) {
                var vt = pt[_t];
                o[vt] = _e({
                    args: ["array", "array", "array"],
                    pre: {
                        args: [],
                        body: "this_f=Math." + vt,
                        thisVars: ["this_f"]
                    },
                    body: {
                        args: ["a", "b", "c"],
                        body: "a=this_f(b,c)",
                        thisVars: ["this_f"]
                    },
                    funcName: vt
                }),
                o[vt + "s"] = _e({
                    args: ["array", "array", "scalar"],
                    pre: {
                        args: [],
                        body: "this_f=Math." + vt,
                        thisVars: ["this_f"]
                    },
                    body: {
                        args: ["a", "b", "c"],
                        body: "a=this_f(b,c)",
                        thisVars: ["this_f"]
                    },
                    funcName: vt + "s"
                }),
                o[vt + "eq"] = _e({
                    args: ["array", "array"],
                    pre: {
                        args: [],
                        body: "this_f=Math." + vt,
                        thisVars: ["this_f"]
                    },
                    body: {
                        args: ["a", "b"],
                        body: "a=this_f(a,b)",
                        thisVars: ["this_f"]
                    },
                    rvalue: !0,
                    count: 2,
                    funcName: vt + "eq"
                }),
                o[vt + "seq"] = _e({
                    args: ["array", "scalar"],
                    pre: {
                        args: [],
                        body: "this_f=Math." + vt,
                        thisVars: ["this_f"]
                    },
                    body: {
                        args: ["a", "b"],
                        body: "a=this_f(a,b)",
                        thisVars: ["this_f"]
                    },
                    rvalue: !0,
                    count: 2,
                    funcName: vt + "seq"
                })
            }
        }
        )();
        var ht = ["atan2", "pow"];
        (function() {
            for (var _t = 0; _t < ht.length; ++_t) {
                var vt = ht[_t];
                o[vt + "op"] = _e({
                    args: ["array", "array", "array"],
                    pre: {
                        args: [],
                        body: "this_f=Math." + vt,
                        thisVars: ["this_f"]
                    },
                    body: {
                        args: ["a", "b", "c"],
                        body: "a=this_f(c,b)",
                        thisVars: ["this_f"]
                    },
                    funcName: vt + "op"
                }),
                o[vt + "ops"] = _e({
                    args: ["array", "array", "scalar"],
                    pre: {
                        args: [],
                        body: "this_f=Math." + vt,
                        thisVars: ["this_f"]
                    },
                    body: {
                        args: ["a", "b", "c"],
                        body: "a=this_f(c,b)",
                        thisVars: ["this_f"]
                    },
                    funcName: vt + "ops"
                }),
                o[vt + "opeq"] = _e({
                    args: ["array", "array"],
                    pre: {
                        args: [],
                        body: "this_f=Math." + vt,
                        thisVars: ["this_f"]
                    },
                    body: {
                        args: ["a", "b"],
                        body: "a=this_f(b,a)",
                        thisVars: ["this_f"]
                    },
                    rvalue: !0,
                    count: 2,
                    funcName: vt + "opeq"
                }),
                o[vt + "opseq"] = _e({
                    args: ["array", "scalar"],
                    pre: {
                        args: [],
                        body: "this_f=Math." + vt,
                        thisVars: ["this_f"]
                    },
                    body: {
                        args: ["a", "b"],
                        body: "a=this_f(b,a)",
                        thisVars: ["this_f"]
                    },
                    rvalue: !0,
                    count: 2,
                    funcName: vt + "opseq"
                })
            }
        }
        )(),
        o.any = h({
            args: ["array"],
            pre: _,
            body: {
                args: [{
                    name: "a",
                    lvalue: !1,
                    rvalue: !0,
                    count: 1
                }],
                body: "if(a){return true}",
                localVars: [],
                thisVars: []
            },
            post: {
                args: [],
                localVars: [],
                thisVars: [],
                body: "return false"
            },
            funcName: "any"
        }),
        o.all = h({
            args: ["array"],
            pre: _,
            body: {
                args: [{
                    name: "x",
                    lvalue: !1,
                    rvalue: !0,
                    count: 1
                }],
                body: "if(!x){return false}",
                localVars: [],
                thisVars: []
            },
            post: {
                args: [],
                localVars: [],
                thisVars: [],
                body: "return true"
            },
            funcName: "all"
        }),
        o.sum = h({
            args: ["array"],
            pre: {
                args: [],
                localVars: [],
                thisVars: ["this_s"],
                body: "this_s=0"
            },
            body: {
                args: [{
                    name: "a",
                    lvalue: !1,
                    rvalue: !0,
                    count: 1
                }],
                body: "this_s+=a",
                localVars: [],
                thisVars: ["this_s"]
            },
            post: {
                args: [],
                localVars: [],
                thisVars: ["this_s"],
                body: "return this_s"
            },
            funcName: "sum"
        }),
        o.prod = h({
            args: ["array"],
            pre: {
                args: [],
                localVars: [],
                thisVars: ["this_s"],
                body: "this_s=1"
            },
            body: {
                args: [{
                    name: "a",
                    lvalue: !1,
                    rvalue: !0,
                    count: 1
                }],
                body: "this_s*=a",
                localVars: [],
                thisVars: ["this_s"]
            },
            post: {
                args: [],
                localVars: [],
                thisVars: ["this_s"],
                body: "return this_s"
            },
            funcName: "prod"
        }),
        o.norm2squared = h({
            args: ["array"],
            pre: {
                args: [],
                localVars: [],
                thisVars: ["this_s"],
                body: "this_s=0"
            },
            body: {
                args: [{
                    name: "a",
                    lvalue: !1,
                    rvalue: !0,
                    count: 2
                }],
                body: "this_s+=a*a",
                localVars: [],
                thisVars: ["this_s"]
            },
            post: {
                args: [],
                localVars: [],
                thisVars: ["this_s"],
                body: "return this_s"
            },
            funcName: "norm2squared"
        }),
        o.norm2 = h({
            args: ["array"],
            pre: {
                args: [],
                localVars: [],
                thisVars: ["this_s"],
                body: "this_s=0"
            },
            body: {
                args: [{
                    name: "a",
                    lvalue: !1,
                    rvalue: !0,
                    count: 2
                }],
                body: "this_s+=a*a",
                localVars: [],
                thisVars: ["this_s"]
            },
            post: {
                args: [],
                localVars: [],
                thisVars: ["this_s"],
                body: "return Math.sqrt(this_s)"
            },
            funcName: "norm2"
        }),
        o.norminf = h({
            args: ["array"],
            pre: {
                args: [],
                localVars: [],
                thisVars: ["this_s"],
                body: "this_s=0"
            },
            body: {
                args: [{
                    name: "a",
                    lvalue: !1,
                    rvalue: !0,
                    count: 4
                }],
                body: "if(-a>this_s){this_s=-a}else if(a>this_s){this_s=a}",
                localVars: [],
                thisVars: ["this_s"]
            },
            post: {
                args: [],
                localVars: [],
                thisVars: ["this_s"],
                body: "return this_s"
            },
            funcName: "norminf"
        }),
        o.norm1 = h({
            args: ["array"],
            pre: {
                args: [],
                localVars: [],
                thisVars: ["this_s"],
                body: "this_s=0"
            },
            body: {
                args: [{
                    name: "a",
                    lvalue: !1,
                    rvalue: !0,
                    count: 3
                }],
                body: "this_s+=a<0?-a:a",
                localVars: [],
                thisVars: ["this_s"]
            },
            post: {
                args: [],
                localVars: [],
                thisVars: ["this_s"],
                body: "return this_s"
            },
            funcName: "norm1"
        }),
        o.sup = h({
            args: ["array"],
            pre: {
                body: "this_h=-Infinity",
                args: [],
                thisVars: ["this_h"],
                localVars: []
            },
            body: {
                body: "if(_inline_1_arg0_>this_h)this_h=_inline_1_arg0_",
                args: [{
                    name: "_inline_1_arg0_",
                    lvalue: !1,
                    rvalue: !0,
                    count: 2
                }],
                thisVars: ["this_h"],
                localVars: []
            },
            post: {
                body: "return this_h",
                args: [],
                thisVars: ["this_h"],
                localVars: []
            }
        }),
        o.inf = h({
            args: ["array"],
            pre: {
                body: "this_h=Infinity",
                args: [],
                thisVars: ["this_h"],
                localVars: []
            },
            body: {
                body: "if(_inline_1_arg0_<this_h)this_h=_inline_1_arg0_",
                args: [{
                    name: "_inline_1_arg0_",
                    lvalue: !1,
                    rvalue: !0,
                    count: 2
                }],
                thisVars: ["this_h"],
                localVars: []
            },
            post: {
                body: "return this_h",
                args: [],
                thisVars: ["this_h"],
                localVars: []
            }
        }),
        o.argmin = h({
            args: ["index", "array", "shape"],
            pre: {
                body: "{this_v=Infinity;this_i=_inline_0_arg2_.slice(0)}",
                args: [{
                    name: "_inline_0_arg0_",
                    lvalue: !1,
                    rvalue: !1,
                    count: 0
                }, {
                    name: "_inline_0_arg1_",
                    lvalue: !1,
                    rvalue: !1,
                    count: 0
                }, {
                    name: "_inline_0_arg2_",
                    lvalue: !1,
                    rvalue: !0,
                    count: 1
                }],
                thisVars: ["this_i", "this_v"],
                localVars: []
            },
            body: {
                body: "{if(_inline_1_arg1_<this_v){this_v=_inline_1_arg1_;for(var _inline_1_k=0;_inline_1_k<_inline_1_arg0_.length;++_inline_1_k){this_i[_inline_1_k]=_inline_1_arg0_[_inline_1_k]}}}",
                args: [{
                    name: "_inline_1_arg0_",
                    lvalue: !1,
                    rvalue: !0,
                    count: 2
                }, {
                    name: "_inline_1_arg1_",
                    lvalue: !1,
                    rvalue: !0,
                    count: 2
                }],
                thisVars: ["this_i", "this_v"],
                localVars: ["_inline_1_k"]
            },
            post: {
                body: "{return this_i}",
                args: [],
                thisVars: ["this_i"],
                localVars: []
            }
        }),
        o.argmax = h({
            args: ["index", "array", "shape"],
            pre: {
                body: "{this_v=-Infinity;this_i=_inline_0_arg2_.slice(0)}",
                args: [{
                    name: "_inline_0_arg0_",
                    lvalue: !1,
                    rvalue: !1,
                    count: 0
                }, {
                    name: "_inline_0_arg1_",
                    lvalue: !1,
                    rvalue: !1,
                    count: 0
                }, {
                    name: "_inline_0_arg2_",
                    lvalue: !1,
                    rvalue: !0,
                    count: 1
                }],
                thisVars: ["this_i", "this_v"],
                localVars: []
            },
            body: {
                body: "{if(_inline_1_arg1_>this_v){this_v=_inline_1_arg1_;for(var _inline_1_k=0;_inline_1_k<_inline_1_arg0_.length;++_inline_1_k){this_i[_inline_1_k]=_inline_1_arg0_[_inline_1_k]}}}",
                args: [{
                    name: "_inline_1_arg0_",
                    lvalue: !1,
                    rvalue: !0,
                    count: 2
                }, {
                    name: "_inline_1_arg1_",
                    lvalue: !1,
                    rvalue: !0,
                    count: 2
                }],
                thisVars: ["this_i", "this_v"],
                localVars: ["_inline_1_k"]
            },
            post: {
                body: "{return this_i}",
                args: [],
                thisVars: ["this_i"],
                localVars: []
            }
        }),
        o.random = _e({
            args: ["array"],
            pre: {
                args: [],
                body: "this_f=Math.random",
                thisVars: ["this_f"]
            },
            body: {
                args: ["a"],
                body: "a=this_f()",
                thisVars: ["this_f"]
            },
            funcName: "random"
        }),
        o.assign = _e({
            args: ["array", "array"],
            body: {
                args: ["a", "b"],
                body: "a=b"
            },
            funcName: "assign"
        }),
        o.assigns = _e({
            args: ["array", "scalar"],
            body: {
                args: ["a", "b"],
                body: "a=b"
            },
            funcName: "assigns"
        }),
        o.equals = h({
            args: ["array", "array"],
            pre: _,
            body: {
                args: [{
                    name: "x",
                    lvalue: !1,
                    rvalue: !0,
                    count: 1
                }, {
                    name: "y",
                    lvalue: !1,
                    rvalue: !0,
                    count: 1
                }],
                body: "if(x!==y){return false}",
                localVars: [],
                thisVars: []
            },
            post: {
                args: [],
                localVars: [],
                thisVars: [],
                body: "return true"
            },
            funcName: "equals"
        })
    
}

