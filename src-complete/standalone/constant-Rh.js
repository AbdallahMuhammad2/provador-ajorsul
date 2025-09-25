/* Standalone Constant: Rh */

var Rh = {
    readContext: eh,
    useCallback: P,
    useContext: P,
    useEffect: P,
    useImperativeHandle: P,
    useInsertionEffect: P,
    useLayoutEffect: P,
    useMemo: P,
    useReducer: P,
    useRef: P,
    useState: P,
    useDebugValue: P,
    useDeferredValue: P,
    useTransition: P,
    useMutableSource: P,
    useSyncExternalStore: P,
    useId: P,
    unstable_isNewReconciler: !1
}
  , Oh = {
    readContext: eh,
    useCallback: function(d, o) {
        return Th().memoizedState = [d, o === void 0 ? null : o],
        d
    },
    useContext: eh,
    useEffect: mi,
    useImperativeHandle: function(d, o, c) {
        return c = c != null ? c.concat([d]) : null,
        ki(4194308, 4, pi.bind(null, o, d), c)
    },
    useLayoutEffect: function(d, o) {
        return ki(4194308, 4, d, o)
    },
    useInsertionEffect: function(d, o) {
        return ki(4, 2, d, o)
    },
    useMemo: function(d, o) {
        var c = Th();
        return o = o === void 0 ? null : o,
        d = d(),
        c.memoizedState = [d, o],
        d
    },
    useReducer: function(d, o, c) {
        var h = Th();
        return o = c !== void 0 ? c(o) : o,
        h.memoizedState = h.baseState = o,
        d = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: d,
            lastRenderedState: o
        },
        h.queue = d,
        d = d.dispatch = xi.bind(null, M, d),
        [h.memoizedState, d]
    },
    useRef: function(d) {
        var o = Th();
        return d = {
            current: d
        },
        o.memoizedState = d
    },
    useState: hi,
    useDebugValue: ri,
    useDeferredValue: function(d) {
        return Th().memoizedState = d
    },
    useTransition: function() {
        var d = hi(!1)
          , o = d[0];
        return d = vi.bind(null, d[1]),
        Th().memoizedState = d,
        [o, d]
    },
    useMutableSource: function() {},
    useSyncExternalStore: function(d, o, c) {
        var h = M
          , _ = Th();
        if (I) {
            if (c === void 0)
                throw Error(p(407));
            c = c()
        } else {
            if (c = o(),
            Q === null)
                throw Error(p(349));
            Hh & 30 || di(h, o, c)
        }
        _.memoizedState = c;
        var b = {
            value: c,
            getSnapshot: o
        };

export default Rh;
