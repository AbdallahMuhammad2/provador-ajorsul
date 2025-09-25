/* Standalone Function: getClippingParents */

function getClippingParents(d) {
    var o = listScrollParents(getParentNode(d))
      , c = ["absolute", "fixed"].indexOf(getComputedStyle$1(d).position) >= 0 && isHTMLElement(d) ? getOffsetParent(d) : d;
    return isElement(c) ? o.filter(function(h) {
        return isElement(h) && contains(h, c) && getNodeName(h) !== "body"
    }) : []
}

export default getClippingParents;
