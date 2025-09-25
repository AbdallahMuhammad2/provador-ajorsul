/* Standalone Class: LUTPlugin */

class LUTPlugin extends GenericExtensionPlugin {
    _getUiConfig(o) {
        var c, h;
        const _ = {
            type: "folder",
            label: "LUT",
            children: [{
                type: "checkbox",
                label: "Enabled",
                get value() {
                    var b, _e;
                    return (_e = (b = o.materialObject.userData[LUTPlugin.PluginType]) === null || b === void 0 ? void 0 : b.enable) === null || _e === void 0 || _e
                },
                set value(b) {
                    var _e;
                    const nt = o.materialObject.userData[LUTPlugin.PluginType];
                    b !== (nt == null ? void 0 : nt.enable) && (nt || addLUTData(o.materialObject),
                    o.materialObject.userData[LUTPlugin.PluginType].enable = b,
                    (_e = _.uiRefresh) === null || _e === void 0 || _e.call(_, "postFrame", !0))
                },
                onChange: (c = this._extension) === null || c === void 0 ? void 0 : c.setDirty
            }, {
                type: "dropdown",
                children: [["LUT 0", 0], ["LUT 1", 1], ["LUT 2", 2]].map(b => ({
                    label: b[0],
                    value: b[1]
                })),
                label: "index",
                hidden: () => {
                    const b = o.materialObject.userData[LUTPlugin.PluginType];
                    return !!b && !b.enable
                }
                ,
                get value() {
                    var b, _e;
                    return (_e = (b = o.materialObject.userData[LUTPlugin.PluginType]) === null || b === void 0 ? void 0 : b.index) !== null && _e !== void 0 ? _e : 0
                },
                set value(b) {
                    var _e;
                    o.materialObject.userData[LUTPlugin.PluginType] || addLUTData(o.materialObject),
                    o.materialObject.userData[LUTPlugin.PluginType].index = b,
                    (_e = _.uiRefresh) === null || _e === void 0 || _e.call(_, "postFrame", !0)
                },
                onChange: (h = this._extension) === null || h === void 0 ? void 0 : h.setDirty
            }]
        };
        return _
    }
    constructor() {
        super(),
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
            computeCacheKey: o => {
                var c;
                return (this.enabled ? "1" : "0") + (!((c = o.materialObject.userData[LUTPlugin.PluginType]) === null || c === void 0) && c.enable ? "1" : "0")
            }
            ,
            isCompatible: o => !0
        },
        this.updateGBuffer = this.updateGBuffer.bind(this)
    }
    async onAdded(o) {
        var c, h;
        await super.onAdded(o),
        (c = o.getPlugin(GBufferPlugin)) === null || c === void 0 || c.registerGBufferUpdater(this.updateGBuffer);
        const _ = o.getPlugin(AssetManagerPlugin);
        (h = _ == null ? void 0 : _.materials) === null || h === void 0 || h.registerMaterialExtension(this.materialExtension)
    }
    generateExtension(o) {
        return new LUTExtension(o)
    }
    updateGBuffer(o, c) {
        var h, _;
        if (o instanceof three_module.eaF && (!((h = o.material) === null || h === void 0) && h.userData)) {
            const b = (_ = o.material) === null || _ === void 0 ? void 0 : _.userData[LUTPlugin.PluginType];
            if (b) {
                const _e = b.enable === !1 ? 0 : 1;
                c.w = updateBit(c.w, 0, _e);
                for (let it = 0; it < 3; it++)
                    c.y = clearBit(c.y, it);
                let nt = b.enable ? b.index : 0;
                nt = Math.min(nt, 7),
                c.y = c.y | nt
            } else
                c.w = updateBit(c.w, 0, 1)
        }
    }
}

export default LUTPlugin;
