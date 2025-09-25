/* Standalone Function: performWholeTriangleOperations */

function performWholeTriangleOperations(d, o, c, h, _, b, _e=0) {
    const nt = d.matrixWorld.determinant() < 0;
    operations_matrix.copy(o.matrixWorld).invert().multiply(d.matrixWorld),
    _normalMatrix.getNormalMatrix(d.matrixWorld).multiplyScalar(nt ? -1 : 1);
    const it = o.geometry.boundsTree
      , at = d.geometry.groupIndices
      , ut = d.geometry.index
      , pt = d.geometry.attributes
      , ht = pt.position
      , _t = []
      , vt = d.geometry.halfEdges
      , bt = new Set;
    for (let St = 0, At = getTriCount(d.geometry); St < At; St++)
        St in c.intersectionSet || bt.add(St);
    for (; bt.size > 0; ) {
        const St = getFirstIdFromSet(bt);
        bt.delete(St),
        _t.push(St);
        const At = 3 * St
          , Et = ut.getX(At + 0)
          , Pt = ut.getX(At + 1)
          , It = ut.getX(At + 2);
        operations_tri.a.fromBufferAttribute(ht, Et).applyMatrix4(operations_matrix),
        operations_tri.b.fromBufferAttribute(ht, Pt).applyMatrix4(operations_matrix),
        operations_tri.c.fromBufferAttribute(ht, It).applyMatrix4(operations_matrix);
        const Dt = getHitSide(operations_tri, it);
        _actions.length = 0,
        _attr.length = 0;
        for (let Gt = 0, Bt = h.length; Gt < Bt; Gt++) {
            const kt = getOperationAction(h[Gt], Dt, _);
            kt !== SKIP_TRI && (_actions.push(kt),
            _attr.push(b[Gt]))
        }
        for (; _t.length > 0; ) {
            const Gt = _t.pop();
            for (let Bt = 0; Bt < 3; Bt++) {
                const kt = vt.getSiblingTriangleIndex(Gt, Bt);
                kt !== -1 && bt.has(kt) && (_t.push(kt),
                bt.delete(kt))
            }
            if (_attr.length !== 0) {
                const Bt = 3 * Gt
                  , kt = ut.getX(Bt + 0)
                  , Ut = ut.getX(Bt + 1)
                  , Ht = ut.getX(Bt + 2)
                  , Kt = _e === -1 ? 0 : at[Gt] + _e;
                if (operations_tri.a.fromBufferAttribute(ht, kt),
                operations_tri.b.fromBufferAttribute(ht, Ut),
                operations_tri.c.fromBufferAttribute(ht, Ht),
                !isTriDegenerate(operations_tri))
                    for (let Jt = 0, or = _attr.length; Jt < or; Jt++) {
                        const ir = _actions[Jt]
                          , lr = _attr[Jt].getGroupAttrSet(Kt)
                          , ar = ir === INVERT_TRI;
                        appendAttributesFromIndices(kt, Ut, Ht, pt, d.matrixWorld, _normalMatrix, lr, ar !== nt)
                    }
            }
        }
    }
}

export default performWholeTriangleOperations;
