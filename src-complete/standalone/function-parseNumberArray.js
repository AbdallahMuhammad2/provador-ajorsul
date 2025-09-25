/* Standalone Function: parseNumberArray */

function parseNumberArray(d) {
    return d.split(",").map(function(o) {
        return parseFloat(o)
    })
}

export default parseNumberArray;
