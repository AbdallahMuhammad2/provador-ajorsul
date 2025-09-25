/* Standalone Constant: modifiers_flip */

var modifiers_flip = {
    name: "flip",
    enabled: !0,
    phase: "main",
    fn: flip,
    requiresIfExists: ["offset"],
    data: {
        _skip: !1
    }
};

export default modifiers_flip;
