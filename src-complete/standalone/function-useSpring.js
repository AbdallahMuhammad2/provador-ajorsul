/* Standalone Function: useSpring */

function useSpring(d, o={}) {
    const {isStatic: c} = reactExports.useContext(MotionConfigContext)
      , h = reactExports.useRef(null)
      , _ = useMotionValue(isMotionValue(d) ? d.get() : d)
      , b = () => {
        h.current && h.current.stop()
    }
    ;
    return reactExports.useInsertionEffect( () => _.attach( (_e, nt) => {
        if (c)
            return nt(_e);
        const it = h.current;
        return it && it.time === 0 && it.sample(frameData.delta),
        b(),
        h.current = animateValue({
            keyframes: [_.get(), _e],
            velocity: _.getVelocity(),
            type: "spring",
            restDelta: .001,
            restSpeed: .01,
            ...o,
            onUpdate: nt
        }),
        _.get()
    }
    , b), [JSON.stringify(o)]),
    useIsomorphicLayoutEffect( () => {
        if (isMotionValue(d))
            return d.on("change", _e => _.set(parseFloat(_e)))
    }
    , [_]),
    _
}

export default useSpring;
