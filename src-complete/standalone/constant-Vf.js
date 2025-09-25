/* Standalone Constant: Vf */

var Vf = {}
  , H = Uf(Vf)
  , Wf = Uf(!1)
  , Xf = Vf;
function Yf(d, o) {
    var c = d.type.contextTypes;
    if (!c)
        return Vf;
    var h = d.stateNode;
    if (h && h.__reactInternalMemoizedUnmaskedChildContext === o)
        return h.__reactInternalMemoizedMaskedChildContext;
    var _ = {}, b;
    for (b in c)
        _[b] = o[b];
    return h && (d = d.stateNode,
    d.__reactInternalMemoizedUnmaskedChildContext = o,
    d.__reactInternalMemoizedMaskedChildContext = _),
    _
}
function Zf(d) {
    return d = d.childContextTypes,
    d != null
}
function $f() {
    E(Wf),
    E(H)
}
function ag(d, o, c) {
    if (H.current !== Vf)
        throw Error(p(168));
    G(H, o),
    G(Wf, c)
}
function bg(d, o, c) {
    var h = d.stateNode;
    if (o = o.childContextTypes,
    typeof h.getChildContext != "function")
        return c;
    h = h.getChildContext();
    for (var _ in h)
        if (!(_ in o))
            throw Error(p(108, Ra(d) || "Unknown", _));
    return A({}, c, h)
}
function cg(d) {
    return d = (d = d.stateNode) && d.__reactInternalMemoizedMergedChildContext || Vf,
    Xf = H.current,
    G(H, d),
    G(Wf, Wf.current),
    !0
}
function dg(d, o, c) {
    var h = d.stateNode;
    if (!h)
        throw Error(p(169));
    c ? (d = bg(d, o, Xf),
    h.__reactInternalMemoizedMergedChildContext = d,
    E(Wf),
    E(H),
    G(H, d)) : E(Wf),
    G(Wf, c)
}
var eg = null
  , fg = !1
  , gg = !1;
function hg(d) {
    eg === null ? eg = [d] : eg.push(d)
}
function ig(d) {
    fg = !0,
    hg(d)
}
function jg() {
    if (!gg && eg !== null) {
        gg = !0;
        var d = 0
          , o = C;
        try {
            var c = eg;
            for (C = 1; d < c.length; d++) {
                var h = c[d];
                do
                    h = h(!0);
                while (h !== null)
            }
            eg = null,
            fg = !1
        } catch (_) {
            throw eg !== null && (eg = eg.slice(d + 1)),
            ac(fc, jg),
            _
        } finally {
            C = o,
            gg = !1
        }
    }
    return null
}
var kg = []
  , lg = 0
  , mg = null
  , ng = 0
  , og = []
  , pg = 0
  , qg = null
  , rg = 1
  , sg = "";
function tg(d, o) {
    kg[lg++] = ng,
    kg[lg++] = mg,
    mg = d,
    ng = o
}
function ug(d, o, c) {
    og[pg++] = rg,
    og[pg++] = sg,
    og[pg++] = qg,
    qg = d;
    var h = rg;
    d = sg;
    var _ = 32 - oc(h) - 1;
    h &= ~(1 << _),
    c += 1;
    var b = 32 - oc(o) + _;
    if (30 < b) {
        var _e = _ - _ % 5;
        b = (h & (1 << _e) - 1).toString(32),
        h >>= _e,
        _ -= _e,
        rg = 1 << 32 - oc(o) + _ | c << _ | h,
        sg = b + d
    } else
        rg = 1 << b | c << _ | h,
        sg = d
}
function vg(d) {
    d.return !== null && (tg(d, 1),
    ug(d, 1, 0))
}
function wg(d) {
    for (; d === mg; )
        mg = kg[--lg],
        kg[lg] = null,
        ng = kg[--lg],
        kg[lg] = null;
    for (; d === qg; )
        qg = og[--pg],
        og[pg] = null,
        sg = og[--pg],
        og[pg] = null,
        rg = og[--pg],
        og[pg] = null
}
var xg = null
  , yg = null
  , I = !1
  , zg = null;
function Ag(d, o) {
    var c = Bg(5, null, null, 0);
    c.elementType = "DELETED",
    c.stateNode = o,
    c.return = d,
    o = d.deletions,
    o === null ? (d.deletions = [c],
    d.flags |= 16) : o.push(c)
}
function Cg(d, o) {
    switch (d.tag) {
    case 5:
        var c = d.type;
        return o = o.nodeType !== 1 || c.toLowerCase() !== o.nodeName.toLowerCase() ? null : o,
        o !== null ? (d.stateNode = o,
        xg = d,
        yg = Lf(o.firstChild),
        !0) : !1;
    case 6:
        return o = d.pendingProps === "" || o.nodeType !== 3 ? null : o,
        o !== null ? (d.stateNode = o,
        xg = d,
        yg = null,
        !0) : !1;
    case 13:
        return o = o.nodeType !== 8 ? null : o,
        o !== null ? (c = qg !== null ? {
            id: rg,
            overflow: sg
        } : null,
        d.memoizedState = {
            dehydrated: o,
            treeContext: c,
            retryLane: 1073741824
        },
        c = Bg(18, null, null, 0),
        c.stateNode = o,
        c.return = d,
        d.child = c,
        xg = d,
        yg = null,
        !0) : !1;
    default:
        return !1
    }
}
function Dg(d) {
    return (d.mode & 1) !== 0 && (d.flags & 128) === 0
}
function Eg(d) {
    if (I) {
        var o = yg;
        if (o) {
            var c = o;
            if (!Cg(d, o)) {
                if (Dg(d))
                    throw Error(p(418));
                o = Lf(c.nextSibling);
                var h = xg;
                o && Cg(d, o) ? Ag(h, c) : (d.flags = d.flags & -4097 | 2,
                I = !1,
                xg = d)
            }
        } else {
            if (Dg(d))
                throw Error(p(418));
            d.flags = d.flags & -4097 | 2,
            I = !1,
            xg = d
        }
    }
}
function Fg(d) {
    for (d = d.return; d !== null && d.tag !== 5 && d.tag !== 3 && d.tag !== 13; )
        d = d.return;
    xg = d
}
function Gg(d) {
    if (d !== xg)
        return !1;
    if (!I)
        return Fg(d),
        I = !0,
        !1;
    var o;
    if ((o = d.tag !== 3) && !(o = d.tag !== 5) && (o = d.type,
    o = o !== "head" && o !== "body" && !Ef(d.type, d.memoizedProps)),
    o && (o = yg)) {
        if (Dg(d))
            throw Hg(),
            Error(p(418));
        for (; o; )
            Ag(d, o),
            o = Lf(o.nextSibling)
    }
    if (Fg(d),
    d.tag === 13) {
        if (d = d.memoizedState,
        d = d !== null ? d.dehydrated : null,
        !d)
            throw Error(p(317));
        e: {
            for (d = d.nextSibling,
            o = 0; d; ) {
                if (d.nodeType === 8) {
                    var c = d.data;
                    if (c === "/$") {
                        if (o === 0) {
                            yg = Lf(d.nextSibling);
                            break e
                        }
                        o--
                    } else
                        c !== "$" && c !== "$!" && c !== "$?" || o++
                }
                d = d.nextSibling
            }
            yg = null
        }
    } else
        yg = xg ? Lf(d.stateNode.nextSibling) : null;
    return !0
}
function Hg() {
    for (var d = yg; d; )
        d = Lf(d.nextSibling)
}
function Ig() {
    yg = xg = null,
    I = !1
}
function Jg(d) {
    zg === null ? zg = [d] : zg.push(d)
}
var Kg = ua.ReactCurrentBatchConfig;
function Lg(d, o, c) {
    if (d = c.ref,
    d !== null && typeof d != "function" && typeof d != "object") {
        if (c._owner) {
            if (c = c._owner,
            c) {
                if (c.tag !== 1)
                    throw Error(p(309));
                var h = c.stateNode
            }
            if (!h)
                throw Error(p(147, d));
            var _ = h
              , b = "" + d;
            return o !== null && o.ref !== null && typeof o.ref == "function" && o.ref._stringRef === b ? o.ref : (o = function(_e) {
                var nt = _.refs;
                _e === null ? delete nt[b] : nt[b] = _e
            }
            ,
            o._stringRef = b,
            o)
        }
        if (typeof d != "string")
            throw Error(p(284));
        if (!c._owner)
            throw Error(p(290, d))
    }
    return d
}
function Mg(d, o) {
    throw d = Object.prototype.toString.call(o),
    Error(p(31, d === "[object Object]" ? "object with keys {" + Object.keys(o).join(", ") + "}" : d))
}
function Ng(d) {
    var o = d._init;
    return o(d._payload)
}
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
var Ug = Og(!0)
  , Vg = Og(!1)
  , Wg = Uf(null)
  , Xg = null
  , Yg = null
  , Zg = null;
function $g() {
    Zg = Yg = Xg = null
}
function ah(d) {
    var o = Wg.current;
    E(Wg),
    d._currentValue = o
}
function bh(d, o, c) {
    for (; d !== null; ) {
        var h = d.alternate;
        if ((d.childLanes & o) !== o ? (d.childLanes |= o,
        h !== null && (h.childLanes |= o)) : h !== null && (h.childLanes & o) !== o && (h.childLanes |= o),
        d === c)
            break;
        d = d.return
    }
}
function ch(d, o) {
    Xg = d,
    Zg = Yg = null,
    d = d.dependencies,
    d !== null && d.firstContext !== null && (d.lanes & o && (dh = !0),
    d.firstContext = null)
}
function eh(d) {
    var o = d._currentValue;
    if (Zg !== d)
        if (d = {
            context: d,
            memoizedValue: o,
            next: null
        },
        Yg === null) {
            if (Xg === null)
                throw Error(p(308));
            Yg = d,
            Xg.dependencies = {
                lanes: 0,
                firstContext: d
            }
        } else
            Yg = Yg.next = d;
    return o
}
var fh = null;
function gh(d) {
    fh === null ? fh = [d] : fh.push(d)
}
function hh(d, o, c, h) {
    var _ = o.interleaved;
    return _ === null ? (c.next = c,
    gh(o)) : (c.next = _.next,
    _.next = c),
    o.interleaved = c,
    ih(d, h)
}
function ih(d, o) {
    d.lanes |= o;
    var c = d.alternate;
    for (c !== null && (c.lanes |= o),
    c = d,
    d = d.return; d !== null; )
        d.childLanes |= o,
        c = d.alternate,
        c !== null && (c.childLanes |= o),
        c = d,
        d = d.return;
    return c.tag === 3 ? c.stateNode : null
}
var jh = !1;
function kh(d) {
    d.updateQueue = {
        baseState: d.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
            pending: null,
            interleaved: null,
            lanes: 0
        },
        effects: null
    }
}
function lh(d, o) {
    d = d.updateQueue,
    o.updateQueue === d && (o.updateQueue = {
        baseState: d.baseState,
        firstBaseUpdate: d.firstBaseUpdate,
        lastBaseUpdate: d.lastBaseUpdate,
        shared: d.shared,
        effects: d.effects
    })
}
function mh(d, o) {
    return {
        eventTime: d,
        lane: o,
        tag: 0,
        payload: null,
        callback: null,
        next: null
    }
}
function nh(d, o, c) {
    var h = d.updateQueue;
    if (h === null)
        return null;
    if (h = h.shared,
    K & 2) {
        var _ = h.pending;
        return _ === null ? o.next = o : (o.next = _.next,
        _.next = o),
        h.pending = o,
        ih(d, c)
    }
    return _ = h.interleaved,
    _ === null ? (o.next = o,
    gh(h)) : (o.next = _.next,
    _.next = o),
    h.interleaved = o,
    ih(d, c)
}
function oh(d, o, c) {
    if (o = o.updateQueue,
    o !== null && (o = o.shared,
    (c & 4194240) !== 0)) {
        var h = o.lanes;
        h &= d.pendingLanes,
        c |= h,
        o.lanes = c,
        Cc(d, c)
    }
}
function ph(d, o) {
    var c = d.updateQueue
      , h = d.alternate;
    if (h !== null && (h = h.updateQueue,
    c === h)) {
        var _ = null
          , b = null;
        if (c = c.firstBaseUpdate,
        c !== null) {
            do {
                var _e = {
                    eventTime: c.eventTime,
                    lane: c.lane,
                    tag: c.tag,
                    payload: c.payload,
                    callback: c.callback,
                    next: null
                };

export default Vf;
