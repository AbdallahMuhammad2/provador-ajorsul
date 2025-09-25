/* Standalone Function: render */

function render(d) {
    var o = div()
      , c = div();
    c.className = BOX_CLASS,
    c.setAttribute("data-state", "hidden"),
    c.setAttribute("tabindex", "-1");
    var h = div();
    function _(b, _e) {
        var nt = getChildren(o)
          , it = nt.box
          , at = nt.content
          , ut = nt.arrow;
        _e.theme ? it.setAttribute("data-theme", _e.theme) : it.removeAttribute("data-theme"),
        typeof _e.animation == "string" ? it.setAttribute("data-animation", _e.animation) : it.removeAttribute("data-animation"),
        _e.inertia ? it.setAttribute("data-inertia", "") : it.removeAttribute("data-inertia"),
        it.style.maxWidth = typeof _e.maxWidth == "number" ? _e.maxWidth + "px" : _e.maxWidth,
        _e.role ? it.setAttribute("role", _e.role) : it.removeAttribute("role"),
        b.content === _e.content && b.allowHTML === _e.allowHTML || setContent(at, d.props),
        _e.arrow ? ut ? b.arrow !== _e.arrow && (it.removeChild(ut),
        it.appendChild(createArrowElement(_e.arrow))) : it.appendChild(createArrowElement(_e.arrow)) : ut && it.removeChild(ut)
    }
    return h.className = CONTENT_CLASS,
    h.setAttribute("data-state", "hidden"),
    setContent(h, d.props),
    o.appendChild(c),
    c.appendChild(h),
    _(d.props, d.props),
    {
        popper: o,
        onUpdate: _
    }
}

export default render;
