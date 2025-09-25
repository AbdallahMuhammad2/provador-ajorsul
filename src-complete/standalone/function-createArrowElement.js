/* Standalone Function: createArrowElement */

function createArrowElement(d) {
    var o = div();
    return d === !0 ? o.className = ARROW_CLASS : (o.className = SVG_ARROW_CLASS,
    tippy_esm_isElement(d) ? o.appendChild(d) : dangerouslySetInnerHTML(o, d)),
    o
}

export default createArrowElement;
