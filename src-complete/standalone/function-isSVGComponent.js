/* Standalone Function: isSVGComponent */

function isSVGComponent(d) {
    return typeof d != "string" || d.includes("-") ? !1 : !!(lowercaseSVGElements.indexOf(d) > -1 || /[A-Z]/u.test(d))
}

export default isSVGComponent;
