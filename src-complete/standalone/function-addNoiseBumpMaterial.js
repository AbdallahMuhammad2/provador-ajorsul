/* Standalone Function: addNoiseBumpMaterial */

function addNoiseBumpMaterial(d) {
    const o = d == null ? void 0 : d.userData;
    if (!o)
        return !1;
    o._noiseBumpMat || (o._noiseBumpMat = {});
    const c = o._noiseBumpMat;
    return c.hasBump = !0,
    c.bumpNoiseParams === void 0 && (c.bumpNoiseParams = [.5, .5]),
    c.bumpScale === void 0 && (c.bumpScale = .05),
    c.flakeScale === void 0 && (c.flakeScale = .05),
    c.flakeClamp === void 0 && (c.flakeClamp = 1),
    c.flakeRadius === void 0 && (c.flakeRadius = .3),
    c.useColorFlakes === void 0 && (c.useColorFlakes = !1),
    c.flakeParams === void 0 && (c.flakeParams = new three_module.IUQ(0,1,3,0)),
    c.flakeFallOffParams === void 0 && (c.flakeFallOffParams = new three_module.Pq0(0,1,0)),
    d.isMaterial && (d.needsUpdate = !0),
    !0
}

export default addNoiseBumpMaterial;
