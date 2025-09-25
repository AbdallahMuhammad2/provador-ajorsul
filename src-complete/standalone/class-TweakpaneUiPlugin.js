/* Standalone Class: TweakpaneUiPlugin */

class TweakpaneUiPlugin extends TweakpaneWrapper {
    constructor(o=!1, c=!1, h=!1, _, b) {
        var _e, nt;
        super(o, c, h, !1, (_e = _ ?? document.getElementById("tweakpaneMainPanelSlot")) !== null && _e !== void 0 ? _e : document.body),
        this.dependencies = [AssetManagerPlugin],
        this._preRender = () => this.refreshQueue("preRender"),
        this._postRender = () => this.refreshQueue("postRender"),
        this._postFrame = it => {
            this.dispatchEvent(it),
            this.refreshQueue("postFrame")
        }
        ,
        this._preFrame = () => this.refreshQueue("preFrame"),
        this._plugins = [],
        this._pane.registerPlugin(tweakpane_image_plugin),
        ui_tpTheme.use({
            target: this._container
        }),
        this.colorMode = (nt = b ?? (localStorage ? localStorage.getItem("tpTheme") : "blue")) !== null && nt !== void 0 ? nt : "blue"
    }
    async onAdded(o) {
        this._viewer = o,
        this._typeGenerators.image = tpImageInputGenerator(this._viewer),
        o.addEventListener("preRender", this._preRender),
        o.addEventListener("postRender", this._postRender),
        o.addEventListener("preFrame", this._preFrame),
        o.addEventListener("postFrame", this._postFrame)
    }
    async onDispose(o) {
        this.dispose()
    }
    async onRemove(o) {
        this._viewer = void 0,
        o.removeEventListener("preRender", this._preRender),
        o.removeEventListener("postRender", this._postRender),
        o.removeEventListener("preFrame", this._preFrame),
        o.removeEventListener("postFrame", this._postFrame),
        this.dispose()
    }
    setupPluginUi(o) {
        var c;
        const h = (c = this._viewer) === null || c === void 0 ? void 0 : c.getPlugin(o);
        if (!h)
            return void console.warn("plugin not found:", o);
        this._plugins.push(h),
        h.uiConfig && (h.uiConfig.limitedUi = !0),
        h.uiConfig && h.uiConfig.hidden === void 0 && (h.uiConfig.hidden = !1),
        this._appendUiObject(h);
        const _ = h.uiConfig;
        if (_ != null && _.uiRef && h.toJSON) {
            const b = typeof h.toJSON == "function" ? h.toJSON() : null;
            h.resetDefaults = async () => {
                var it, at;
                await ((it = h.fromJSON) === null || it === void 0 ? void 0 : it.call(h, b)),
                (at = _.uiRefresh) === null || at === void 0 || at.call(_, "postFrame", !0)
            }
            ;
            const _e = _.uiRef.controller_.view.element
              , nt = ee$1({
                innerHTML: "&#8942;",
                classList: ["pluginOptionsButton"],
                elementTag: "button"
            });
            nt.onclick = it => {
                const at = {};
                typeof h.toJSON == "function" && (at["download preset"] = async () => {
                    var pt, ht;
                    const _t = (ht = (pt = this._viewer) === null || pt === void 0 ? void 0 : pt.getPlugin(AssetManagerPlugin)) === null || ht === void 0 ? void 0 : ht.exportPluginPreset(h);
                    await N$2(new Blob([JSON.stringify(_t, null, 2)],{
                        type: "application/json"
                    }), "preset." + h.constructor.PluginType + ".json"),
                    CustomContextMenu.Remove()
                }
                ),
                typeof h.fromJSON == "function" && (at["upload preset"] = async () => {
                    var pt, ht, _t;
                    CustomContextMenu.Remove();
                    const vt = await ge$1(!1, !1);
                    if (vt.length === 0)
                        return;
                    const bt = vt[0]
                      , St = await bt.text()
                      , At = JSON.parse(St);
                    await ((ht = (pt = this._viewer) === null || pt === void 0 ? void 0 : pt.getPlugin(AssetManagerPlugin)) === null || ht === void 0 ? void 0 : ht.importPluginPreset(At, h)),
                    (_t = _.uiRefresh) === null || _t === void 0 || _t.call(_, "postFrame", !0)
                }
                ,
                b && (at["reset defaults"] = async () => {
                    var pt, ht;
                    CustomContextMenu.Remove(),
                    await ((ht = (pt = h).resetDefaults) === null || ht === void 0 ? void 0 : ht.call(pt))
                }
                ));
                const ut = CustomContextMenu.Create(at, _e.clientWidth - 120, 12);
                _e.append(ut),
                it.preventDefault()
            }
            ,
            _e.appendChild(nt)
        }
        return _
    }
    setupPlugins(...o) {
        o.forEach(c => this.setupPluginUi(c))
    }
    refreshPluginsEnabled() {
        this._plugins.forEach(o => {
            var c;
            const h = o.uiConfig;
            h && (Ee$1(h.hidden) !== !0 ? (c = h.uiRefresh) === null || c === void 0 || c.call(h, "postFrame", !0) : h.uiRef && (h.uiRef.hidden = !0))
        }
        )
    }
    async alert(o) {
        return this._viewer ? this._viewer.alert(o) : super.alert(o)
    }
    async confirm(o) {
        return this._viewer ? this._viewer.confirm(o) : super.confirm(o)
    }
    async prompt(o, c, h=!0) {
        return this._viewer ? this._viewer.prompt(o, c, h) : super.prompt(o, c, h)
    }
    _colorModeChanged() {
        document.body.classList.remove("tpTheme-black", "tpTheme-white", "tpTheme-blue"),
        document.body.classList.add("tpTheme-" + this.colorMode),
        localStorage && localStorage.setItem("tpTheme", this.colorMode)
    }
}

export default TweakpaneUiPlugin;
