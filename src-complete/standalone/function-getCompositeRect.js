/* Standalone Function: getCompositeRect */

function getCompositeRect(d, o, c) {
    c === void 0 && (c = !1);
    var h = isHTMLElement(o)
      , _ = isHTMLElement(o) && isElementScaled(o)
      , b = getDocumentElement(o)
      , _e = getBoundingClientRect(d, _, c)
      , nt = {
        scrollLeft: 0,
        scrollTop: 0
    }
      , it = {
        x: 0,
        y: 0
    };
    return (h || !h && !c) && ((getNodeName(o) !== "body" || isScrollParent(b)) && (nt = getNodeScroll(o)),
    isHTMLElement(o) ? ((it = getBoundingClientRect(o, !0)).x += o.clientLeft,
    it.y += o.clientTop) : b && (it.x = getWindowScrollBarX(b))),
    {
        x: _e.left + nt.scrollLeft - it.x,
        y: _e.top + nt.scrollTop - it.y,
        width: _e.width,
        height: _e.height
    }
}

export default getCompositeRect;
