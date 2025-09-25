/* Standalone Class: AAssetManagerProcessStatePlugin */

class AAssetManagerProcessStatePlugin extends AViewerPlugin {
    _onEnabledChange() {
        this.enabled || (this._mainDiv.style.display = "none")
    }
    constructor(o, c) {
        super(),
        this.container = c,
        this.enabled = !0,
        this.dependencies = [AssetManagerPlugin],
        this.processState = new Map,
        this._mainDiv = ee$1({
            id: "assetManager" + o,
            addToBody: !1,
            innerHTML: ""
        }),
        this._contentDiv = ee$1({
            id: "assetManager" + o + "Content",
            addToBody: !1,
            innerHTML: ""
        }),
        this.enabled || (this._mainDiv.style.display = "none"),
        this._mainDiv.appendChild(this._contentDiv)
    }
    async onAdded(o) {
        var c, h, _, b, _e, nt, it, at, ut, pt, ht, _t, vt;
        await super.onAdded(o),
        ((c = this.container) !== null && c !== void 0 ? c : o.container).appendChild(this._mainDiv),
        this._updateMainDiv(this.processState),
        (_ = (h = o.getManager()) === null || h === void 0 ? void 0 : h.importer) === null || _ === void 0 || _.addEventListener("importFile", bt => {
            bt.state !== "done" ? this.processState.set(bt.path, {
                state: bt.state,
                progress: bt.progress ? 100 * bt.progress : void 0
            }) : this.processState.delete(bt.path),
            this._updateMainDiv(this.processState)
        }
        ),
        (_e = (b = o.getManager()) === null || b === void 0 ? void 0 : b.importer) === null || _e === void 0 || _e.addEventListener("processFileStart", bt => {
            this.processState.set(bt.path, {
                state: "processing",
                progress: void 0
            }),
            this._updateMainDiv(this.processState)
        }
        ),
        (it = (nt = o.getManager()) === null || nt === void 0 ? void 0 : nt.importer) === null || it === void 0 || it.addEventListener("processFileEnd", bt => {
            this.processState.delete(bt.path),
            this._updateMainDiv(this.processState)
        }
        ),
        (ut = (at = o.getManager()) === null || at === void 0 ? void 0 : at.exporter) === null || ut === void 0 || ut.addEventListener("exportFile", bt => {
            bt.state !== "done" ? this.processState.set(bt.obj.name, {
                state: bt.state,
                progress: bt.progress ? 100 * bt.progress : void 0
            }) : this.processState.delete(bt.obj.name),
            this._updateMainDiv(this.processState)
        }
        ),
        (pt = o.getPluginByType("FileTransferPlugin")) === null || pt === void 0 || pt.addEventListener("transferFile", bt => {
            bt.state !== "done" ? this.processState.set(bt.path, {
                state: bt.state,
                progress: bt.progress ? 100 * bt.progress : void 0
            }) : this.processState.delete(bt.path),
            this._updateMainDiv(this.processState)
        }
        ),
        (ht = o.getPluginByType("MaterialConfiguratorPlugin")) === null || ht === void 0 || ht.addEventListener("progress", bt => {
            bt.state !== "done" ? this.processState.set("MatpreviewGeneration", {
                state: bt.state,
                progress: 0
            }) : this.processState.delete("MatpreviewGeneration"),
            this._updateMainDiv(this.processState)
        }
        ),
        (_t = o.getPluginByType("SwitchNodePlugin")) === null || _t === void 0 || _t.addEventListener("progress", bt => {
            bt.state !== "done" ? this.processState.set("SwitchNodeGeneration", {
                state: bt.state,
                progress: 0
            }) : this.processState.delete("SwitchNodeGeneration"),
            this._updateMainDiv(this.processState)
        }
        ),
        (vt = o.getPluginByType("ThemePlugin")) === null || vt === void 0 || vt.addEventListener("progress", bt => {
            bt.state !== "done" ? this.processState.set("ThemeInit", {
                state: bt.state,
                progress: 0
            }) : this.processState.delete("ThemeInit"),
            this._updateMainDiv(this.processState)
        }
        )
    }
    async onRemove(o) {
        var c;
        return this._mainDiv.remove(),
        (c = this._contentDiv) === null || c === void 0 || c.remove(),
        this.processState.clear(),
        super.onRemove(o)
    }
}

export default AAssetManagerProcessStatePlugin;
