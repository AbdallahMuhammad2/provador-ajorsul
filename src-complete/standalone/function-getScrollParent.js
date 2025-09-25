/* Standalone Function: getScrollParent */

function getScrollParent(d) {
    return ["html", "body", "#document"].indexOf(getNodeName(d)) >= 0 ? d.ownerDocument.body : isHTMLElement(d) && isScrollParent(d) ? d : getScrollParent(getParentNode(d))
}

export default getScrollParent;
