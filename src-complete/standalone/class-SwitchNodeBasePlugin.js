/* Standalone Class: SwitchNodeBasePlugin */

class SwitchNodeBasePlugin extends AViewerPlugin {
    constructor() {
        super(),
        this.enabled = !0,
        this._uiNeedRefresh = !1,
        this._isVisibleChanged = !1,
        this._postFrame = () => {
            this._uiNeedRefresh && this._refreshUi()
        }
        ,
        this._preRender = () => {
            if (this._viewer && this.enabled) {
                for (const o of this.variations) {
                    if (!o.name)
                        continue;
                    const c = this._viewer.scene.getObjectByName(o.name);
                    if (!c || c.children.length < 1)
                        return;
                    o.selected || (o.selected = c.children[0].name || c.children[0].uuid);
                    for (const h of c.children)
                        h.userData.__oldVisible = h.visible,
                        h.visible = (h.name || h.uuid) === o.selected
                }
                this._isVisibleChanged = !0
            }
        }
        ,
        this._postRender = () => {
            if (this._viewer && this._isVisibleChanged) {
                for (const o of this.variations) {
                    if (!o.name)
                        continue;
                    const c = this._viewer.scene.getObjectByName(o.name);
                    if (!c || c.children.length < 1)
                        return;
                    for (const h of c.children) {
                        if (h.userData.__oldVisible === void 0)
                            return;
                        h.visible = h.userData.__oldVisible,
                        delete h.userData.__oldVisible
                    }
                }
                this._isVisibleChanged = !1
            }
        }
        ,
        this.autoSnapIcons = !1,
        this.dependencies = [AssetManagerPlugin],
        this.variations = [],
        this._selectedSwitchNode = () => {
            var o;
            const c = (o = this._picking) === null || o === void 0 ? void 0 : o.getSelectedObject();
            if (!c)
                return;
            const h = this.variations.map(b => b.name);
            let _;
            return c.traverseAncestors(b => {
                _ || b.name && h.includes(b.name) && (_ = b)
            }
            ),
            _
        }
        ,
        this.uiConfig = {
            label: "Switch Node",
            type: "folder",
            children: [{
                type: "checkbox",
                label: "Enabled",
                property: [this, "enabled"]
            }, () => [{
                type: "folder",
                label: "All nodes",
                expanded: !0,
                children: [this.variations.map(o => ({
                    type: "input",
                    label: o.title,
                    property: [o, "name"],
                    onChange: () => this.refreshUi()
                }))]
            }, {
                type: "button",
                label: "Add Node",
                value: () => {
                    this.variations.push({
                        name: "switch_node",
                        selected: "",
                        title: "Switch Node",
                        camView: "front",
                        camDistance: 1
                    }),
                    this.refreshUi()
                }
            }, {
                type: "button",
                label: "Refresh UI",
                value: () => this.refreshUi()
            }, {
                type: "input",
                label: "Selected node title",
                hidden: () => !this._selectedSwitchNode(),
                property: () => {
                    const o = this._selectedSwitchNode();
                    return o ? [this.variations.find(c => c.name === o.name), "title"] : []
                }
                ,
                onChange: () => this.refreshUi()
            }, {
                type: "slider",
                bounds: [.01, 2],
                stepSize: .01,
                label: "Cam Distance",
                hidden: () => !this._selectedSwitchNode(),
                property: () => {
                    const o = this._selectedSwitchNode();
                    return o ? [this.variations.find(c => c.name === o.name), "camDistance"] : []
                }
            }, {
                type: "dropdown",
                label: "Cam View",
                hidden: () => !this._selectedSwitchNode(),
                property: () => {
                    const o = this._selectedSwitchNode();
                    return o ? [this.variations.find(c => c.name === o.name), "camView"] : []
                }
                ,
                onChange: () => this.refreshUi(),
                children: ["top", "bottom", "front", "back", "left", "right"].map(o => ({
                    label: o,
                    value: o
                }))
            }]]
        },
        this.refreshUi = this.refreshUi.bind(this),
        this._refreshUi = this._refreshUi.bind(this)
    }
    async onAdded(o) {
        var c, h;
        await super.onAdded(o),
        this._picking = (c = this._viewer) === null || c === void 0 ? void 0 : c.getPluginByType("Picking"),
        (h = this._picking) === null || h === void 0 || h.addEventListener("selectedObjectChanged", this._refreshUi),
        o.addEventListener("postFrame", this._postFrame),
        o.addEventListener("preRender", this._preRender),
        o.addEventListener("postRender", this._postRender),
        this.addEventListener("deserialize", this.refreshUi)
    }
    async onRemove(o) {
        var c;
        return (c = this._picking) === null || c === void 0 || c.removeEventListener("selectedObjectChanged", this._refreshUi),
        o.removeEventListener("postFrame", this._postFrame),
        o.removeEventListener("preRender", this._preRender),
        o.removeEventListener("postRender", this._postRender),
        this._picking = void 0,
        super.onRemove(o)
    }
    refreshUi() {
        this.enabled && (this._uiNeedRefresh = !0)
    }
    _refreshUi() {
        var o, c;
        return !!this.enabled && !!this._viewer && (this._uiNeedRefresh = !1,
        (c = (o = this.uiConfig).uiRefresh) === null || c === void 0 || c.call(o),
        this.autoSnapIcons && this.snapIcons(),
        !0)
    }
    snapIcons() {
        for (const o of this.variations) {
            const c = this._viewer.scene.getObjectByName(o.name);
            if (c) {
                c.children.length < 1 && console.warn("SwitchNode does not have enough children", o);
                for (const h of c.children) {
                    if (h.userData.__icon)
                        return;
                    const _ = o.camView
                      , b = new three_module.Pq0((_.includes("right") ? 1 : 0) - (_.includes("left") ? 1 : 0),(_.includes("top") ? 1 : 0) - (_.includes("bottom") ? 1 : 0),(_.includes("front") ? 1 : 0) - (_.includes("back") ? 1 : 0));
                    o.camDistance || (o.camDistance = 1);
                    const _e = snapObject(this._viewer, h, void 0, 7, b.multiplyScalar(.5 * o.camDistance));
                    h.userData.__icon = _e
                }
            } else
                console.warn("no object found for variation, skipping", o)
        }
    }
}

export default SwitchNodeBasePlugin;
