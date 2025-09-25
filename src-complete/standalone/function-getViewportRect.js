/* Standalone Function: getViewportRect */

function getViewportRect(d, o) {
    var c = getWindow(d)
      , h = getDocumentElement(d)
      , _ = c.visualViewport
      , b = h.clientWidth
      , _e = h.clientHeight
      , nt = 0
      , it = 0;
    if (_) {
        b = _.width,
        _e = _.height;
        var at = isLayoutViewport();
        (at || !at && o === "fixed") && (nt = _.offsetLeft,
        it = _.offsetTop)
    }
    return {
        width: b,
        height: _e,
        x: nt + getWindowScrollBarX(d),
        y: it
    }
}

export default getViewportRect;
