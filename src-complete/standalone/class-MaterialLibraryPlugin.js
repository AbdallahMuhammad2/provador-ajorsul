/* Standalone Class: MaterialLibraryPlugin */

class MaterialLibraryPlugin extends MaterialLibraryBasePlugin {
    constructor() {
        super(...arguments),
        this.replaceMaterial = !1,
        this.uiConfig = {
            type: "folder",
            label: "Material Library",
            uuid: esm_browser_v4(),
            children: [...generateUiConfig(this), () => ({
                type: "dropdown",
                label: "Apply Material",
                limitedUi: !0,
                hidden: () => !this._selectedObject(),
                children: [{
                    label: "select one",
                    value: ""
                }, [...this._viewer.getPlugin(AssetManagerPlugin).materials.getAllMaterials().map(o => ({
                    label: o.name || o.uuid,
                    value: o.uuid
                })) || []]],
                getValue: () => {
                    var o;
                    return (o = this._selectedMaterial()) === null || o === void 0 ? void 0 : o.uuid
                }
                ,
                setValue: o => {
                    var c, h, _, b, _e;
                    const nt = (_ = (h = (c = this._viewer) === null || c === void 0 ? void 0 : c.getPlugin(AssetManagerPlugin)) === null || h === void 0 ? void 0 : h.materials) === null || _ === void 0 ? void 0 : _.findMaterial(o);
                    if (nt)
                        if (this.replaceMaterial)
                            (_e = (b = this._selectedObject()) === null || b === void 0 ? void 0 : b.setMaterial) === null || _e === void 0 || _e.call(b, nt);
                        else {
                            const it = this._selectedMaterial();
                            if (it) {
                                const at = it.name
                                  , ut = it.uuid;
                                it.copyProps(nt),
                                it.name = at,
                                it.uuid = ut,
                                it.userData.uuid && (it.userData.uuid = ut)
                            }
                        }
                    this._refreshUi()
                }
            })]
        }
    }
    async _refreshUi() {
        var o, c, h;
        if (!await super._refreshUi())
            return !1;
        const _ = [MeshStandardMaterial2.TypeSlug, DiamondMaterial.TypeSlug]
          , b = (c = (o = this._viewer) === null || o === void 0 ? void 0 : o.getPlugin(AssetManagerPlugin)) === null || c === void 0 ? void 0 : c.materials
          , _e = _.map(nt => [nt, b == null ? void 0 : b.getMaterialsOfType(nt)]);
        CustomContextGrid.RemoveAll(MaterialLibraryPlugin.PluginType);
        for (const [nt,it] of _e)
            CustomContextGrid.Create(MaterialLibraryPlugin.PluginType, nt, 5, 20, 0, it == null ? void 0 : it.filter(at => !at.userData.runtimeMaterial).map(at => {
                let ut;
                const pt = "generate:sphere";
                if (pt.startsWith("generate:"))
                    ut = this._previewGenerator.generate(at, pt.split(":")[1]);
                else {
                    const ht = at[pt] || "#ff00ff";
                    ut = ht.image ? Ne$1(ht.image, 100) : void 0,
                    ut || (ut = Je$1(ht))
                }
                return {
                    id: at.uuid,
                    image: ut,
                    onClick: ht => {
                        const _t = b == null ? void 0 : b.findMaterial(ht);
                        if (_t) {
                            const vt = _t.userData.__appliedMeshes;
                            if (vt != null && vt.size) {
                                const bt = vt.keys().next().value;
                                bt == null || bt.dispatchEvent({
                                    type: "select",
                                    value: bt
                                })
                            }
                        }
                    }
                    ,
                    tooltip: at.name || at.uuid
                }
            }
            ), (at, ut) => tippy_esm(at, {
                placement: "bottom",
                content: ut.tooltip
            }));
        return CustomContextGrid.RebuildUi((h = this._viewer) === null || h === void 0 ? void 0 : h.container),
        !0
    }
}

export default MaterialLibraryPlugin;
