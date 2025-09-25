/* Standalone Function: Mf */

function Mf(d) {
    d = d.previousSibling;
    for (var o = 0; d; ) {
        if (d.nodeType === 8) {
            var c = d.data;
            if (c === "$" || c === "$!" || c === "$?") {
                if (o === 0)
                    return d;
                o--
            } else
                c === "/$" && o++
        }
        d = d.previousSibling
    }
    return null
}

export default Mf;
