/* Standalone Class: BaseGroundPlugin */

class BaseGroundPlugin extends AViewerPlugin {
    get enabled() {
        return this.visible
    }
    set enabled(o) {
        this.visible = o
    }
    get material() {
        return this._material
    }
    get mesh() {
        return this._iMesh
    }
    constructor(o={}) {
        super(),
        this._transformNeedRefresh = !0,
        this.dependencies = [AssetManagerPlugin],
        this.visible = !0,
        this.size = 8,
        this.yOffset = 0,
        this.renderToDepth = !0,
        this.tonemapGround = !0,
        this.limitCameraAboveGround = !1,
        this.enableRefreshTransform = !0,
        this._cameraLimitsSet = !1,
        this._cameraLastMaxPolarAngle = Math.PI,
        this.useModelBounds = !1,
        this._refreshMaterial = this._refreshMaterial.bind(this),
        this._refreshTransform = this._refreshTransform.bind(this),
        this._refreshCameraLimits = this._refreshCameraLimits.bind(this),
        this.refreshOptions = this.refreshOptions.bind(this),
        this._refreshOptions2 = this._refreshOptions2.bind(this),
        this._onSceneUpdate = this._onSceneUpdate.bind(this),
        this._preRender = this._preRender.bind(this),
        this._postFrame = this._postFrame.bind(this),
        this._geometry = new three_module.bdM(1,1,1,1),
        this._geometry.attributes.uv2 = this._geometry.attributes.uv.clone(),
        this._geometry.attributes.uv2.needsUpdate = !0,
        this._options = {
            shape: "",
            up: [0, 100, 0],
            autoAdjustTransform: !0
        },
        this.setOptions(o)
    }
    get autoAdjustTransform() {
        return this._options.autoAdjustTransform
    }
    set autoAdjustTransform(o) {
        this._options.autoAdjustTransform = o,
        this.refreshTransform()
    }
    _createMesh() {
        return new three_module.eaF(this._geometry)
    }
    setGeometry(o) {
        o ? this._geometry && this._geometry.dispose() : o = this._geometry,
        o && (o.attributes.uv2 || (o.attributes.uv2 = o.attributes.uv.clone(),
        o.attributes.uv2.needsUpdate = !0),
        this._mesh && (this._mesh.geometry = o))
    }
    async onAdded(o) {
        var c, h;
        await super.onAdded(o),
        o.getPluginByType("TweakpaneUi") && console.error("TweakpaneUiPlugin must be added after Ground Plugin"),
        this._manager = o.getPlugin(AssetManagerPlugin);
        const _ = this._createMesh();
        _.userData.physicsMass = 0,
        _.userData.isGroundMesh = !0,
        this._iMesh = await ((c = this._manager) === null || c === void 0 ? void 0 : c.addImportedSingle(_, {
            pseudoCenter: !1,
            autoScale: !1,
            addToRoot: !0
        })),
        this._mesh = (h = this._iMesh) === null || h === void 0 ? void 0 : h.modelObject,
        this._mesh && (this._mesh.userData.userSelectable = !1,
        this._mesh.castShadow = !0,
        this._mesh.receiveShadow = !0,
        this._mesh.name = "Ground Plane"),
        o.scene.addEventListener("sceneUpdate", this._onSceneUpdate),
        o.scene.addEventListener("addSceneObject", this._onSceneUpdate),
        o.addEventListener("preRender", this._preRender),
        o.addEventListener("postFrame", this._postFrame),
        this.refreshOptions()
    }
    _postFrame() {
        this._transformNeedRefresh && this._refreshTransform(),
        this._viewer
    }
    _preRender() {
        this._viewer
    }
    async onDispose(o) {
        var c, h, _;
        return this._removeMaterial(),
        this._geometry.dispose(),
        (c = this._material) === null || c === void 0 || c.dispose(),
        (_ = (h = this._iMesh) === null || h === void 0 ? void 0 : h.dispose) === null || _ === void 0 || _.call(h),
        super.onDispose(o)
    }
    async onRemove(o) {
        return this._removeMaterial(),
        o.scene.removeEventListener("sceneUpdate", this._onSceneUpdate),
        o.scene.removeEventListener("addSceneObject", this._onSceneUpdate),
        o.removeEventListener("postFrame", this._postFrame),
        o.removeEventListener("preRender", this._preRender),
        this._manager = void 0,
        super.onRemove(o)
    }
    _removeMaterial() {
        this._material && (this._material.userData.renderToDepth = this._material.userData.__renderToDepth,
        this._material.userData.__renderToDepth = void 0,
        this._material = void 0)
    }
    _onSceneUpdate(o) {
        (o == null ? void 0 : o.geometryChanged) !== !1 && (o == null ? void 0 : o.updateGround) !== !1 && this.refreshTransform()
    }
    refreshTransform() {
        this.enableRefreshTransform && (this._transformNeedRefresh = !0)
    }
    _refreshOptions2() {
        this.refreshOptions()
    }
    refreshOptions() {
        this._viewer && (this._refreshMaterial(),
        this.refreshTransform(),
        this._refreshCameraLimits())
    }
    _refreshCameraLimits() {
        var o;
        const c = (o = this._viewer) === null || o === void 0 ? void 0 : o.scene.activeCamera.controls;
        c && (c.maxPolarAngle !== void 0 ? this.limitCameraAboveGround ? (this._cameraLimitsSet || (this._cameraLastMaxPolarAngle = c.maxPolarAngle),
        c.maxPolarAngle = Math.PI / 2,
        this._cameraLimitsSet = !0) : this._cameraLimitsSet && (c.maxPolarAngle = this._cameraLastMaxPolarAngle,
        this._cameraLimitsSet = !1) : console.warn("refreshCameraLimits only available with orbit controls."))
    }
    _refreshTransform() {
        var o, c, h;
        if (!this._mesh || !this._viewer)
            return;
        let _ = !1;
        if (this.visible !== this._mesh.visible && (this._mesh.visible = this.visible,
        _ = !0),
        this.enabled) {
            if (this._options.autoAdjustTransform) {
                this._mesh.userData.bboxVisible = !1;
                const b = this.useModelBounds ? this._viewer.scene.getModelBounds(!0, !0, !0) : this._viewer.scene.getBounds(!0, !0, !0);
                this._mesh.userData.bboxVisible = !0;
                const _e = b.getCenter(new three_module.Pq0).sub(new three_module.Pq0(0,b.getSize(new three_module.Pq0).y / 2 + this.yOffset,0));
                _ = _ || _e.clone().sub(this._mesh.position).length() > 1e-4,
                _ && this._mesh.position.copy(_e)
            }
            _ = _ || Math.abs(this._mesh.scale.x - this.size) > 1e-4,
            _ && (this._mesh.scale.setScalar(this.size),
            this._mesh.setRotationFromEuler(new three_module.O9p(-Math.PI / 2,0,this._mesh.rotation.z)),
            this._mesh.matrixWorldNeedsUpdate = !0,
            (h = (c = this._mesh).setDirty) === null || h === void 0 || h.call(c)),
            this._transformNeedRefresh = !1
        } else
            _ && ((o = this._viewer) === null || o === void 0 || o.scene.setDirty())
    }
    _refreshMaterial() {
        var o, c, h, _, b, _e;
        if (!this._viewer || !this.enabled)
            return !1;
        this._manager || console.error("GroundPlugin requires asset manager");
        const nt = (o = this._material) !== null && o !== void 0 ? o : (h = (c = this._manager) === null || c === void 0 ? void 0 : c.materials) === null || h === void 0 ? void 0 : h.findOrCreate("standard", {
            name: "BaseGroundMaterial",
            runtimeMaterial: !0,
            color: 16777215,
            roughness: .75,
            metalness: .5
        });
        nt && nt.userData.runtimeMaterial;
        let it = !1;
        return nt !== this._material && (this._removeMaterial(),
        nt && (this._material = nt),
        !((_ = this._material) === null || _ === void 0) && _.uuid || console.warn("No material found for ground"),
        this._viewer.scene.setDirty(),
        this._mesh && this._material && (this._material.roughness = .75,
        this._material.metalness = .5,
        ((_e = (b = this._mesh) === null || b === void 0 ? void 0 : b.setMaterial) !== null && _e !== void 0 ? _e : ut => {
            this._mesh && (this._mesh.material = ut.materialObject)
        }
        )(this._material)),
        it = !0),
        this._material && (this._material.userData.__renderToDepth === void 0 && (this._material.userData.__renderToDepth = this._material.userData.renderToDepth),
        this._material.userData.renderToDepth !== this.renderToDepth && (this._material.userData.renderToDepth = this.renderToDepth),
        this._material.userData.__postTonemap === void 0 && (this._material.userData.__postTonemap = this._material.userData.postTonemap),
        this._material.userData.postTonemap !== this.tonemapGround && (this._material.userData.postTonemap = this.tonemapGround),
        this._material.materialObject.userData.ssaoDisabled = !0,
        this._material.materialObject.userData.sscsDisabled = !0),
        this._viewer.setDirty(this),
        it
    }
    setOptions(o) {
        Object.assign(this._options, o),
        this.refreshOptions()
    }
    fromJSON(o, c) {
        return super.fromJSON(o, c) ? (this.refreshOptions(),
        this) : null
    }
    _extraUiConfig() {
        return [ () => {
            var o;
            return (o = this._material) === null || o === void 0 ? void 0 : o.uiConfig
        }
        ]
    }
    get uiConfig() {
        return this._uiConfig ? this._uiConfig : this._uiConfig = {
            type: "folder",
            label: "Ground",
            children: [{
                label: "Visible",
                type: "checkbox",
                property: [this, "visible"],
                limitedUi: !0
            }, {
                label: "Size",
                type: "input",
                property: [this, "size"],
                limitedUi: !0
            }, {
                label: "Render to Depth",
                type: "checkbox",
                property: [this, "renderToDepth"]
            }, {
                label: "Limit Camera",
                type: "checkbox",
                property: [this, "limitCameraAboveGround"]
            }, {
                label: "Tonemap",
                type: "checkbox",
                property: [this, "tonemapGround"]
            }, {
                label: "Height",
                type: "slider",
                bounds: [-2, 2],
                property: [this, "yOffset"]
            }, {
                label: "Auto adjust transform",
                type: "checkbox",
                property: [this, "autoAdjustTransform"]
            }, ...this._extraUiConfig()]
        }
    }
}

export default BaseGroundPlugin;
