/* Standalone Class: PickingPlugin */

class PickingPlugin extends AViewerPlugin {
    get widgetEnabled() {
        return this._enableWidget
    }
    get picker() {
        return this._picker
    }
    setDirty() {
        var o;
        (o = this._viewer) === null || o === void 0 || o.setDirty()
    }
    constructor(o=BoxSelectionWidget, c=!1, h=!0, _=!1) {
        super(),
        this.enabled = !0,
        this._enableWidget = !0,
        this.autoFocus = !1,
        this._onObjectHit = b => {
            this._viewer && (this.enabled ? this.dispatchEvent(b) : b.intersects.selectedObject = null)
        }
        ,
        this._uiConfigChildren = [{
            label: "Enabled",
            type: "checkbox",
            property: [this, "enabled"]
        }, {
            label: "AutoFocus",
            type: "checkbox",
            property: [this, "autoFocus"],
            onChange: () => {
                const b = this.getSelectedObject();
                this.autoFocus && b && this.setSelectedObject(b, !0)
            }
        }],
        o && (this._widget = new o),
        c && console.error("PickingPlugin - controls removed. Use the new TransformControlsPlugin"),
        this._pickUi = h,
        this.autoFocus = _
    }
    getSelectedObject() {
        var o;
        if (this.enabled)
            return ((o = this._picker) === null || o === void 0 ? void 0 : o.selectedObject) || void 0
    }
    setSelectedObject(o, c=!1) {
        if (!this.enabled || !this._picker)
            return;
        const h = this.autoFocus;
        this.autoFocus = !1,
        this._picker.selectedObject = o || null,
        this.autoFocus = h,
        (h || c) && this.focusObject(o)
    }
    async onAdded(o) {
        await super.onAdded(o),
        this._picker = new ObjectPicker(o.scene,o.canvas,void 0,c => {
            var h, _;
            if (!c.material)
                return !1;
            let b = c
              , _e = !1;
            for (; b; ) {
                if (!b.visible || (((h = b.userData.iModel) !== null && h !== void 0 ? h : b).assetType === "model" && (_e = !0),
                ((_ = b.userData.iModel) !== null && _ !== void 0 ? _ : b).assetType === "widget") || b.userData.userSelectable === !1 || b.userData.bboxVisible === !1)
                    return !1;
                b = b.parent
            }
            return _e
        }
        ),
        this._widget && o.scene.addWidget(this._widget),
        this._picker.addEventListener("selectedObjectChanged", c => {
            var h, _;
            this.dispatchEvent(c);
            const b = ((h = this._picker) === null || h === void 0 ? void 0 : h.selectedObject) || void 0;
            if (this._pickUi) {
                const nt = b == null ? void 0 : b.uiConfig
                  , it = this.uiConfig;
                it.children = [...this._uiConfigChildren],
                nt && it.children.push(nt),
                (_ = it.uiRefresh) === null || _ === void 0 || _.call(it)
            }
            const _e = this._widget;
            _e && this._enableWidget && (b ? _e.attach(b) : _e.detach()),
            o.setDirty(),
            this.autoFocus && this.focusObject(b)
        }
        ),
        this._picker.addEventListener("hoverObjectChanged", this.dispatchEvent),
        this._picker.addEventListener("hitObject", this._onObjectHit),
        o.scene.addEventListener("select", c => {
            c.value === void 0 ? console.warn("WebGi: e.value must be set for picking, can be null to unselect") : c.value.isObject3D && this.setSelectedObject(c.value, this.autoFocus || c.focusCamera)
        }
        ),
        o.scene.addEventListener("addSceneObject", async c => {
            var h, _, b;
            const _e = c.object
              , nt = this.getSelectedObject();
            if (nt && (_e == null ? void 0 : _e.assetType) === "material" && typeof (nt == null ? void 0 : nt.setMaterial) == "function" && (!((h = nt == null ? void 0 : nt.modelObject) === null || h === void 0) && h.isMesh) && await o.confirm("Applying material: Apply material to the selected object?")) {
                const it = nt.material;
                if (Array.isArray(it))
                    console.warn("WebGi: Dropping on material array not yet fully supported."),
                    nt.setMaterial(_e);
                else {
                    let at = Array.from((_ = it == null ? void 0 : it.userData.__appliedMeshes) !== null && _ !== void 0 ? _ : []);
                    (at.length > 1 ? !await o.confirm("Applying material: Apply to all objects using this material?") : at.length < 1) && (at = [nt]);
                    for (const ut of at)
                        ut && ((b = ut.setMaterial) === null || b === void 0 || b.call(ut, _e))
                }
            }
        }
        ),
        o.scene.addEventListener("sceneUpdate", c => {
            if (!c.hierarchyChanged)
                return;
            const h = this.getSelectedObject();
            let _ = !1;
            h == null || h.traverseAncestors(b => {
                b === o.scene.modelObject && (_ = !0)
            }
            ),
            _ || this.setSelectedObject(void 0)
        }
        )
    }
    async focusObject(o) {
        var c, h, _, b;
        const _e = (c = this._viewer) === null || c === void 0 ? void 0 : c.getPluginByType("CameraViews");
        await (_e == null ? void 0 : _e.animateToFitObject(o, 1.25, 1e3, "easeOut", {
            min: ((b = (_ = (h = this._viewer) === null || h === void 0 ? void 0 : h.scene.activeCamera.getControls()) === null || _ === void 0 ? void 0 : _.minDistance) !== null && b !== void 0 ? b : .5) + .5,
            max: 50
        }))
    }
    enableWidget(o) {
        var c, h, _;
        if (this._enableWidget = o,
        o) {
            const b = ((c = this._picker) === null || c === void 0 ? void 0 : c.selectedObject) || void 0;
            b && ((h = this._widget) === null || h === void 0 || h.attach(b))
        } else
            (_ = this._widget) === null || _ === void 0 || _.detach()
    }
    get uiConfig() {
        return this._pickUi ? this._uiConfig ? this._uiConfig : this._uiConfig = {
            type: "panel",
            label: "Picker",
            expanded: !0,
            children: [...this._uiConfigChildren]
        } : {}
    }
    get widget() {
        return this._widget
    }
}

export default PickingPlugin;
