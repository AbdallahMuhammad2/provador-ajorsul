/* Standalone Class: VariationConfiguratorEditorUiPlugin */

class VariationConfiguratorEditorUiPlugin extends VariationConfiguratorGridUiPlugin {
    constructor() {
        super(...arguments),
        this._uiExpandedState = {},
        this.uiConfig = {
            type: "folder",
            label: "Configurator",
            children: [{
                type: "input",
                label: "Base URL",
                property: [this, "baseUrl"]
            }, ...this._ty.map(o => ({
                type: "folder",
                expanded: this._uiExpandedState["__/" + o],
                onExpand: () => this._uiExpandedState["__/" + o] = !0,
                onCollapse: () => this._uiExpandedState["__/" + o] = !1,
                label: o,
                children: [ () => this.variations[o].map(c => ({
                    type: "folder",
                    expanded: this._uiExpandedState[c.name],
                    onExpand: () => this._uiExpandedState[c.name] = !0,
                    onCollapse: () => this._uiExpandedState[c.name] = !1,
                    label: () => this.utils.getName(c),
                    children: [{
                        type: "input",
                        placeholder: () => this.utils.getName(c),
                        property: [c, "name"]
                    }, {
                        type: "input",
                        property: [c, "prefix"]
                    }, {
                        type: "input",
                        placeholder: () => this.utils.pathToTitle(this.utils.getName(c)),
                        property: [c, "title"]
                    }, {
                        type: "input",
                        placeholder: () => this.utils.pathToIcon(this.baseUrl + c.prefix),
                        property: [c, "icon"]
                    }, {
                        type: "folder",
                        label: "items",
                        children: c.items.map( (h, _) => ({
                            type: "folder",
                            label: () => c.items[_],
                            children: [{
                                type: "input",
                                label: "File/URL",
                                isMonitor: !c.itemFiles[_],
                                getValue: () => c.items[_],
                                setValue: b => {
                                    c.items[_] = b
                                }
                            }, {
                                type: "input",
                                label: "Icon/Image",
                                placeholder: this.utils.pathToIcon(c.items[_]),
                                getValue: () => c.icons[_],
                                setValue: b => {
                                    c.icons[_] = b
                                }
                            }, {
                                type: "input",
                                label: "Title",
                                placeholder: this.utils.pathToTitle(c.items[_]),
                                getValue: () => c.titles[_],
                                setValue: b => {
                                    c.titles[_] = b
                                }
                            }, {
                                type: "button",
                                label: "Apply",
                                value: async () => this.applyVariation(c, _, o)
                            }, c.itemFiles[_] ? [{
                                type: "button",
                                label: "Remove",
                                value: () => {
                                    c.items.splice(_, 1),
                                    c.itemFiles.splice(_, 1),
                                    this.refreshUi()
                                }
                            }, {
                                type: "button",
                                label: "Replace",
                                value: async () => {
                                    const b = await ge$1(!1, !1);
                                    b.length !== 0 && (c.itemFiles[_] = b[0],
                                    c.items[_] = b[0].name,
                                    this.refreshUi())
                                }
                            }, {
                                type: "button",
                                label: "Download",
                                value: async () => {
                                    const b = c.itemFiles[_];
                                    N$2(b, b.name)
                                }
                            }] : {}]
                        }))
                    }, {
                        type: "button",
                        label: "Add item (local)",
                        value: async () => {
                            var h, _, b;
                            const _e = await ge$1(!0, !1);
                            if (_e.length !== 0) {
                                for (const nt of _e) {
                                    if (!this._extForType[o].includes((h = nt.name.split(".").pop()) !== null && h !== void 0 ? h : "")) {
                                        await ((_ = this._viewer) === null || _ === void 0 ? void 0 : _.alert(`Invalid file: ${nt.name} is not a valid ${o} file`));
                                        continue
                                    }
                                    if (c.items.includes(nt.name)) {
                                        await ((b = this._viewer) === null || b === void 0 ? void 0 : b.alert(`Already exists: Item with name ${nt.name} already exists`));
                                        continue
                                    }
                                    const it = c.items.push(nt.name) - 1;
                                    c.icons[it] = "",
                                    c.titles[it] = "",
                                    c.itemFiles[it] = nt
                                }
                                this.refreshUi()
                            }
                        }
                    }, {
                        type: "button",
                        label: "Add item (url)",
                        value: async () => {
                            var h, _, b, _e, nt;
                            const it = await ((h = this._viewer) === null || h === void 0 ? void 0 : h.prompt("URL: Enter the url of the object/material"));
                            if (!it)
                                return;
                            if (!it.startsWith("http") && !this.baseUrl.startsWith("http"))
                                return void await ((_ = this._viewer) === null || _ === void 0 ? void 0 : _.alert(`Invalid url: ${it} should be a valid HTTP(S) url. If you are passing a relative path, set the baseURL first`));
                            if (!this._extForType[o].includes((b = it.split(".").pop()) !== null && b !== void 0 ? b : ""))
                                return void await ((_e = this._viewer) === null || _e === void 0 ? void 0 : _e.alert(`Invalid url: ${it} should be of a material ending with mat`));
                            c.items.includes(it) && await ((nt = this._viewer) === null || nt === void 0 ? void 0 : nt.alert(`Already exists: Item with url ${it} already exists`)),
                            c.items.push(it);
                            const at = c.items.length - 1;
                            c.icons[at] = "",
                            c.titles[at] = "",
                            this.refreshUi()
                        }
                    }, {
                        type: "button",
                        label: () => "Remove " + this.utils.getName(c),
                        value: async () => {
                            var h;
                            await ((h = this._viewer) === null || h === void 0 ? void 0 : h.confirm(`Delete Group: Are you sure you want to remove ${this.utils.getName(c)}?`)) && (this.variations[o].splice(this.variations[o].indexOf(c), 1),
                            this.refreshUi())
                        }
                    }]
                })), {
                    type: "button",
                    label: `Add ${o} group (empty)`,
                    value: async () => {
                        var c;
                        const h = await ((c = this._viewer) === null || c === void 0 ? void 0 : c.prompt("Name: Enter the name of the object/material"));
                        h && (this.variations[o].push({
                            items: [],
                            itemFiles: [],
                            icons: [],
                            iconFiles: [],
                            titles: [],
                            prefix: h + "/",
                            name: h,
                            icon: "",
                            title: ""
                        }),
                        this.refreshUi())
                    }
                }, {
                    type: "button",
                    label: `Add ${o} group (local folder)`,
                    value: async () => {
                        var c, h, _, b;
                        const _e = await ge$1(!1, !0);
                        if (_e.length === 0)
                            return;
                        const nt = []
                          , it = []
                          , at = []
                          , ut = [];
                        for (const bt of _e) {
                            if (bt.name.startsWith("."))
                                continue;
                            const St = (c = bt.name.split(".").pop()) !== null && c !== void 0 ? c : "";
                            St ? this._extForType[o].includes(St) ? (nt.push(bt.webkitRelativePath.replace(/^\//, "")),
                            it.push(bt)) : this._extForType.images.includes(St) ? (at.push(bt.webkitRelativePath.replace(/^\//, "")),
                            ut.push(bt)) : await ((_ = this._viewer) === null || _ === void 0 ? void 0 : _.alert(`Invalid file: ${bt.name} is not a valid ${o} file`)) : await ((h = this._viewer) === null || h === void 0 ? void 0 : h.alert(`Invalid file: ${bt.name} has no extension`))
                        }
                        const pt = he$1(nt)
                          , ht = this.utils.getName({
                            prefix: pt
                        });
                        let _t = await ((b = this._viewer) === null || b === void 0 ? void 0 : b.prompt("Name: Enter the name of the object/material", ht, !0));
                        if (_t === null)
                            return;
                        _t = _t || ht;
                        const vt = nt.map(bt => {
                            var St;
                            const At = bt.replace(pt, "")
                              , Et = (St = At.split(".").pop()) !== null && St !== void 0 ? St : ""
                              , Pt = At.replace("." + Et, "") + "."
                              , It = at.findIndex(Dt => Dt.replace(pt, "").startsWith(Pt));
                            return It < 0 ? ["", void 0] : [at[It].replace(pt, ""), ut[It] || void 0]
                        }
                        );
                        this.variations[o].push({
                            items: nt.map(bt => bt.replace(pt, "")),
                            icons: vt.map(bt => bt[0]),
                            iconFiles: vt.map(bt => bt[1]),
                            titles: nt.map( () => ""),
                            itemFiles: it,
                            prefix: pt,
                            name: _t,
                            icon: "",
                            title: ""
                        }),
                        this.refreshUi()
                    }
                }]
            })), {
                type: "button",
                label: "Download JSON/Zip",
                value: async () => {
                    var o, c;
                    try {
                        const {folder: h, config: _} = await this._exportConfiguratorState()
                          , b = JSON.stringify(_, null, 4);
                        if (h) {
                            h["config.json"] = strToU8(b);
                            const _e = await zipSync(h);
                            N$2(new Blob([_e],{
                                type: "application/zip"
                            }), "configurator.zip")
                        } else
                            N$2(new Blob([b],{
                                type: "application/json"
                            }), "config.json")
                    } catch (h) {
                        return (o = this._viewer) === null || o === void 0 || o.console.error(h),
                        void await ((c = this._viewer) === null || c === void 0 ? void 0 : c.alert("Error: " + ((h == null ? void 0 : h.message) || h)))
                    }
                }
            }, {
                type: "button",
                label: "Load JSON/Zip",
                value: async () => {
                    var o, c, h;
                    const _ = await ge$1(!1, !1, "application/zip,application/json");
                    if (_.length === 0)
                        return;
                    const b = _[0];
                    if (b.name.endsWith(".zip")) {
                        const _e = unzipSync(new Uint8Array(await b.arrayBuffer()));
                        if (!_e["config.json"])
                            return void await ((o = this._viewer) === null || o === void 0 ? void 0 : o.alert("Invalid zip: config.json not found"));
                        const nt = JSON.parse(strFromU8(_e["config.json"]));
                        this.importConfig(nt, _e)
                    } else {
                        if (!b.name.endsWith(".json"))
                            return void await ((c = this._viewer) === null || c === void 0 ? void 0 : c.alert("Invalid file: " + b.name));
                        {
                            const _e = JSON.parse(await b.text());
                            this.importConfig(_e)
                        }
                    }
                    await ((h = this._viewer) === null || h === void 0 ? void 0 : h.alert("Imported successfully")),
                    this.refreshUi()
                }
            }, {
                type: "button",
                label: "Import Path",
                value: async () => {
                    var o, c;
                    const h = await ((o = this._viewer) === null || o === void 0 ? void 0 : o.prompt("URL: Enter the url of the json file."));
                    h && (await this.importPath(h),
                    await ((c = this._viewer) === null || c === void 0 ? void 0 : c.alert("Imported successfully")),
                    this.refreshUi())
                }
            }, {
                type: "button",
                label: "Refresh UI",
                value: () => {
                    this.refreshUi()
                }
            }, {
                type: "button",
                label: "Clear All",
                value: async () => {
                    var o;
                    await ((o = this._viewer) === null || o === void 0 ? void 0 : o.confirm("Clear: Are you sure you want to clear the configuration ?")) && (this.variations.objects = [],
                    this.variations.materials = [],
                    this.refreshUi())
                }
            }]
        }
    }
    _refreshUiConfig() {
        var o, c;
        (c = (o = this.uiConfig) === null || o === void 0 ? void 0 : o.uiRefresh) === null || c === void 0 || c.call(o, "postFrame", !0)
    }
    refreshUi() {
        this._refreshUiConfig(),
        super.refreshUi()
    }
    async _loadObject(o, c) {
        const h = await super._loadObject(o, c);
        for (const _ of h)
            (_.modelObject || _).userData.excludeFromExport = !0;
        return h
    }
}

export default VariationConfiguratorEditorUiPlugin;
