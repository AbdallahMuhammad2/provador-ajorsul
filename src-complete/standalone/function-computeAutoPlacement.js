/* Standalone Function: computeAutoPlacement */

function computeAutoPlacement(d, o) {
    o === void 0 && (o = {});
    var c = o
      , h = c.placement
      , _ = c.boundary
      , b = c.rootBoundary
      , _e = c.padding
      , nt = c.flipVariations
      , it = c.allowedAutoPlacements
      , at = it === void 0 ? enums_placements : it
      , ut = getVariation(h)
      , pt = ut ? nt ? variationPlacements : variationPlacements.filter(function(vt) {
        return getVariation(vt) === ut
    }) : basePlacements
      , ht = pt.filter(function(vt) {
        return at.indexOf(vt) >= 0
    });
    ht.length === 0 && (ht = pt);
    var _t = ht.reduce(function(vt, bt) {
        return vt[bt] = detectOverflow(d, {
            placement: bt,
            boundary: _,
            rootBoundary: b,
            padding: _e
        })[getBasePlacement(bt)],
        vt
    }, {});
    return Object.keys(_t).sort(function(vt, bt) {
        return _t[vt] - _t[bt]
    })
}

export default computeAutoPlacement;
