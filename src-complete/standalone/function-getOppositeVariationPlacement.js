/* Standalone Function: getOppositeVariationPlacement */

function getOppositeVariationPlacement(d) {
    return d.replace(/start|end/g, function(o) {
        return getOppositeVariationPlacement_hash[o]
    })
}

export default getOppositeVariationPlacement;
