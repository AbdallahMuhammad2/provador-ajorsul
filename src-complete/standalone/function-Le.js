/* Standalone Function: Le */

function Le(d, o) {
    return d && o ? d === o ? !0 : d && d.nodeType === 3 ? !1 : o && o.nodeType === 3 ? Le(d, o.parentNode) : "contains"in d ? d.contains(o) : d.compareDocumentPosition ? !!(d.compareDocumentPosition(o) & 16) : !1 : !1
}

export default Le;
