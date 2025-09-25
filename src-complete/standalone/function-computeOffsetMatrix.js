/* Standalone Function: computeOffsetMatrix */

function computeOffsetMatrix(d) {
    const o = new three_module.Pq0(0,0,0)
      , c = new three_module.Pq0(0,0,0)
      , h = new three_module.Pq0(0,0,0)
      , _ = new three_module.Pq0(0,0,0)
      , b = d.getAttribute("position")
      , _e = d.index;
    if (_e)
        for (let ht = Math.max(0, d.drawRange.start), _t = Math.min(_e.count, d.drawRange.start + d.drawRange.count) - 1; ht < _t / 3; ht += 3) {
            const vt = _e.getX(ht)
              , bt = _e.getX(ht + 1)
              , St = _e.getX(ht + 2);
            c.set(b.getX(vt), b.getY(vt), b.getZ(vt)),
            h.set(b.getX(bt), b.getY(bt), b.getZ(bt)),
            _.set(b.getX(St), b.getY(St), b.getZ(St)),
            h.sub(c),
            _.sub(c),
            _.cross(h),
            _.normalize(),
            o.add(_)
        }
    else
        for (let ht = 0; ht < b.count; ht += 3)
            c.set(b.getX(ht), b.getY(ht), b.getZ(ht)),
            h.set(b.getX(ht + 1), b.getY(ht + 1), b.getZ(ht + 1)),
            _.set(b.getX(ht + 2), b.getY(ht + 2), b.getZ(ht + 2)),
            h.sub(c),
            _.sub(c),
            _.cross(h),
            _.normalize(),
            o.add(_);
    o.normalize();
    let nt = !1
      , it = 0;
    for (; !nt; ) {
        const ht = it / 3
          , _t = _e ? _e.getX(ht) : ht
          , vt = _e ? _e.getX(ht + 1) : ht + 1;
        c.set(b.getX(_t), b.getY(_t), b.getZ(_t)),
        h.set(b.getX(vt), b.getY(vt), b.getZ(vt)),
        c.sub(h),
        c.normalize();
        const bt = o.dot(c);
        Math.abs(bt - 1) > .001 && c.length() > .5 && (nt = !0),
        it += 3
    }
    h.crossVectors(c, o),
    h.normalize(),
    c.crossVectors(o, h),
    c.normalize();
    const at = new three_module.kn4;
    at.elements[0] = c.x,
    at.elements[1] = c.y,
    at.elements[2] = c.z,
    at.elements[3] = 0,
    at.elements[4] = o.x,
    at.elements[5] = o.y,
    at.elements[6] = o.z,
    at.elements[7] = 0,
    at.elements[8] = h.x,
    at.elements[9] = h.y,
    at.elements[10] = h.z,
    at.elements[11] = 0,
    at.elements[12] = 0,
    at.elements[13] = 0,
    at.elements[14] = 0,
    at.elements[15] = 1,
    d.computeBoundingSphere();
    const ut = d.boundingSphere.radius
      , pt = new three_module.kn4().makeScale(ut, ut, ut);
    return at.multiply(pt),
    at
}

export default computeOffsetMatrix;
