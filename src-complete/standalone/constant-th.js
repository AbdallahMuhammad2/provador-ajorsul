/* Standalone Constant: th */

var th = {}
  , uh = Uf(th)
  , vh$1 = Uf(th)
  , wh = Uf(th);
function xh(d) {
    if (d === th)
        throw Error(p(174));
    return d
}
function yh(d, o) {
    switch (G(wh, o),
    G(vh$1, d),
    G(uh, th),
    d = o.nodeType,
    d) {
    case 9:
    case 11:
        o = (o = o.documentElement) ? o.namespaceURI : lb(null, "");
        break;
    default:
        d = d === 8 ? o.parentNode : o,
        o = d.namespaceURI || null,
        d = d.tagName,
        o = lb(o, d)
    }
    E(uh),
    G(uh, o)
}
function zh() {
    E(uh),
    E(vh$1),
    E(wh)
}
function Ah(d) {
    xh(wh.current);
    var o = xh(uh.current)
      , c = lb(o, d.type);
    o !== c && (G(vh$1, d),
    G(uh, c))
}
function Bh(d) {
    vh$1.current === d && (E(uh),
    E(vh$1))
}
var L = Uf(0);
function Ch(d) {
    for (var o = d; o !== null; ) {
        if (o.tag === 13) {
            var c = o.memoizedState;
            if (c !== null && (c = c.dehydrated,
            c === null || c.data === "$?" || c.data === "$!"))
                return o
        } else if (o.tag === 19 && o.memoizedProps.revealOrder !== void 0) {
            if (o.flags & 128)
                return o
        } else if (o.child !== null) {
            o.child.return = o,
            o = o.child;
            continue
        }
        if (o === d)
            break;
        for (; o.sibling === null; ) {
            if (o.return === null || o.return === d)
                return null;
            o = o.return
        }
        o.sibling.return = o.return,
        o = o.sibling
    }
    return null
}
var Dh = [];
function Eh() {
    for (var d = 0; d < Dh.length; d++)
        Dh[d]._workInProgressVersionPrimary = null;
    Dh.length = 0
}
var Fh = ua.ReactCurrentDispatcher
  , Gh = ua.ReactCurrentBatchConfig
  , Hh = 0
  , M = null
  , N = null
  , O = null
  , Ih = !1
  , Jh = !1
  , Kh = 0
  , Lh = 0;
function P() {
    throw Error(p(321))
}
function Mh(d, o) {
    if (o === null)
        return !1;
    for (var c = 0; c < o.length && c < d.length; c++)
        if (!He(d[c], o[c]))
            return !1;
    return !0
}
function Nh(d, o, c, h, _, b) {
    if (Hh = b,
    M = o,
    o.memoizedState = null,
    o.updateQueue = null,
    o.lanes = 0,
    Fh.current = d === null || d.memoizedState === null ? Oh : Ph,
    d = c(h, _),
    Jh) {
        b = 0;
        do {
            if (Jh = !1,
            Kh = 0,
            25 <= b)
                throw Error(p(301));
            b += 1,
            O = N = null,
            o.updateQueue = null,
            Fh.current = Qh,
            d = c(h, _)
        } while (Jh)
    }
    if (Fh.current = Rh,
    o = N !== null && N.next !== null,
    Hh = 0,
    O = N = M = null,
    Ih = !1,
    o)
        throw Error(p(300));
    return d
}
function Sh() {
    var d = Kh !== 0;
    return Kh = 0,
    d
}
function Th() {
    var d = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
    };

export default th;
