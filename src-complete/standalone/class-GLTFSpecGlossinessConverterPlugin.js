/* Standalone Class: GLTFSpecGlossinessConverterPlugin */

class GLTFSpecGlossinessConverterPlugin extends AViewerPlugin {
    _loaderCreate({loader: o}) {
        o.isGLTFLoader2 && o.register(gltfKhrPbrSpecularGlossinessConverter(async c => {
            var h, _;
            return !!this.enabled && (!this.confirm || (_ = (h = this._viewer) === null || h === void 0 ? void 0 : h.confirm(this.confirmMessage || c)) === null || _ === void 0 || _)
        }
        ))
    }
    constructor() {
        super(),
        this.enabled = !0,
        this.toJSON = void 0,
        this.dependencies = [AssetManagerPlugin],
        this.confirm = !0,
        this.confirmMessage = "GLTF Load: This file includes specular glossiness materials, do you want to convert it to metallic roughness before load?",
        this._loaderCreate = this._loaderCreate.bind(this)
    }
    async onAdded(o) {
        var c;
        await super.onAdded(o);
        const h = o.getPlugin(AssetManagerPlugin);
        (c = h == null ? void 0 : h.importer) === null || c === void 0 || c.addEventListener("loaderCreate", this._loaderCreate)
    }
    async onRemove(o) {
        var c, h;
        return (h = (c = o.getPlugin(AssetManagerPlugin)) === null || c === void 0 ? void 0 : c.importer) === null || h === void 0 || h.removeEventListener("loaderCreate", this._loaderCreate),
        super.onRemove(o)
    }
}

export default GLTFSpecGlossinessConverterPlugin;
