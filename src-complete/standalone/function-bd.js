/* Standalone Function: bd */

function bd(d) {
    function o(_) {
        return ad(_, d)
    }
    if (0 < Kc.length) {
        ad(Kc[0], d);
        for (var c = 1; c < Kc.length; c++) {
            var h = Kc[c];
            h.blockedOn === d && (h.blockedOn = null)
        }
    }
    for (Lc !== null && ad(Lc, d),
    Mc !== null && ad(Mc, d),
    Nc !== null && ad(Nc, d),
    Oc.forEach(o),
    Pc.forEach(o),
    c = 0; c < Qc.length; c++)
        h = Qc[c],
        h.blockedOn === d && (h.blockedOn = null);
    for (; 0 < Qc.length && (c = Qc[0],
    c.blockedOn === null); )
        Vc(c),
        c.blockedOn === null && Qc.shift()
}

export default bd;
