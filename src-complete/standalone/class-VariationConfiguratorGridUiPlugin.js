/* Standalone Class: VariationConfiguratorGridUiPlugin */

class VariationConfiguratorGridUiPlugin extends VariationConfiguratorPlugin {
    constructor() {
        super(),
        this._uiNeedRefresh = !1,
        this._refreshUi = this._refreshUi.bind(this)
    }
    async onAdded(o) {
        await super.onAdded(o),
        o.addEventListener("preFrame", this._refreshUi)
    }
    async onRemove(o) {
        return o.removeEventListener("preFrame", this._refreshUi),
        super.onRemove(o)
    }
    refreshUi() {
        this.enabled && (this._uiNeedRefresh = !0)
    }
    async _refreshUi() {
        if (!this.enabled || !this._viewer || !this._uiNeedRefresh)
            return !1;
        this._uiNeedRefresh = !1,
        CustomContextGrid.RemoveAll(VariationConfiguratorGridUiPlugin.PluginType);
        for (const o of ["objects", "materials"])
            for (const c of this.variations[o])
                CustomContextGrid.Create(VariationConfiguratorGridUiPlugin.PluginType, this.utils.getTitle(c), 5, 20, 0, c.items.map( (h, _) => ({
                    id: h,
                    image: this.utils.getItemIcon(c, _, o),
                    onClick: async b => this.applyVariation(c, b, o, !1),
                    tooltip: this.utils.getItemTitle(c, _)
                })), (h, _) => tippy_esm(h, {
                    placement: "bottom",
                    content: _.tooltip
                }));
        return CustomContextGrid.RebuildUi(this._viewer.container),
        !0
    }
}

export default VariationConfiguratorGridUiPlugin;
