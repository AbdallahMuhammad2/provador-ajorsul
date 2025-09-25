/* Standalone Function: getMainAxisFromPlacement */

function getMainAxisFromPlacement(d) {
    return ["top", "bottom"].indexOf(d) >= 0 ? "x" : "y"
}

export default getMainAxisFromPlacement;
