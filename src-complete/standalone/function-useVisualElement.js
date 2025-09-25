/* Standalone Function: useVisualElement */

function useVisualElement(d, o, c, h) {
    const {visualElement: _} = reactExports.useContext(MotionContext)
      , b = reactExports.useContext(LazyContext)
      , _e = reactExports.useContext(PresenceContext)
      , nt = reactExports.useContext(MotionConfigContext).reducedMotion
      , it = reactExports.useRef();
    h = h || b.renderer,
    !it.current && h && (it.current = h(d, {
        visualState: o,
        parent: _,
        props: c,
        presenceContext: _e,
        blockInitialAnimation: _e ? _e.initial === !1 : !1,
        reducedMotionConfig: nt
    }));
    const at = it.current;
    reactExports.useInsertionEffect( () => {
        at && at.update(c, _e)
    }
    );
    const ut = reactExports.useRef(!!(c[optimizedAppearDataAttribute] && !window.HandoffComplete));
    return useIsomorphicLayoutEffect( () => {
        at && (microtask.postRender(at.render),
        ut.current && at.animationState && at.animationState.animateChanges())
    }
    ),
    reactExports.useEffect( () => {
        at && (at.updateFeatures(),
        !ut.current && at.animationState && at.animationState.animateChanges(),
        ut.current && (ut.current = !1,
        window.HandoffComplete = !0))
    }
    ),
    at
}

export default useVisualElement;
