/* Standalone Function: keyframes */

function keyframes({duration: d=300, keyframes: o, times: c, ease: h="easeInOut"}) {
    const _ = isEasingArray(h) ? h.map(easingDefinitionToFunction) : easingDefinitionToFunction(h)
      , b = {
        done: !1,
        value: o[0]
    }
      , _e = convertOffsetToTimes(c && c.length === o.length ? c : defaultOffset(o), d)
      , nt = interpolate(_e, o, {
        ease: Array.isArray(_) ? _ : defaultEasing(o, _)
    });
    return {
        calculatedDuration: d,
        next: it => (b.value = nt(it),
        b.done = it >= d,
        b)
    }
}

export default keyframes;
