/* Standalone Class: RandomizedDirectionalLightPlugin */

class RandomizedDirectionalLightPlugin extends AViewerPlugin {
    get cameraHelper() {
        return this._cameraHelper
    }
    constructor(o=!0) {
        super(),
        this.enabled = !0,
        this.light = new RandomizedDirectionalLight("#cceeff",1),
        this.lightLayers = 1,
        this._preRender = () => {
            var c, h, _;
            if (!this.enabled)
                return void (this.light.layers.mask = 0);
            const b = (h = (c = this._viewer) === null || c === void 0 ? void 0 : c.renderer.frameCount) !== null && h !== void 0 ? h : 0;
            this.light.randomizePosition(b < 5 ? 0 : b),
            this.light.layers.mask = this.lightLayers,
            this.light.updateShadowParams(),
            (_ = this._cameraHelper) === null || _ === void 0 || _.update()
        }
        ,
        this._setDirty = this._setDirty.bind(this),
        this.enabled = o
    }
    async onAdded(o) {
        await super.onAdded(o),
        this._cameraHelper = new three_module.WTh(this.light.shadow.camera),
        this._cameraHelper.visible = !1,
        this._cameraHelper.userData.bboxVisible = !1,
        o.scene.add(this._cameraHelper),
        o.scene.addLight(this.light, {
            addToRoot: !0
        }),
        o.addEventListener("preRender", this._preRender)
    }
    async onRemove(o) {
        return o.removeEventListener("preRender", this._preRender),
        this.light.removeFromParent(),
        super.onRemove(o)
    }
    _setDirty(o=!1) {
        var c, h;
        o ? (c = this._viewer) === null || c === void 0 || c.scene.setDirty() : (h = this._viewer) === null || h === void 0 || h.setDirty()
    }
    get uiConfig() {
        return this._uiConfig ? this._uiConfig : this._uiConfig = {
            type: "folder",
            label: "Progressive Shadow",
            children: [{
                type: "checkbox",
                label: "Enabled",
                property: [this, "enabled"],
                onChange: this._setDirty
            }, {
                type: "folder",
                label: "Directional Light",
                children: [{
                    type: "checkbox",
                    label: "Visible",
                    property: [this.light, "visible"],
                    onChange: this._setDirty
                }, {
                    type: "slider",
                    label: "Intensity",
                    bounds: [0, 50],
                    property: [this.light, "intensity"],
                    onChange: this._setDirty
                }, {
                    type: "color",
                    label: "Color",
                    property: [this.light, "color"],
                    onChange: this._setDirty
                }, {
                    type: "checkbox",
                    label: "Shadow Enabled",
                    property: [this.light.shadowParams, "enabled"],
                    onChange: [this.light.updateShadowParams, this._setDirty]
                }, {
                    type: "slider",
                    bounds: [0, 1],
                    property: [this.light.randomParams, "focus"],
                    onChange: this._setDirty
                }, {
                    type: "slider",
                    bounds: [0, 1],
                    property: [this.light.randomParams, "spread"],
                    onChange: this._setDirty
                }, {
                    type: "slider",
                    bounds: [.01, 60],
                    property: [this.light.randomParams, "distanceScale"],
                    onChange: this._setDirty
                }, {
                    type: "vec3",
                    bounds: [-5, 5],
                    property: [this.light.randomParams, "direction"],
                    onChange: this._setDirty
                }, {
                    type: "slider",
                    bounds: [.01, 10],
                    property: [this.light.shadowParams, "radius"],
                    onChange: [this.light.updateShadowParams, this._setDirty]
                }, {
                    type: "slider",
                    bounds: [.01, 30],
                    property: [this.light.shadowParams, "frustumSize"],
                    onChange: [this.light.updateShadowParams, this._setDirty]
                }, {
                    type: "slider",
                    bounds: [-.01, .01],
                    property: [this.light.shadowParams, "bias"],
                    onChange: [this.light.updateShadowParams, this._setDirty]
                }, {
                    type: "slider",
                    bounds: [-.05, .05],
                    property: [this.light.shadowParams, "normalBias"],
                    onChange: [this.light.updateShadowParams, this._setDirty]
                }]
            }]
        }
    }
}

export default RandomizedDirectionalLightPlugin;
