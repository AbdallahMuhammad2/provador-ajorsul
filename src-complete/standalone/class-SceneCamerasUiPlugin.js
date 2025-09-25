/* Standalone Class: SceneCamerasUiPlugin */

class SceneCamerasUiPlugin extends AViewerPlugin {
    constructor() {
        super(),
        this.toJSON = void 0,
        this.enabled = !0,
        this.uiConfig = {
            type: "folder",
            label: "Cameras (Loaded)",
            children: [{
                type: "button",
                label: "Add Camera",
                value: () => {
                    var o;
                    if (!this._viewer)
                        return;
                    const c = this._viewer.createCamera(new three_module.ubm(45,1,.5,20));
                    this._viewer.scene.modelRoot.add(c.cameraObject),
                    c.setCameraOptions({
                        controlsMode: "orbit"
                    }),
                    c.position.set(2, 2, 2),
                    c.target.set(0, 0, 0),
                    c.positionUpdated(!0),
                    c.cameraObject.lookAt(0, 0, 0),
                    c.setDirty();
                    const h = this._viewer.getPluginByType("VirtualCamerasPlugin");
                    if (h) {
                        const _ = h.addCamera(c)
                          , b = (o = this._viewer) === null || o === void 0 ? void 0 : o.getPluginByType("debug");
                        b && b.addTexture("camera frame", () => _.target.texture, [40, 310, 300, 200])
                    }
                }
            }],
            limitedUi: !0
        },
        this.dependencies = [AssetManagerPlugin],
        this._sceneUpdate = o => {
            var c, h, _;
            if (!o.hierarchyChanged)
                return;
            const b = [];
            (c = this._viewer) === null || c === void 0 || c.traverseSceneObjects(_e => {
                if (!_e.cameraObject)
                    return;
                const nt = _e.uiConfig;
                nt && !b.includes(nt) && b.push(nt)
            }
            ),
            [...this.uiConfig.children].forEach(_e => {
                (_e == null ? void 0 : _e.type) === "button" || b.includes(_e) || this.uiConfig.children.splice(this.uiConfig.children.indexOf(_e), 1)
            }
            ),
            b.forEach(_e => {
                this.uiConfig.children.includes(_e) || this.uiConfig.children.push(_e)
            }
            ),
            (_ = (h = this.uiConfig).uiRefresh) === null || _ === void 0 || _.call(h, "postFrame", !0)
        }
    }
    async onAdded(o) {
        await super.onAdded(o),
        o.scene.addEventListener("sceneUpdate", this._sceneUpdate)
    }
    async onRemove(o) {
        return o.scene.removeEventListener("sceneUpdate", this._sceneUpdate),
        super.onRemove(o)
    }
}

export default SceneCamerasUiPlugin;
