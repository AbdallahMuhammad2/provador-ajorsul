/* Standalone Function: equalsRefMap */

function equalsRefMap(d, o) {
    if (!!d != !!o)
        return !1;
    const c = d.keys()
      , h = o.keys();
    if (c.length !== h.length)
        return !1;
    for (const _ of c) {
        const b = d.get(_)
          , _e = o.get(_);
        if (!!b != !!_e)
            return !1;
        const nt = b.getChild()
          , it = _e.getChild();
        if (nt !== it && !nt.equals(it))
            return !1
    }
    return !0
}

export default equalsRefMap;
