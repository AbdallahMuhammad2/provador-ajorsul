/* Standalone Function: Pa */

function Pa(d) {
    switch (d.tag) {
    case 5:
        return Ma(d.type);
    case 16:
        return Ma("Lazy");
    case 13:
        return Ma("Suspense");
    case 19:
        return Ma("SuspenseList");
    case 0:
    case 2:
    case 15:
        return d = Oa(d.type, !1),
        d;
    case 11:
        return d = Oa(d.type.render, !1),
        d;
    case 1:
        return d = Oa(d.type, !0),
        d;
    default:
        return ""
    }
}

export default Pa;
