/* Standalone Function: checkVariantsDidChange */

function checkVariantsDidChange(d, o) {
    return typeof o == "string" ? o !== d : Array.isArray(o) ? !shallowCompare(o, d) : !1
}

export default checkVariantsDidChange;
