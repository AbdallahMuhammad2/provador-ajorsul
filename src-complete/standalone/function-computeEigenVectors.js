/* Standalone Function: computeEigenVectors */

function computeEigenVectors(d) {
    const o = d.getAttribute("position")
      , c = d.getAttribute("normal");
    if (o.count / 3 > 1500)
        return console.warn("DiamondPlugin:: Too many faces. Mirror/Topology issues will not be fixed", o.count / 3),
        computeOffsetMatrix(d);
    const h = new three_module.Pq0(0,0,0)
      , _ = new three_module.Pq0(0,0,0)
      , b = new three_module.Pq0(0,0,0)
      , _e = d.index
      , nt = [];
    if (_e)
        for (let At = Math.max(0, d.drawRange.start), Et = Math.min(_e.count, d.drawRange.start + d.drawRange.count) - 1; At < Et; At += 3) {
            const Pt = _e.getX(At)
              , It = _e.getX(At + 1)
              , Dt = _e.getX(At + 2);
            h.set(o.getX(Pt), o.getY(Pt), o.getZ(Pt)),
            _.set(o.getX(It), o.getY(It), o.getZ(It)),
            b.set(o.getX(Dt), o.getY(Dt), o.getZ(Dt)),
            nt.push(h.toArray(), _.toArray(), b.toArray())
        }
    else
        for (let At = 0; At < o.count; At++)
            h.set(o.getX(At), o.getY(At), o.getZ(At)),
            nt.push(h.toArray());
    const it = computeCenterAndCOM(o.array, nt);
    if (it.volume < 0) {
        console.warn("DiamondPlugin:: Negative Volume, Fixing Normals");
        for (let At = 0; At < c.count; At++)
            c.setX(At, -c.getX(At)),
            c.setY(At, -c.getY(At)),
            c.setZ(At, -c.getZ(At));
        c.needsUpdate = !0
    }
    const at = [];
    for (let At = 0; At < o.array.length; At += 3)
        at.push([o.array[At], o.array[At + 1], o.array[At + 2]]);
    const ut = console.log;
    console.log = () => {}
    ;
    const pt = (0,
    pca.getEigenVectors)(at);
    console.log = ut;
    const ht = new three_module.kn4;
    ht.elements[0] = pt[0].vector[0],
    ht.elements[1] = pt[0].vector[1],
    ht.elements[2] = pt[0].vector[2],
    ht.elements[3] = 0,
    ht.elements[4] = pt[1].vector[0],
    ht.elements[5] = pt[1].vector[1],
    ht.elements[6] = pt[1].vector[2],
    ht.elements[7] = 0,
    ht.elements[8] = pt[2].vector[0],
    ht.elements[9] = pt[2].vector[1],
    ht.elements[10] = pt[2].vector[2],
    ht.elements[11] = 0,
    ht.elements[12] = 0,
    ht.elements[13] = 0,
    ht.elements[14] = 0,
    ht.elements[15] = 1;
    const _t = new three_module.Pq0;
    _t.copy(it.com).sub(it.center),
    _t.normalize();
    const vt = new three_module.Pq0(pt[2].vector[0],pt[2].vector[1],pt[2].vector[2]);
    _t.dot(vt) < 0 && (ht.elements[4] = -pt[1].vector[0],
    ht.elements[5] = -pt[1].vector[1],
    ht.elements[6] = -pt[1].vector[2],
    ht.elements[8] = -pt[2].vector[0],
    ht.elements[9] = -pt[2].vector[1],
    ht.elements[10] = -pt[2].vector[2]),
    d.computeBoundingSphere();
    const bt = d.boundingSphere.radius
      , St = new three_module.kn4().makeScale(bt, bt, bt);
    return ht.multiply(St),
    ht
}

export default computeEigenVectors;
