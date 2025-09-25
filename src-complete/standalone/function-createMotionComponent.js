/* Standalone Function: createMotionComponent */

function createMotionComponent({preloadedFeatures: d, createVisualElement: o, useRender: c, useVisualState: h, Component: _}) {
    d && loadFeatures(d);
    function b(nt, it) {
        let at;
        const ut = {
            ...reactExports.useContext(MotionConfigContext),
            ...nt,
            layoutId: useLayoutId(nt)
        }
          , {isStatic: pt} = ut
          , ht = useCreateMotionContext(nt)
          , _t = h(nt, pt);
        if (!pt && isBrowser) {
            ht.visualElement = useVisualElement(_, _t, ut, o);
            const vt = reactExports.useContext(SwitchLayoutGroupContext)
              , bt = reactExports.useContext(LazyContext).strict;
            ht.visualElement && (at = ht.visualElement.loadFeatures(ut, bt, d, vt))
        }
        return jsxRuntimeExports.jsxs(MotionContext.Provider, {
            value: ht,
            children: [at && ht.visualElement ? jsxRuntimeExports.jsx(at, {
                visualElement: ht.visualElement,
                ...ut
            }) : null, c(_, nt, useMotionRef(_t, ht.visualElement, it), _t, pt, ht.visualElement)]
        })
    }
    const _e = reactExports.forwardRef(b);
    return _e[motionComponentSymbol] = _,
    _e
}

export default createMotionComponent;
