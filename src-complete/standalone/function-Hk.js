/* Standalone Function: Hk */

function Hk() {
    if (wk !== null) {
        var d = Dc(xk)
          , o = ok.transition
          , c = C;
        try {
            if (ok.transition = null,
            C = 16 > d ? 16 : d,
            wk === null)
                var h = !1;
            else {
                if (d = wk,
                wk = null,
                xk = 0,
                K & 6)
                    throw Error(p(331));
                var _ = K;
                for (K |= 4,
                V = d.current; V !== null; ) {
                    var b = V
                      , _e = b.child;
                    if (V.flags & 16) {
                        var nt = b.deletions;
                        if (nt !== null) {
                            for (var it = 0; it < nt.length; it++) {
                                var at = nt[it];
                                for (V = at; V !== null; ) {
                                    var ut = V;
                                    switch (ut.tag) {
                                    case 0:
                                    case 11:
                                    case 15:
                                        Pj(8, ut, b)
                                    }
                                    var pt = ut.child;
                                    if (pt !== null)
                                        pt.return = ut,
                                        V = pt;
                                    else
                                        for (; V !== null; ) {
                                            ut = V;
                                            var ht = ut.sibling
                                              , _t = ut.return;
                                            if (Sj(ut),
                                            ut === at) {
                                                V = null;
                                                break
                                            }
                                            if (ht !== null) {
                                                ht.return = _t,
                                                V = ht;
                                                break
                                            }
                                            V = _t
                                        }
                                }
                            }
                            var vt = b.alternate;
                            if (vt !== null) {
                                var bt = vt.child;
                                if (bt !== null) {
                                    vt.child = null;
                                    do {
                                        var St = bt.sibling;
                                        bt.sibling = null,
                                        bt = St
                                    } while (bt !== null)
                                }
                            }
                            V = b
                        }
                    }
                    if (b.subtreeFlags & 2064 && _e !== null)
                        _e.return = b,
                        V = _e;
                    else
                        e: for (; V !== null; ) {
                            if (b = V,
                            b.flags & 2048)
                                switch (b.tag) {
                                case 0:
                                case 11:
                                case 15:
                                    Pj(9, b, b.return)
                                }
                            var At = b.sibling;
                            if (At !== null) {
                                At.return = b.return,
                                V = At;
                                break e
                            }
                            V = b.return
                        }
                }
                var Et = d.current;
                for (V = Et; V !== null; ) {
                    _e = V;
                    var Pt = _e.child;
                    if (_e.subtreeFlags & 2064 && Pt !== null)
                        Pt.return = _e,
                        V = Pt;
                    else
                        e: for (_e = Et; V !== null; ) {
                            if (nt = V,
                            nt.flags & 2048)
                                try {
                                    switch (nt.tag) {
                                    case 0:
                                    case 11:
                                    case 15:
                                        Qj(9, nt)
                                    }
                                } catch (Dt) {
                                    W(nt, nt.return, Dt)
                                }
                            if (nt === _e) {
                                V = null;
                                break e
                            }
                            var It = nt.sibling;
                            if (It !== null) {
                                It.return = nt.return,
                                V = It;
                                break e
                            }
                            V = nt.return
                        }
                }
                if (K = _,
                jg(),
                lc && typeof lc.onPostCommitFiberRoot == "function")
                    try {
                        lc.onPostCommitFiberRoot(kc, d)
                    } catch {}
                h = !0
            }
            return h
        } finally {
            C = c,
            ok.transition = o
        }
    }
    return !1
}

export default Hk;
