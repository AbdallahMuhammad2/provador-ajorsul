/* Standalone Function: actualContains */

function actualContains(d, o) {
    for (var c = o; c; ) {
        var h;
        if (d.contains(c))
            return !0;
        c = c.getRootNode == null || (h = c.getRootNode()) == null ? void 0 : h.host
    }
    return !1
}

export default actualContains;
