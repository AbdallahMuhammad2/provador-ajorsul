/* Standalone Function: matchEdges */

function matchEdges(d, o, c, h=DEGENERATE_EPSILON) {
    d.sort(sortEdgeFunc),
    o.sort(sortEdgeFunc);
    for (let nt = 0; nt < d.length; nt++) {
        const it = d[nt];
        for (let at = 0; at < o.length; at++) {
            const ut = o[at];
            if (!(ut.start > it.end)) {
                if (it.end < ut.start || ut.end < it.start)
                    continue;
                if (it.start <= ut.start && it.end >= ut.end)
                    b(ut.end, it.end) || d.splice(nt + 1, 0, {
                        start: ut.end,
                        end: it.end,
                        index: it.index
                    }),
                    it.end = ut.start,
                    ut.start = 0,
                    ut.end = 0;
                else if (it.start >= ut.start && it.end <= ut.end)
                    b(it.end, ut.end) || o.splice(at + 1, 0, {
                        start: it.end,
                        end: ut.end,
                        index: ut.index
                    }),
                    ut.end = it.start,
                    it.start = 0,
                    it.end = 0;
                else if (it.start <= ut.start && it.end <= ut.end) {
                    const pt = it.end;
                    it.end = ut.start,
                    ut.start = pt
                } else {
                    if (!(it.start >= ut.start && it.end >= ut.end))
                        throw new Error;
                    {
                        const pt = ut.end;
                        ut.end = it.start,
                        it.start = pt
                    }
                }
            }
            if (c.has(it.index) || c.set(it.index, []),
            c.has(ut.index) || c.set(ut.index, []),
            c.get(it.index).push(ut.index),
            c.get(ut.index).push(it.index),
            _e(ut) && (o.splice(at, 1),
            at--),
            _e(it)) {
                d.splice(nt, 1),
                nt--;
                break
            }
        }
    }
    function _(nt) {
        for (let it = 0; it < nt.length; it++)
            _e(nt[it]) && (nt.splice(it, 1),
            it--)
    }
    function b(nt, it) {
        return Math.abs(it - nt) < h
    }
    function _e(nt) {
        return Math.abs(nt.end - nt.start) < h
    }
    _(d),
    _(o)
}

export default matchEdges;
