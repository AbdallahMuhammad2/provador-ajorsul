/* Standalone Function: computeCenterAndCOM */

function computeCenterAndCOM(d, o) {
    const c = new three_module.Pq0;
    for (let pt = 0; pt < d.length; pt += 3)
        c.x += d[pt],
        c.y += d[pt + 1],
        c.z += d[pt + 2];
    c.multiplyScalar(1 / (d.length / 3));
    const h = new three_module.Pq0
      , _ = new three_module.Pq0
      , b = new three_module.Pq0
      , _e = new three_module.Pq0
      , nt = new three_module.Pq0;
    let it = 0
      , at = 0
      , ut = o.length;
    ut % 3 != 0 && (ut -= ut % 3);
    for (let pt = 0; pt < ut; pt += 3) {
        h.set(o[pt][0], o[pt][1], o[pt][2]),
        _.set(o[pt + 1][0], o[pt + 1][1], o[pt + 1][2]),
        b.set(o[pt + 2][0], o[pt + 2][1], o[pt + 2][2]),
        nt.copy(h).add(_).add(b);
        const ht = TriangleArea(h, _, b);
        nt.multiplyScalar(ht / 3),
        _e.add(nt),
        it += ht,
        at += SignedTetrahedronVolume(h, _, b)
    }
    return _e.multiplyScalar(1 / it),
    {
        center: c,
        com: _e,
        volume: at,
        area: it
    }
}

export default computeCenterAndCOM;
