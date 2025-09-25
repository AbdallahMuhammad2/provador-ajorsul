/* Standalone Function: Kk */

function Kk(d, o) {
    d.finishedWork = null,
    d.finishedLanes = 0;
    var c = d.timeoutHandle;
    if (c !== -1 && (d.timeoutHandle = -1,
    Gf(c)),
    Y !== null)
        for (c = Y.return; c !== null; ) {
            var h = c;
            switch (wg(h),
            h.tag) {
            case 1:
                h = h.type.childContextTypes,
                h != null && $f();
                break;
            case 3:
                zh(),
                E(Wf),
                E(H),
                Eh();
                break;
            case 5:
                Bh(h);
                break;
            case 4:
                zh();
                break;
            case 13:
                E(L);
                break;
            case 19:
                E(L);
                break;
            case 10:
                ah(h.type._context);
                break;
            case 22:
            case 23:
                Hj()
            }
            c = c.return
        }
    if (Q = d,
    Y = d = Pg(d.current, null),
    Z = fj = o,
    T = 0,
    pk = null,
    rk = qk = rh = 0,
    tk = sk = null,
    fh !== null) {
        for (o = 0; o < fh.length; o++)
            if (c = fh[o],
            h = c.interleaved,
            h !== null) {
                c.interleaved = null;
                var _ = h.next
                  , b = c.pending;
                if (b !== null) {
                    var _e = b.next;
                    b.next = _,
                    h.next = _e
                }
                c.pending = h
            }
        fh = null
    }
    return d
}

export default Kk;
