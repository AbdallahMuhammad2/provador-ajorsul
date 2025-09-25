/* Standalone Function: arrow_effect */

function arrow_effect(d) {
    var o = d.state
      , c = d.options.element
      , h = c === void 0 ? "[data-popper-arrow]" : c;
    h != null && (typeof h != "string" || (h = o.elements.popper.querySelector(h))) && contains(o.elements.popper, h) && (o.elements.arrow = h)
}

export default arrow_effect;
