/* Standalone Function: equalsRef */

function equalsRef(d, o) {
    if (!!d != !!o)
        return !1;
    const c = d.getChild()
      , h = o.getChild();
    return c === h || c.equals(h)
}

export default equalsRef;
