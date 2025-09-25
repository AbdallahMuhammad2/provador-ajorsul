/* Standalone Function: isAnySideFullyClipped */

function isAnySideFullyClipped(d) {
    return [enums_top, right, bottom, left].some(function(o) {
        return d[o] >= 0
    })
}

export default isAnySideFullyClipped;
