/* Standalone Class: SimpleBackgroundEnvUiPlugin */

class SimpleBackgroundEnvUiPlugin extends AViewerPlugin {
    constructor() {
        super(...arguments),
        this.enabled = !0,
        this.toJSON = void 0,
        this._savedBg = !1,
        this.lastBgVal = null,
        this.uiConfig = {
            label: "Background / Environment",
            type: "folder",
            expanded: !1,
            limitedUi: !0,
            children: [{
                label: "Color",
                type: "color",
                inlinePicker: !0,
                property: [this, "sceneBackgroundColor"],
                limitedUi: !0
            }, () => ({
                label: "Image",
                property: [this, "sceneBackground"],
                type: "image",
                limitedUi: !0
            }), {
                label: "EnvMap BG",
                type: "checkbox",
                property: [this, "envmapBg"]
            }, () => ({
                type: "slider",
                label: "BG Intensity",
                getValue: () => {
                    var o, c;
                    return (c = (o = this._viewer) === null || o === void 0 ? void 0 : o.scene.backgroundIntensity) !== null && c !== void 0 ? c : 1
                }
                ,
                setValue: o => {
                    this._viewer && (this._viewer.scene.backgroundIntensity = o)
                }
                ,
                bounds: [0, 16]
            }), {
                label: "Set Transparent BG",
                type: "button",
                hidden: () => !this._viewer || this._viewer.useRgbm,
                value: () => {
                    this._viewer && (this._viewer.scene.background = null,
                    this._viewer.scene.backgroundColor = null)
                }
            }, () => ({
                label: "Environment",
                getValue: () => {
                    var o;
                    return ((o = this._viewer) === null || o === void 0 ? void 0 : o.scene.environment) || null
                }
                ,
                setValue: o => {
                    this._viewer && (this._viewer.scene.environment = o)
                }
                ,
                type: "image",
                limitedUi: !0
            }), {
                type: "slider",
                label: "Env Rotation",
                getValue: () => {
                    var o, c, h;
                    return (h = (c = (o = this._viewer) === null || o === void 0 ? void 0 : o.scene.environment) === null || c === void 0 ? void 0 : c.rotation) !== null && h !== void 0 ? h : 0
                }
                ,
                setValue: o => {
                    var c, h;
                    const _ = (c = this._viewer) === null || c === void 0 ? void 0 : c.scene.environment;
                    _ && (_.rotation = o,
                    (h = this._viewer) === null || h === void 0 || h.scene.setDirty())
                }
                ,
                bounds: [0, 2 * Math.PI],
                limitedUi: !0
            }, {
                type: "slider",
                label: "Env Intensity",
                getValue: () => {
                    var o, c;
                    return (c = (o = this._viewer) === null || o === void 0 ? void 0 : o.scene.envMapIntensity) !== null && c !== void 0 ? c : 1
                }
                ,
                setValue: o => {
                    var c;
                    !((c = this._viewer) === null || c === void 0) && c.scene && (this._viewer.scene.envMapIntensity = o)
                }
                ,
                bounds: [0, 4],
                limitedUi: !0
            }, () => ({
                label: "Environment1",
                getValue: () => {
                    var o;
                    return ((o = this._viewer) === null || o === void 0 ? void 0 : o.scene.textureSlots.environment1) || null
                }
                ,
                setValue: o => {
                    this._viewer && (o.mapping === three_module.UTZ && (o.mapping = three_module.wfO,
                    o.needsUpdate = !0),
                    this._viewer.scene.textureSlots.environment1 = o)
                }
                ,
                type: "image"
            }), {
                type: "slider",
                label: "Env1 Rotation",
                hidden: () => {
                    var o;
                    return !(!((o = this._viewer) === null || o === void 0) && o.scene.textureSlots.environment1)
                }
                ,
                getValue: () => {
                    var o, c, h;
                    return (h = (c = (o = this._viewer) === null || o === void 0 ? void 0 : o.scene.textureSlots.environment1) === null || c === void 0 ? void 0 : c.rotation) !== null && h !== void 0 ? h : 0
                }
                ,
                setValue: o => {
                    var c, h;
                    const _ = (c = this._viewer) === null || c === void 0 ? void 0 : c.scene.textureSlots.environment1;
                    _ && (_.rotation = o,
                    (h = this._viewer) === null || h === void 0 || h.scene.setDirty())
                }
                ,
                bounds: [0, 2 * Math.PI]
            }, {
                type: "checkbox",
                label: "Fixed Env Direction",
                getValue: () => {
                    var o, c;
                    return (c = (o = this._viewer) === null || o === void 0 ? void 0 : o.scene.fixedEnvMapDirection) !== null && c !== void 0 && c
                }
                ,
                setValue: o => {
                    this._viewer && (this._viewer.scene.fixedEnvMapDirection = o)
                }
            }]
        }
    }
    get sceneBackgroundColor() {
        var o, c;
        const h = (c = (o = this._viewer) === null || o === void 0 ? void 0 : o.scene.backgroundColor) === null || c === void 0 ? void 0 : c.getHex(three_module.er$);
        return h !== void 0 && (this._savedBg = !0),
        h || 0
    }
    set sceneBackgroundColor(o) {
        this._viewer && this._savedBg && (this._viewer.scene.backgroundColor || (this._viewer.scene.backgroundColor = new three_module.Q1f),
        this._viewer.scene.backgroundColor.setHex(o),
        this._viewer.scene.setDirty())
    }
    get sceneBackground() {
        var o;
        const c = (o = this._viewer) === null || o === void 0 ? void 0 : o.scene.background;
        return c && (c.isTexture || c.assetType === "texture") ? c : null
    }
    set sceneBackground(o) {
        this._viewer && (this._viewer.scene.background = o)
    }
    get envmapBg() {
        var o, c, h;
        return ((o = this._viewer) === null || o === void 0 ? void 0 : o.scene.background) === "environment" || ((c = this._viewer) === null || c === void 0 ? void 0 : c.scene.background) === ((h = this._viewer) === null || h === void 0 ? void 0 : h.scene.environment)
    }
    set envmapBg(o) {
        if (this._viewer)
            if (o) {
                const c = this._viewer.scene.background;
                c && c !== this._viewer.scene.environment && c !== "environment" && (this.lastBgVal = c),
                this._viewer.scene.background = "environment"
            } else
                this._viewer.scene.background !== this._viewer.scene.environment && this._viewer.scene.background !== "environment" || (this._viewer.scene.background = this.lastBgVal)
    }
    async onAdded(o) {
        await super.onAdded(o),
        this.lastBgVal = o.scene.background,
        o.scene.addEventListener("backgroundChanged", () => {
            var c, h;
            (h = (c = this.uiConfig).uiRefresh) === null || h === void 0 || h.call(c, "postFrame", !0)
        }
        ),
        o.scene.addEventListener("environmentChanged", () => {
            var c, h;
            (h = (c = this.uiConfig).uiRefresh) === null || h === void 0 || h.call(c, "postFrame", !0)
        }
        )
    }
}

export default SimpleBackgroundEnvUiPlugin;
