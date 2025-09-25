/* Standalone Function: setTarget */

function setTarget(d, o) {
    const c = resolveVariant(d, o);
    let {transitionEnd: h={}, transition: _={}, ...b} = c || {};
    b = {
        ...b,
        ...h
    };
    for (const _e in b) {
        const nt = resolveFinalValueInKeyframes(b[_e]);
        setMotionValue(d, _e, nt)
    }
}

export default setTarget;
