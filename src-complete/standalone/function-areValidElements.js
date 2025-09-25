/* Standalone Function: areValidElements */

function areValidElements() {
    for (var d = arguments.length, o = new Array(d), c = 0; c < d; c++)
        o[c] = arguments[c];
    return !o.some(function(h) {
        return !(h && typeof h.getBoundingClientRect == "function")
    })
}

export default areValidElements;
