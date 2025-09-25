/* Standalone Function: equalsRefSet */

function equalsRefSet(d, o) {
    if (!!d != !!o)
        return !1;
    const c = d.values()
      , h = o.values();
    if (c.length !== h.length)
        return !1;
    for (let _ = 0; _ < c.length; _++) {
        const b = c[_]
          , _e = h[_];
        if (b.getChild() !== _e.getChild() && !b.getChild().equals(_e.getChild()))
            return !1
    }
    return !0
}

export default equalsRefSet;
