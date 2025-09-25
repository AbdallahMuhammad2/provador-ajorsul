/* Standalone Function: shouldBlockAnimation */

function shouldBlockAnimation({protectedKeys: d, needsAnimating: o}, c) {
    const h = d.hasOwnProperty(c) && o[c] !== !0;
    return o[c] = !1,
    h
}

export default shouldBlockAnimation;
