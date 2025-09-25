/* Standalone Function: Og */

function Og(d) {
    function o(At, Et) {
        if (d) {
            var Pt = At.deletions;
            Pt === null ? (At.deletions = [Et],
            At.flags |= 16) : Pt.push(Et)
        }
    }
    function c(At, Et) {
        if (!d)
            return null;
        for (; Et !== null; )
            o(At, Et),
            Et = Et.sibling;
        return null
    }
    function h(At, Et) {
        for (At = new Map; Et !== null; )
            Et.key !== null ? At.set(Et.key, Et) : At.set(Et.index, Et),
            Et = Et.sibling;
        return At
    }
    function _(At, Et) {
        return At = Pg(At, Et),
        At.index = 0,
        At.sibling = null,
        At
    }
    function b(At, Et, Pt) {
        return At.index = Pt,
        d ? (Pt = At.alternate,
        Pt !== null ? (Pt = Pt.index,
        Pt < Et ? (At.flags |= 2,
        Et) : Pt) : (At.flags |= 2,
        Et)) : (At.flags |= 1048576,
        Et)
    }
    function _e(At) {
        return d && At.alternate === null && (At.flags |= 2),
        At
    }
    function nt(At, Et, Pt, It) {
        return Et === null || Et.tag !== 6 ? (Et = Qg(Pt, At.mode, It),
        Et.return = At,
        Et) : (Et = _(Et, Pt),
        Et.return = At,
        Et)
    }
    function it(At, Et, Pt, It) {
        var Dt = Pt.type;
        return Dt === ya ? ut(At, Et, Pt.props.children, It, Pt.key) : Et !== null && (Et.elementType === Dt || typeof Dt == "object" && Dt !== null && Dt.$$typeof === Ha && Ng(Dt) === Et.type) ? (It = _(Et, Pt.props),
        It.ref = Lg(At, Et, Pt),
        It.return = At,
        It) : (It = Rg(Pt.type, Pt.key, Pt.props, null, At.mode, It),
        It.ref = Lg(At, Et, Pt),
        It.return = At,
        It)
    }
    function at(At, Et, Pt, It) {
        return Et === null || Et.tag !== 4 || Et.stateNode.containerInfo !== Pt.containerInfo || Et.stateNode.implementation !== Pt.implementation ? (Et = Sg(Pt, At.mode, It),
        Et.return = At,
        Et) : (Et = _(Et, Pt.children || []),
        Et.return = At,
        Et)
    }
    function ut(At, Et, Pt, It, Dt) {
        return Et === null || Et.tag !== 7 ? (Et = Tg(Pt, At.mode, It, Dt),
        Et.return = At,
        Et) : (Et = _(Et, Pt),
        Et.return = At,
        Et)
    }
    function pt(At, Et, Pt) {
        if (typeof Et == "string" && Et !== "" || typeof Et == "number")
            return Et = Qg("" + Et, At.mode, Pt),
            Et.return = At,
            Et;
        if (typeof Et == "object" && Et !== null) {
            switch (Et.$$typeof) {
            case va:
                return Pt = Rg(Et.type, Et.key, Et.props, null, At.mode, Pt),
                Pt.ref = Lg(At, null, Et),
                Pt.return = At,
                Pt;
            case wa:
                return Et = Sg(Et, At.mode, Pt),
                Et.return = At,
                Et;
            case Ha:
                var It = Et._init;
                return pt(At, It(Et._payload), Pt)
            }
            if (eb(Et) || Ka(Et))
                return Et = Tg(Et, At.mode, Pt, null),
                Et.return = At,
                Et;
            Mg(At, Et)
        }
        return null
    }
    function ht(At, Et, Pt, It) {
        var Dt = Et !== null ? Et.key : null;
        if (typeof Pt == "string" && Pt !== "" || typeof Pt == "number")
            return Dt !== null ? null : nt(At, Et, "" + Pt, It);
        if (typeof Pt == "object" && Pt !== null) {
            switch (Pt.$$typeof) {
            case va:
                return Pt.key === Dt ? it(At, Et, Pt, It) : null;
            case wa:
                return Pt.key === Dt ? at(At, Et, Pt, It) : null;
            case Ha:
                return Dt = Pt._init,
                ht(At, Et, Dt(Pt._payload), It)
            }
            if (eb(Pt) || Ka(Pt))
                return Dt !== null ? null : ut(At, Et, Pt, It, null);
            Mg(At, Pt)
        }
        return null
    }
    function _t(At, Et, Pt, It, Dt) {
        if (typeof It == "string" && It !== "" || typeof It == "number")
            return At = At.get(Pt) || null,
            nt(Et, At, "" + It, Dt);
        if (typeof It == "object" && It !== null) {
            switch (It.$$typeof) {
            case va:
                return At = At.get(It.key === null ? Pt : It.key) || null,
                it(Et, At, It, Dt);
            case wa:
                return At = At.get(It.key === null ? Pt : It.key) || null,
                at(Et, At, It, Dt);
            case Ha:
                var Gt = It._init;
                return _t(At, Et, Pt, Gt(It._payload), Dt)
            }
            if (eb(It) || Ka(It))
                return At = At.get(Pt) || null,
                ut(Et, At, It, Dt, null);
            Mg(Et, It)
        }
        return null
    }
    function vt(At, Et, Pt, It) {
        for (var Dt = null, Gt = null, Bt = Et, kt = Et = 0, Ut = null; Bt !== null && kt < Pt.length; kt++) {
            Bt.index > kt ? (Ut = Bt,
            Bt = null) : Ut = Bt.sibling;
            var Ht = ht(At, Bt, Pt[kt], It);
            if (Ht === null) {
                Bt === null && (Bt = Ut);
                break
            }
            d && Bt && Ht.alternate === null && o(At, Bt),
            Et = b(Ht, Et, kt),
            Gt === null ? Dt = Ht : Gt.sibling = Ht,
            Gt = Ht,
            Bt = Ut
        }
        if (kt === Pt.length)
            return c(At, Bt),
            I && tg(At, kt),
            Dt;
        if (Bt === null) {
            for (; kt < Pt.length; kt++)
                Bt = pt(At, Pt[kt], It),
                Bt !== null && (Et = b(Bt, Et, kt),
                Gt === null ? Dt = Bt : Gt.sibling = Bt,
                Gt = Bt);
            return I && tg(At, kt),
            Dt
        }
        for (Bt = h(At, Bt); kt < Pt.length; kt++)
            Ut = _t(Bt, At, kt, Pt[kt], It),
            Ut !== null && (d && Ut.alternate !== null && Bt.delete(Ut.key === null ? kt : Ut.key),
            Et = b(Ut, Et, kt),
            Gt === null ? Dt = Ut : Gt.sibling = Ut,
            Gt = Ut);
        return d && Bt.forEach(function(Kt) {
            return o(At, Kt)
        }),
        I && tg(At, kt),
        Dt
    }
    function bt(At, Et, Pt, It) {
        var Dt = Ka(Pt);
        if (typeof Dt != "function")
            throw Error(p(150));
        if (Pt = Dt.call(Pt),
        Pt == null)
            throw Error(p(151));
        for (var Gt = Dt = null, Bt = Et, kt = Et = 0, Ut = null, Ht = Pt.next(); Bt !== null && !Ht.done; kt++,
        Ht = Pt.next()) {
            Bt.index > kt ? (Ut = Bt,
            Bt = null) : Ut = Bt.sibling;
            var Kt = ht(At, Bt, Ht.value, It);
            if (Kt === null) {
                Bt === null && (Bt = Ut);
                break
            }
            d && Bt && Kt.alternate === null && o(At, Bt),
            Et = b(Kt, Et, kt),
            Gt === null ? Dt = Kt : Gt.sibling = Kt,
            Gt = Kt,
            Bt = Ut
        }
        if (Ht.done)
            return c(At, Bt),
            I && tg(At, kt),
            Dt;
        if (Bt === null) {
            for (; !Ht.done; kt++,
            Ht = Pt.next())
                Ht = pt(At, Ht.value, It),
                Ht !== null && (Et = b(Ht, Et, kt),
                Gt === null ? Dt = Ht : Gt.sibling = Ht,
                Gt = Ht);
            return I && tg(At, kt),
            Dt
        }
        for (Bt = h(At, Bt); !Ht.done; kt++,
        Ht = Pt.next())
            Ht = _t(Bt, At, kt, Ht.value, It),
            Ht !== null && (d && Ht.alternate !== null && Bt.delete(Ht.key === null ? kt : Ht.key),
            Et = b(Ht, Et, kt),
            Gt === null ? Dt = Ht : Gt.sibling = Ht,
            Gt = Ht);
        return d && Bt.forEach(function(Jt) {
            return o(At, Jt)
        }),
        I && tg(At, kt),
        Dt
    }
    function St(At, Et, Pt, It) {
        if (typeof Pt == "object" && Pt !== null && Pt.type === ya && Pt.key === null && (Pt = Pt.props.children),
        typeof Pt == "object" && Pt !== null) {
            switch (Pt.$$typeof) {
            case va:
                e: {
                    for (var Dt = Pt.key, Gt = Et; Gt !== null; ) {
                        if (Gt.key === Dt) {
                            if (Dt = Pt.type,
                            Dt === ya) {
                                if (Gt.tag === 7) {
                                    c(At, Gt.sibling),
                                    Et = _(Gt, Pt.props.children),
                                    Et.return = At,
                                    At = Et;
                                    break e
                                }
                            } else if (Gt.elementType === Dt || typeof Dt == "object" && Dt !== null && Dt.$$typeof === Ha && Ng(Dt) === Gt.type) {
                                c(At, Gt.sibling),
                                Et = _(Gt, Pt.props),
                                Et.ref = Lg(At, Gt, Pt),
                                Et.return = At,
                                At = Et;
                                break e
                            }
                            c(At, Gt);
                            break
                        } else
                            o(At, Gt);
                        Gt = Gt.sibling
                    }
                    Pt.type === ya ? (Et = Tg(Pt.props.children, At.mode, It, Pt.key),
                    Et.return = At,
                    At = Et) : (It = Rg(Pt.type, Pt.key, Pt.props, null, At.mode, It),
                    It.ref = Lg(At, Et, Pt),
                    It.return = At,
                    At = It)
                }
                return _e(At);
            case wa:
                e: {
                    for (Gt = Pt.key; Et !== null; ) {
                        if (Et.key === Gt)
                            if (Et.tag === 4 && Et.stateNode.containerInfo === Pt.containerInfo && Et.stateNode.implementation === Pt.implementation) {
                                c(At, Et.sibling),
                                Et = _(Et, Pt.children || []),
                                Et.return = At,
                                At = Et;
                                break e
                            } else {
                                c(At, Et);
                                break
                            }
                        else
                            o(At, Et);
                        Et = Et.sibling
                    }
                    Et = Sg(Pt, At.mode, It),
                    Et.return = At,
                    At = Et
                }
                return _e(At);
            case Ha:
                return Gt = Pt._init,
                St(At, Et, Gt(Pt._payload), It)
            }
            if (eb(Pt))
                return vt(At, Et, Pt, It);
            if (Ka(Pt))
                return bt(At, Et, Pt, It);
            Mg(At, Pt)
        }
        return typeof Pt == "string" && Pt !== "" || typeof Pt == "number" ? (Pt = "" + Pt,
        Et !== null && Et.tag === 6 ? (c(At, Et.sibling),
        Et = _(Et, Pt),
        Et.return = At,
        At = Et) : (c(At, Et),
        Et = Qg(Pt, At.mode, It),
        Et.return = At,
        At = Et),
        _e(At)) : c(At, Et)
    }
    return St
}

export default Og;
