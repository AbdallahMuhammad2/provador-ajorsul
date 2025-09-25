/* Standalone Function: setMeshMaterial */

function setMeshMaterial(d, o) {
    var c, h, _, b, _e;
    const nt = (Array.isArray(o) ? o : [o]).map(ht => ht == null ? void 0 : ht.materialObject).filter(ht => ht);
    if (d.material == nt || nt.length === 1 && d.material === nt[0])
        return [];
    d.userData.__materialUpdater || (d.userData.__materialUpdater = () => {
        d.dispatchEvent({
            type: "materialUpdate"
        })
    }
    ),
    d.userData.__textureUpdater || (d.userData.__textureUpdater = () => {
        d.dispatchEvent({
            type: "textureUpdate"
        })
    }
    );
    let it = [];
    const at = []
      , ut = Array.isArray(d.material) ? [...d.material] : [d.material];
    for (const ht of ut)
        ht && it.push(ht);
    const pt = [];
    for (const ht of nt)
        ht.userData.__appliedMeshes || (ht.userData.__appliedMeshes = new Set),
        pt.push(ht),
        ht && (it.includes(ht) ? it = it.filter(_t => _t !== ht) : at.push(ht));
    d.material = pt.length !== 1 ? pt : (c = pt[0]) !== null && c !== void 0 ? c : void 0;
    for (const ht of it)
        ht.removeEventListener("materialUpdate", d.userData.__materialUpdater),
        ht.removeEventListener("textureUpdate", d.userData.__textureUpdater),
        (_ = (h = ht.userData) === null || h === void 0 ? void 0 : h.__appliedMeshes) === null || _ === void 0 || _.delete(d),
        ht.dispatchEvent({
            type: "removeFromMesh",
            mesh: d,
            object: d
        });
    for (const ht of at)
        ht.addEventListener("materialUpdate", d.userData.__materialUpdater),
        ht.addEventListener("textureUpdate", d.userData.__textureUpdater),
        ht.userData.__appliedMeshes.add(d),
        ht.dispatchEvent({
            type: "addToMesh",
            mesh: d,
            object: d
        });
    return d.dispatchEvent({
        type: "materialChanged",
        material: o ?? void 0,
        mesh: d
    }),
    (_e = (b = d.uiConfig) === null || b === void 0 ? void 0 : b.uiRefresh) === null || _e === void 0 || _e.call(b, "postFrame", !0),
    ut
}

export default setMeshMaterial;
