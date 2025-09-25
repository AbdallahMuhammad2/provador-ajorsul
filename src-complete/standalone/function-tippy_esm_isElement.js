/* Standalone Function: tippy_esm_isElement */

function tippy_esm_isElement(d) {
    return ["Element", "Fragment"].some(function(o) {
        return isType(d, o)
    })
}

export default tippy_esm_isElement;
