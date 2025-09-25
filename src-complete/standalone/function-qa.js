/* Standalone Function: Qa */

function Qa(d) {
    if (d == null)
        return null;
    if (typeof d == "function")
        return d.displayName || d.name || null;
    if (typeof d == "string")
        return d;
    switch (d) {
    case ya:
        return "Fragment";
    case wa:
        return "Portal";
    case Aa:
        return "Profiler";
    case za:
        return "StrictMode";
    case Ea:
        return "Suspense";
    case Fa:
        return "SuspenseList"
    }
    if (typeof d == "object")
        switch (d.$$typeof) {
        case Ca:
            return (d.displayName || "Context") + ".Consumer";
        case Ba:
            return (d._context.displayName || "Context") + ".Provider";
        case Da:
            var o = d.render;
            return d = d.displayName,
            d || (d = o.displayName || o.name || "",
            d = d !== "" ? "ForwardRef(" + d + ")" : "ForwardRef"),
            d;
        case Ga:
            return o = d.displayName || null,
            o !== null ? o : Qa(d.type) || "Memo";
        case Ha:
            o = d._payload,
            d = d._init;
            try {
                return Qa(d(o))
            } catch {}
        }
    return null
}

export default Qa;
