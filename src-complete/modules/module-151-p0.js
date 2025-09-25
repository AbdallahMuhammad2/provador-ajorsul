/*
 * Module 151 (Pattern 0)
 * Params: d, o, c
 * Size: 9608 chars
 */

// === MODULE CONTENT ===
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
                bt.push(["for(i", ut, "=0;
i", ut, "<s", At, ";++i", ut, "){"].join(""));
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
                    wr.push(["for(var j" + Rr + "=SS[", lr[Rr], "]|0;
j", Rr, ">0;){"].join("")),
                    wr.push(["if(j", Rr, "<", cr, "){"].join("")),
                    wr.push(["s", lr[Rr], "=j", Rr].join("")),
                    wr.push(["j", Rr, "=0"].join("")),
                    wr.push(["}
else{
s", lr[Rr], "=", cr].join("")),
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

export default module151;
