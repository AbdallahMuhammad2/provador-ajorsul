/* Standalone Constant: modifiers_hide */

var modifiers_hide = {
    name: "hide",
    enabled: !0,
    phase: "main",
    requiresIfExists: ["preventOverflow"],
    fn: hide
}
  , defaultModifiers = [eventListeners, modifiers_popperOffsets, modifiers_computeStyles, modifiers_applyStyles, modifiers_offset, modifiers_flip, modifiers_preventOverflow, modifiers_arrow, modifiers_hide]
  , popper_createPopper = popperGenerator({
    defaultModifiers
})
  , BOX_CLASS = "tippy-box"
  , CONTENT_CLASS = "tippy-content"
  , BACKDROP_CLASS = "tippy-backdrop"
  , ARROW_CLASS = "tippy-arrow"
  , SVG_ARROW_CLASS = "tippy-svg-arrow"
  , TOUCH_OPTIONS = {
    passive: !0,
    capture: !0
}
  , TIPPY_DEFAULT_APPEND_TO = function() {
    return document.body
};

export default modifiers_hide;
