/* Standalone Function: isHTMLElement */

function isHTMLElement(d) {
    return d instanceof getWindow(d).HTMLElement || d instanceof HTMLElement
}

export default isHTMLElement;
