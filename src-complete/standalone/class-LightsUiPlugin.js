/* Standalone Class: LightsUiPlugin */

class LightsUiPlugin extends AViewerPlugin {
    constructor() {
        super(),
        this.toJSON = void 0,
        this.enabled = !0,
        this.uiConfig = {
            type: "folder",
            label: "Lights",
            children: [{
                type: "button",
                label: "Add Directional Light",
                value: () => {
                    if (!this._viewer)
                        return;
                    const o = new DirectionalLight2;
                    o.position.set(0, 0, 0),
                    o.target.position.set(0, 0, -1).normalize(),
                    o.intensity = 2,
                    o.shadow.mapSize.set(1024, 1024),
                    this._viewer.scene.addLight(o)
                }
            }, {
                type: "button",
                label: "Add Ambient Light",
                value: () => {
                    if (!this._viewer)
                        return;
                    const o = new AmbientLight2;
                    o.intensity = 2,
                    this._viewer.scene.addLight(o)
                }
            }, {
                type: "button",
                label: "Add Point Light",
                value: () => {
                    if (!this._viewer)
                        return;
                    const o = new PointLight2;
                    o.position.set(3, 3, 3),
                    o.shadow.mapSize.set(1024, 1024),
                    o.intensity = 2,
                    this._viewer.scene.addLight(o)
                }
            }, {
                type: "button",
                label: "Add Spot Light",
                value: () => {
                    if (!this._viewer)
                        return;
                    const o = new SpotLight2;
                    o.position.set(3, 3, 3),
                    o.shadow.mapSize.set(1024, 1024),
                    o.intensity = 2,
                    o.lookAt(0, 0, 0),
                    this._viewer.scene.addLight(o)
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
                if (!_e.lightObject)
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

export default LightsUiPlugin;
