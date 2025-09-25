/* Standalone Function: getSpringOptions */

function getSpringOptions(d) {
    let o = {
        velocity: 0,
        stiffness: 100,
        damping: 10,
        mass: 1,
        isResolvedFromDuration: !1,
        ...d
    };
    if (!isSpringType(d, physicsKeys) && isSpringType(d, durationKeys)) {
        const c = findSpring(d);
        o = {
            ...o,
            ...c,
            mass: 1
        },
        o.isResolvedFromDuration = !0
    }
    return o
}

export default getSpringOptions;
