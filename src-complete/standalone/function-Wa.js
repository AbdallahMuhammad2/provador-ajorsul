/* Standalone Function: Wa */

function Wa(d) {
    if (!d)
        return !1;
    var o = d._valueTracker;
    if (!o)
        return !0;
    var c = o.getValue()
      , h = "";
    return d && (h = Ta(d) ? d.checked ? "true" : "false" : d.value),
    d = h,
    d !== c ? (o.setValue(d),
    !0) : !1
}

export default Wa;
