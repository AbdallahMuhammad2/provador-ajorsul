/* Standalone Function: Mk */

function Mk(d, o) {
    do {
        var c = Y;
        try {
            if ($g(),
            Fh.current = Rh,
            Ih) {
                for (var h = M.memoizedState; h !== null; ) {
                    var _ = h.queue;
                    _ !== null && (_.pending = null),
                    h = h.next
                }
                Ih = !1
            }
            if (Hh = 0,
            O = N = M = null,
            Jh = !1,
            Kh = 0,
            nk.current = null,
            c === null || c.return === null) {
                T = 1,
                pk = o,
                Y = null;
                break
            }
            e: {
                var b = d
                  , _e = c.return
                  , nt = c
                  , it = o;
                if (o = Z,
                nt.flags |= 32768,
                it !== null && typeof it == "object" && typeof it.then == "function") {
                    var at = it
                      , ut = nt
                      , pt = ut.tag;
                    if (!(ut.mode & 1) && (pt === 0 || pt === 11 || pt === 15)) {
                        var ht = ut.alternate;
                        ht ? (ut.updateQueue = ht.updateQueue,
                        ut.memoizedState = ht.memoizedState,
                        ut.lanes = ht.lanes) : (ut.updateQueue = null,
                        ut.memoizedState = null)
                    }
                    var _t = Ui(_e);
                    if (_t !== null) {
                        _t.flags &= -257,
                        Vi(_t, _e, nt, b, o),
                        _t.mode & 1 && Si(b, at, o),
                        o = _t,
                        it = at;
                        var vt = o.updateQueue;
                        if (vt === null) {
                            var bt = new Set;
                            bt.add(it),
                            o.updateQueue = bt
                        } else
                            vt.add(it);
                        break e
                    } else {
                        if (!(o & 1)) {
                            Si(b, at, o),
                            tj();
                            break e
                        }
                        it = Error(p(426))
                    }
                } else if (I && nt.mode & 1) {
                    var St = Ui(_e);
                    if (St !== null) {
                        !(St.flags & 65536) && (St.flags |= 256),
                        Vi(St, _e, nt, b, o),
                        Jg(Ji(it, nt));
                        break e
                    }
                }
                b = it = Ji(it, nt),
                T !== 4 && (T = 2),
                sk === null ? sk = [b] : sk.push(b),
                b = _e;
                do {
                    switch (b.tag) {
                    case 3:
                        b.flags |= 65536,
                        o &= -o,
                        b.lanes |= o;
                        var At = Ni(b, it, o);
                        ph(b, At);
                        break e;
                    case 1:
                        nt = it;
                        var Et = b.type
                          , Pt = b.stateNode;
                        if (!(b.flags & 128) && (typeof Et.getDerivedStateFromError == "function" || Pt !== null && typeof Pt.componentDidCatch == "function" && (Ri === null || !Ri.has(Pt)))) {
                            b.flags |= 65536,
                            o &= -o,
                            b.lanes |= o;
                            var It = Qi(b, nt, o);
                            ph(b, It);
                            break e
                        }
                    }
                    b = b.return
                } while (b !== null)
            }
            Sk(c)
        } catch (Dt) {
            o = Dt,
            Y === c && c !== null && (Y = c = c.return);
            continue
        }
        break
    } while (!0)
}

export default Mk;
