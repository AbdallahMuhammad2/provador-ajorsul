/* Standalone Function: setMeshGeometry */

function setMeshGeometry(d, o, c=!1) {
    var h, _, b, _e, nt, it, at;
    d.userData.__objectUpdater || (d.userData.__objectUpdater = ht => {
        d.dispatchEvent({
            ...ht,
            type: "objectUpdate"
        })
    }
    );
    let ut = d.geometry;
    const pt = ut;
    return (ut !== o || c) && (ut && (ut.removeEventListener("geometryUpdate", d.userData.__objectUpdater),
    (_ = (h = ut.userData) === null || h === void 0 ? void 0 : h.__appliedMeshes) === null || _ === void 0 || _.delete(d)),
    ut = o,
    ut && !ut.userData.__appliedMeshes && (ut.userData.__appliedMeshes = new Set),
    d.geometry = (b = ut) !== null && b !== void 0 ? b : void 0,
    ut && (d.updateMorphTargets(),
    ut.addEventListener("geometryUpdate", d.userData.__objectUpdater),
    (nt = (_e = ut.userData) === null || _e === void 0 ? void 0 : _e.__appliedMeshes) === null || nt === void 0 || nt.add(d))),
    o && !o.uiConfig && (o.uiConfig = makeGeometryUiConfig(d.geometry)),
    d.dispatchEvent({
        type: "geometryChanged",
        geometry: o ?? void 0
    }),
    (at = (it = d.uiConfig) === null || it === void 0 ? void 0 : it.uiRefresh) === null || at === void 0 || at.call(it, "postFrame", !0),
    pt === ut ? void 0 : pt || void 0
}

export default setMeshGeometry;
