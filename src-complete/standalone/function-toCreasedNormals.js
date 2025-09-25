/* Standalone Function: toCreasedNormals */

function toCreasedNormals(d, o=Math.PI / 3) {
    const c = Math.cos(o)
      , h = 100 * (1 + 1e-10)
      , _ = [new three_module.Pq0, new three_module.Pq0, new three_module.Pq0]
      , b = new three_module.Pq0
      , _e = new three_module.Pq0
      , nt = new three_module.Pq0
      , it = new three_module.Pq0;
    function at(bt) {
        return `${~~(bt.x * h)},${~~(bt.y * h)},${~~(bt.z * h)}`
    }
    const ut = d.index ? d.toNonIndexed() : d
      , pt = ut.attributes.position
      , ht = {};
    for (let bt = 0, St = pt.count / 3; bt < St; bt++) {
        const At = 3 * bt
          , Et = _[0].fromBufferAttribute(pt, At + 0)
          , Pt = _[1].fromBufferAttribute(pt, At + 1)
          , It = _[2].fromBufferAttribute(pt, At + 2);
        b.subVectors(It, Pt),
        _e.subVectors(Et, Pt);
        const Dt = new three_module.Pq0().crossVectors(b, _e).normalize();
        for (let Gt = 0; Gt < 3; Gt++) {
            const Bt = at(_[Gt]);
            Bt in ht || (ht[Bt] = []),
            ht[Bt].push(Dt)
        }
    }
    const _t = new Float32Array(3 * pt.count)
      , vt = new three_module.THS(_t,3,!1);
    for (let bt = 0, St = pt.count / 3; bt < St; bt++) {
        const At = 3 * bt
          , Et = _[0].fromBufferAttribute(pt, At + 0)
          , Pt = _[1].fromBufferAttribute(pt, At + 1)
          , It = _[2].fromBufferAttribute(pt, At + 2);
        b.subVectors(It, Pt),
        _e.subVectors(Et, Pt),
        nt.crossVectors(b, _e).normalize();
        for (let Dt = 0; Dt < 3; Dt++) {
            const Gt = ht[at(_[Dt])];
            it.set(0, 0, 0);
            for (let Bt = 0, kt = Gt.length; Bt < kt; Bt++) {
                const Ut = Gt[Bt];
                nt.dot(Ut) > c && it.add(Ut)
            }
            it.normalize(),
            vt.setXYZ(At + Dt, it.x, it.y, it.z)
        }
    }
    return ut.setAttribute("normal", vt),
    ut
}

export default toCreasedNormals;
