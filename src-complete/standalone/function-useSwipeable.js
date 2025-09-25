/* Standalone Function: useSwipeable */

function useSwipeable(d) {
    const {trackMouse: o} = d
      , c = reactExports.useRef(Object.assign({}, initialState))
      , h = reactExports.useRef(Object.assign({}, defaultProps))
      , _ = reactExports.useRef(Object.assign({}, h.current));
    _.current = Object.assign({}, h.current),
    h.current = Object.assign(Object.assign({}, defaultProps), d);
    let b;
    for (b in defaultProps)
        h.current[b] === void 0 && (h.current[b] = defaultProps[b]);
    const [_e,nt] = reactExports.useMemo( () => getHandlers(it => c.current = it(c.current, h.current), {
        trackMouse: o
    }), [o]);
    return c.current = updateTransientState(c.current, h.current, _.current, nt),
    _e
}

export default useSwipeable;
