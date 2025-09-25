/* Standalone Function: prepareAttributesData */

function prepareAttributesData(d, o, c, h) {
    c.clear();
    const _ = d.attributes;
    for (let b = 0, _e = h.length; b < _e; b++) {
        const nt = h[b]
          , it = _[nt];
        c.initializeArray(nt, it.array.constructor, it.itemSize, it.normalized)
    }
    for (const b in c.attributes)
        h.includes(b) || c.delete(b);
    for (const b in o.attributes)
        h.includes(b) || (o.deleteAttribute(b),
        o.dispose())
}

export default prepareAttributesData;
