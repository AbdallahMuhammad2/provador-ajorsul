/* Standalone Function: getOppositePlacement */

function getOppositePlacement(d) {
    return d.replace(/left|right|bottom|top/g, function(o) {
        return getOppositePlacement_hash[o]
    })
}

export default getOppositePlacement;
