/* Standalone Function: Wc */

function Wc(d) {
    var o = d[Of];
    if (o)
        return o;
    for (var c = d.parentNode; c; ) {
        if (o = c[uf] || c[Of]) {
            if (c = o.alternate,
            o.child !== null || c !== null && c.child !== null)
                for (d = Mf(d); d !== null; ) {
                    if (c = d[Of])
                        return c;
                    d = Mf(d)
                }
            return o
        }
        d = c,
        c = d.parentNode
    }
    return null
}

export default Wc;
