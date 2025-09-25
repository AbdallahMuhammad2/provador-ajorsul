/* Standalone Class: BloomPlugin */

class BloomPlugin extends GenericFilterPlugin {
    constructor() {
        super(...arguments),
        this.passId = "bloom",
        this._beforeFilters = ["combinedPost", "screen"],
        this._afterFilters = ["render", "progressive"],
        this._requiredFilters = ["render"],
        this.materialExtension = {
            uuid: esm_browser_v4(),
            getUiConfig: o => {
                if (o.__uiConfigs || (o.__uiConfigs = {}),
                o.__uiConfigs[this.materialExtension.uuid])
                    return o.__uiConfigs[this.materialExtension.uuid];
                const c = this._getUiConfig(o);
                return o.__uiConfigs[this.materialExtension.uuid] = c,
                c
            }
            ,
            isCompatible: o => !0
        }
    }
    setDirty() {
        this.pass.dirty = !0
    }
    _getUiConfig(o) {
        const c = {
            type: "folder",
            label: "Bloom",
            children: [{
                type: "checkbox",
                label: "Enabled",
                get value() {
                    var h, _;
                    return (_ = (h = o.materialObject.userData[BloomPlugin.PluginType]) === null || h === void 0 ? void 0 : h.enable) === null || _ === void 0 || _
                },
                set value(h) {
                    var _;
                    const b = o.materialObject.userData[BloomPlugin.PluginType];
                    h !== (b == null ? void 0 : b.enable) && (b || addBloomData(o.materialObject),
                    o.materialObject.userData[BloomPlugin.PluginType].enable = h,
                    (_ = c.uiRefresh) === null || _ === void 0 || _.call(c, "postFrame", !0))
                },
                onChange: this.setDirty
            }]
        };
        return c
    }
    passCtor(o) {
        const c = new BloomPass(o.renderer.maxHDRIntensity);
        return this.updateGBuffer = this.updateGBuffer.bind(this),
        this.setDirty = this.setDirty.bind(this),
        c
    }
    async onAdded(o) {
        var c, h;
        await super.onAdded(o),
        (c = o.getPlugin(GBufferPlugin)) === null || c === void 0 || c.registerGBufferUpdater(this.updateGBuffer);
        const _ = o.getPlugin(AssetManagerPlugin);
        (h = _ == null ? void 0 : _.materials) === null || h === void 0 || h.registerMaterialExtension(this.materialExtension)
    }
    updateGBuffer(o, c) {
        var h, _, b, _e;
        if (o instanceof three_module.eaF && (!((h = o.material) === null || h === void 0) && h.userData)) {
            const nt = ((b = (_ = o.material) === null || _ === void 0 ? void 0 : _.userData[BloomPlugin.PluginType]) === null || b === void 0 ? void 0 : b.enable) === !1 || !((_e = o.material) === null || _e === void 0) && _e.userData.pluginsDisabled ? 0 : 1;
            c.w = updateBit(c.w, 2, nt)
        }
    }
    _update(o) {
        var c, h;
        return (c = o.getPlugin(GBufferPlugin)) === null || c === void 0 || c.updateShaderProperties((h = this.pass) === null || h === void 0 ? void 0 : h.passObject.material),
        super._update(o)
    }
    get uiConfig() {
        var o;
        return (o = this.pass) === null || o === void 0 ? void 0 : o.passObject.uiConfig
    }
}

export default BloomPlugin;
