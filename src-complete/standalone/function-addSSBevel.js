/* Standalone Function: addSSBevel */

function addSSBevel(d) {
    const o = d == null ? void 0 : d.userData;
    if (!o)
        return !1;
    o._ssBevel || (o._ssBevel = {});
    const c = o._ssBevel;
    return c.hasSSBevel = !0,
    c.radius === void 0 && (c.radius = 0),
    d.isMaterial && (d.needsUpdate = !0),
    !0
}

export default addSSBevel;
