/* Standalone Function: ob */

function ob(d, o) {
    if (o) {
        var c = d.firstChild;
        if (c && c === d.lastChild && c.nodeType === 3) {
            c.nodeValue = o;
            return
        }
    }
    d.textContent = o
}

export default ob;
