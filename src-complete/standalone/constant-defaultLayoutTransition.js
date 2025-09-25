/* Standalone Constant: defaultLayoutTransition */

const defaultLayoutTransition = {
    duration: .45,
    ease: [.4, 0, .1, 1]
}
  , userAgentContains = d => typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().includes(d)
  , roundPoint = userAgentContains("applewebkit/") && !userAgentContains("chrome/") ? Math.round : noop;
function roundAxis(d) {
    d.min = roundPoint(d.min),
    d.max = roundPoint(d.max)
}
function roundBox(d) {
    roundAxis(d.x),
    roundAxis(d.y)
}
function shouldAnimatePositionOnly(d, o, c) {
    return d === "position" || d === "preserve-aspect" && !isNear(aspectRatio(o), aspectRatio(c), .2)
}
const DocumentProjectionNode = createProjectionNode({
    attachResizeListener: (d, o) => addDomEvent(d, "resize", o),
    measureScroll: () => ({
        x: document.documentElement.scrollLeft || document.body.scrollLeft,
        y: document.documentElement.scrollTop || document.body.scrollTop
    }),
    checkIsScrollRoot: () => !0
})
  , rootProjectionNode = {
    current: void 0
}
  , HTMLProjectionNode = createProjectionNode({
    measureScroll: d => ({
        x: d.scrollLeft,
        y: d.scrollTop
    }),
    defaultParent: () => {
        if (!rootProjectionNode.current) {
            const d = new DocumentProjectionNode({});
            d.mount(window),
            d.setOptions({
                layoutScroll: !0
            }),
            rootProjectionNode.current = d
        }
        return rootProjectionNode.current
    }
    ,
    resetTransform: (d, o) => {
        d.style.transform = o !== void 0 ? o : "none"
    }
    ,
    checkIsScrollRoot: d => window.getComputedStyle(d).position === "fixed"
})
  , drag = {
    pan: {
        Feature: PanGesture
    },
    drag: {
        Feature: DragGesture,
        ProjectionNode: HTMLProjectionNode,
        MeasureLayout
    }
}
  , prefersReducedMotion = {
    current: null
}
  , hasReducedMotionListener = {
    current: !1
};

export default defaultLayoutTransition;
