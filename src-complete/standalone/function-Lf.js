/* Standalone Function: Lf */

function Lf(d) {
    for (; d != null; d = d.nextSibling) {
        var o = d.nodeType;
        if (o === 1 || o === 3)
            break;
        if (o === 8) {
            if (o = d.data,
            o === "$" || o === "$!" || o === "$?")
                break;
            if (o === "/$")
                return null
        }
    }
    return d
}

export default Lf;
