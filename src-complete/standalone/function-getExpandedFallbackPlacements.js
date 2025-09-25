/* Standalone Function: getExpandedFallbackPlacements */

function getExpandedFallbackPlacements(d) {
    if (getBasePlacement(d) === auto$1)
        return [];
    var o = getOppositePlacement(d);
    return [getOppositeVariationPlacement(d), o, getOppositeVariationPlacement(o)]
}

export default getExpandedFallbackPlacements;
