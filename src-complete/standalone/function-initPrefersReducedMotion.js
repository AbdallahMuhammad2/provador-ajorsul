/* Standalone Function: initPrefersReducedMotion */

function initPrefersReducedMotion() {
    if (hasReducedMotionListener.current = !0,
    !!isBrowser)
        if (window.matchMedia) {
            const d = window.matchMedia("(prefers-reduced-motion)")
              , o = () => prefersReducedMotion.current = d.matches;
            d.addListener(o),
            o()
        } else
            prefersReducedMotion.current = !1
}

export default initPrefersReducedMotion;
