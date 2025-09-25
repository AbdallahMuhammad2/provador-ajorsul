/* Standalone Function: popperOffsets */

function popperOffsets(d) {
    var o = d.state
      , c = d.name;
    o.modifiersData[c] = computeOffsets({
        reference: o.rects.reference,
        element: o.rects.popper,
        strategy: "absolute",
        placement: o.placement
    })
}

export default popperOffsets;
