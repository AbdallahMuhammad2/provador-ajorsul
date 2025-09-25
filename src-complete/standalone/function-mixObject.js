/* Standalone Function: mixObject */

function mixObject(d, o) {
    const c = {
        ...d,
        ...o
    }
      , h = {};
    for (const _ in c)
        d[_] !== void 0 && o[_] !== void 0 && (h[_] = getMixer$1(d[_])(d[_], o[_]));
    return _ => {
        for (const b in h)
            c[b] = h[b](_);
        return c
    }
}

export default mixObject;
