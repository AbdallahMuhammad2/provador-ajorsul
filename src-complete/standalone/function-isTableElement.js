/* Standalone Function: isTableElement */

function isTableElement(d) {
    return ["table", "td", "th"].indexOf(getNodeName(d)) >= 0
}

export default isTableElement;
