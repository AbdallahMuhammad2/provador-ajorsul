/*
 * Module 391 (Pattern 0)
 * Params: d
 * Size: 16259 chars
 */

// === MODULE CONTENT ===
function module391(d) {
var o = function() {
            function c(bt) {
                return ut(bt, pt(at(ht(bt.length), bt), 1 / bt.length))
            }
            function h(bt) {
                return at(_t(bt), bt)
            }
            function _(bt, St) {
                return pt(bt, St ? 1 / (bt.length - 1) : 1 / bt.length)
            }
            function b(bt) {
                var St = function(Pt) {
                    var It, Dt = Math.pow(2, -52), Gt = 1e-64 / Dt, Bt = 0, kt = 0, Ut = 0, Ht = 0, Kt = 0, Jt = vt(Pt), or = Jt.length, ir = Jt[0].length;
                    if (or < ir)
                        throw "Need more rows than columns";
                    var lr = new Array(ir)
                      , ar = new Array(ir);
                    for (kt = 0; kt < ir; kt++)
                        lr[kt] = ar[kt] = 0;
                    var hr = function rn(hn, Nn, Wn) {
                        Wn === void 0 && (Wn = 0);
                        var qn, mo = hn[Wn], Ur = Array(mo);
                        if (Wn === hn.length - 1) {
                            for (qn = mo - 2; qn >= 0; qn -= 2)
                                Ur[qn + 1] = Nn,
                                Ur[qn] = Nn;
                            return qn === -1 && (Ur[0] = Nn),
                            Ur
                        }
                        for (qn = mo - 1; qn >= 0; qn--)
                            Ur[qn] = rn(hn, Nn, Wn + 1);
                        return Ur
                    }([ir, ir], 0);
                    function gr(rn, hn) {
                        return (rn = Math.abs(rn)) > (hn = Math.abs(hn)) ? rn * Math.sqrt(1 + hn * hn / rn / rn) : hn == 0 ? rn : hn * Math.sqrt(1 + rn * rn / hn / hn)
                    }
                    var dr = 0
                      , cr = 0
                      , Ar = 0
                      , wr = 0
                      , Rr = 0
                      , Cr = 0
                      , tr = 0;
                    for (kt = 0; kt < ir; kt++) {
                        for (lr[kt] = cr,
                        tr = 0,
                        Kt = kt + 1,
                        Ut = kt; Ut < or; Ut++)
                            tr += Jt[Ut][kt] * Jt[Ut][kt];
                        if (tr <= Gt)
                            cr = 0;
                        else
                            for (dr = Jt[kt][kt],
                            cr = Math.sqrt(tr),
                            dr >= 0 && (cr = -cr),
                            Ar = dr * cr - tr,
                            Jt[kt][kt] = dr - cr,
                            Ut = Kt; Ut < ir; Ut++) {
                                for (tr = 0,
                                Ht = kt; Ht < or; Ht++)
                                    tr += Jt[Ht][kt] * Jt[Ht][Ut];
                                for (dr = tr / Ar,
                                Ht = kt; Ht < or; Ht++)
                                    Jt[Ht][Ut] += dr * Jt[Ht][kt]
                            }
                        for (ar[kt] = cr,
                        tr = 0,
                        Ut = Kt; Ut < ir; Ut++)
                            tr += Jt[kt][Ut] * Jt[kt][Ut];
                        if (tr <= Gt)
                            cr = 0;
                        else {
                            for (dr = Jt[kt][kt + 1],
                            cr = Math.sqrt(tr),
                            dr >= 0 && (cr = -cr),
                            Ar = dr * cr - tr,
                            Jt[kt][kt + 1] = dr - cr,
                            Ut = Kt; Ut < ir; Ut++)
                                lr[Ut] = Jt[kt][Ut] / Ar;
                            for (Ut = Kt; Ut < or; Ut++) {
                                for (tr = 0,
                                Ht = Kt; Ht < ir; Ht++)
                                    tr += Jt[Ut][Ht] * Jt[kt][Ht];
                                for (Ht = Kt; Ht < ir; Ht++)
                                    Jt[Ut][Ht] += tr * lr[Ht]
                            }
                        }
                        (Rr = Math.abs(ar[kt]) + Math.abs(lr[kt])) > wr && (wr = Rr)
                    }
                    for (kt = ir - 1; kt != -1; kt += -1) {
                        if (cr != 0) {
                            for (Ar = cr * Jt[kt][kt + 1],
                            Ut = Kt; Ut < ir; Ut++)
                                hr[Ut][kt] = Jt[kt][Ut] / Ar;
                            for (Ut = Kt; Ut < ir; Ut++) {
                                for (tr = 0,
                                Ht = Kt; Ht < ir; Ht++)
                                    tr += Jt[kt][Ht] * hr[Ht][Ut];
                                for (Ht = Kt; Ht < ir; Ht++)
                                    hr[Ht][Ut] += tr * hr[Ht][kt]
                            }
                        }
                        for (Ut = Kt; Ut < ir; Ut++)
                            hr[kt][Ut] = 0,
                            hr[Ut][kt] = 0;
                        hr[kt][kt] = 1,
                        cr = lr[kt],
                        Kt = kt
                    }
                    for (kt = ir - 1; kt != -1; kt += -1) {
                        for (Kt = kt + 1,
                        cr = ar[kt],
                        Ut = Kt; Ut < ir; Ut++)
                            Jt[kt][Ut] = 0;
                        if (cr != 0) {
                            for (Ar = Jt[kt][kt] * cr,
                            Ut = Kt; Ut < ir; Ut++) {
                                for (tr = 0,
                                Ht = Kt; Ht < or; Ht++)
                                    tr += Jt[Ht][kt] * Jt[Ht][Ut];
                                for (dr = tr / Ar,
                                Ht = kt; Ht < or; Ht++)
                                    Jt[Ht][Ut] += dr * Jt[Ht][kt]
                            }
                            for (Ut = kt; Ut < or; Ut++)
                                Jt[Ut][kt] = Jt[Ut][kt] / cr
                        } else
                            for (Ut = kt; Ut < or; Ut++)
                                Jt[Ut][kt] = 0;
                        Jt[kt][kt] += 1
                    }
                    for (Dt *= wr,
                    Ht = ir - 1; Ht != -1; Ht += -1)
                        for (var fr = 0; fr < 50; fr++) {
                            var vr = !1;
                            for (Kt = Ht; Kt != -1; Kt += -1) {
                                if (Math.abs(lr[Kt]) <= Dt) {
                                    vr = !0;
                                    break
                                }
                                if (Math.abs(ar[Kt - 1]) <= Dt)
                                    break
                            }
                            if (!vr) {
                                Bt = 0,
                                tr = 1;
                                var Zr = Kt - 1;
                                for (kt = Kt; kt < Ht + 1 && (dr = tr * lr[kt],
                                lr[kt] = Bt * lr[kt],
                                !(Math.abs(dr) <= Dt)); kt++)
                                    for (Ar = gr(dr, cr = ar[kt]),
                                    ar[kt] = Ar,
                                    Bt = cr / Ar,
                                    tr = -dr / Ar,
                                    Ut = 0; Ut < or; Ut++)
                                        Rr = Jt[Ut][Zr],
                                        Cr = Jt[Ut][kt],
                                        Jt[Ut][Zr] = Rr * Bt + Cr * tr,
                                        Jt[Ut][kt] = -Rr * tr + Cr * Bt
                            }
                            if (Cr = ar[Ht],
                            Kt == Ht) {
                                if (Cr < 0)
                                    for (ar[Ht] = -Cr,
                                    Ut = 0; Ut < ir; Ut++)
                                        hr[Ut][Ht] = -hr[Ut][Ht];
                                break
                            }
                            if (fr >= 49)
                                throw "Error: no convergence.";
                            for (wr = ar[Kt],
                            cr = gr(dr = (((Rr = ar[Ht - 1]) - Cr) * (Rr + Cr) + ((cr = lr[Ht - 1]) - (Ar = lr[Ht])) * (cr + Ar)) / (2 * Ar * Rr), 1),
                            dr = dr < 0 ? ((wr - Cr) * (wr + Cr) + Ar * (Rr / (dr - cr) - Ar)) / wr : ((wr - Cr) * (wr + Cr) + Ar * (Rr / (dr + cr) - Ar)) / wr,
                            Bt = 1,
                            tr = 1,
                            kt = Kt + 1; kt < Ht + 1; kt++) {
                                for (cr = lr[kt],
                                Rr = ar[kt],
                                Ar = tr * cr,
                                cr *= Bt,
                                Cr = gr(dr, Ar),
                                lr[kt - 1] = Cr,
                                dr = wr * (Bt = dr / Cr) + cr * (tr = Ar / Cr),
                                cr = -wr * tr + cr * Bt,
                                Ar = Rr * tr,
                                Rr *= Bt,
                                Ut = 0; Ut < ir; Ut++)
                                    wr = hr[Ut][kt - 1],
                                    Cr = hr[Ut][kt],
                                    hr[Ut][kt - 1] = wr * Bt + Cr * tr,
                                    hr[Ut][kt] = -wr * tr + Cr * Bt;
                                for (Cr = gr(dr, Ar),
                                ar[kt - 1] = Cr,
                                dr = (Bt = dr / Cr) * cr + (tr = Ar / Cr) * Rr,
                                wr = -tr * cr + Bt * Rr,
                                Ut = 0; Ut < or; Ut++)
                                    Rr = Jt[Ut][kt - 1],
                                    Cr = Jt[Ut][kt],
                                    Jt[Ut][kt - 1] = Rr * Bt + Cr * tr,
                                    Jt[Ut][kt] = -Rr * tr + Cr * Bt
                            }
                            lr[Kt] = 0,
                            lr[Ht] = dr,
                            ar[Ht] = wr
                        }
                    for (kt = 0; kt < ar.length; kt++)
                        ar[kt] < Dt && (ar[kt] = 0);
                    for (kt = 0; kt < ir; kt++)
                        for (Ut = kt - 1; Ut >= 0; Ut--)
                            if (ar[Ut] < ar[kt]) {
                                for (Bt = ar[Ut],
                                ar[Ut] = ar[kt],
                                ar[kt] = Bt,
                                Ht = 0; Ht < Jt.length; Ht++)
                                    It = Jt[Ht][kt],
                                    Jt[Ht][kt] = Jt[Ht][Ut],
                                    Jt[Ht][Ut] = It;
                                for (Ht = 0; Ht < hr.length; Ht++)
                                    It = hr[Ht][kt],
                                    hr[Ht][kt] = hr[Ht][Ut],
                                    hr[Ht][Ut] = It;
                                kt = Ut
                            }
                    return {
                        U: Jt,
                        S: ar,
                        V: hr
                    }
                }(bt);
                console.log(St);
                var At = St.U
                  , Et = St.S.map(function(Pt, It) {
                    var Dt = {};
                    return Dt.eigenvalue = Pt,
                    Dt.vector = At.map(function(Gt, Bt) {
                        return -1 * Gt[It]
                    }),
                    Dt
                });
                return Et
            }
            function _e(bt, ...St) {
                var At = St.map(function(It) {
                    return It.vector
                })
                  , Et = at(At, _t(c(bt)))
                  , Pt = pt(at(ht(bt.length), bt), -1 / bt.length);
                return {
                    adjustedData: Et,
                    formattedAdjustedData: it(Et, 2),
                    avgData: Pt,
                    selectedVectors: At
                }
            }
            function nt(bt) {
                return b(_(h(c(bt)), !1))
            }
            function it(bt, St) {
                var At = Math.pow(10, St);
                return bt.map(function(Et, Pt) {
                    return Et.map(function(It) {
                        return Math.round(It * At) / At
                    })
                })
            }
            function at(bt, St) {
                if (!(bt[0] && St[0] && bt.length && St.length))
                    throw new Error("Both A and B should be matrices");
                if (St.length !== bt[0].length)
                    throw new Error("Columns in A should be the same as the number of rows in B");
                for (var At = [], Et = 0; Et < bt.length; Et++) {
                    At[Et] = [];
                    for (var Pt = 0; Pt < St[0].length; Pt++)
                        for (var It = 0; It < bt[0].length; It++)
                            At[Et][Pt] = At[Et][Pt] ? At[Et][Pt] + bt[Et][It] * St[It][Pt] : bt[Et][It] * St[It][Pt]
                }
                return At
            }
            function ut(bt, St) {
                if (bt.length !== St.length || bt[0].length !== St[0].length)
                    throw new Error("Both A and B should have the same dimensions");
                for (var At = [], Et = 0; Et < bt.length; Et++) {
                    At[Et] = [];
                    for (var Pt = 0; Pt < St[0].length; Pt++)
                        At[Et][Pt] = bt[Et][Pt] - St[Et][Pt]
                }
                return At
            }
            function pt(bt, St) {
                for (var At = [], Et = 0; Et < bt.length; Et++) {
                    At[Et] = [];
                    for (var Pt = 0; Pt < bt[0].length; Pt++)
                        At[Et][Pt] = bt[Et][Pt] * St
                }
                return At
            }
            function ht(bt) {
                for (var St = [], At = 0; At < bt; At++) {
                    St[At] = [];
                    for (var Et = 0; Et < bt; Et++)
                        St[At][Et] = 1
                }
                return St
            }
            function _t(bt) {
                return vt(bt)[0].map(function(St, At) {
                    return bt.map(function(Et) {
                        return Et[At]
                    })
                })
            }
            function vt(bt) {
                var St = JSON.stringify(bt);
                return JSON.parse(St)
            }
            return {
                computeDeviationScores: h,
                computeDeviationMatrix: c,
                computeSVD: b,
                computePercentageExplained: function(bt, ...St) {
                    var At = bt.map(function(Pt) {
                        return Pt.eigenvalue
                    }).reduce(function(Pt, It) {
                        return Pt + It
                    })
                      , Et = St.map(function(Pt) {
                        return Pt.eigenvalue
                    }).reduce(function(Pt, It) {
                        return Pt + It
                    });
                    return Et / At
                },
                computeOriginalData: function(bt, St, At) {
                    var Et = ut(_t(at(_t(St), bt)), At);
                    return {
                        originalData: Et,
                        formattedOriginalData: it(Et, 2)
                    }
                },
                computeVarianceCovariance: _,
                computeAdjustedData: _e,
                getEigenVectors: nt,
                analyseTopResult: function(bt) {
                    var St = nt(bt).sort(function(At, Et) {
                        return Et.eigenvalue - At.eigenvalue
                    });
                    return console.log("Sorted Vectors", St),
                    _e(bt, St[0].vector)
                },
                transpose: _t,
                multiply: at,
                clone: vt,
                scale: pt
            }
        }();
        d.exports = o
}

export default module391;
