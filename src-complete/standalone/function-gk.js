/* Standalone Function: Gk */

function Gk(d, o) {
    if (Ak = -1,
    Bk = 0,
    K & 6)
        throw Error(p(327));
    var c = d.callbackNode;
    if (Hk() && d.callbackNode !== c)
        return null;
    var h = uc(d, d === Q ? Z : 0);
    if (h === 0)
        return null;
    if (h & 30 || h & d.expiredLanes || o)
        o = Ik(d, h);
    else {
        o = h;
        var _ = K;
        K |= 2;
        var b = Jk();
        (Q !== d || Z !== o) && (uk = null,
        Gj = B() + 500,
        Kk(d, o));
        do
            try {
                Lk();
                break
            } catch (nt) {
                Mk(d, nt)
            }
        while (!0);
        $g(),
        mk.current = b,
        K = _,
        Y !== null ? o = 0 : (Q = null,
        Z = 0,
        o = T)
    }
    if (o !== 0) {
        if (o === 2 && (_ = xc(d),
        _ !== 0 && (h = _,
        o = Nk(d, _))),
        o === 1)
            throw c = pk,
            Kk(d, 0),
            Ck(d, h),
            Dk(d, B()),
            c;
        if (o === 6)
            Ck(d, h);
        else {
            if (_ = d.current.alternate,
            !(h & 30) && !Ok(_) && (o = Ik(d, h),
            o === 2 && (b = xc(d),
            b !== 0 && (h = b,
            o = Nk(d, b))),
            o === 1))
                throw c = pk,
                Kk(d, 0),
                Ck(d, h),
                Dk(d, B()),
                c;
            switch (d.finishedWork = _,
            d.finishedLanes = h,
            o) {
            case 0:
            case 1:
                throw Error(p(345));
            case 2:
                Pk(d, tk, uk);
                break;
            case 3:
                if (Ck(d, h),
                (h & 130023424) === h && (o = fk + 500 - B(),
                10 < o)) {
                    if (uc(d, 0) !== 0)
                        break;
                    if (_ = d.suspendedLanes,
                    (_ & h) !== h) {
                        R(),
                        d.pingedLanes |= d.suspendedLanes & _;
                        break
                    }
                    d.timeoutHandle = Ff(Pk.bind(null, d, tk, uk), o);
                    break
                }
                Pk(d, tk, uk);
                break;
            case 4:
                if (Ck(d, h),
                (h & 4194240) === h)
                    break;
                for (o = d.eventTimes,
                _ = -1; 0 < h; ) {
                    var _e = 31 - oc(h);
                    b = 1 << _e,
                    _e = o[_e],
                    _e > _ && (_ = _e),
                    h &= ~b
                }
                if (h = _,
                h = B() - h,
                h = (120 > h ? 120 : 480 > h ? 480 : 1080 > h ? 1080 : 1920 > h ? 1920 : 3e3 > h ? 3e3 : 4320 > h ? 4320 : 1960 * lk(h / 1960)) - h,
                10 < h) {
                    d.timeoutHandle = Ff(Pk.bind(null, d, tk, uk), h);
                    break
                }
                Pk(d, tk, uk);
                break;
            case 5:
                Pk(d, tk, uk);
                break;
            default:
                throw Error(p(329))
            }
        }
    }
    return Dk(d, B()),
    d.callbackNode === c ? Gk.bind(null, d) : null
}

export default Gk;
