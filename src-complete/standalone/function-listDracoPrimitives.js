/* Standalone Function: listDracoPrimitives */

function listDracoPrimitives(d) {
    const o = d.getLogger()
      , c = new Set
      , h = new Set;
    let _ = 0
      , b = 0;
    for (const pt of d.getRoot().listMeshes())
        for (const ht of pt.listPrimitives())
            ht.getIndices() ? ht.getMode() !== index_modern_Primitive.Mode.TRIANGLES ? (h.add(ht),
            b++) : c.add(ht) : (h.add(ht),
            _++);
    _ > 0 && o.warn(`[${NAME$j}] Skipping Draco compression of ${_} non-indexed primitives.`),
    b > 0 && o.warn(`[${NAME$j}] Skipping Draco compression of ${b} non-TRIANGLES primitives.`);
    const _e = d.getRoot().listAccessors()
      , nt = new Map;
    for (let pt = 0; pt < _e.length; pt++)
        nt.set(_e[pt], pt);
    const it = new Map
      , at = new Set
      , ut = new Map;
    for (const pt of Array.from(c)) {
        let ht = createHashKey(pt, nt);
        if (at.has(ht))
            ut.set(pt, ht);
        else {
            if (it.has(pt.getIndices())) {
                const _t = pt.getIndices()
                  , vt = _t.clone();
                nt.set(vt, d.getRoot().listAccessors().length - 1),
                pt.swap(_t, vt)
            }
            for (const _t of pt.listAttributes())
                if (it.has(_t)) {
                    const vt = _t.clone();
                    nt.set(vt, d.getRoot().listAccessors().length - 1),
                    pt.swap(_t, vt)
                }
            ht = createHashKey(pt, nt),
            at.add(ht),
            ut.set(pt, ht),
            it.set(pt.getIndices(), ht);
            for (const _t of pt.listAttributes())
                it.set(_t, ht)
        }
    }
    for (const pt of Array.from(it.keys())) {
        const ht = new Set(pt.listParents().map(_t => _t.propertyType));
        if (ht.size !== 2 || !ht.has(index_modern_PropertyType.PRIMITIVE) || !ht.has(index_modern_PropertyType.ROOT))
            throw new Error(`[${NAME$j}] Compressed accessors must only be used as indices or vertex attributes.`)
    }
    for (const pt of Array.from(c)) {
        const ht = ut.get(pt)
          , _t = pt.getIndices();
        if (it.get(_t) !== ht || pt.listAttributes().some(vt => it.get(vt) !== ht))
            throw new Error(`[${NAME$j}] Draco primitives must share all, or no, accessors.`)
    }
    for (const pt of Array.from(h)) {
        const ht = pt.getIndices();
        if (it.has(ht) || pt.listAttributes().some(_t => it.has(_t)))
            throw new Error(`[${NAME$j}] Accessor cannot be shared by compressed and uncompressed primitives.`)
    }
    return ut
}

export default listDracoPrimitives;
