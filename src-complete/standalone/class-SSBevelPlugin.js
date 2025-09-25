/* Standalone Class: SSBevelPlugin */

class SSBevelPlugin extends GenericFilterPlugin {
    get bevelTarget() {
        return this._bevelTarget
    }
    constructor(o=!0) {
        super(),
        this.passId = "ssBevel",
        this._beforeFilters = ["render"],
        this._afterFilters = ["gbuffer", "normalBuffer"],
        this._requiredFilters = ["render", "gbuffer", "normalBuffer"],
        this._lastEnabled = !1,
        this.dependencies = [AssetManagerPlugin, GBufferPlugin, NormalBufferPlugin],
        this.enabled = o,
        this.setDirty = this.setDirty.bind(this),
        this._loaderCreate = this._loaderCreate.bind(this),
        this.updateGBuffer = this.updateGBuffer.bind(this)
    }
    _loaderCreate({loader: o}) {
        o.isGLTFLoader2 && o.register(c => new GLTFMaterialsSSBevelExtensionImport(c))
    }
    passCtor(o) {
        var c, h;
        return this._bevelTarget = o.renderer.createTarget({
            depthBuffer: !0,
            type: three_module.ix0,
            minFilter: three_module.hxR,
            magFilter: three_module.hxR,
            generateMipmaps: !1
        }),
        this._bevelTarget.texture.name = "bevelBuffer",
        this._bevelTarget.texture.generateMipmaps = !1,
        o.getPluginByType("debug"),
        new SSBevelPass(o.renderer,this._bevelTarget,(h = (c = o.getPlugin(GBufferPlugin)) === null || c === void 0 ? void 0 : c.getUnpackSnippet()) !== null && h !== void 0 ? h : "",o)
    }
    async onAdded(o) {
        var c, h, _, b, _e, nt, it, at;
        await super.onAdded(o);
        const ut = o.getPlugin(AssetManagerPlugin);
        return !((c = this.pass) === null || c === void 0) && c.passObject.materialExtension && ((h = ut == null ? void 0 : ut.materials) === null || h === void 0 || h.registerMaterialExtension((_ = this.pass) === null || _ === void 0 ? void 0 : _.passObject.materialExtension)),
        (b = ut == null ? void 0 : ut.importer) === null || b === void 0 || b.addEventListener("loaderCreate", this._loaderCreate),
        (it = (nt = (_e = ut == null ? void 0 : ut.exporter) === null || _e === void 0 ? void 0 : _e.getExporter("gltf", "glb")) === null || nt === void 0 ? void 0 : nt.extensions) === null || it === void 0 || it.push(glTFMaterialsSSBevelExtensionExport),
        (at = o.getPlugin(GBufferPlugin)) === null || at === void 0 || at.registerGBufferUpdater(this.updateGBuffer),
        super.onAdded(o)
    }
    async onRemove(o) {
        return o.renderer.disposeTarget(this._bevelTarget),
        super.onRemove(o)
    }
    setDirty() {
        var o, c, h, _;
        (o = this._viewer) === null || o === void 0 || o.setDirty(),
        (_ = (c = this.pass) === null || c === void 0 ? void 0 : (h = c.passObject.materialExtension).setDirty) === null || _ === void 0 || _.call(h)
    }
    _update(o) {
        var c, h;
        let _ = this.enabled;
        if (_ && !this._lastEnabled) {
            const b = (c = this._viewer) === null || c === void 0 ? void 0 : c.getPluginByType("NormalBufferPlugin");
            b && !b.enabled && (b.enabled = !0),
            b || (h = this._viewer) === null || h === void 0 || h.console.error("SSBevelPlugin needs NormalBufferPlugin")
        }
        return this._lastEnabled = _,
        _
    }
    get uiConfig() {
        var o, c, h, _, b;
        const _e = (h = (c = (o = this.pass) === null || o === void 0 ? void 0 : o.passObject) === null || c === void 0 ? void 0 : c.uiConfig) !== null && h !== void 0 ? h : {};
        return (b = (_ = _e.children) === null || _ === void 0 ? void 0 : _.map(nt => Ee$1(nt))) === null || b === void 0 || b.flat(2).forEach(nt => nt && (nt.onChange = this.setDirty)),
        _e
    }
    updateGBuffer(o, c) {
        var h, _, b, _e;
        if (!((h = this._pass) === null || h === void 0) && h.passObject && o.isMesh && (!((_ = o.material) === null || _ === void 0) && _.userData)) {
            for (let at = 3; at < 8; at++)
                c.y = clearBit(c.y, at);
            const nt = (_e = (b = o.material) === null || b === void 0 ? void 0 : b.userData) === null || _e === void 0 ? void 0 : _e._ssBevel;
            let it = this._pass.passObject.sceneBevel && !(nt != null && nt.hasSSBevel) ? this._pass.passObject.sceneBevelRadius : (nt == null ? void 0 : nt.radius) || 0;
            it = Math.min(it, 31),
            it <<= 3,
            c.y = c.y | it
        }
    }
    getBevelMaterials() {
        var o;
        const c = new Set;
        return (o = this._viewer) === null || o === void 0 || o.scene.modelRoot.traverse(h => {
            var _, b;
            !((b = (_ = h.material) === null || _ === void 0 ? void 0 : _.userData) === null || b === void 0) && b._ssBevel.hasSSBevel && c.add(h.material)
        }
        ),
        Array.from(c)
    }
}

export default SSBevelPlugin;
