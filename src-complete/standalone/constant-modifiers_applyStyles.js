/* Standalone Constant: modifiers_applyStyles */

var modifiers_applyStyles = {
    name: "applyStyles",
    enabled: !0,
    phase: "write",
    fn: applyStyles,
    effect: applyStyles_effect,
    requires: ["computeStyles"]
};

export default modifiers_applyStyles;
