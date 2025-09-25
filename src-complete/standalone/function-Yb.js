/* Standalone Function: Yb */

function Yb(d) {
    var o = d.alternate;
    if (!o) {
        if (o = Vb(d),
        o === null)
            throw Error(p(188));
        return o !== d ? null : d
    }
    for (var c = d, h = o; ; ) {
        var _ = c.return;
        if (_ === null)
            break;
        var b = _.alternate;
        if (b === null) {
            if (h = _.return,
            h !== null) {
                c = h;
                continue
            }
            break
        }
        if (_.child === b.child) {
            for (b = _.child; b; ) {
                if (b === c)
                    return Xb(_),
                    d;
                if (b === h)
                    return Xb(_),
                    o;
                b = b.sibling
            }
            throw Error(p(188))
        }
        if (c.return !== h.return)
            c = _,
            h = b;
        else {
            for (var _e = !1, nt = _.child; nt; ) {
                if (nt === c) {
                    _e = !0,
                    c = _,
                    h = b;
                    break
                }
                if (nt === h) {
                    _e = !0,
                    h = _,
                    c = b;
                    break
                }
                nt = nt.sibling
            }
            if (!_e) {
                for (nt = b.child; nt; ) {
                    if (nt === c) {
                        _e = !0,
                        c = b,
                        h = _;
                        break
                    }
                    if (nt === h) {
                        _e = !0,
                        h = b,
                        c = _;
                        break
                    }
                    nt = nt.sibling
                }
                if (!_e)
                    throw Error(p(189))
            }
        }
        if (c.alternate !== h)
            throw Error(p(190))
    }
    if (c.tag !== 3)
        throw Error(p(188));
    return c.stateNode.current === c ? d : o
}

export default Yb;
