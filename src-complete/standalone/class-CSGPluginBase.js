/* Standalone Class: CSGPluginBase */

class CSGPluginBase extends AViewerPlugin {
    constructor() {
        super(),
        this.enabled = !0,
        this.toJSON = void 0,
        this.dependencies = [PickingPlugin],
        this.rootMesh = new three_module.eaF,
        this.showResult = !1,
        this.csgSelectedEnabled = !1,
        this.csgSelectedOperation = "union",
        this._csgNeedsUpdate = !1,
        this._csgVisible = !1,
        this._sceneUpdate = this._sceneUpdate.bind(this),
        this._preFrame = this._preFrame.bind(this),
        this.makeSelectedCSGBrush = this.makeSelectedCSGBrush.bind(this),
        this.refreshCSG = this.refreshCSG.bind(this),
        this._selectedObjectChanged = this._selectedObjectChanged.bind(this),
        this._updateSelectedProperties = this._updateSelectedProperties.bind(this),
        this.downloadObject = this.downloadObject.bind(this),
        this.exportObject = this.exportObject.bind(this)
    }
    async onAdded(o) {
        var c;
        await super.onAdded(o),
        this.rootObject = await o.createObject3D(),
        this.rootObject.modelObject.add(this.rootMesh),
        o.scene.addEventListener("sceneUpdate", this._sceneUpdate),
        o.addEventListener("preFrame", this._preFrame),
        (c = o.getPlugin(PickingPlugin)) === null || c === void 0 || c.addEventListener("selectedObjectChanged", this._selectedObjectChanged)
    }
    async makeSelectedCSGBrush() {
        var o, c;
        const h = (c = (o = this._viewer) === null || o === void 0 ? void 0 : o.getPlugin(PickingPlugin)) === null || c === void 0 ? void 0 : c.getSelectedObject();
        h && h.geometry && (h.userData._isCSGMesh || (h.userData.csgBrush || (h.userData.csgBrush = {
            enabled: !0,
            operation: "union"
        }),
        this._selectedObjectChanged()))
    }
    refreshCSG() {
        this._sceneUpdate()
    }
    async downloadObject() {
        const o = await this.exportObject();
        o && N$2(o, "csg." + o.ext)
    }
    async exportObject() {
        var o, c;
        const h = (c = (o = this._viewer) === null || o === void 0 ? void 0 : o.getPluginByType("AssetExporterPlugin")) === null || c === void 0 ? void 0 : c.exporter;
        if (!h || !this.rootObject)
            return;
        const _ = this.rootMesh.visible;
        this.rootMesh.visible = !0;
        const b = await h.exportObject(this.rootObject.modelObject, {});
        return this.rootMesh.visible = _,
        b
    }
    _updateSelectedProperties() {
        var o, c;
        const h = (c = (o = this._viewer) === null || o === void 0 ? void 0 : o.getPlugin(PickingPlugin)) === null || c === void 0 ? void 0 : c.getSelectedObject();
        h && h.userData.csgBrush && (h.userData.csgBrush.enabled = this.csgSelectedEnabled,
        h.userData.csgBrush.operation = this.csgSelectedOperation)
    }
    _selectedObjectChanged() {
        var o, c, h, _, b, _e, nt, it;
        const at = (c = (o = this._viewer) === null || o === void 0 ? void 0 : o.getPlugin(PickingPlugin)) === null || c === void 0 ? void 0 : c.getSelectedObject();
        at && (this.csgSelectedEnabled = (_ = (h = at.userData.csgBrush) === null || h === void 0 ? void 0 : h.enabled) !== null && _ !== void 0 && _,
        this.csgSelectedOperation = (_e = (b = at.userData.csgBrush) === null || b === void 0 ? void 0 : b.operation) !== null && _e !== void 0 ? _e : "union"),
        (it = (nt = this.uiConfig) === null || nt === void 0 ? void 0 : nt.uiRefresh) === null || it === void 0 || it.call(nt, "postFrame", !0)
    }
    _preFrame() {
        var o, c, h;
        if (!this.rootObject || !this._csgNeedsUpdate && this._csgVisible === this.showResult)
            return;
        const _ = this._findCSGMeshes();
        this._csgNeedsUpdate && (this._csgNeedsUpdate = !1,
        (o = this.rootObject) === null || o === void 0 || o.modelObject.updateMatrixWorld(!0),
        ((c = this.rootMesh.userData.dispose) !== null && c !== void 0 ? c : this.rootMesh.removeFromParent)(),
        this.rootMesh = this._buildCSGMesh(_)),
        this.rootMesh && !this.rootMesh.parent && ((h = this.rootObject) === null || h === void 0 || h.modelObject.add(this.rootMesh)),
        this.showResult ? (_.forEach(b => {
            b[0].visible = !1
        }
        ),
        this.rootObject.visible = !0,
        this._csgVisible = !0,
        this.rootObject.setDirty()) : (_.forEach(b => {
            b[0].visible = !0
        }
        ),
        this.rootObject.visible = !1,
        this._csgVisible = !1,
        this.rootObject.setDirty())
    }
    _findCSGMeshes() {
        var o;
        const c = [];
        return (o = this._viewer) === null || o === void 0 || o.scene.traverse(h => {
            var _;
            h.isMesh && h.geometry && (!((_ = h.userData.csgBrush) === null || _ === void 0) && _.enabled) && c.push([h, h.userData.csgBrush.operation])
        }
        ),
        c
    }
    _sceneUpdate(o) {
        var c, h;
        !((h = (c = o == null ? void 0 : o.object) === null || c === void 0 ? void 0 : c.userData) === null || h === void 0) && h._isCSGMesh || (this._csgNeedsUpdate = !0)
    }
}

export default CSGPluginBase;
