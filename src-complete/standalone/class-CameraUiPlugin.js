/* Standalone Class: CameraUiPlugin */

class CameraUiPlugin extends AViewerPlugin {
    async onAdded(o) {
        await super.onAdded(o),
        o.scene.addEventListener("activeCameraChange", this._refresh),
        o.scene.addEventListener("sceneUpdate", this._refresh)
    }
    async onRemove(o) {
        return o.scene.removeEventListener("activeCameraChange", this._refresh),
        o.scene.removeEventListener("sceneUpdate", this._refresh),
        super.onRemove(o)
    }
    constructor() {
        super(),
        this.enabled = !0,
        this.serializeWithViewer = !1,
        this._refresh = this._refresh.bind(this)
    }
    toJSON(o) {
        var c;
        const h = super.toJSON(o);
        return h.activeCamera = (c = this._viewer) === null || c === void 0 ? void 0 : c.scene.activeCamera.toJSON(),
        h
    }
    fromJSON(o, c) {
        var h;
        return o.activeCamera && ((h = this._viewer) === null || h === void 0 || h.scene.activeCamera.fromJSON(o.activeCamera),
        delete (o = {
            ...o
        }).activeCamera),
        super.fromJSON(o, c)
    }
    _refresh() {
        var o, c;
        this._viewer && ((c = (o = this.uiConfig).uiRefresh) === null || c === void 0 || c.call(o, "postFrame", !0))
    }
    get uiConfig() {
        var o;
        return ((o = this._viewer) === null || o === void 0 ? void 0 : o.scene.activeCamera.uiConfig) || {}
    }
}

export default CameraUiPlugin;
