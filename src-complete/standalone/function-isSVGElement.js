/* Standalone Function: isSVGElement */

function isSVGElement(d) {
    return d instanceof SVGElement && d.tagName !== "svg"
}

export default isSVGElement;
