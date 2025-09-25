/* Standalone Function: distanceAndSkiddingToXY */

function distanceAndSkiddingToXY(d, o, c) {
    var h = getBasePlacement(d)
      , _ = [left, enums_top].indexOf(h) >= 0 ? -1 : 1
      , b = typeof c == "function" ? c(Object.assign({}, o, {
        placement: d
    })) : c
      , _e = b[0]
      , nt = b[1];
    return _e = _e || 0,
    nt = (nt || 0) * _,
    [left, right].indexOf(h) >= 0 ? {
        x: nt,
        y: _e
    } : {
        x: _e,
        y: nt
    }
}

export default distanceAndSkiddingToXY;
