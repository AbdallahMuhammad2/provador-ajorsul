/* Standalone Function: generateTransform */

function generateTransform(d) {
    const o = new three_module.kn4
      , c = new three_module.kn4
      , h = new three_module.kn4
      , _ = new three_module.kn4
      , b = new three_module.kn4
      , _e = new three_module.kn4
      , nt = new three_module.kn4
      , it = new three_module.kn4
      , at = new three_module.kn4
      , ut = new three_module.kn4
      , pt = new three_module.kn4
      , ht = new three_module.kn4
      , _t = d.inheritType ? d.inheritType : 0;
    if (d.translation && o.setPosition(FBXLoader_tempVec.fromArray(d.translation)),
    d.preRotation) {
        const Ht = d.preRotation.map(three_module.cj9.degToRad);
        Ht.push(d.eulerOrder || three_module.O9p.DEFAULT_ORDER),
        c.makeRotationFromEuler(tempEuler.fromArray(Ht))
    }
    if (d.rotation) {
        const Ht = d.rotation.map(three_module.cj9.degToRad);
        Ht.push(d.eulerOrder || three_module.O9p.DEFAULT_ORDER),
        h.makeRotationFromEuler(tempEuler.fromArray(Ht))
    }
    if (d.postRotation) {
        const Ht = d.postRotation.map(three_module.cj9.degToRad);
        Ht.push(d.eulerOrder || three_module.O9p.DEFAULT_ORDER),
        _.makeRotationFromEuler(tempEuler.fromArray(Ht)),
        _.invert()
    }
    d.scale && b.scale(FBXLoader_tempVec.fromArray(d.scale)),
    d.scalingOffset && nt.setPosition(FBXLoader_tempVec.fromArray(d.scalingOffset)),
    d.scalingPivot && _e.setPosition(FBXLoader_tempVec.fromArray(d.scalingPivot)),
    d.rotationOffset && it.setPosition(FBXLoader_tempVec.fromArray(d.rotationOffset)),
    d.rotationPivot && at.setPosition(FBXLoader_tempVec.fromArray(d.rotationPivot)),
    d.parentMatrixWorld && (pt.copy(d.parentMatrix),
    ut.copy(d.parentMatrixWorld));
    const vt = c.clone().multiply(h).multiply(_)
      , bt = new three_module.kn4;
    bt.extractRotation(ut);
    const St = new three_module.kn4;
    St.copyPosition(ut);
    const At = St.clone().invert().multiply(ut)
      , Et = bt.clone().invert().multiply(At)
      , Pt = b
      , It = new three_module.kn4;
    if (_t === 0)
        It.copy(bt).multiply(vt).multiply(Et).multiply(Pt);
    else if (_t === 1)
        It.copy(bt).multiply(Et).multiply(vt).multiply(Pt);
    else {
        const Ht = new three_module.kn4().scale(new three_module.Pq0().setFromMatrixScale(pt)).clone().invert()
          , Kt = Et.clone().multiply(Ht);
        It.copy(bt).multiply(vt).multiply(Kt).multiply(Pt)
    }
    const Dt = at.clone().invert()
      , Gt = _e.clone().invert();
    let Bt = o.clone().multiply(it).multiply(at).multiply(c).multiply(h).multiply(_).multiply(Dt).multiply(nt).multiply(_e).multiply(b).multiply(Gt);
    const kt = new three_module.kn4().copyPosition(Bt)
      , Ut = ut.clone().multiply(kt);
    return ht.copyPosition(Ut),
    Bt = ht.clone().multiply(It),
    Bt.premultiply(ut.invert()),
    Bt
}

export default generateTransform;
