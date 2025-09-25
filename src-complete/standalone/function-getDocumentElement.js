/* Standalone Function: getDocumentElement */

function getDocumentElement(d) {
    return ((isElement(d) ? d.ownerDocument : d.document) || window.document).documentElement
}

export default getDocumentElement;
