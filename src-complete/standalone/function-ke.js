/* Standalone Function: Ke */

function Ke(d, o) {
    var c = Je(d);
    d = 0;
    for (var h; c; ) {
        if (c.nodeType === 3) {
            if (h = d + c.textContent.length,
            d <= o && h >= o)
                return {
                    node: c,
                    offset: o - d
                };
            d = h
        }
        e: {
            for (; c; ) {
                if (c.nextSibling) {
                    c = c.nextSibling;
                    break e
                }
                c = c.parentNode
            }
            c = void 0
        }
        c = Je(c)
    }
}

export default Ke;
