/* Standalone Function: getDocumentRect */

function getDocumentRect(d) {
    var o, c = getDocumentElement(d), h = getWindowScroll(d), _ = (o = d.ownerDocument) == null ? void 0 : o.body, b = math_max(c.scrollWidth, c.clientWidth, _ ? _.scrollWidth : 0, _ ? _.clientWidth : 0), _e = math_max(c.scrollHeight, c.clientHeight, _ ? _.scrollHeight : 0, _ ? _.clientHeight : 0), nt = -h.scrollLeft + getWindowScrollBarX(d), it = -h.scrollTop;
    return getComputedStyle$1(_ || c).direction === "rtl" && (nt += math_max(c.clientWidth, _ ? _.clientWidth : 0) - b),
    {
        width: b,
        height: _e,
        x: nt,
        y: it
    }
}

export default getDocumentRect;
