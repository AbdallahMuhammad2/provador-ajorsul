/* Standalone Function: getOffsetParent */

function getOffsetParent(d) {
    for (var o = getWindow(d), c = getTrueOffsetParent(d); c && isTableElement(c) && getComputedStyle$1(c).position === "static"; )
        c = getTrueOffsetParent(c);
    return c && (getNodeName(c) === "html" || getNodeName(c) === "body" && getComputedStyle$1(c).position === "static") ? o : c || getContainingBlock(d) || o
}

export default getOffsetParent;
