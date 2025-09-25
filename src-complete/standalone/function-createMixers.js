/* Standalone Function: createMixers */

function createMixers(d, o, c) {
    const h = []
      , _ = c || mix
      , b = d.length - 1;
    for (let _e = 0; _e < b; _e++) {
        let nt = _(d[_e], d[_e + 1]);
        if (o) {
            const it = Array.isArray(o) ? o[_e] || noop : o;
            nt = pipe(it, nt)
        }
        h.push(nt)
    }
    return h
}

export default createMixers;
