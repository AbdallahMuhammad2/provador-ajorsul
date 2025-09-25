/* Standalone Function: Xh */

function Xh(d) {
    var o = Uh()
      , c = o.queue;
    if (c === null)
        throw Error(p(311));
    c.lastRenderedReducer = d;
    var h = c.dispatch
      , _ = c.pending
      , b = o.memoizedState;
    if (_ !== null) {
        c.pending = null;
        var _e = _ = _.next;
        do
            b = d(b, _e.action),
            _e = _e.next;
        while (_e !== _);
        He(b, o.memoizedState) || (dh = !0),
        o.memoizedState = b,
        o.baseQueue === null && (o.baseState = b),
        c.lastRenderedState = b
    }
    return [b, h]
}

export default Xh;
