/* Standalone Function: Sc */

function Sc(d, o) {
    switch (d) {
    case "focusin":
    case "focusout":
        Lc = null;
        break;
    case "dragenter":
    case "dragleave":
        Mc = null;
        break;
    case "mouseover":
    case "mouseout":
        Nc = null;
        break;
    case "pointerover":
    case "pointerout":
        Oc.delete(o.pointerId);
        break;
    case "gotpointercapture":
    case "lostpointercapture":
        Pc.delete(o.pointerId)
    }
}

export default Sc;
