/* Standalone Class: PresetLibraryPlugin */

class PresetLibraryPlugin extends AViewerPlugin {
    constructor() {
        super(...arguments),
        this.toJSON = null,
        this.enabled = !0,
        this.presetGroups = [],
        this.uiConfig = {
            type: "folder",
            label: "Presets",
            expanded: !0,
            limitedUi: !0,
            children: [ () => this.presetGroups.map(o => ({
                type: "dropdown",
                label: o.name,
                limitedUi: !0,
                children: [{
                    value: "",
                    label: "none"
                }, ...o.presets.map(c => {
                    var h;
                    return {
                        label: ((h = tPresetToString(c)) === null || h === void 0 ? void 0 : h.split("/").pop()) || "",
                        value: tPresetToString(c)
                    }
                }
                )],
                getValue: () => tPresetToString(o.selected) || "",
                setValue: c => {
                    o.apply(this._viewer, o.presets.find(h => tPresetToString(h) === c))
                }
            })), {
                type: "button",
                label: "Download Selection",
                limitedUi: !0,
                value: () => {
                    const o = this.exportPresets();
                    me$1(new File([JSON.stringify(o, null, 2)],"preset.template.json",{
                        type: "application/json"
                    }))
                }
            }, {
                type: "button",
                label: "Export Preset Groups",
                limitedUi: !1,
                value: () => {
                    const o = this.exportPresetGroups();
                    me$1(new File([JSON.stringify(o, null, 2)],"presetGroups.json",{
                        type: "application/json"
                    }))
                }
            }]
        }
    }
    async onAdded(o) {
        var c, h;
        await super.onAdded(o),
        this.presetGroups.push(new BackgroundPresetGroup),
        this.presetGroups.push(new EnvironmentPresetGroup),
        this.presetGroups.push(new GemEnvironmentPresetGroup),
        this.presetGroups.push(new GemEnvironmentPresetGroup("envMap2")),
        this.presetGroups.push(new GemEnvironmentPresetGroup("envMap3")),
        this.presetGroups.push(new PluginPresetGroup("Ground")),
        this.presetGroups.push(new PluginPresetGroup("CameraViews")),
        this.presetGroups.push(new PluginPresetGroup("MaterialConfiguration")),
        this.presetGroups.push(new ModelStagePresetGroup),
        this.presetGroups.push(new MaterialLibPresetGroupPresetGroup),
        this.presetGroups.push(new VJSONPresetGroup),
        (h = (c = this.uiConfig).uiRefresh) === null || h === void 0 || h.call(c, "postFrame", !0)
    }
    exportPresets() {
        const o = Object.fromEntries(this.presetGroups.map(c => [c.name, c.selected ? cleanAsset(c.selected) : void 0]).filter( ([,c]) => c));
        return o.type = PresetLibraryPlugin.PluginType,
        o
    }
    async fromJSON(o, c) {
        var h, _;
        if (!super.fromJSON(o, c))
            return null;
        const b = {
            ...o
        };
        if (delete b.type,
        b.VJSON && this._viewer) {
            const nt = this.presetGroups.find(at => at.name === "VJSON")
              , it = nt == null ? void 0 : nt.presets;
            nt && it && await nt.apply(this._viewer, b.VJSON),
            delete b.VJSON
        }
        const _e = [];
        for (const [nt,it] of Object.entries(b)) {
            const at = this.presetGroups.find(ht => ht.name === nt)
              , ut = at == null ? void 0 : at.presets;
            if (!at || !ut)
                continue;
            const pt = it;
            _e.push(at.apply(this._viewer, pt))
        }
        return await Promise.all(_e),
        (_ = (h = this.uiConfig).uiRefresh) === null || _ === void 0 || _.call(h, "postFrame", !0),
        this
    }
    async loadPresetGroups(o) {
        typeof o == "string" && o.startsWith("http") && (o = await fetch(o).then(async c => c.json()));
        for (const [c,h] of Object.entries(o)) {
            const _ = this.presetGroups.find(b => b.name === c);
            _ == null || _.addPresets(h)
        }
    }
    exportPresetGroups() {
        return Object.fromEntries(this.presetGroups.map(o => [o.name, o.presets.map(cleanAsset)]).filter( ([,o]) => o.length > 0))
    }
    clear() {
        this.presetGroups.forEach(o => {
            o.clear()
        }
        )
    }
}

export default PresetLibraryPlugin;
