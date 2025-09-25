/* Standalone Function: computeStyles */

function computeStyles(d) {
    var o = d.state
      , c = d.options
      , h = c.gpuAcceleration
      , _ = h === void 0 || h
      , b = c.adaptive
      , _e = b === void 0 || b
      , nt = c.roundOffsets
      , it = nt === void 0 || nt
      , at = {
        placement: getBasePlacement(o.placement),
        variation: getVariation(o.placement),
        popper: o.elements.popper,
        popperRect: o.rects.popper,
        gpuAcceleration: _,
        isFixed: o.options.strategy === "fixed"
    };
    o.modifiersData.popperOffsets != null && (o.styles.popper = Object.assign({}, o.styles.popper, mapToStyles(Object.assign({}, at, {
        offsets: o.modifiersData.popperOffsets,
        position: o.options.strategy,
        adaptive: _e,
        roundOffsets: it
    })))),
    o.modifiersData.arrow != null && (o.styles.arrow = Object.assign({}, o.styles.arrow, mapToStyles(Object.assign({}, at, {
        offsets: o.modifiersData.arrow,
        position: "absolute",
        adaptive: !1,
        roundOffsets: it
    })))),
    o.attributes.popper = Object.assign({}, o.attributes.popper, {
        "data-popper-placement": o.placement
    })
}

export default computeStyles;
