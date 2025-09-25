/* Standalone Class: ExtrasUiPlugin */

class ExtrasUiPlugin extends AViewerPlugin {
    constructor() {
        super(...arguments),
        this.enabled = !0,
        this.toJSON = void 0,
        this.showColorScheme = !0,
        this.uiConfig = {
            type: "folder",
            label: "Extras",
            limitedUi: !1,
            children: [ () => this.showColorScheme ? {
                label: "Color Scheme",
                type: "dropdown",
                children: ["black", "white", "blue"].map(o => ({
                    label: o
                })),
                getValue: () => {
                    var o, c;
                    return (c = (o = this._viewer) === null || o === void 0 ? void 0 : o.getPluginByType("TweakpaneUi")) === null || c === void 0 ? void 0 : c.colorMode
                }
                ,
                setValue: o => {
                    var c;
                    const h = (c = this._viewer) === null || c === void 0 ? void 0 : c.getPluginByType("TweakpaneUi");
                    h && (h.colorMode = o)
                }
            } : void 0, () => ({
                label: "Shadow type",
                type: "dropdown",
                children: [["Basic", three_module.bTm], ["PCF", three_module.QP0], ["PCFSoft", three_module.Wk7], ["VSM", three_module.RyA]].map(o => ({
                    label: o[0],
                    value: o[1]
                })),
                getValue: () => {
                    var o;
                    return (o = this._viewer) === null || o === void 0 ? void 0 : o.renderer.rendererObject.shadowMap.type
                }
                ,
                setValue: o => {
                    var c;
                    (c = this._viewer) === null || c === void 0 || c.doOnce("postFrame", () => {
                        this._viewer && (this._viewer.renderer.rendererObject.shadowMap.type = o,
                        this._viewer.renderer.resetShadows(),
                        this._viewer.renderer.reset(),
                        this._viewer.scene.setDirty({
                            sceneUpdate: !0,
                            frameFade: !1
                        }),
                        this._viewer.setDirty())
                    }
                    )
                }
            }), () => {
                var o;
                return {
                    label: (!((o = this._viewer) === null || o === void 0) && o.useRgbm ? "Disable" : "Enable") + " RGBM",
                    type: "button",
                    value: async () => {
                        var c, h;
                        await ((c = this._viewer) === null || c === void 0 ? void 0 : c.confirm("Edit Extras: This will reload the webpage. Are you sure?")) && st("rgbm", !((h = this._viewer) === null || h === void 0) && h.useRgbm ? "no" : "yes", !0)
                    }
                }
            }
            , () => {
                var o;
                return {
                    label: (!((o = this._viewer) === null || o === void 0) && o.isAntialiased ? "Disable" : "Enable") + " MSAA",
                    type: "button",
                    value: async () => {
                        var c, h;
                        await ((c = this._viewer) === null || c === void 0 ? void 0 : c.confirm("Edit Extras: This will reload the webpage. Are you sure?")) && st("msaa", !((h = this._viewer) === null || h === void 0) && h.isAntialiased ? "no" : "yes", !0)
                    }
                }
            }
            , () => {
                var o;
                return {
                    label: (!((o = this._viewer) === null || o === void 0) && o.useGBufferDepth ? "Disable" : "Enable") + " Depth(z) Prepass",
                    type: "button",
                    value: async () => {
                        var c, h;
                        await ((c = this._viewer) === null || c === void 0 ? void 0 : c.confirm("Edit Extras: This will reload the webpage. Are you sure?")) && st("depthPrepass", !((h = this._viewer) === null || h === void 0) && h.useGBufferDepth ? "no" : "yes", !0)
                    }
                }
            }
            , () => {
                var o;
                return {
                    label: (!((o = this._viewer) === null || o === void 0) && o.getPluginByType("debug") ? "Disable" : "Enable") + " Debug",
                    type: "button",
                    value: async () => {
                        var c, h;
                        await ((c = this._viewer) === null || c === void 0 ? void 0 : c.confirm("Edit Extras: This will reload the webpage. Are you sure?")) && st("debug", !((h = this._viewer) === null || h === void 0) && h.getPluginByType("debug") ? null : "true", !0)
                    }
                }
            }
            , {
                label: "Clear local storage",
                type: "button",
                value: async () => {
                    var o;
                    await ((o = this._viewer) === null || o === void 0 ? void 0 : o.confirm("Edit Extras: This will clear all local storage. Are you sure?")) && localStorage.clear()
                }
            }, {
                label: "Clear caches",
                type: "button",
                value: async () => {
                    var o, c;
                    const h = (c = (o = this._viewer) === null || o === void 0 ? void 0 : o.getPlugin(AssetManagerPlugin)) === null || c === void 0 ? void 0 : c.storage;
                    if (h instanceof Storage)
                        h.clear();
                    else if (h instanceof Cache) {
                        const _ = await h.keys();
                        await Promise.all(_.map(async b => h.delete(b)))
                    }
                    localStorage.clear()
                }
            }, {
                label: "Auto GPU instance all",
                type: "button",
                value: () => {
                    var o;
                    const c = new Set;
                    (o = this._viewer) === null || o === void 0 || o.scene.modelRoot.traverse(h => h.geometry && c.add(h.geometry)),
                    c.forEach(h => autoGPUInstanceMeshes(h))
                }
            }, {
                label: "Auto Center All Geometries",
                type: "button",
                value: () => {
                    var o;
                    const c = new Set;
                    (o = this._viewer) === null || o === void 0 || o.scene.modelRoot.traverse(h => h.geometry && c.add(h.geometry)),
                    c.forEach(h => {
                        const _ = new three_module.Pq0;
                        h.center(_),
                        _.negate();
                        const b = h.userData.__appliedMeshes;
                        b || console.error("No meshes found for geometry", h),
                        b == null || b.forEach(_e => {
                            _e.updateMatrix(),
                            _e.position.copy(_).applyMatrix4(_e.matrix),
                            _e.setDirty && _e.setDirty()
                        }
                        )
                    }
                    )
                }
            }]
        }
    }
}

export default ExtrasUiPlugin;
