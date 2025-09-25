/* Standalone Function: isReferenceElement */

function isReferenceElement(d) {
    return !(!d || !d._tippy || d._tippy.reference !== d)
}

export default isReferenceElement;
