/* Standalone Function: autoGPUInstanceMeshes */

function autoGPUInstanceMeshes(d) {
    var o, c, h, _, b, _e, nt, it;
    if (!d.isMaterial && !d.isBufferGeometry)
        return;
    const at = Array.from(d.userData.__appliedMeshes).filter(_t => !_t.isInstancedMesh && !!_t.parent && _t.children.length === 0 && !Array.isArray(_t.material));
    if (at.length < 2)
        return;
    const ut = _t => {
        var vt;
        return _t.parent.uuid + "_" + _t.geometry.uuid + "_" + ((vt = _t.material) === null || vt === void 0 ? void 0 : vt.uuid)
    }
      , pt = new Map;
    for (const _t of at) {
        const vt = ut(_t);
        pt.has(vt) || pt.set(vt, []),
        pt.get(vt).push(_t),
        _t.updateMatrix()
    }
    const ht = pt.keys();
    for (const _t of ht) {
        const vt = pt.get(_t)
          , bt = vt[0];
        if (!bt || vt.length < 2)
            continue;
        const St = new three_module.ZLX(bt.geometry,bt.material,vt.length)
          , At = bt.userData;
        bt.userData = {},
        St.copy(bt),
        copyObject3DUserData(St.userData, At);
        const Et = bt.parent;
        St.position.set(0, 0, 0),
        St.rotation.set(0, 0, 0),
        St.scale.set(1, 1, 1),
        St.updateMatrix();
        const Pt = new Float32Array(3 * St.count)
          , It = new Float32Array(4 * St.count)
          , Dt = new Float32Array(3 * St.count);
        for (let Gt = 0; Gt < vt.length; Gt++) {
            const Bt = vt[Gt]
              , kt = Bt.matrix;
            kt.determinant() < 0 && (kt.elements[0] *= -1,
            kt.elements[1] *= -1,
            kt.elements[2] *= -1),
            St.setMatrixAt(Gt, kt),
            Bt.position.toArray(Pt, 3 * Gt),
            Bt.quaternion.toArray(It, 4 * Gt),
            Bt.scale.toArray(Dt, 3 * Gt),
            Bt.removeFromParent(),
            (h = (c = (o = Bt.material) === null || o === void 0 ? void 0 : o.userData) === null || c === void 0 ? void 0 : c.__appliedMeshes) === null || h === void 0 || h.delete(Bt),
            (_e = (b = (_ = Bt.geometry) === null || _ === void 0 ? void 0 : _.userData) === null || b === void 0 ? void 0 : b.__appliedMeshes) === null || _e === void 0 || _e.delete(Bt)
        }
        (it = (nt = St.material.userData) === null || nt === void 0 ? void 0 : nt.__appliedMeshes) === null || it === void 0 || it.add(St),
        St.geometry.userData.__appliedMeshes.add(St),
        St.sourceTrs = {
            TRANSLATION: new three_module.THS(Pt,3),
            ROTATION: new three_module.THS(It,4),
            SCALE: new three_module.THS(Dt,3)
        },
        St.instanceMatrix.needsUpdate = !0,
        Et.add(St),
        Et.setDirty(),
        console.log("autoGPUInstanceMeshes", _t, vt.length, bt, St)
    }
}

export default autoGPUInstanceMeshes;
