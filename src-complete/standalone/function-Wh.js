/* Standalone Function: Wh */

function Wh(d) {
    var o = Uh()
      , c = o.queue;
    if (c === null)
        throw Error(p(311));
    c.lastRenderedReducer = d;
    var h = N
      , _ = h.baseQueue
      , b = c.pending;
    if (b !== null) {
        if (_ !== null) {
            var _e = _.next;
            _.next = b.next,
            b.next = _e
        }
        h.baseQueue = _ = b,
        c.pending = null
    }
    if (_ !== null) {
        b = _.next,
        h = h.baseState;
        var nt = _e = null
          , it = null
          , at = b;
        do {
            var ut = at.lane;
            if ((Hh & ut) === ut)
                it !== null && (it = it.next = {
                    lane: 0,
                    action: at.action,
                    hasEagerState: at.hasEagerState,
                    eagerState: at.eagerState,
                    next: null
                }),
                h = at.hasEagerState ? at.eagerState : d(h, at.action);
            else {
                var pt = {
                    lane: ut,
                    action: at.action,
                    hasEagerState: at.hasEagerState,
                    eagerState: at.eagerState,
                    next: null
                };
                it === null ? (nt = it = pt,
                _e = h) : it = it.next = pt,
                M.lanes |= ut,
                rh |= ut
            }
            at = at.next
        } while (at !== null && at !== b);
        it === null ? _e = h : it.next = nt,
        He(h, o.memoizedState) || (dh = !0),
        o.memoizedState = h,
        o.baseState = _e,
        o.baseQueue = it,
        c.lastRenderedState = h
    }
    if (d = c.interleaved,
    d !== null) {
        _ = d;
        do
            b = _.lane,
            M.lanes |= b,
            rh |= b,
            _ = _.next;
        while (_ !== d)
    } else
        _ === null && (c.lanes = 0);
    return [o.memoizedState, c.dispatch]
}

export default Wh;
