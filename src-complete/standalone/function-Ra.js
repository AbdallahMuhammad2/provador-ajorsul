/* Standalone Function: Ra */

function Ra(d) {
    var o = d.type;
    switch (d.tag) {
    case 24:
        return "Cache";
    case 9:
        return (o.displayName || "Context") + ".Consumer";
    case 10:
        return (o._context.displayName || "Context") + ".Provider";
    case 18:
        return "DehydratedFragment";
    case 11:
        return d = o.render,
        d = d.displayName || d.name || "",
        o.displayName || (d !== "" ? "ForwardRef(" + d + ")" : "ForwardRef");
    case 7:
        return "Fragment";
    case 5:
        return o;
    case 4:
        return "Portal";
    case 3:
        return "Root";
    case 6:
        return "Text";
    case 16:
        return Qa(o);
    case 8:
        return o === za ? "StrictMode" : "Mode";
    case 22:
        return "Offscreen";
    case 12:
        return "Profiler";
    case 21:
        return "Scope";
    case 13:
        return "Suspense";
    case 19:
        return "SuspenseList";
    case 25:
        return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
        if (typeof o == "function")
            return o.displayName || o.name || null;
        if (typeof o == "string")
            return o
    }
    return null
}

export default Ra;
