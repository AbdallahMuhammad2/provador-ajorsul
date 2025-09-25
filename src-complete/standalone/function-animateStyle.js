/* Standalone Function: animateStyle */

function animateStyle(d, o, c, {delay: h=0, duration: _=300, repeat: b=0, repeatType: _e="loop", ease: nt, times: it}={}) {
    const at = {
        [o]: c
    };
    it && (at.offset = it);
    const ut = mapEasingToNativeEasing(nt);
    return Array.isArray(ut) && (at.easing = ut),
    d.animate(at, {
        delay: h,
        duration: _,
        easing: Array.isArray(ut) ? "linear" : ut,
        fill: "both",
        iterations: b + 1,
        direction: _e === "reverse" ? "alternate" : "normal"
    })
}

export default animateStyle;
