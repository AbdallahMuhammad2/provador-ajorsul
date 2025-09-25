/* Standalone Class: WebGiViewerElement */

class WebGiViewerElement extends HTMLElement {
    constructor() {
        super(),
        this._initialized = !1,
        this._state = {
            src: "",
            environment: ""
        },
        this._models = {},
        this._refreshingModels = !1,
        this._refreshingEnvironment = !1,
        this._environmentFromSource = null,
        this.viewerIndex = id$3++,
        this.canvasId = "webgi-viewer-" + this.viewerIndex,
        window.freeViewers || (window.freeViewers = []),
        this.attachShadow({
            mode: "open"
        }),
        this.wrapper = document.createElement("div"),
        this.wrapper.style.width = "100%",
        this.wrapper.style.height = "100%",
        this.wrapper.style.display = "block";
        const o = window.freeViewers.pop()
          , c = document.createElement("style");
        c.textContent = $`
            #${this.canvasId}{
              width: 100%; height: 100%; z-index: 1;
              display: block;
            }
            //.tippy-box[data-theme~='editor']{
            //    margin: 0.25rem !important;
            //    background-color: hsla(230, 10%, 30%, 1.00) !important;
            //    font-size: 0.9rem !important;
            //    color: hsla(230, 5%, 90%, 1.00) !important;
            //}
        `,
        tippy_js_dist_tippy.use({
            target: this.wrapper
        }),
        tippy_esm.setDefaultProps({
            duration: 300,
            arrow: !0,
            appendTo: () => this.wrapper
        }),
        this.shadowRoot.append(c, this.wrapper),
        this._initialized = !0,
        this._initialize(o).then(async () => this.refreshAll())
    }
    async refreshAll() {
        this.viewer && (this.viewer.renderer.displayCanvasScaling = parseFloat(this.getAttribute("renderScale") || this.getAttribute("renderscale") || this.viewer.renderer.displayCanvasScaling.toString())),
        await Promise.all([this.refreshModelSource(), this.refreshEnvironment()])
    }
    async _initialize(o) {
        o != null && o._lastState && (this._state.src = o._lastState.src || this._state.src,
        this._state.environment = o._lastState.environment || this._state.environment,
        delete o._lastState),
        o != null && o.__models && (this._models = {
            ...this._models,
            ...o.__models
        },
        delete o.__models),
        this.canvas = (o == null ? void 0 : o.canvas) || j(),
        this.canvas.setAttribute("id", this.canvasId),
        this.wrapper.append(this.canvas),
        this.viewer = o ?? new CoreViewerApp({
            canvas: this.canvas,
            useRgbm: this._getAttr("rgbm", "true") === "true",
            useGBufferDepth: this._getAttr("depth-prepass", "true") === "true",
            assetManager: {
                storage: window.caches ? await caches.open("webgi-cache-storage") : void 0
            }
        }),
        this.viewer && (this.viewer.renderer.displayCanvasScaling = parseFloat(this.getAttribute("renderScale") || this.getAttribute("renderscale") || this.viewer.renderer.displayCanvasScaling.toString())),
        o || await this.viewer.initialize({
            debug: this._getAttr("debug", "false") === "true",
            ground: this._getAttr("ground", "baked") === "baked",
            bloom: this._getAttr("bloom", "true") === "true",
            depthTonemap: !0
        }),
        this.dispatchEvent(new Event("initialized"))
    }
    connectedCallback() {
        this._initialized && this.viewer && (this.viewer.resize(),
        this.viewer.enabled = !0,
        this.dispatchEvent(new Event("connected")))
    }
    disconnectedCallback() {
        var o, c;
        this.viewer && (this.getAttribute("disposeOnRemove") === "true" || this.getAttribute("disposeonremove") === "true" ? ((o = this.canvas) === null || o === void 0 || o.remove(),
        this.clearViewer(),
        this.viewer.dispose(),
        this.viewer = void 0,
        this.canvas = void 0,
        this._initialized = !1) : this.getAttribute("autoManageViewers") === "true" || this.getAttribute("automanageviewers") === "true" ? ((c = this.canvas) === null || c === void 0 || c.remove(),
        this.viewer._lastState = {
            ...this._state
        },
        this.viewer._lastState.src = "",
        this.clearViewer(),
        window.freeViewers.push(this.viewer),
        this.viewer = void 0,
        this.canvas = void 0,
        this._initialized = !1) : this.viewer.enabled = !1,
        this.dispatchEvent(new Event("disconnected")))
    }
    adoptedCallback() {
        this.viewer && (this.viewer.resize(),
        this.viewer.enabled = !0)
    }
    static get observedAttributes() {
        return ["src", "environment", "renderScale"]
    }
    attributeChangedCallback(o, c, h) {
        this.refreshAll()
    }
    clearViewer() {
        var o, c;
        (o = this.viewer) === null || o === void 0 || o.scene.disposeSceneModels(),
        (c = this.viewer) === null || c === void 0 || c.scene.setEnvironment(null),
        Object.values(this._models).forEach(async h => h.then(_ => _.forEach(b => b.dispose && b.dispose()))),
        this._models = {}
    }
    async refreshModelSource() {
        if (!this.viewer)
            return;
        const o = this._getAttr("src", placeholderModel);
        if (o === this._state.src || this._refreshingModels)
            return;
        this._refreshingModels = !0;
        const c = [o]
          , h = []
          , _ = []
          , b = this.viewer.scene.environment;
        this.viewer.scene.environment = null,
        this._environmentFromSource = null;
        for (const nt of c)
            !this._models[nt] && nt && (this._models[nt] = this.viewer.getManager().importer.importPath(nt, {
                autoScale: this._getAttr("auto-scale", "true") === "true",
                autoCenter: this._getAttr("auto-center", "true") === "true",
                processImported: !0,
                pathOverride: this._getAttr("filename", "") || void 0
            }));
        const _e = this.viewer.scene.environment;
        _e ? this._environmentFromSource = _e : this.viewer.scene.environment = b;
        for (const [nt,it] of Object.entries(this._models))
            c.includes(nt) ? h.push(it.then(at => [nt, at])) : _.push(it);
        await Promise.all([Promise.all(h).then(async nt => Promise.all(nt.map(async it => (this._models[it[0]] = this.viewer.getManager().importer.processImported(it[1]),
        this._models[it[0]])))).then(nt => {
            for (const it of nt)
                for (const at of it)
                    at && at.assetType === "model" && this.viewer.scene.addSceneObject(at)
        }
        ), Promise.all(_).then(nt => {
            for (const it of nt)
                for (const at of it)
                    at && at.assetType === "model" && at.modelObject.removeFromParent()
        }
        )]),
        this._state.src = o,
        this._refreshingModels = !1
    }
    async refreshEnvironment() {
        if (!this.viewer)
            return;
        if (!this.hasAttribute("environment"))
            return void (this._state.environment = null);
        if (this._environmentFromSource)
            return void this.viewer.console.warn("Environment is already set by model source, ignoring environment attribute.");
        const o = this._getAttr("environment", placeholderEnvironment);
        if (o === this._state.src || this._refreshingEnvironment)
            return;
        this._refreshingEnvironment = !0;
        const c = this.viewer.scene.getEnvironment()
          , h = o ? await this.viewer.getManager().importer.importSinglePath(o) : void 0;
        this._environmentFromSource ? this.viewer.console.warn("Environment is already set by model source, ignoring environment attribute.") : (h && h.assetType !== "texture" || await this.viewer.scene.setEnvironment(h),
        c == null || c.dispose(),
        this.dispatchEvent(new CustomEvent("environment-loaded",{
            detail: {
                src: o
            }
        })),
        this._state.environment = o,
        this._refreshingEnvironment = !1)
    }
    _getAttr(o, c) {
        return this.hasAttribute(o) ? this.getAttribute(o) : c
    }
    addEventListener(o, c, h) {
        super.addEventListener(o, c, h),
        o === "initialized" && this._initialized && this.dispatchEvent(new Event("initialized"))
    }
}

export default WebGiViewerElement;
