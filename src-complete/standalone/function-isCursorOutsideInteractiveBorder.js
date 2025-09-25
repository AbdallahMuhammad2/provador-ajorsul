/* Standalone Function: isCursorOutsideInteractiveBorder */

function isCursorOutsideInteractiveBorder(d, o) {
    var c = o.clientX
      , h = o.clientY;
    return d.every(function(_) {
        var b = _.popperRect
          , _e = _.popperState
          , nt = _.props.interactiveBorder
          , it = tippy_esm_getBasePlacement(_e.placement)
          , at = _e.modifiersData.offset;
        if (!at)
            return !0;
        var ut = it === "bottom" ? at.top.y : 0
          , pt = it === "top" ? at.bottom.y : 0
          , ht = it === "right" ? at.left.x : 0
          , _t = it === "left" ? at.right.x : 0
          , vt = b.top - h + ut > nt
          , bt = h - b.bottom - pt > nt
          , St = b.left - c + ht > nt
          , At = c - b.right - _t > nt;
        return vt || bt || St || At
    })
}

export default isCursorOutsideInteractiveBorder;
