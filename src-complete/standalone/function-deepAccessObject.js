/* Standalone Function: deepAccessObject */

function deepAccessObject(d, o, c=!1) {
    for (typeof d == "string" && (d = d.split(".")); d.length > 0; ) {
        if (!o)
            return o;
        const h = d.splice(0, 1)[0];
        if (!(h.length < 1))
            if (Array.isArray(o))
                o = o[parseInt(h)];
            else {
                if (typeof o != "object" || !(h in o)) {
                    if (c)
                        throw new Error("invalid access, check " + h + " in " + o);
                    return
                }
                o = o[h]
            }
    }
    return o
}

export default deepAccessObject;
