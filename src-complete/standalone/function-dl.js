/* Standalone Function: dl */

function dl(d) {
    if (!d)
        return Vf;
    d = d._reactInternals;
    e: {
        if (Vb(d) !== d || d.tag !== 1)
            throw Error(p(170));
        var o = d;
        do {
            switch (o.tag) {
            case 3:
                o = o.stateNode.context;
                break e;
            case 1:
                if (Zf(o.type)) {
                    o = o.stateNode.__reactInternalMemoizedMergedChildContext;
                    break e
                }
            }
            o = o.return
        } while (o !== null);
        throw Error(p(171))
    }
    if (d.tag === 1) {
        var c = d.type;
        if (Zf(c))
            return bg(d, c, o)
    }
    return o
}

export default dl;
