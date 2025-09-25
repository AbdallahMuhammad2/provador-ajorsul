/* Standalone Function: se */

function se(d, o) {
    o = (o & 4) !== 0;
    for (var c = 0; c < d.length; c++) {
        var h = d[c]
          , _ = h.event;
        h = h.listeners;
        e: {
            var b = void 0;
            if (o)
                for (var _e = h.length - 1; 0 <= _e; _e--) {
                    var nt = h[_e]
                      , it = nt.instance
                      , at = nt.currentTarget;
                    if (nt = nt.listener,
                    it !== b && _.isPropagationStopped())
                        break e;
                    nf(_, nt, at),
                    b = it
                }
            else
                for (_e = 0; _e < h.length; _e++) {
                    if (nt = h[_e],
                    it = nt.instance,
                    at = nt.currentTarget,
                    nt = nt.listener,
                    it !== b && _.isPropagationStopped())
                        break e;
                    nf(_, nt, at),
                    b = it
                }
        }
    }
    if (Qb)
        throw d = Rb,
        Qb = !1,
        Rb = null,
        d
}

export default se;
