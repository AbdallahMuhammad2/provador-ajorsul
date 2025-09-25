/* Standalone Function: getClientRectFromMixedType */

function getClientRectFromMixedType(d, o, c) {
    return o === viewport ? rectToClientRect(getViewportRect(d, c)) : isElement(o) ? getInnerBoundingClientRect(o, c) : rectToClientRect(getDocumentRect(getDocumentElement(d)))
}

export default getClientRectFromMixedType;
