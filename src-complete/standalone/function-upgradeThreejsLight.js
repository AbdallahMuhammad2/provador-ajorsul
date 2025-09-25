/* Standalone Function: upgradeThreejsLight */

function upgradeThreejsLight(d) {
    var o, c;
    if (!d.isLight || d.assetType === "light")
        return d;
    if (d.uiConfig)
        return console.warn("ui config already exists, not supported", d),
        d;
    let h;
    if (d.children.length,
    d.isDirectionalLight && (h = new DirectionalLight2),
    d.isAmbientLight && (h = new AmbientLight2),
    d.isSpotLight && (h = new SpotLight2),
    d.isPointLight && (h = new PointLight2),
    h) {
        (c = (o = h.lightObject).copy) === null || c === void 0 || c.call(o, d);
        const _ = d.parent;
        _ != null && _.isObject3D && (_.remove(d),
        d.dispose(),
        d.userData.iModel = h,
        _.add(h.lightObject),
        h.uuid = d.uuid),
        setupIModel(h.lightObject, _)
    } else
        console.warn("unknown light type: ", d);
    return h
}

export default upgradeThreejsLight;
