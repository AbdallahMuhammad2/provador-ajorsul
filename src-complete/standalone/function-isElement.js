/* Standalone Function: isElement */

function isElement(d) {
    return d instanceof getWindow(d).Element || d instanceof Element
}

export default isElement;
