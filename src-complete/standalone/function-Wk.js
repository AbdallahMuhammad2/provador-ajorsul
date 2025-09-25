/* Standalone Function: Wk */

function Wk(d, o, c, h) {
    do
        Hk();
    while (wk !== null);
    if (K & 6)
        throw Error(p(327));
    c = d.finishedWork;
    var _ = d.finishedLanes;
    if (c === null)
        return null;
    if (d.finishedWork = null,
    d.finishedLanes = 0,
    c === d.current)
        throw Error(p(177));
    d.callbackNode = null,
    d.callbackPriority = 0;
    var b = c.lanes | c.childLanes;
    if (Bc(d, b),
    d === Q && (Y = Q = null,
    Z = 0),
    !(c.subtreeFlags & 2064) && !(c.flags & 2064) || vk || (vk = !0,
    Fk(hc, function() {
        return Hk(),
        null
    })),
    b = (c.flags & 15990) !== 0,
    c.subtreeFlags & 15990 || b) {
        b = ok.transition,
        ok.transition = null;
        var _e = C;
        C = 1;
        var nt = K;
        K |= 4,
        nk.current = null,
        Oj(d, c),
        dk(c, d),
        Oe(Df),
        dd = !!Cf,
        Df = Cf = null,
        d.current = c,
        hk(c),
        dc(),
        K = nt,
        C = _e,
        ok.transition = b
    } else
        d.current = c;
    if (vk && (vk = !1,
    wk = d,
    xk = _),
    b = d.pendingLanes,
    b === 0 && (Ri = null),
    mc(c.stateNode),
    Dk(d, B()),
    o !== null)
        for (h = d.onRecoverableError,
        c = 0; c < o.length; c++)
            _ = o[c],
            h(_.value, {
                componentStack: _.stack,
                digest: _.digest
            });
    if (Oi)
        throw Oi = !1,
        d = Pi,
        Pi = null,
        d;
    return xk & 1 && d.tag !== 0 && Hk(),
    b = d.pendingLanes,
    b & 1 ? d === zk ? yk++ : (yk = 0,
    zk = d) : yk = 0,
    jg(),
    null
}

export default Wk;
