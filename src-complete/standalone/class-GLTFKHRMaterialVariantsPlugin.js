/* Standalone Class: GLTFKHRMaterialVariantsPlugin */

class GLTFKHRMaterialVariantsPlugin extends AViewerPlugin {
    constructor() {
        super(),
        this.enabled = !0,
        this.toJSON = void 0,
        this.dependencies = [AssetManagerPlugin],
        this.variants = {},
        this.selectedVariant = "",
        this._objectAdded = o => {
            var c, h;
            const _ = o.object;
            (_ == null ? void 0 : _.assetType) === "model" && _.modelObject && this._viewer && (_.modelObject.traverse(b => {
                var _e, nt, it, at, ut;
                if (b.userData._variantMaterials)
                    for (const _t of Object.values(b.userData._variantMaterials))
                        _t != null && _t.material && (_t.material = ((it = (nt = (_e = this._viewer) === null || _e === void 0 ? void 0 : _e.getManager()) === null || nt === void 0 ? void 0 : nt.materials) === null || it === void 0 ? void 0 : it.processMaterial(_t.material, {})) || _t.material);
                const pt = (ut = (at = b.userData) === null || at === void 0 ? void 0 : at.__importData) === null || ut === void 0 ? void 0 : ut[khrMaterialsVariantsGLTF];
                if (!pt)
                    return;
                const ht = pt.names || [];
                for (const _t of ht)
                    this.variants[_t] || (this.variants[_t] = []),
                    this.variants[_t].push(b);
                delete b.userData.__importData[khrMaterialsVariantsGLTF]
            }
            ),
            (h = (c = this.uiConfig).uiRefresh) === null || h === void 0 || h.call(c))
        }
        ,
        this.uiConfig = {
            type: "folder",
            label: "KHR Material Variants",
            children: [ () => ({
                children: [null, ...Object.keys(this.variants)].map(o => o ? {
                    label: o
                } : {
                    label: "none",
                    value: ""
                }),
                type: "dropdown",
                label: "Variant",
                property: [this, "selectedVariant"]
            })]
        },
        this._loaderCreate = this._loaderCreate.bind(this)
    }
    async onAdded(o) {
        var c, h, _, b;
        await super.onAdded(o),
        o.scene.addEventListener("addSceneObject", this._objectAdded);
        const _e = o.getPlugin(AssetManagerPlugin);
        (c = _e == null ? void 0 : _e.importer) === null || c === void 0 || c.addEventListener("loaderCreate", this._loaderCreate),
        (b = (_ = (h = _e == null ? void 0 : _e.exporter) === null || h === void 0 ? void 0 : h.getExporter("gltf", "glb")) === null || _ === void 0 ? void 0 : _.extensions) === null || b === void 0 || b.push(gltfExporterMaterialsVariantsExtensionExport)
    }
    _loaderCreate({loader: o}) {
        o.isGLTFLoader2 && o.register(c => new GLTFMaterialsVariantsExtensionImport(c))
    }
    async onRemove(o) {
        var c, h, _, b, _e, nt;
        o.scene.removeEventListener("addSceneObject", this._objectAdded);
        const it = o.getPlugin(AssetManagerPlugin);
        (c = it.importer) === null || c === void 0 || c.removeEventListener("loaderCreate", this._loaderCreate);
        const at = (b = (_ = (h = it.exporter) === null || h === void 0 ? void 0 : h.getExporter("gltf", "glb")) === null || _ === void 0 ? void 0 : _.extensions) === null || b === void 0 ? void 0 : b.indexOf(gltfExporterMaterialsVariantsExtensionExport);
        return at !== void 0 && at !== -1 && ((nt = (_e = it.exporter.getExporter("gltf", "glb")) === null || _e === void 0 ? void 0 : _e.extensions) === null || nt === void 0 || nt.splice(at, 1)),
        this.variants = {},
        super.onRemove(o)
    }
    _variantChanged() {
        this.applyVariant(this.selectedVariant || "", !0)
    }
    applyVariant(o, c=!1, h, _=!0) {
        if (!c && !h && this.selectedVariant === o || !o)
            return;
        h || (this.selectedVariant = o);
        const b = h ? Array.isArray(h) ? h : [h] : o ? this.variants[o] || [] : Object.values(this.variants).flat();
        for (const _e of b) {
            const nt = new Set
              , it = at => {
                var ut, pt;
                if (!at.userData._variantMaterials || nt.has(at))
                    return;
                const ht = o ? (ut = at.userData._variantMaterials[o]) === null || ut === void 0 ? void 0 : ut.material : at.userData._originalMaterial;
                ht && (at.userData._originalMaterial || (at.userData._originalMaterial = at.material),
                (pt = at == null ? void 0 : at.setMaterial) === null || pt === void 0 || pt.call(at, ht)),
                nt.add(at)
            }
            ;
            _ ? _e.traverse(it) : it(_e)
        }
    }
}

export default GLTFKHRMaterialVariantsPlugin;
