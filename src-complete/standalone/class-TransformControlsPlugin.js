/* Standalone Class: TransformControlsPlugin */

class TransformControlsPlugin extends AViewerPlugin {
    setDirty() {
        var o, c;
        if (!this._viewer)
            return;
        const h = this._viewer.getPlugin(PickingPlugin)
          , _ = this.enabled;
        _ && h.widgetEnabled ? (h.enableWidget(!1),
        this._pickingWidgetDisabled = !0) : !_ && this._pickingWidgetDisabled && (h.enableWidget(!0),
        this._pickingWidgetDisabled = !1),
        this.transformControls && (_ && h.getSelectedObject() ? this.transformControls.attach(h.getSelectedObject()) : this.transformControls.detach()),
        this._viewer.setDirty(),
        (c = (o = this.uiConfig) === null || o === void 0 ? void 0 : o.uiRefresh) === null || c === void 0 || c.call(o, "postFrame", !0, 1)
    }
    constructor(o=!0) {
        super(),
        this.uiConfig = {
            type: "folder",
            label: "Transform Controls",
            children: [...generateUiConfig(this), () => {
                var c;
                return (c = this.transformControls) === null || c === void 0 ? void 0 : c.uiConfig
            }
            ]
        },
        this.enabled = !0,
        this._pickingWidgetDisabled = !1,
        this.toJSON = void 0,
        this.dependencies = [PickingPlugin],
        this._isInteracting = !1,
        this._transformState = {
            obj: null,
            position: new three_module.Pq0,
            rotation: new three_module.O9p,
            scale: new three_module.Pq0
        },
        this._activeCameraChange = () => {
            this.transformControls && this._viewer && (this.transformControls.camera = this._viewer.scene.activeCamera.cameraObject)
        }
        ,
        TransformControls.ObjectConstructors.MeshBasicMaterial = MeshBasicMaterial2,
        this.enabled = o
    }
    get undoManager() {
        var o, c;
        return (c = (o = this._viewer) === null || o === void 0 ? void 0 : o.getPlugin(TweakpaneUiPlugin)) === null || c === void 0 ? void 0 : c.undoManager
    }
    async onAdded(o) {
        await super.onAdded(o),
        this.setDirty(),
        this.transformControls = new TransformControls2(o.scene.activeCamera.cameraObject,o.canvas),
        this._activeCameraChange = this._activeCameraChange.bind(this),
        o.scene.addEventListener("activeCameraChange", this._activeCameraChange),
        this.transformControls.addEventListener("dragging-changed", c => {
            if (!(this != null && this._viewer))
                return;
            const h = this._viewer.scene.activeCamera.controls;
            typeof (h == null ? void 0 : h.stopDamping) == "function" && (h != null && h.enabled) && h.stopDamping(),
            this._viewer.scene.activeCamera.setInteractions(!c.value, TransformControlsPlugin.PluginType)
        }
        ),
        this.transformControls.addEventListener("axis-changed", c => {
            if (!(this != null && this._viewer))
                return;
            this._isInteracting = !!c.value;
            const h = this._viewer.scene.activeCamera.controls;
            typeof (h == null ? void 0 : h.stopDamping) == "function" && (h != null && h.enabled) && h.stopDamping(),
            this._viewer.setDirty()
        }
        ),
        o.scene.addSceneObject(this.transformControls, {
            addToRoot: !0
        }),
        o.getPlugin(PickingPlugin).addEventListener("selectedObjectChanged", c => {
            this.transformControls && (this.enabled ? c.object ? this.transformControls.attach(c.object) : this.transformControls.detach() : this.transformControls.object && this.transformControls.detach())
        }
        ),
        this.transformControls.addEventListener("mouseDown", () => {
            if (!this.transformControls)
                return;
            const c = this.transformControls.object;
            c && (this._transformState.obj = c,
            this._transformState.position = c.position.clone(),
            this._transformState.rotation = c.rotation.clone(),
            this._transformState.scale = c.scale.clone())
        }
        ),
        this.transformControls.addEventListener("mouseUp", () => {
            if (!this.transformControls)
                return;
            const c = this.transformControls.object;
            if (!c || this._transformState.obj !== c || !this.undoManager)
                return;
            const h = {
                translate: "position",
                rotate: "rotation",
                scale: "scale"
            }[this.transformControls.getMode()];
            if (!h || this._transformState[h].equals(c[h]))
                return;
            const _ = {
                last: this._transformState[h].clone(),
                current: c[h].clone(),
                set: b => {
                    var _e, nt;
                    c[h].copy(b),
                    c.updateMatrixWorld(!0),
                    (_e = this.transformControls) === null || _e === void 0 || _e.dispatchEvent({
                        type: "change"
                    }),
                    (nt = this.transformControls) === null || nt === void 0 || nt.dispatchEvent({
                        type: "objectChange"
                    })
                }
                ,
                undo: () => _.set(_.last),
                redo: () => _.set(_.current)
            };
            this.undoManager.record(_)
        }
        )
    }
    async onRemove(o) {
        o.scene.removeEventListener("activeCameraChange", this._activeCameraChange),
        this.transformControls && (this.transformControls.detach(),
        o.scene.remove(this.transformControls),
        this.transformControls.dispose()),
        this.transformControls = void 0,
        await super.onRemove(o)
    }
}

export default TransformControlsPlugin;
