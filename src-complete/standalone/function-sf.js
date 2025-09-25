/* Standalone Function: sf */

function sf(d) {
    if (!d[rf]) {
        d[rf] = !0,
        da.forEach(function(c) {
            c !== "selectionchange" && (mf.has(c) || qf(c, !1, d),
            qf(c, !0, d))
        });
        var o = d.nodeType === 9 ? d : d.ownerDocument;
        o === null || o[rf] || (o[rf] = !0,
        qf("selectionchange", !1, o))
    }
}

export default sf;
