/* Standalone Class: MaterialConfiguratorBasePlugin */

class MaterialConfiguratorBasePlugin extends AViewerPlugin {
    constructor() {
        super(),
        this.enabled = !0,
        this._uiNeedRefresh = !1,
        this.applyOnLoad = !0,
        this._refreshUiConfig = () => {
            var o, c;
            this.enabled && ((c = (o = this.uiConfig).uiRefresh) === null || c === void 0 || c.call(o))
        }
        ,
        this.dependencies = [AssetManagerPlugin],
        this.variations = [],
        this._selectedMaterial = () => {
            var o, c;
            return ((c = (o = this._picking) === null || o === void 0 ? void 0 : o.getSelectedObject()) === null || c === void 0 ? void 0 : c.material) || void 0
        }
        ,
        this.uiConfig = {
            label: "Material Configurator",
            type: "folder",
            children: [ () => {
                var o;
                return [{
                    type: "input",
                    label: "uuid",
                    property: [this._selectedMaterial(), "uuid"],
                    hidden: () => !this._selectedMaterial(),
                    disabled: !0
                }, {
                    type: "input",
                    label: "mapping",
                    hidden: () => !this._selectedMaterial(),
                    property: () => [this.getSelectedVariation(), "uuid"],
                    onChange: async () => this.refreshUi()
                }, {
                    type: "input",
                    label: "title",
                    hidden: () => !this._selectedMaterial(),
                    property: () => [this.getSelectedVariation(), "title"],
                    onChange: async () => this.refreshUi()
                }, {
                    type: "dropdown",
                    label: "Preview Type",
                    hidden: () => !this._selectedMaterial(),
                    property: () => [this.getSelectedVariation(), "preview"],
                    onChange: async () => this.refreshUi(),
                    children: ["generate:sphere", "generate:cube", "color", "map", "emissive", ...Object.keys(standardMaterialPropList).filter(c => c.endsWith("Map"))].map(c => ({
                        label: c,
                        value: c
                    }))
                }, ...((o = this.getSelectedVariation()) === null || o === void 0 ? void 0 : o.materials.map(c => c.uiConfig ? Object.assign(c.uiConfig, {
                    expanded: !1
                }) : {})) || [], {
                    type: "button",
                    label: "Clear variations",
                    hidden: () => !this._selectedMaterial(),
                    value: async () => {
                        const c = this.getSelectedVariation();
                        c && await this._viewer.confirm("Material configurator: Remove all variations for this material?") && (c.materials = []),
                        this.refreshUi()
                    }
                }, {
                    type: "button",
                    label: "Remove completely",
                    hidden: () => !this._selectedMaterial(),
                    value: async () => {
                        const c = this.getSelectedVariation();
                        c && await this._viewer.confirm("Material configurator: Remove this variation?") && this.removeVariation(c)
                    }
                }, {
                    type: "button",
                    label: "Add Variation",
                    hidden: () => !this._selectedMaterial(),
                    value: async () => {
                        var c;
                        const h = this._selectedMaterial();
                        h && (h.name || await ((c = this._viewer) === null || c === void 0 ? void 0 : c.confirm("Material configurator: Material has no name. Use uuid instead?"))) && this.addVariation(h)
                    }
                }, {
                    type: "button",
                    label: "Refresh Ui",
                    value: () => this.refreshUi()
                }, {
                    type: "button",
                    label: "Apply All",
                    value: () => {
                        this.variations.forEach(async c => this.applyVariation(c, c.materials[0].uuid))
                    }
                }]
            }
            ]
        },
        this.addEventListener("deserialize", this.refreshUi),
        this.refreshUi = this.refreshUi.bind(this),
        this._refreshUi = this._refreshUi.bind(this)
    }
    async onAdded(o) {
        var c, h;
        await super.onAdded(o),
        this._picking = (c = this._viewer) === null || c === void 0 ? void 0 : c.getPluginByType("Picking"),
        this._previewGenerator = new MaterialPreviewGenerator(this._viewer),
        (h = this._picking) === null || h === void 0 || h.addEventListener("selectedObjectChanged", this._refreshUiConfig),
        o.addEventListener("preFrame", this._refreshUi)
    }
    reapplyAll() {
        this.variations.forEach(async o => {
            var c;
            return this.applyVariation(o, o.materials[(c = o.selectedIndex) !== null && c !== void 0 ? c : 0].uuid)
        }
        )
    }
    fromJSON(o, c) {
        return this.variations = [],
        super.fromJSON(o, c) ? (o.applyOnLoad === void 0 && (this.applyOnLoad = !1),
        this.applyOnLoad && this.reapplyAll(),
        this) : null
    }
    async onRemove(o) {
        var c, h;
        return (c = this._previewGenerator) === null || c === void 0 || c.dispose(),
        this._previewGenerator = void 0,
        (h = this._picking) === null || h === void 0 || h.removeEventListener("selectedObjectChanged", this._refreshUiConfig),
        this.removeEventListener("deserialize", this.refreshUi),
        o.removeEventListener("preFrame", this._refreshUi),
        this._picking = void 0,
        super.onRemove(o)
    }
    findVariation(o) {
        return o ? this.variations.find(c => c.uuid === o) : void 0
    }
    getSelectedVariation() {
        var o, c;
        return this.findVariation((o = this._selectedMaterial()) === null || o === void 0 ? void 0 : o.uuid) || this.findVariation((c = this._selectedMaterial()) === null || c === void 0 ? void 0 : c.name)
    }
    applyVariation(o, c) {
        var h, _;
        const b = (_ = (h = this._viewer) === null || h === void 0 ? void 0 : h.getManager()) === null || _ === void 0 ? void 0 : _.materials;
        if (!b)
            return !1;
        const _e = typeof c == "string" ? o.materials.find(nt => nt.uuid === c) : o.materials[c];
        return !!_e && (o.selectedIndex = o.materials.indexOf(_e),
        b.applyMaterial(_e, o.uuid))
    }
    getPreview(o, c, h=!0) {
        if (!this._viewer)
            return "";
        const _ = o;
        if (!_)
            return "";
        let b = "";
        if (c.startsWith("generate:"))
            b = this._previewGenerator.generate(_, c.split(":")[1]);
        else {
            const _e = _[c] || "#ff00ff";
            b = _e.image ? Ne$1(_e.image, 100) : "",
            b.length || (b = Ge$1(_e.isColor ? _e.getHexString() : _e))
        }
        return h && this._viewer.setDirty(),
        b
    }
    refreshUi() {
        this.enabled && this._viewer && (this._uiNeedRefresh = !0)
    }
    async _refreshUi() {
        return !(!this.enabled || !this._viewer || !this._uiNeedRefresh || (this._uiNeedRefresh = !1,
        this._refreshUiConfig(),
        0))
    }
    removeVariationForMaterial(o) {
        let c = this.findVariation(o.uuid);
        !c && o.name.length > 0 && (c = this.findVariation(o.name)),
        c && this.removeVariation(c)
    }
    removeVariation(o) {
        o && (this.variations.splice(this.variations.indexOf(o), 1),
        this.refreshUi())
    }
    addVariation(o, c, h=!0) {
        var _;
        const b = h ? (_ = o == null ? void 0 : o.clone) === null || _ === void 0 ? void 0 : _.call(o) : o;
        if (o && b) {
            let _e = this.findVariation(c ?? o.uuid);
            !_e && !c && o.name.length > 0 && (_e = this.findVariation(o.name)),
            _e || (_e = this.createVariation(o, c)),
            _e.materials.push(b),
            this.refreshUi()
        }
    }
    createVariation(o, c) {
        return this.variations.push({
            uuid: c ?? o.name.length > 0 ? o.name : o.uuid,
            title: o.name.length > 0 ? o.name : "No Name",
            preview: "generate:sphere",
            materials: []
        }),
        this.variations[this.variations.length - 1]
    }
}

export default MaterialConfiguratorBasePlugin;
