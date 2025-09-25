/* Standalone Class: SimpleViewerUi */

class SimpleViewerUi extends AViewerPlugin {
    constructor() {
        super(),
        this.enabled = !0,
        this.toJSON = void 0,
        this._uiConfig = {
            type: "folder",
            label: "Scene",
            children: [],
            onExpand: () => {
                var o, c;
                (c = (o = this._uiConfig).uiRefresh) === null || c === void 0 || c.call(o, "postFrame", !0)
            }
        },
        this._clearSceneButton = {
            type: "button",
            label: "Clear Scene",
            value: () => {
                var o;
                (o = this._viewer) === null || o === void 0 || o.scene.disposeSceneModels()
            }
        },
        this._sceneUpdate = this._sceneUpdate.bind(this)
    }
    async onAdded(o) {
        await super.onAdded(o),
        o.scene.addEventListener("sceneUpdate", this._sceneUpdate)
    }
    async onRemove(o) {
        return o.scene.removeEventListener("sceneUpdate", this._sceneUpdate),
        super.onRemove(o)
    }
    setDirty() {
        var o;
        (o = this._viewer) === null || o === void 0 || o.setDirty()
    }
    get uiConfig() {
        return this._viewer ? (this._uiConfig.children = [this._clearSceneButton],
        this._uiConfig) : this._uiConfig
    }
    _sceneUpdate() {}
}

export default SimpleViewerUi;
