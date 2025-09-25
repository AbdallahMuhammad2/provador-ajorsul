/* Standalone Function: getParentNode */

function getParentNode(d) {
    return getNodeName(d) === "html" ? d : d.assignedSlot || d.parentNode || (isShadowRoot(d) ? d.host : null) || getDocumentElement(d)
}

export default getParentNode;
