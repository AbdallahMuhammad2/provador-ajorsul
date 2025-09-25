/* Standalone Function: buildTree */

function buildTree(d, o) {
    const c = d.geometry
      , h = c.index ? c.index.array : null
      , _ = o.maxDepth
      , b = o.verbose
      , _e = o.maxLeafTris
      , nt = o.strategy
      , it = o.onProgress
      , at = geometryUtils_getTriCount(c)
      , ut = d._indirectBuffer;
    let pt = !1;
    const ht = new Float32Array(6)
      , _t = new Float32Array(6)
      , vt = computeTriangleBounds(c, ht)
      , bt = o.indirect ? partition_indirect : partition
      , St = []
      , At = o.indirect ? getFullGeometryRange(c) : getRootIndexRanges(c);
    if (At.length === 1) {
        const It = At[0]
          , Dt = new MeshBVHNode;
        Dt.boundingData = ht,
        getCentroidBounds(vt, It.offset, It.count, _t),
        Pt(Dt, It.offset, It.count, _t),
        St.push(Dt)
    } else
        for (let It of At) {
            const Dt = new MeshBVHNode;
            Dt.boundingData = new Float32Array(6),
            computeBoundsUtils_getBounds(vt, It.offset, It.count, Dt.boundingData, _t),
            Pt(Dt, It.offset, It.count, _t),
            St.push(Dt)
        }
    return St;
    function Et(It) {
        it && it(It / at)
    }
    function Pt(It, Dt, Gt, Bt=null, kt=0) {
        if (!pt && kt >= _ && (pt = !0,
        b && (console.warn(`MeshBVH: Max depth of ${_} reached when generating BVH. Consider increasing maxDepth.`),
        console.warn(c))),
        Gt <= _e || kt >= _)
            return Et(Dt + Gt),
            It.offset = Dt,
            It.count = Gt,
            It;
        const Ut = getOptimalSplit(It.boundingData, Bt, vt, Dt, Gt, nt);
        if (Ut.axis === -1)
            return Et(Dt + Gt),
            It.offset = Dt,
            It.count = Gt,
            It;
        const Ht = bt(ut, h, vt, Dt, Gt, Ut);
        if (Ht === Dt || Ht === Dt + Gt)
            Et(Dt + Gt),
            It.offset = Dt,
            It.count = Gt;
        else {
            It.splitAxis = Ut.axis;
            const Kt = new MeshBVHNode
              , Jt = Dt
              , or = Ht - Dt;
            It.left = Kt,
            Kt.boundingData = new Float32Array(6),
            computeBoundsUtils_getBounds(vt, Jt, or, Kt.boundingData, _t),
            Pt(Kt, Jt, or, _t, kt + 1);
            const ir = new MeshBVHNode
              , lr = Ht
              , ar = Gt - or;
            It.right = ir,
            ir.boundingData = new Float32Array(6),
            computeBoundsUtils_getBounds(vt, lr, ar, ir.boundingData, _t),
            Pt(ir, lr, ar, _t, kt + 1)
        }
        return It
    }
}

export default buildTree;
