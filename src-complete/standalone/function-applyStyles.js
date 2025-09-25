/* Standalone Function: applyStyles */

function applyStyles(d) {
    var o = d.state;
    Object.keys(o.elements).forEach(function(c) {
        var h = o.styles[c] || {}
          , _ = o.attributes[c] || {}
          , b = o.elements[c];
        isHTMLElement(b) && getNodeName(b) && (Object.assign(b.style, h),
        Object.keys(_).forEach(function(_e) {
            var nt = _[_e];
            nt === !1 ? b.removeAttribute(_e) : b.setAttribute(_e, nt === !0 ? "" : nt)
        }))
    })
}

export default applyStyles;
