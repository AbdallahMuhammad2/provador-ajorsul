/* Standalone Function: getTrueOffsetParent */

function getTrueOffsetParent(d) {
    return isHTMLElement(d) && getComputedStyle$1(d).position !== "fixed" ? d.offsetParent : null
}

export default getTrueOffsetParent;
