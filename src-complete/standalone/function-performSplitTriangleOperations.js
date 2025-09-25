/* Standalone Function: performSplitTriangleOperations */

function performSplitTriangleOperations(d, o, c, h, _, b, _e, nt=0) {
    const it = d.matrixWorld.determinant() < 0;
    operations_matrix.copy(o.matrixWorld).invert().multiply(d.matrixWorld),
    _normalMatrix.getNormalMatrix(d.matrixWorld).multiplyScalar(it ? -1 : 1);
    const at = d.geometry.groupIndices
      , ut = d.geometry.index
      , pt = d.geometry.attributes.position
      , ht = o.geometry.boundsTree
      , _t = o.geometry.index
      , vt = o.geometry.attributes.position
      , bt = c.ids
      , St = c.intersectionSet;
    for (let At = 0, Et = bt.length; At < Et; At++) {
        const Pt = bt[At]
          , It = nt === -1 ? 0 : at[Pt] + nt
          , Dt = 3 * Pt
          , Gt = ut.getX(Dt + 0)
          , Bt = ut.getX(Dt + 1)
          , kt = ut.getX(Dt + 2);
        _triA.a.fromBufferAttribute(pt, Gt).applyMatrix4(operations_matrix),
        _triA.b.fromBufferAttribute(pt, Bt).applyMatrix4(operations_matrix),
        _triA.c.fromBufferAttribute(pt, kt).applyMatrix4(operations_matrix),
        b.reset(),
        b.initialize(_triA);
        const Ut = St[Pt];
        for (let Kt = 0, Jt = Ut.length; Kt < Jt; Kt++) {
            const or = 3 * Ut[Kt]
              , ir = _t.getX(or + 0)
              , lr = _t.getX(or + 1)
              , ar = _t.getX(or + 2);
            _triB.a.fromBufferAttribute(vt, ir),
            _triB.b.fromBufferAttribute(vt, lr),
            _triB.c.fromBufferAttribute(vt, ar),
            b.splitByTriangle(_triB)
        }
        const Ht = b.triangles;
        for (let Kt = 0, Jt = Ht.length; Kt < Jt; Kt++) {
            const or = Ht[Kt]
              , ir = b.coplanarTriangleUsed ? getHitSideWithCoplanarCheck(or, ht) : getHitSide(or, ht);
            _attr.length = 0,
            _actions.length = 0;
            for (let lr = 0, ar = h.length; lr < ar; lr++) {
                const hr = getOperationAction(h[lr], ir, _);
                hr !== SKIP_TRI && (_actions.push(hr),
                _attr.push(_e[lr].getGroupAttrSet(It)))
            }
            if (_attr.length !== 0) {
                _triA.getBarycoord(or.a, _barycoordTri.a),
                _triA.getBarycoord(or.b, _barycoordTri.b),
                _triA.getBarycoord(or.c, _barycoordTri.c);
                for (let lr = 0, ar = _attr.length; lr < ar; lr++) {
                    const hr = _attr[lr]
                      , gr = _actions[lr] === INVERT_TRI;
                    appendAttributeFromTriangle(Pt, _barycoordTri, d.geometry, d.matrixWorld, _normalMatrix, hr, it !== gr)
                }
            }
        }
    }
    return bt.length
}

export default performSplitTriangleOperations;
