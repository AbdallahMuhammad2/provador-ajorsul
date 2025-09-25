/* Standalone Function: useCombineMotionValues */

function useCombineMotionValues(d, o) {
    const c = useMotionValue(o())
      , h = () => c.set(o());
    return h(),
    useIsomorphicLayoutEffect( () => {
        const _ = () => frame.preRender(h, !1, !0)
          , b = d.map(_e => _e.on("change", _));
        return () => {
            b.forEach(_e => _e()),
            cancelFrame(h)
        }
    }
    ),
    c
}

export default useCombineMotionValues;
