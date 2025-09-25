/* Standalone Function: getArrayOfElements */

function getArrayOfElements(d) {
    return tippy_esm_isElement(d) ? [d] : isNodeList(d) ? arrayFrom(d) : Array.isArray(d) ? d : arrayFrom(document.querySelectorAll(d))
}

export default getArrayOfElements;
