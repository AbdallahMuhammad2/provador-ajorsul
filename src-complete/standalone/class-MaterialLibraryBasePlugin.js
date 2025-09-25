/* Standalone Class: MaterialLibraryBasePlugin */

class MaterialLibraryBasePlugin extends AViewerPlugin {
    constructor() {
        super(...arguments),
        this.enabled = !0,
        this._uiNeedRefresh = !1,
        this._refreshUiConfig = () => {
            var o, c;
            this.enabled && ((c = (o = this.uiConfig) === null || o === void 0 ? void 0 : o.uiRefresh) === null || c === void 0 || c.call(o, "postFrame", !0))
        }
        ,
        this.dependencies = [AssetManagerPlugin],
        this._selectedObject = () => {
            var o;
            return ((o = this._picking) === null || o === void 0 ? void 0 : o.getSelectedObject()) || void 0
        }
        ,
        this._selectedMaterial = () => {
            var o;
            return ((o = this._selectedObject()) === null || o === void 0 ? void 0 : o.material) || void 0
        }
    }
    async onAdded(o) {
        var c, h;
        await super.onAdded(o),
        this.refreshUi = this.refreshUi.bind(this),
        this._refreshUi = this._refreshUi.bind(this),
        this._picking = (c = this._viewer) === null || c === void 0 ? void 0 : c.getPluginByType("Picking"),
        this._previewGenerator = new MaterialPreviewGenerator(this._viewer),
        (h = this._picking) === null || h === void 0 || h.addEventListener("selectedObjectChanged", this._refreshUiConfig),
        o.addEventListener("preFrame", this._refreshUi),
        this.addEventListener("deserialize", this.refreshUi)
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
    refreshUi() {
        this.enabled && (this._uiNeedRefresh = !0)
    }
    async _refreshUi() {
        return this._uiNeedRefresh && this.enabled && this._refreshUiConfig(),
        this._uiNeedRefresh = !1,
        !1
    }
}

export default MaterialLibraryBasePlugin;
