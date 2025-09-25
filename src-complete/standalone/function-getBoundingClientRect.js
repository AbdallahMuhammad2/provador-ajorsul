/* Standalone Function: getBoundingClientRect */

function getBoundingClientRect(d, o, c) {
    o === void 0 && (o = !1),
    c === void 0 && (c = !1);
    var h = d.getBoundingClientRect()
      , _ = 1
      , b = 1;
    o && isHTMLElement(d) && (_ = d.offsetWidth > 0 && round(h.width) / d.offsetWidth || 1,
    b = d.offsetHeight > 0 && round(h.height) / d.offsetHeight || 1);
    var _e = (isElement(d) ? getWindow(d) : window).visualViewport
      , nt = !isLayoutViewport() && c
      , it = (h.left + (nt && _e ? _e.offsetLeft : 0)) / _
      , at = (h.top + (nt && _e ? _e.offsetTop : 0)) / b
      , ut = h.width / _
      , pt = h.height / b;
    return {
        width: ut,
        height: pt,
        top: at,
        right: it + ut,
        bottom: at + pt,
        left: it,
        x: it,
        y: at
    }
}

export default getBoundingClientRect;
