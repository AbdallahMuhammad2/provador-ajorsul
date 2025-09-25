/* Standalone Constant: modifiers_offset */

var modifiers_offset = {
    name: "offset",
    enabled: !0,
    phase: "main",
    requires: ["popperOffsets"],
    fn: offset
}
  , getOppositePlacement_hash = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
};

export default modifiers_offset;
