/* Standalone Function: computeDisjointEdges */

function computeDisjointEdges(d, o, c) {
    const h = d.attributes
      , _ = d.index
      , b = h.position
      , _e = new Map
      , nt = new Map
      , it = Array.from(o)
      , at = new RaySet;
    for (let ut = 0, pt = it.length; ut < pt; ut++) {
        const ht = it[ut]
          , _t = toTriIndex(ht)
          , vt = toEdgeIndex(ht);
        let bt, St = 3 * _t + vt, At = 3 * _t + (vt + 1) % 3;
        _ && (St = _.getX(St),
        At = _.getX(At)),
        _v0.fromBufferAttribute(b, St),
        _v1.fromBufferAttribute(b, At),
        toNormalizedRay(_v0, _v1, computeDisjointEdges_ray);
        let Et = at.findClosestRay(computeDisjointEdges_ray);
        Et === null && (Et = computeDisjointEdges_ray.clone(),
        at.addRay(Et)),
        nt.has(Et) || nt.set(Et, {
            forward: [],
            reverse: [],
            ray: Et
        }),
        bt = nt.get(Et);
        let Pt = getProjectedDistance(Et, _v0)
          , It = getProjectedDistance(Et, _v1);
        Pt > It && ([Pt,It] = [It, Pt]),
        computeDisjointEdges_ray.direction.dot(Et.direction) < 0 ? bt.reverse.push({
            start: Pt,
            end: It,
            index: ht
        }) : bt.forward.push({
            start: Pt,
            end: It,
            index: ht
        })
    }
    return nt.forEach( ({forward: ut, reverse: pt}, ht) => {
        matchEdges(ut, pt, _e, c),
        ut.length === 0 && pt.length === 0 && nt.delete(ht)
    }
    ),
    {
        disjointConnectivityMap: _e,
        fragmentMap: nt
    }
}

export default computeDisjointEdges;
