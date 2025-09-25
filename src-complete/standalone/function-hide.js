/* Standalone Function: hide */

function hide(d) {
    var o = d.state
      , c = d.name
      , h = o.rects.reference
      , _ = o.rects.popper
      , b = o.modifiersData.preventOverflow
      , _e = detectOverflow(o, {
        elementContext: "reference"
    })
      , nt = detectOverflow(o, {
        altBoundary: !0
    })
      , it = getSideOffsets(_e, h)
      , at = getSideOffsets(nt, _, b)
      , ut = isAnySideFullyClipped(it)
      , pt = isAnySideFullyClipped(at);
    o.modifiersData[c] = {
        referenceClippingOffsets: it,
        popperEscapeOffsets: at,
        isReferenceHidden: ut,
        hasPopperEscaped: pt
    },
    o.attributes.popper = Object.assign({}, o.attributes.popper, {
        "data-popper-reference-hidden": ut,
        "data-popper-escaped": pt
    })
}

export default hide;
