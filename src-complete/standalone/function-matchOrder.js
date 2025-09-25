/* Standalone Function: matchOrder */

function matchOrder(d, o) {
    var c;
    const h = []
      , _ = {
        color: 0,
        var: 0,
        number: 0
    };
    for (let b = 0; b < o.values.length; b++) {
        const _e = o.types[b]
          , nt = d.indexes[_e][_[_e]]
          , it = (c = d.values[nt]) !== null && c !== void 0 ? c : 0;
        h[b] = it,
        _[_e]++
    }
    return h
}

export default matchOrder;
