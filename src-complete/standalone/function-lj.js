/* Standalone Function: Lj */

function Lj(d, o) {
    var c = d.ref;
    if (c !== null)
        if (typeof c == "function")
            try {
                c(null)
            } catch (h) {
                W(d, o, h)
            }
        else
            c.current = null
}

export default Lj;
