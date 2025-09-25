/* Standalone Class: AssetExporterPlugin */

class AssetExporterPlugin extends AViewerPlugin {
    constructor(o) {
        super(),
        this.enabled = !0,
        this.exportOptions = {
            compress: !1,
            name: "scene",
            viewerConfig: !0,
            encodeUint16Rgbe: !1,
            convertMeshToIndexed: !1,
            embedUrlImagePreviews: !1,
            embedUrlImages: !1,
            dracoOptions: {
                encodeSpeed: 5,
                method: EncoderMethod.EDGEBREAKER,
                quantizationVolume: "mesh",
                quantizationBits: {
                    POSITION: 14,
                    NORMAL: 10,
                    COLOR: 8,
                    TEX_COORD: 12,
                    GENERIC: 12
                }
            },
            encrypt: !1,
            encryptKey: "",
            ignoreInvalidMorphTargetTracks: !0,
            ignoreEmptyTextures: !0
        },
        this.exporter = o,
        this.exportScene = this.exportScene.bind(this)
    }
    async onAdded(o) {
        await super.onAdded(o),
        this.exporter || (this.exporter = new AssetExporter(o)),
        this.exporter.processors.add("model", {
            forAssetType: "model",
            processAsync: async (c, h) => {
                var _;
                return h.convertMeshToIndexed && ((_ = c.modelObject) === null || _ === void 0 || _.traverse(b => {
                    if (b.geometry && !b.geometry.attributes.index)
                        try {
                            const _e = toIndexedGeometry(b.geometry);
                            b.setGeometry && b.setGeometry(_e)
                        } catch (_e) {
                            console.error("AssetExporterPlugin.convertMeshToIndexed: Error converting geometry to indexed", _e)
                        }
                }
                )),
                c
            }
        })
    }
    async onRemove(o) {
        return super.onRemove(o)
    }
    async exportScene(o) {
        var c, h;
        return (c = this.exporter) === null || c === void 0 ? void 0 : c.exportObject((h = this._viewer) === null || h === void 0 ? void 0 : h.scene.modelRoot, o || {
            ...this.exportOptions
        })
    }
    async downloadSceneGlb() {
        const o = await this.exportScene(this.exportOptions);
        o && await this._downloadBlob(o, this.exportOptions.name + "." + o.ext)
    }
    async _downloadBlob(o, c) {
        var h, _;
        const b = (h = this._viewer) === null || h === void 0 ? void 0 : h.getPluginByType("FileTransferPlugin");
        b ? await b.exportFile(o, c) : (_ = this._viewer) === null || _ === void 0 || _.console.error("FileTransferPlugin required to export/download file")
    }
    get uiConfig() {
        if (this._uiConfig)
            return this._uiConfig;
        const o = this._viewer;
        o.addEventListener("addPlugin", h => {
            var _;
            typeof ((_ = h.plugin) === null || _ === void 0 ? void 0 : _.toJSON) == "function" && console.error("Add all plugins before setting up the export UI, or use `toJSON: any = null` in the plugin ")
        }
        );
        const c = Object.entries(o.plugins).filter( ([h,_]) => typeof (_ == null ? void 0 : _.toJSON) == "function" && (_ == null ? void 0 : _.serializeWithViewer) !== !1).map( ([h,_]) => ({
            label: h,
            type: "checkbox",
            value: !0
        }));
        return this._uiConfig = {
            type: "folder",
            label: "Asset Export",
            limitedUi: !0,
            children: [{
                type: "input",
                property: [this.exportOptions, "name"],
                limitedUi: !0
            }, {
                type: "folder",
                label: "GLB Export",
                limitedUi: !0,
                children: [{
                    type: "checkbox",
                    label: "DRACO Compress",
                    property: [this.exportOptions, "compress"],
                    limitedUi: !0,
                    onChange: () => {
                        var h, _;
                        return (_ = (h = this._uiConfig) === null || h === void 0 ? void 0 : h.uiRefresh) === null || _ === void 0 ? void 0 : _.call(h, "postFrame", !0)
                    }
                }, this.exportOptions.dracoOptions ? {
                    type: "folder",
                    hidden: () => !this.exportOptions.compress,
                    label: "DRACO Options",
                    children: [{
                        type: "slider",
                        label: "Encode Speed",
                        bounds: [1, 10],
                        property: [this.exportOptions.dracoOptions, "encodeSpeed"]
                    }, {
                        type: "dropdown",
                        label: "Encoder Method",
                        property: [this.exportOptions.dracoOptions, "method"],
                        children: Object.entries(EncoderMethod).map( ([h,_]) => ({
                            label: h,
                            value: _
                        }))
                    }, {
                        type: "dropdown",
                        label: "Quantization Volume",
                        property: [this.exportOptions.dracoOptions, "quantizationVolume"],
                        children: ["mesh", "scene", "bbox"].map(h => ({
                            label: h
                        }))
                    }, {
                        type: "folder",
                        label: "Quantization Bits",
                        children: Object.keys(this.exportOptions.dracoOptions.quantizationBits).map(h => ({
                            type: "slider",
                            label: h,
                            bounds: [1, 16],
                            stepSize: 1,
                            property: [this.exportOptions.dracoOptions.quantizationBits, h]
                        }))
                    }]
                } : {}, {
                    type: "checkbox",
                    label: "Scene Settings",
                    property: [this.exportOptions, "viewerConfig"],
                    limitedUi: !0,
                    onChange: () => {
                        var h, _;
                        return (_ = (h = this._uiConfig) === null || h === void 0 ? void 0 : h.uiRefresh) === null || _ === void 0 ? void 0 : _.call(h, "postFrame", !0)
                    }
                }, {
                    type: "checkbox",
                    label: "Embed Image Previews",
                    property: [this.exportOptions, "embedUrlImagePreviews"]
                }, {
                    type: "checkbox",
                    label: "Encrypt",
                    property: [this.exportOptions, "encrypt"],
                    onChange: () => {
                        var h, _;
                        return (_ = (h = this._uiConfig) === null || h === void 0 ? void 0 : h.uiRefresh) === null || _ === void 0 ? void 0 : _.call(h, "postFrame", !0)
                    }
                }, {
                    type: "checkbox",
                    label: "Encrypt Password",
                    hidden: () => !this.exportOptions.encrypt,
                    property: [this.exportOptions, "encryptKey"]
                }, {
                    type: "checkbox",
                    label: "Compress hdr env maps",
                    hidden: () => !this.exportOptions.viewerConfig,
                    property: [this.exportOptions, "encodeUint16Rgbe"]
                }, {
                    type: "checkbox",
                    label: "Convert to indexed",
                    property: [this.exportOptions, "convertMeshToIndexed"]
                }, {
                    type: "checkbox",
                    label: "Ignore invalid animations",
                    property: [this.exportOptions, "ignoreInvalidMorphTargetTracks"]
                }, {
                    type: "checkbox",
                    label: "Ignore invalid textures",
                    property: [this.exportOptions, "ignoreInvalidTextures"]
                }, {
                    type: "button",
                    label: "Export GLB",
                    limitedUi: !0,
                    value: async () => this.downloadSceneGlb()
                }]
            }, {
                type: "folder",
                label: "Preset/Config export",
                children: [{
                    type: "folder",
                    label: "Plugins",
                    children: c
                }, {
                    type: "button",
                    label: "Select none",
                    value: () => {
                        c.forEach(h => {
                            var _;
                            h.value = !1,
                            (_ = h.uiRefresh) === null || _ === void 0 || _.call(h)
                        }
                        )
                    }
                }, {
                    type: "button",
                    label: "Select all",
                    value: () => {
                        c.forEach(h => {
                            var _;
                            h.value = !0,
                            (_ = h.uiRefresh) === null || _ === void 0 || _.call(h)
                        }
                        )
                    }
                }, {
                    type: "button",
                    label: "Export Plugins",
                    limitedUi: !0,
                    value: async () => {
                        const h = new Blob([JSON.stringify(o.getPlugin(AssetManagerPlugin).exportPluginPresets(c.filter(_ => !!_.value).map(_ => Ee$1(_.label) || "")), null, 2)],{
                            type: "application/json"
                        });
                        h && await this._downloadBlob(h, this.exportOptions.name + "." + AssetManagerPlugin.ViewerTypeSlug)
                    }
                }, {
                    type: "button",
                    label: "Export All Viewer Config",
                    limitedUi: !0,
                    value: async () => {
                        const h = new Blob([JSON.stringify(o.getPlugin(AssetManagerPlugin).exportViewerConfig(!1), null, 2)],{
                            type: "application/json"
                        });
                        h && await this._downloadBlob(h, this.exportOptions.name + "." + AssetManagerPlugin.ViewerTypeSlug)
                    }
                }]
            }]
        }
    }
}

export default AssetExporterPlugin;
