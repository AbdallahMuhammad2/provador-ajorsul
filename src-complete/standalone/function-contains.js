/* Standalone Function: contains */

function contains(d, o) {
    var c = o.getRootNode && o.getRootNode();
    if (d.contains(o))
        return !0;
    if (c && isShadowRoot(c)) {
        var h = o;
        do {
            if (h && d.isSameNode(h))
                return !0;
            h = h.parentNode || h.host
        } while (h)
    }
    return !1
}

export default contains;
