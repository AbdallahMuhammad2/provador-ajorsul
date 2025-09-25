/* Standalone Function: Me */

function Me() {
    for (var d = window, o = Xa(); o instanceof d.HTMLIFrameElement; ) {
        try {
            var c = typeof o.contentWindow.location.href == "string"
        } catch {
            c = !1
        }
        if (c)
            d = o.contentWindow;
        else
            break;
        o = Xa(d.document)
    }
    return o
}

export default Me;
