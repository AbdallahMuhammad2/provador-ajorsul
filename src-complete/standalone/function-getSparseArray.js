/* Standalone Function: getSparseArray */

function getSparseArray(d, o) {
    const c = index_modern_ComponentTypeToTypedArray[d.componentType]
      , h = index_modern_Accessor.getElementSize(d.type);
    let _;
    _ = d.bufferView !== void 0 ? getAccessorArray(d, o) : new c(d.count * h);
    const b = d.sparse;
    if (!b)
        return _;
    const _e = b.count
      , nt = index_modern_extends({}, d, b.indices, {
        count: _e,
        type: "SCALAR"
    })
      , it = index_modern_extends({}, d, b.values, {
        count: _e
    })
      , at = getAccessorArray(nt, o)
      , ut = getAccessorArray(it, o);
    for (let pt = 0; pt < nt.count; pt++)
        for (let ht = 0; ht < h; ht++)
            _[at[pt] * h + ht] = ut[pt * h + ht];
    return _
}

export default getSparseArray;
