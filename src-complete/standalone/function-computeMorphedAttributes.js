/* Standalone Function: computeMorphedAttributes */

function computeMorphedAttributes(d) {
    const o = new three_module.Pq0
      , c = new three_module.Pq0
      , h = new three_module.Pq0
      , _ = new three_module.Pq0
      , b = new three_module.Pq0
      , _e = new three_module.Pq0
      , nt = new three_module.Pq0
      , it = new three_module.Pq0
      , at = new three_module.Pq0;
    function ut(hr, gr, dr, cr, Ar, wr, Rr, Cr) {
        o.fromBufferAttribute(gr, Ar),
        c.fromBufferAttribute(gr, wr),
        h.fromBufferAttribute(gr, Rr);
        const tr = hr.morphTargetInfluences;
        if (dr && tr) {
            nt.set(0, 0, 0),
            it.set(0, 0, 0),
            at.set(0, 0, 0);
            for (let fr = 0, vr = dr.length; fr < vr; fr++) {
                const Zr = tr[fr]
                  , rn = dr[fr];
                Zr !== 0 && (_.fromBufferAttribute(rn, Ar),
                b.fromBufferAttribute(rn, wr),
                _e.fromBufferAttribute(rn, Rr),
                cr ? (nt.addScaledVector(_, Zr),
                it.addScaledVector(b, Zr),
                at.addScaledVector(_e, Zr)) : (nt.addScaledVector(_.sub(o), Zr),
                it.addScaledVector(b.sub(c), Zr),
                at.addScaledVector(_e.sub(h), Zr)))
            }
            o.add(nt),
            c.add(it),
            h.add(at)
        }
        hr.isSkinnedMesh && (hr.applyBoneTransform(Ar, o),
        hr.applyBoneTransform(wr, c),
        hr.applyBoneTransform(Rr, h)),
        Cr[3 * Ar + 0] = o.x,
        Cr[3 * Ar + 1] = o.y,
        Cr[3 * Ar + 2] = o.z,
        Cr[3 * wr + 0] = c.x,
        Cr[3 * wr + 1] = c.y,
        Cr[3 * wr + 2] = c.z,
        Cr[3 * Rr + 0] = h.x,
        Cr[3 * Rr + 1] = h.y,
        Cr[3 * Rr + 2] = h.z
    }
    const pt = d.geometry
      , ht = d.material;
    let _t, vt, bt;
    const St = pt.index
      , At = pt.attributes.position
      , Et = pt.morphAttributes.position
      , Pt = pt.morphTargetsRelative
      , It = pt.attributes.normal
      , Dt = pt.morphAttributes.position
      , Gt = pt.groups
      , Bt = pt.drawRange;
    let kt, Ut, Ht, Kt, Jt, or, ir;
    const lr = new Float32Array(At.count * At.itemSize)
      , ar = new Float32Array(It.count * It.itemSize);
    if (St !== null)
        if (Array.isArray(ht))
            for (kt = 0,
            Ht = Gt.length; kt < Ht; kt++)
                for (Jt = Gt[kt],
                or = Math.max(Jt.start, Bt.start),
                ir = Math.min(Jt.start + Jt.count, Bt.start + Bt.count),
                Ut = or,
                Kt = ir; Ut < Kt; Ut += 3)
                    _t = St.getX(Ut),
                    vt = St.getX(Ut + 1),
                    bt = St.getX(Ut + 2),
                    ut(d, At, Et, Pt, _t, vt, bt, lr),
                    ut(d, It, Dt, Pt, _t, vt, bt, ar);
        else
            for (or = Math.max(0, Bt.start),
            ir = Math.min(St.count, Bt.start + Bt.count),
            kt = or,
            Ht = ir; kt < Ht; kt += 3)
                _t = St.getX(kt),
                vt = St.getX(kt + 1),
                bt = St.getX(kt + 2),
                ut(d, At, Et, Pt, _t, vt, bt, lr),
                ut(d, It, Dt, Pt, _t, vt, bt, ar);
    else if (Array.isArray(ht))
        for (kt = 0,
        Ht = Gt.length; kt < Ht; kt++)
            for (Jt = Gt[kt],
            or = Math.max(Jt.start, Bt.start),
            ir = Math.min(Jt.start + Jt.count, Bt.start + Bt.count),
            Ut = or,
            Kt = ir; Ut < Kt; Ut += 3)
                _t = Ut,
                vt = Ut + 1,
                bt = Ut + 2,
                ut(d, At, Et, Pt, _t, vt, bt, lr),
                ut(d, It, Dt, Pt, _t, vt, bt, ar);
    else
        for (or = Math.max(0, Bt.start),
        ir = Math.min(At.count, Bt.start + Bt.count),
        kt = or,
        Ht = ir; kt < Ht; kt += 3)
            _t = kt,
            vt = kt + 1,
            bt = kt + 2,
            ut(d, At, Et, Pt, _t, vt, bt, lr),
            ut(d, It, Dt, Pt, _t, vt, bt, ar);
    return {
        positionAttribute: At,
        normalAttribute: It,
        morphedPositionAttribute: new three_module.qtW(lr,3),
        morphedNormalAttribute: new three_module.qtW(ar,3)
    }
}

export default computeMorphedAttributes;
