/* Standalone Function: addClearcoatTint */

function addClearcoatTint(d) {
    const o = d == null ? void 0 : d.userData;
    if (!o)
        return !1;
    o._clearcoatTint || (o._clearcoatTint = {});
    const c = o._clearcoatTint;
    return c.enableTint = !0,
    c.tintColor === void 0 && (c.tintColor = 16777215),
    c.thickness === void 0 && (c.thickness = .1),
    c.ior === void 0 && (c.ior = 1.5),
    d.isMaterial && (d.needsUpdate = !0),
    !0
}

export default addClearcoatTint;
