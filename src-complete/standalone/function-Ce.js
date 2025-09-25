/* Standalone Function: Ce */

function Ce(d, o, c) {
    d === "focusin" ? (Ae(),
    pe = o,
    qe = c,
    pe.attachEvent("onpropertychange", Be)) : d === "focusout" && Ae()
}

export default Ce;
