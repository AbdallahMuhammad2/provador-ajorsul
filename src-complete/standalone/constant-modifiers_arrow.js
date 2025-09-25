/* Standalone Constant: modifiers_arrow */

var modifiers_arrow = {
    name: "arrow",
    enabled: !0,
    phase: "main",
    fn: arrow,
    effect: arrow_effect,
    requires: ["popperOffsets"],
    requiresIfExists: ["preventOverflow"]
};

export default modifiers_arrow;
