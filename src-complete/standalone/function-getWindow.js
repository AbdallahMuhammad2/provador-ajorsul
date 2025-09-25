/* Standalone Function: getWindow */

function getWindow(d) {
    if (d == null)
        return window;
    if (d.toString() !== "[object Window]") {
        var o = d.ownerDocument;
        return o && o.defaultView || window
    }
    return d
}

export default getWindow;
