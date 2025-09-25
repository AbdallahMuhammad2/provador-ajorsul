/* Standalone Class: SwitchNodePlugin */

class SwitchNodePlugin extends SwitchNodeBasePlugin {
    _refreshUi() {
        var o;
        if (!super._refreshUi())
            return !1;
        CustomContextGrid.RemoveAll(SwitchNodePlugin.PluginType);
        for (const c of this.variations) {
            const h = this._viewer.scene.getObjectByName(c.name);
            h ? (h.children.length < 1 && console.warn("SwitchNode does not have enough children", c),
            CustomContextGrid.Create(SwitchNodePlugin.PluginType, c.title, Math.min(5, h.children.length), 20, 0, h.children.map(_ => {
                const b = c.camView
                  , _e = new three_module.Pq0((b.includes("right") ? 1 : 0) - (b.includes("left") ? 1 : 0),(b.includes("top") ? 1 : 0) - (b.includes("bottom") ? 1 : 0),(b.includes("front") ? 1 : 0) - (b.includes("back") ? 1 : 0));
                c.camDistance || (c.camDistance = 1);
                const nt = snapObject(this._viewer, _, void 0, 7, _e.multiplyScalar(.5 * c.camDistance));
                return {
                    id: _.uuid,
                    image: nt,
                    onClick: () => {
                        var it;
                        c.selected = _.name || _.uuid,
                        (it = this._viewer) === null || it === void 0 || it.scene.setDirty({
                            sceneUpdate: !0,
                            frameFade: !0
                        })
                    }
                    ,
                    tooltip: _.name || _.uuid
                }
            }
            ), (_, b) => tippy_esm(_, {
                placement: "bottom",
                content: b.tooltip
            }))) : console.warn("no object found for variation, skipping", c)
        }
        return CustomContextGrid.RebuildUi((o = this._viewer) === null || o === void 0 ? void 0 : o.container),
        !0
    }
}

export default SwitchNodePlugin;
