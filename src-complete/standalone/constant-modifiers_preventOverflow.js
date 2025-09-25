/* Standalone Constant: modifiers_preventOverflow */

var modifiers_preventOverflow = {
    name: "preventOverflow",
    enabled: !0,
    phase: "main",
    fn: preventOverflow,
    requiresIfExists: ["offset"]
}
  , toPaddingObject = function(d, o) {
    return mergePaddingObject(typeof (d = typeof d == "function" ? d(Object.assign({}, o.rects, {
        placement: o.placement
    })) : d) != "number" ? d : expandToHashMap(d, basePlacements))
};

export default modifiers_preventOverflow;
