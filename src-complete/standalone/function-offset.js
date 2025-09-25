/* Standalone Function: offset */

function offset(d) {
    var o = d.state
      , c = d.options
      , h = d.name
      , _ = c.offset
      , b = _ === void 0 ? [0, 0] : _
      , _e = enums_placements.reduce(function(ut, pt) {
        return ut[pt] = distanceAndSkiddingToXY(pt, o.rects, b),
        ut
    }, {})
      , nt = _e[o.placement]
      , it = nt.x
      , at = nt.y;
    o.modifiersData.popperOffsets != null && (o.modifiersData.popperOffsets.x += it,
    o.modifiersData.popperOffsets.y += at),
    o.modifiersData[h] = _e
}

export default offset;
