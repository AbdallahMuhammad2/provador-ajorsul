/* Standalone Function: addBloomData */

function addBloomData(d) {
    const o = d == null ? void 0 : d.userData;
    return !!o && (o[BloomPlugin.PluginType] || (o[BloomPlugin.PluginType] = {}),
    o[BloomPlugin.PluginType].enable = !0,
    d.isMaterial && (d.needsUpdate = !0),
    !0)
}

export default addBloomData;
