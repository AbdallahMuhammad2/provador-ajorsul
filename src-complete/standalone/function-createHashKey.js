/* Standalone Function: createHashKey */

function createHashKey(d, o) {
    const c = []
      , h = d.getIndices();
    c.push(o.get(h));
    for (const _ of d.listAttributes())
        c.push(o.get(_));
    return c.sort().join("|")
}

export default createHashKey;
