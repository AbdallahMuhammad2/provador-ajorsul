/*
 * Module 49 (Pattern 0)
 * Params: d, o, c
 * Size: 23328 chars
 */

// === MODULE CONTENT ===
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
            return new Function("P",["return function ", _t.funcName, "_ndarrayops(", vt.join(","), ") {
P(", vt.join(","), ");
return a0}"].join(""))(function(St) {
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
                body: "if(a){
return true}",
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
                body: "if(!x){
return false}",
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
                body: "if(-a>this_s){
this_s=-a}
else if(a>this_s){
this_s=a}",
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
                body: "{
this_v=Infinity;
this_i=_inline_0_arg2_.slice(0)}",
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
                body: "{
if(_inline_1_arg1_<this_v){
this_v=_inline_1_arg1_;
for(var _inline_1_k=0;_inline_1_k<_inline_1_arg0_.length;++_inline_1_k){
this_i[_inline_1_k]=_inline_1_arg0_[_inline_1_k]}}}",
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
                body: "{
return this_i}",
                args: [],
                thisVars: ["this_i"],
                localVars: []
            }
        }),
        o.argmax = h({
            args: ["index", "array", "shape"],
            pre: {
                body: "{
this_v=-Infinity;
this_i=_inline_0_arg2_.slice(0)}",
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
                body: "{
if(_inline_1_arg1_>this_v){
this_v=_inline_1_arg1_;
for(var _inline_1_k=0;_inline_1_k<_inline_1_arg0_.length;++_inline_1_k){
this_i[_inline_1_k]=_inline_1_arg0_[_inline_1_k]}}}",
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
                body: "{
return this_i}",
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
                body: "if(x!==y){
return false}",
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

export default module49;
