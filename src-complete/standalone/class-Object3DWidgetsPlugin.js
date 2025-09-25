/* Standalone Class: Object3DWidgetsPlugin */

class Object3DWidgetsPlugin extends AViewerPlugin {
    setDirty() {
        var o, c;
        (o = this.widgets) === null || o === void 0 || o.forEach(h => h.visible = this.enabled),
        (c = this._viewer) === null || c === void 0 || c.setDirty()
    }
    constructor(o=!0) {
        super(),
        this.enabled = !0,
        this.helpers = [DirectionalLightHelper2, SpotLightHelper2, PointLightHelper2, CameraHelper2],
        this.toJSON = null,
        this._addSceneObject = c => {
            const h = c.object;
            this._createWidgets(h == null ? void 0 : h.modelObject)
        }
        ,
        this.widgets = [],
        this.uiConfig = {
            type: "folder",
            label: "Widgets",
            children: [{
                type: "checkbox",
                label: "Visible",
                property: [this, "enabled"]
            }, {
                type: "button",
                label: "Refresh",
                value: () => this.refresh()
            }]
        },
        this.enabled = o
    }
    async onAdded(o) {
        await super.onAdded(o),
        o.scene.addEventListener("addSceneObject", this._addSceneObject)
    }
    async onRemove(o) {
        return o.scene.removeEventListener("addSceneObject", this._addSceneObject),
        this.widgets.forEach(c => c.dispose && c.dispose()),
        this.widgets = [],
        super.onRemove(o)
    }
    refresh() {
        var o;
        this._createWidgets((o = this._viewer) === null || o === void 0 ? void 0 : o.scene.modelRoot)
    }
    _createWidgets(o) {
        o == null || o.traverse(c => {
            const h = this.widgets.find(b => b.object === c);
            if (h)
                return void (h.update && h.update());
            this.helpers.filter(b => b.Check(c)).forEach(b => {
                var _e;
                const nt = b.Create(c);
                nt.visible = this.enabled,
                this.widgets.push(nt),
                (_e = this._viewer) === null || _e === void 0 || _e.scene.addWidget(nt)
            }
            )
        }
        )
    }
}

export default Object3DWidgetsPlugin;
