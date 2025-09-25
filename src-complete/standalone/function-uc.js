/* Standalone Function: Uc */

function Uc(d, o, c, h, _) {
    switch (o) {
    case "focusin":
        return Lc = Tc(Lc, d, o, c, h, _),
        !0;
    case "dragenter":
        return Mc = Tc(Mc, d, o, c, h, _),
        !0;
    case "mouseover":
        return Nc = Tc(Nc, d, o, c, h, _),
        !0;
    case "pointerover":
        var b = _.pointerId;
        return Oc.set(b, Tc(Oc.get(b) || null, d, o, c, h, _)),
        !0;
    case "gotpointercapture":
        return b = _.pointerId,
        Pc.set(b, Tc(Pc.get(b) || null, d, o, c, h, _)),
        !0
    }
    return !1
}

export default Uc;
