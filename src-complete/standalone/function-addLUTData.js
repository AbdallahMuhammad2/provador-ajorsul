/* Standalone Function: addLUTData */

function addLUTData(d) {
    const o = d == null ? void 0 : d.userData;
    if (!o)
        return !1;
    o[LUTPlugin.PluginType] || (o[LUTPlugin.PluginType] = {});
    const c = o[LUTPlugin.PluginType];
    return c.enable = !0,
    c.index === void 0 && (c.index = 0),
    d.isMaterial && (d.needsUpdate = !0),
    !0
}

export default addLUTData;
