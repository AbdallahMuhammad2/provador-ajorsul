/* Standalone Class: MaterialConfiguratorPlugin */

class MaterialConfiguratorPlugin extends MaterialConfiguratorBasePlugin {
    constructor() {
        super(...arguments),
        this.enableEditContextMenus = !1
    }
    async _refreshUi() {
        var o;
        if (!await super._refreshUi())
            return !1;
        CustomContextGrid.RemoveAll(MaterialConfiguratorPlugin.PluginType);
        for (const c of this.variations)
            CustomContextGrid.Create(MaterialConfiguratorPlugin.PluginType, c.title + (this.enableEditContextMenus ? " (" + c.uuid + ")" : ""), 5, 20, 0, c.materials.map(h => {
                let _;
                if (c.preview.startsWith("generate:"))
                    _ = this._previewGenerator.generate(h, c.preview.split(":")[1]);
                else {
                    const b = h[c.preview] || "#ff00ff";
                    _ = b.image ? Ne$1(b.image, 100) : void 0,
                    _ || (_ = Ge$1(b != null && b.isColor ? b.getHexString() : b))
                }
                return {
                    id: h.uuid,
                    image: _,
                    onClick: b => this.applyVariation(c, b),
                    tooltip: h.name || h.uuid
                }
            }
            ), (h, _, b) => {
                tippy_esm(h, {
                    placement: "bottom",
                    content: _.tooltip
                }),
                h.oncontextmenu = _e => {
                    if (!this.enableEditContextMenus)
                        return;
                    _e.preventDefault(),
                    _e.stopPropagation();
                    const nt = CustomContextMenu.Create({
                        Remove: async () => {
                            var it;
                            await ((it = this._viewer) === null || it === void 0 ? void 0 : it.confirm("Remove material: Remove material from this variation list?")) && (c.materials = c.materials.filter(at => at.uuid !== _.id),
                            this.refreshUi(),
                            CustomContextMenu.Remove())
                        }
                        ,
                        "Remove All": async () => {
                            var it;
                            await ((it = this._viewer) === null || it === void 0 ? void 0 : it.confirm("Remove all: Remove all materials from this variation list?")) && (c.materials = [],
                            this.refreshUi(),
                            CustomContextMenu.Remove())
                        }
                    }, _e.clientX, _e.clientY);
                    document.body.appendChild(nt)
                }
                ,
                b.oncontextmenu = _e => {
                    if (!this.enableEditContextMenus)
                        return;
                    _e.preventDefault(),
                    _e.stopPropagation();
                    const nt = CustomContextMenu.Create({
                        "Rename mapping": async () => {
                            var it;
                            const at = await ((it = this._viewer) === null || it === void 0 ? void 0 : it.prompt("Change name: New material name to map to", c.uuid, !0));
                            at && (c.uuid = at,
                            this.refreshUi())
                        }
                        ,
                        "Rename title": async () => {
                            var it;
                            const at = await ((it = this._viewer) === null || it === void 0 ? void 0 : it.prompt("Change name: New material name to map to", c.title, !0));
                            at && (c.title = at,
                            this.refreshUi())
                        }
                        ,
                        "Remove Section": async () => {
                            var it;
                            await ((it = this._viewer) === null || it === void 0 ? void 0 : it.confirm("Remove variations: Remove this category of variations?")) && (this.removeVariation(c),
                            CustomContextMenu.Remove())
                        }
                    }, _e.clientX, _e.clientY);
                    document.body.appendChild(nt)
                }
            }
            );
        return CustomContextGrid.RebuildUi((o = this._viewer) === null || o === void 0 ? void 0 : o.container),
        !0
    }
}

export default MaterialConfiguratorPlugin;
