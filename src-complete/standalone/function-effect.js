/* Standalone Function: effect */

function effect(d) {
    var o = d.state
      , c = d.instance
      , h = d.options
      , _ = h.scroll
      , b = _ === void 0 || _
      , _e = h.resize
      , nt = _e === void 0 || _e
      , it = getWindow(o.elements.popper)
      , at = [].concat(o.scrollParents.reference, o.scrollParents.popper);
    return b && at.forEach(function(ut) {
        ut.addEventListener("scroll", c.update, passive)
    }),
    nt && it.addEventListener("resize", c.update, passive),
    function() {
        b && at.forEach(function(ut) {
            ut.removeEventListener("scroll", c.update, passive)
        }),
        nt && it.removeEventListener("resize", c.update, passive)
    }
}

export default effect;
