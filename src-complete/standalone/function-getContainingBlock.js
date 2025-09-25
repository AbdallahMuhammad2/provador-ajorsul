/* Standalone Function: getContainingBlock */

function getContainingBlock(d) {
    var o = /firefox/i.test(getUAString());
    if (/Trident/i.test(getUAString()) && isHTMLElement(d) && getComputedStyle$1(d).position === "fixed")
        return null;
    var c = getParentNode(d);
    for (isShadowRoot(c) && (c = c.host); isHTMLElement(c) && ["html", "body"].indexOf(getNodeName(c)) < 0; ) {
        var h = getComputedStyle$1(c);
        if (h.transform !== "none" || h.perspective !== "none" || h.contain === "paint" || ["transform", "perspective"].indexOf(h.willChange) !== -1 || o && h.willChange === "filter" || o && h.filter && h.filter !== "none")
            return c;
        c = c.parentNode
    }
    return null
}

export default getContainingBlock;
