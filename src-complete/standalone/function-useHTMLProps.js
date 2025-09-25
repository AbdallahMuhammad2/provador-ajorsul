/* Standalone Function: useHTMLProps */

function useHTMLProps(d, o, c) {
    const h = {}
      , _ = useStyle(d, o, c);
    return d.drag && d.dragListener !== !1 && (h.draggable = !1,
    _.userSelect = _.WebkitUserSelect = _.WebkitTouchCallout = "none",
    _.touchAction = d.drag === !0 ? "none" : `pan-${d.drag === "x" ? "y" : "x"}`),
    d.tabIndex === void 0 && (d.onTap || d.onTapStart || d.whileTap) && (h.tabIndex = 0),
    h.style = _,
    h
}

export default useHTMLProps;
