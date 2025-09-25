/* Standalone Function: getNodeScroll */

function getNodeScroll(d) {
    return d !== getWindow(d) && isHTMLElement(d) ? getHTMLElementScroll(d) : getWindowScroll(d)
}

export default getNodeScroll;
