/* Standalone Function: getOptimalSplit */

function getOptimalSplit(d, o, c, h, _, b) {
    let _e = -1
      , nt = 0;
    if (b === CENTER)
        _e = getLongestEdgeIndex(o),
        _e !== -1 && (nt = (o[_e] + o[_e + 3]) / 2);
    else if (b === AVERAGE)
        _e = getLongestEdgeIndex(d),
        _e !== -1 && (nt = getAverage(c, h, _, _e));
    else if (b === SAH) {
        const it = computeSurfaceArea(d);
        let at = TRIANGLE_INTERSECT_COST * _;
        const ut = 6 * h
          , pt = 6 * (h + _);
        for (let ht = 0; ht < 3; ht++) {
            const _t = o[ht]
              , vt = (o[ht + 3] - _t) / BIN_COUNT;
            if (_ < BIN_COUNT / 4) {
                const bt = [...sahBins];
                bt.length = _;
                let St = 0;
                for (let Et = ut; Et < pt; Et += 6,
                St++) {
                    const Pt = bt[St];
                    Pt.candidate = c[Et + 2 * ht],
                    Pt.count = 0;
                    const {bounds: It, leftCacheBounds: Dt, rightCacheBounds: Gt} = Pt;
                    for (let Bt = 0; Bt < 3; Bt++)
                        Gt[Bt] = 1 / 0,
                        Gt[Bt + 3] = -1 / 0,
                        Dt[Bt] = 1 / 0,
                        Dt[Bt + 3] = -1 / 0,
                        It[Bt] = 1 / 0,
                        It[Bt + 3] = -1 / 0;
                    expandByTriangleBounds(Et, c, It)
                }
                bt.sort(binsSort);
                let At = _;
                for (let Et = 0; Et < At; Et++) {
                    const Pt = bt[Et];
                    for (; Et + 1 < At && bt[Et + 1].candidate === Pt.candidate; )
                        bt.splice(Et + 1, 1),
                        At--
                }
                for (let Et = ut; Et < pt; Et += 6) {
                    const Pt = c[Et + 2 * ht];
                    for (let It = 0; It < At; It++) {
                        const Dt = bt[It];
                        Pt >= Dt.candidate ? expandByTriangleBounds(Et, c, Dt.rightCacheBounds) : (expandByTriangleBounds(Et, c, Dt.leftCacheBounds),
                        Dt.count++)
                    }
                }
                for (let Et = 0; Et < At; Et++) {
                    const Pt = bt[Et]
                      , It = Pt.count
                      , Dt = _ - Pt.count
                      , Gt = Pt.leftCacheBounds
                      , Bt = Pt.rightCacheBounds;
                    let kt = 0;
                    It !== 0 && (kt = computeSurfaceArea(Gt) / it);
                    let Ut = 0;
                    Dt !== 0 && (Ut = computeSurfaceArea(Bt) / it);
                    const Ht = TRAVERSAL_COST + TRIANGLE_INTERSECT_COST * (kt * It + Ut * Dt);
                    Ht < at && (_e = ht,
                    at = Ht,
                    nt = Pt.candidate)
                }
            } else {
                for (let At = 0; At < BIN_COUNT; At++) {
                    const Et = sahBins[At];
                    Et.count = 0,
                    Et.candidate = _t + vt + At * vt;
                    const Pt = Et.bounds;
                    for (let It = 0; It < 3; It++)
                        Pt[It] = 1 / 0,
                        Pt[It + 3] = -1 / 0
                }
                for (let At = ut; At < pt; At += 6) {
                    let Et = ~~((c[At + 2 * ht] - _t) / vt);
                    Et >= BIN_COUNT && (Et = BIN_COUNT - 1);
                    const Pt = sahBins[Et];
                    Pt.count++,
                    expandByTriangleBounds(At, c, Pt.bounds)
                }
                const bt = sahBins[BIN_COUNT - 1];
                copyBounds(bt.bounds, bt.rightCacheBounds);
                for (let At = BIN_COUNT - 2; At >= 0; At--) {
                    const Et = sahBins[At]
                      , Pt = sahBins[At + 1];
                    unionBounds(Et.bounds, Pt.rightCacheBounds, Et.rightCacheBounds)
                }
                let St = 0;
                for (let At = 0; At < BIN_COUNT - 1; At++) {
                    const Et = sahBins[At]
                      , Pt = Et.count
                      , It = Et.bounds
                      , Dt = sahBins[At + 1].rightCacheBounds;
                    Pt !== 0 && (St === 0 ? copyBounds(It, leftBounds) : unionBounds(It, leftBounds, leftBounds)),
                    St += Pt;
                    let Gt = 0
                      , Bt = 0;
                    St !== 0 && (Gt = computeSurfaceArea(leftBounds) / it);
                    const kt = _ - St;
                    kt !== 0 && (Bt = computeSurfaceArea(Dt) / it);
                    const Ut = TRAVERSAL_COST + TRIANGLE_INTERSECT_COST * (Gt * St + Bt * kt);
                    Ut < at && (_e = ht,
                    at = Ut,
                    nt = Et.candidate)
                }
            }
        }
    } else
        console.warn(`MeshBVH: Invalid build strategy value ${b} used.`);
    return {
        axis: _e,
        pos: nt
    }
}

export default getOptimalSplit;
