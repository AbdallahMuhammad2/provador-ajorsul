/* Standalone Constant: h */

const h = {}
      , _ = useStyle(d, o, c);
    return d.drag && d.dragListener !== !1 && (h.draggable = !1,
    _.userSelect = _.WebkitUserSelect = _.WebkitTouchCallout = "none",
    _.touchAction = d.drag === !0 ? "none" : `pan-${d.drag === "x" ? "y" : "x"}`),
    d.tabIndex === void 0 && (d.onTap || d.onTapStart || d.whileTap) && (h.tabIndex = 0),
    h.style = _,
    h
}
const validMotionProps = new Set(["animate", "exit", "variants", "initial", "style", "values", "variants", "transition", "transformTemplate", "custom", "inherit", "onBeforeLayoutMeasure", "onAnimationStart", "onAnimationComplete", "onUpdate", "onDragStart", "onDrag", "onDragEnd", "onMeasureDragConstraints", "onDirectionLock", "onDragTransitionEnd", "_dragX", "_dragY", "onHoverStart", "onHoverEnd", "onViewportEnter", "onViewportLeave", "globalTapTarget", "ignoreStrict", "viewport"]);
function isValidMotionProp(d) {
    return d.startsWith("while") || d.startsWith("drag") && d !== "draggable" || d.startsWith("layout") || d.startsWith("onTap") || d.startsWith("onPan") || d.startsWith("onLayout") || validMotionProps.has(d)
}
let shouldForward = d => !isValidMotionProp(d);
function loadExternalIsValidProp(d) {
    d && (shouldForward = o => o.startsWith("on") ? !isValidMotionProp(o) : d(o))
}
try {
    loadExternalIsValidProp(require("@emotion/is-prop-valid").default)
} catch (d) {}
function filterProps(d, o, c) {
    const h = {};

export default h;
