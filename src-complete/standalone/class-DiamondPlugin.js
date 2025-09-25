/* Standalone Class: DiamondPlugin */

class DiamondPlugin extends BaseIJewel3DKeyPlugin {
    get envMapRotation() {
        var o, c;
        return (c = (o = this.envMap) === null || o === void 0 ? void 0 : o.rotation) !== null && c !== void 0 ? c : 0
    }
    set envMapRotation(o) {
        var c;
        const h = [this.envMap, this.envMap2, this.envMap3];
        for (const _ of h)
            _ && (_.rotation = o,
            (c = this._viewer) === null || c === void 0 || c.scene.setDirty())
    }
    refreshEnvMaps() {
        var o, c, h;
        if (!this._viewer)
            return;
        const _ = this.getEnvMaps()
          , b = ((c = (o = this._viewer.getPlugin(AssetManagerPlugin)) === null || o === void 0 ? void 0 : o.materials) === null || c === void 0 ? void 0 : c.getMaterialsOfType(DiamondMaterial.TypeSlug)) || [];
        for (const _e of b)
            _e && (_e.envMaps = _);
        (h = this._viewer) === null || h === void 0 || h.scene.setDirty()
    }
    constructor() {
        super(),
        this.offsetCache = {},
        this.enabled = !0,
        this.envMap = null,
        this.envMap2 = null,
        this.envMap3 = null,
        this.forceSceneEnvMap = !1,
        this.getEnvMaps = () => {
            var o;
            if (!this.forceSceneEnvMap && this.envMap)
                return [this.envMap, this.envMap2, this.envMap3];
            const c = ((o = this._viewer) === null || o === void 0 ? void 0 : o.scene.environment) || null;
            return [c, c, c]
        }
        ,
        this._modelProcessor = {
            forAssetType: "model",
            processAsync: async (o, c) => {
                const h = [];
                return o.modelObject.traverse(_ => {
                    var b, _e, nt, it;
                    const at = (_e = (b = _.userData) === null || b === void 0 ? void 0 : b.gltfExtensions) === null || _e === void 0 ? void 0 : _e[DiamondPlugin.DIAMOND_GLTF_EXTENSION];
                    at && _.geometry && (this.prepareDiamondMesh(_, at),
                    delete _.userData.gltfExtensions[DiamondPlugin.DIAMOND_GLTF_EXTENSION]),
                    _.material && !h.includes(_.material) && (!((it = (nt = _.material.userData) === null || nt === void 0 ? void 0 : nt.gltfExtensions) === null || it === void 0) && it[DiamondPlugin.DIAMOND_GLTF_EXTENSION]) && (_.material.materialObject || console.warn("WebGi DiamondPlugin: material not processed", _.material),
                    h.push(_.material))
                }
                ),
                h.forEach(_ => {
                    const b = _.userData.gltfExtensions[DiamondPlugin.DIAMOND_GLTF_EXTENSION];
                    b && this._convertToDiamondMaterial(_, b)
                }
                ),
                o
            }
        },
        this.uiConfig = {
            type: "folder",
            label: "Diamonds",
            children: [{
                type: "checkbox",
                label: "Use Scene Environment",
                property: [this, "forceSceneEnvironment"],
                limitedUi: !0
            }, {
                type: "image",
                label: "Environment",
                hidden: () => this.forceSceneEnvMap,
                property: [this, "envMap"],
                limitedUi: !0
            }, {
                type: "slider",
                bounds: [0, 2 * Math.PI],
                hidden: () => this.forceSceneEnvMap,
                label: "Env Rotation",
                property: [this, "envMapRotation"],
                limitedUi: !0
            }, {
                type: "image",
                label: "Environment 2",
                hidden: () => this.forceSceneEnvMap,
                property: [this, "envMap2"]
            }, {
                type: "image",
                label: "Environment 3",
                hidden: () => this.forceSceneEnvMap,
                property: [this, "envMap3"]
            }, {
                type: "button",
                label: "Make Diamond",
                hidden: () => {
                    var o, c, h;
                    const _ = (h = (c = (o = this._viewer) === null || o === void 0 ? void 0 : o.getPlugin(PickingPlugin)) === null || c === void 0 ? void 0 : c.getSelectedObject()) === null || h === void 0 ? void 0 : h.material;
                    return !!Array.isArray(_) || (_ == null ? void 0 : _.typeSlug) !== MeshStandardMaterial2.TypeSlug
                }
                ,
                value: async () => {
                    var o, c, h, _, b, _e;
                    const nt = (c = (o = this._viewer) === null || o === void 0 ? void 0 : o.getPlugin(PickingPlugin)) === null || c === void 0 ? void 0 : c.getSelectedObject();
                    if (!(nt != null && nt.material))
                        return;
                    const it = await ((h = this._viewer) === null || h === void 0 ? void 0 : h.prompt("Cache key: Enter optional cache key unique to the diamond shape.", "", !1))
                      , at = (await ((_ = this._viewer) === null || _ === void 0 ? void 0 : _.prompt("Cache size: Enter size of the cache [64-1024]", "512", !1)) || "512").toLowerCase()
                      , ut = at.endsWith("high") ? "high" : at.endsWith("low") ? "low" : "medium";
                    let pt = parseInt(at);
                    isFinite(pt) || (pt = 512),
                    pt < 64 && (pt = 64),
                    ((b = nt.material.userData) === null || b === void 0 ? void 0 : b.__appliedMeshes.size) > 1 && await ((_e = this._viewer) === null || _e === void 0 ? void 0 : _e.confirm("Convert all: Apply diamond material to all the meshes with the same material?")) ? this.makeDiamond(nt.material, {
                        cacheKey: it || void 0,
                        normalMapRes: pt,
                        normalMapPrecision: ut
                    }, {}) : this.makeDiamondMesh(nt, {
                        cacheKey: it || void 0,
                        normalMapRes: pt,
                        normalMapPrecision: ut
                    }, {}),
                    this.refreshUi()
                }
                ,
                limitedUi: !0
            }, {
                type: "button",
                label: "Make Standard",
                hidden: () => {
                    var o, c, h;
                    const _ = (h = (c = (o = this._viewer) === null || o === void 0 ? void 0 : o.getPlugin(PickingPlugin)) === null || c === void 0 ? void 0 : c.getSelectedObject()) === null || h === void 0 ? void 0 : h.material;
                    return !!Array.isArray(_) || (_ == null ? void 0 : _.typeSlug) !== DiamondMaterial.TypeSlug
                }
                ,
                value: async () => {
                    var o, c, h, _, b, _e, nt, it;
                    const at = (c = (o = this._viewer) === null || o === void 0 ? void 0 : o.getPlugin(PickingPlugin)) === null || c === void 0 ? void 0 : c.getSelectedObject()
                      , ut = at == null ? void 0 : at.material;
                    if (!ut)
                        return;
                    const pt = ut.userData.__baseMaterial;
                    let ht = (b = (_ = (h = this._viewer) === null || h === void 0 ? void 0 : h.getManager()) === null || _ === void 0 ? void 0 : _.materials) === null || b === void 0 ? void 0 : b.findMaterial(pt);
                    if (ht && !ht.isDiamondMaterial || (ht = (_e = this._viewer) === null || _e === void 0 ? void 0 : _e.createPhysicalMaterial({
                        color: ut.color
                    })),
                    ht) {
                        const _t = ut.userData.__appliedMeshes.size > 1 && await ((nt = this._viewer) === null || nt === void 0 ? void 0 : nt.confirm("Convert all with this material?")) ? Array.from(ut.userData.__appliedMeshes) : [at];
                        for (const vt of _t)
                            (it = vt == null ? void 0 : vt.setMaterial) === null || it === void 0 || it.call(vt, ht),
                            this.unprepareDiamondMesh(vt)
                    }
                    this.refreshUi()
                }
                ,
                limitedUi: !0
            }, {
                type: "button",
                label: "Auto Instance Diamonds (dev)",
                hidden: () => {
                    var o, c, h, _;
                    const b = (h = (c = (o = this._viewer) === null || o === void 0 ? void 0 : o.getPlugin(PickingPlugin)) === null || c === void 0 ? void 0 : c.getSelectedObject()) === null || h === void 0 ? void 0 : h.material;
                    return !!Array.isArray(b) || (b == null ? void 0 : b.typeSlug) !== DiamondMaterial.TypeSlug || ((_ = b.userData.__appliedMeshes) === null || _ === void 0 ? void 0 : _.size) < 2
                }
                ,
                value: async () => {
                    var o, c;
                    const h = (c = (o = this._viewer) === null || o === void 0 ? void 0 : o.getPlugin(PickingPlugin)) === null || c === void 0 ? void 0 : c.getSelectedObject();
                    if (!h)
                        return;
                    const _ = h.material;
                    _ && !Array.isArray(_) && autoGPUInstanceMeshes(_)
                }
            }, {
                type: "button",
                label: "Clear Cache",
                value: () => {
                    this.disposeAllCacheMaps()
                }
            }]
        },
        this.refreshEnvMaps = this.refreshEnvMaps.bind(this),
        this.refreshUi = this.refreshUi.bind(this)
    }
    refreshUi() {
        var o, c, h;
        (o = this._viewer) === null || o === void 0 || o.setDirty(),
        (h = (c = this.uiConfig) === null || c === void 0 ? void 0 : c.uiRefresh) === null || h === void 0 || h.call(c, "postFrame", !0)
    }
    async onAdded(o) {
        var c, h, _, b, _e, nt, it;
        this._normalCapture = new CubeNormalsCaptureHelper(o.renderer),
        this.offsetCache = {},
        o.scene.addEventListener("materialChanged", ht => {
            var _t, vt, bt, St, At;
            if (!((_t = ht.material) === null || _t === void 0) && _t.isDiamondMaterial) {
                const Et = ht.material
                  , Pt = ht.mesh || ht.object;
                if (Pt.geometry && !(!((vt = this._normalCapture) === null || vt === void 0) && vt.hasCapturedNormalMap(Pt.geometry))) {
                    const Dt = (At = (St = (bt = Et == null ? void 0 : Et.userData) === null || bt === void 0 ? void 0 : bt.gltfExtensions) === null || St === void 0 ? void 0 : St[DiamondPlugin.DIAMOND_GLTF_EXTENSION]) !== null && At !== void 0 ? At : {};
                    Dt.cacheKey === void 0 && !Pt.userData._diamondCacheKey && (Et != null && Et.name) && (Dt.cacheKey = Et.name),
                    this.prepareDiamondMesh(Pt, Dt)
                }
                const It = this.getEnvMaps();
                Et.envMaps = It
            }
        }
        ),
        o.scene.addEventListener("environmentChanged", this.refreshEnvMaps);
        const at = o.getPlugin(AssetManagerPlugin);
        (c = at == null ? void 0 : at.importer) === null || c === void 0 || c.processors.add("model", this._modelProcessor),
        (h = o.getPlugin(PickingPlugin)) === null || h === void 0 || h.addEventListener("selectedObjectChanged", this.refreshUi);
        const ut = this.getEnvMaps
          , pt = new Importer(class extends SimpleJSONLoader {
            async loadAsync(ht, _t) {
                var vt;
                const bt = await super.loadAsync(ht, _t);
                return bt.type === DiamondMaterial.TYPE || bt.isDiamondMaterialParameters ? (bt.envMap = ut(),
                (vt = at == null ? void 0 : at.materials) === null || vt === void 0 ? void 0 : vt.generateFromTemplate("diamond", bt)) : (console.error("Invalid material type for Diamond Material.", bt),
                null)
            }
        }
        ,[DiamondMaterial.TypeSlug],!1);
        return (_ = at == null ? void 0 : at.importer) === null || _ === void 0 || _.Importers.push(pt),
        (nt = (_e = (b = at == null ? void 0 : at.exporter) === null || b === void 0 ? void 0 : b.getExporter("gltf", "glb")) === null || _e === void 0 ? void 0 : _e.extensions) === null || nt === void 0 || nt.push(diamondMaterialGLTFExportExtension),
        (it = at == null ? void 0 : at.materials) === null || it === void 0 || it.registerMaterialTemplate({
            name: "diamond",
            materialType: DiamondMaterial.TYPE,
            isDiamondMaterialParameters: !0,
            generator: (ht, _t) => {
                const vt = !(_t != null && _t.metadata || !_t.isDiamondMaterialParameters) || (_t == null ? void 0 : _t.metadata) && (_t == null ? void 0 : _t.metadata.version) <= 4.5
                  , bt = _t == null ? void 0 : _t.color;
                vt && typeof _t.color == "number" && (_t.color = new three_module.Q1f().setHex(_t.color, three_module.Zr2).getHex());
                const St = new DiamondMaterial(ht);
                return St.envMaps = this.getEnvMaps(),
                !_t || _t.isMeshStandardMaterial || _t.isMeshPhysicalMaterial || St.copyProps(_t),
                _t.color = bt,
                St
            }
        }),
        super.onAdded(o)
    }
    async onRemove(o) {
        var c, h, _, b;
        return (c = this._normalCapture) === null || c === void 0 || c.dispose(),
        this._normalCapture = void 0,
        this.offsetCache = {},
        (_ = (h = o.getPlugin(AssetManagerPlugin)) === null || h === void 0 ? void 0 : h.importer) === null || _ === void 0 || _.processors.remove("model", this._modelProcessor),
        (b = o.getPlugin(PickingPlugin)) === null || b === void 0 || b.removeEventListener("selectedObjectChanged", this.refreshUi),
        super.onRemove(o)
    }
    unprepareDiamondMesh(o) {
        var c;
        o.userData && (delete o.userData._diamondCacheKey,
        delete o.userData._diamondNormalMapRes,
        delete o.userData._diamondNormalMapPrecision,
        o.geometry && (this._removeOffsets(o.geometry),
        (c = this._normalCapture) === null || c === void 0 || c.removeNormalMap(o.geometry)))
    }
    prepareDiamondMesh(o, {cacheKey: c, normalMapRes: h, normalMapPrecision: _}) {
        var b, _e, nt;
        this.use(),
        o.userData._diamondCacheKey = c ?? o.userData._diamondCacheKey,
        o.userData._diamondNormalMapRes = h ?? o.userData._diamondNormalMapRes,
        o.userData._diamondNormalMapPrecision = _ ?? o.userData._diamondNormalMapPrecision,
        c = c && c.length > 0 ? c.includes(";" + o.geometry.uuid) ? c : c + ";" + o.geometry.uuid : o.geometry.uuid,
        this._computeOffsets(o.geometry, o.geometry.uuid);
        const it = (_e = (b = this._normalCapture) === null || b === void 0 ? void 0 : b.captureNormalMap(o.geometry, c, h, _, o)) !== null && _e !== void 0 ? _e : [void 0, !1]
          , at = (nt = this._viewer) === null || nt === void 0 ? void 0 : nt.getPluginByType("debug");
        at && it && (at.counters.normalsCapture || (at.counters.normalsCapture = 0),
        at.counters.normalsCapture++,
        console.log("DEBUG: new normal map captured", at.counters.normalsCapture, c),
        at.addTexture("normal" + at.counters.normalsCapture, () => {
            var ut, pt;
            return (pt = (ut = o.geometry) === null || ut === void 0 ? void 0 : ut.userData._normalsCaptureMap) === null || pt === void 0 ? void 0 : pt.texture
        }
        , [40, 110 * at.counters.normalsCapture - 100, 200, 100], void 0, void 0, "postRender", !0))
    }
    makeDiamond(o, c, h) {
        var _, b;
        Array.from((_ = o == null ? void 0 : o.userData.__appliedMeshes) !== null && _ !== void 0 ? _ : []).forEach(_e => {
            _e != null && _e.isMesh && _e.geometry && this.prepareDiamondMesh(_e, c)
        }
        ),
        this._convertToDiamondMaterial(o, h),
        (b = this._viewer) === null || b === void 0 || b.setDirty()
    }
    makeDiamondMesh(o, c, h) {
        if (!o.modelObject.isMesh || !o.geometry || !o.setMaterial)
            return;
        this.prepareDiamondMesh(o.modelObject, c);
        const _ = Array.isArray(o.material) ? o.material[0] : o.material
          , b = this._convertToDiamondMaterial(_, h, !1);
        o.setMaterial(b)
    }
    _convertToDiamondMaterial(o, c={
        isDiamond: !0
    }, h=!0) {
        var _, b, _e, nt, it, at, ut, pt;
        let ht = {
            ...c ?? {}
        };
        ht.isDiamond || ht.isDiamondMaterialParameters ? Array.isArray(ht.boostFactors) && (ht.boostFactors = new three_module.Pq0().fromArray(ht.boostFactors)) : ht = {
            isDiamondMaterialParameters: !0
        },
        ht.color = (b = (_ = ht.color) !== null && _ !== void 0 ? _ : o == null ? void 0 : o.color) !== null && b !== void 0 ? b : new three_module.Q1f(1,1,1),
        ht.name = (nt = (_e = ht.name) !== null && _e !== void 0 ? _e : o == null ? void 0 : o.name) !== null && nt !== void 0 ? nt : "diamond";
        const _t = (ut = (at = (it = this._viewer) === null || it === void 0 ? void 0 : it.getManager()) === null || at === void 0 ? void 0 : at.materials) === null || ut === void 0 ? void 0 : ut.generateFromTemplate("diamond", ht);
        if (_t && o && !o.isDiamondMaterial && (_t.userData.__baseMaterial = o.uuid),
        h) {
            const vt = bt => {
                var St;
                return (St = bt.setMaterial) !== null && St !== void 0 ? St : At => {
                    bt.material = At.materialObject
                }
            }
            ;
            Array.from((pt = o == null ? void 0 : o.userData.__appliedMeshes) !== null && pt !== void 0 ? pt : []).forEach(bt => {
                vt(bt)(_t),
                this.prepareDiamondMesh(bt, c)
            }
            )
        }
        return _t
    }
    _computeOffsets(o, c, h=!1) {
        var _;
        if (o.userData.normalsCaptureOffsets) {
            if (rt("recomputeOffsets") === null)
                return o.userData.normalsCaptureOffsets;
            console.warn("WebGi DiamondPlugin: recomputeOffsets", o.userData.normalsCaptureOffsets)
        }
        let b;
        !((_ = o.morphAttributes) === null || _ === void 0) && _.position && (b = o.morphAttributes,
        o.morphAttributes = {}),
        o.computeBoundingBox();
        const _e = o.boundingBox.getCenter(new three_module.Pq0).toArray()
          , nt = computeEigenVectors(o).toArray()
          , it = new three_module.kn4().fromArray(nt).invert()
          , at = new three_module.Pq0().fromArray(_e).applyMatrix4(it).toArray()
          , ut = {
            center: _e,
            offsetMatrix: nt,
            offsetMatrixInv: it.toArray(),
            radius: 1,
            centerOffset: at
        };
        return o.userData.normalsCaptureOffsets = ut,
        b && (o.morphAttributes = b,
        o.computeBoundingBox()),
        rt("recomputeOffsets") !== null && console.warn("WebGi DiamondPlugin: recomputeOffsets", ut),
        ut
    }
    _removeOffsets(o) {
        delete o.userData.normalsCaptureOffsets
    }
    getAllCacheMaps() {
        var o;
        const c = new Set;
        return (o = this._viewer) === null || o === void 0 || o.scene.modelObject.traverse(h => {
            h.geometry && h.geometry.userData._normalsCaptureMap && c.add(h.geometry.userData._normalsCaptureMap)
        }
        ),
        [...c]
    }
    disposeCacheMap(o) {
        var c;
        (c = this._normalCapture) === null || c === void 0 || c.disposeTarget(o)
    }
    disposeAllCacheMaps() {
        var o;
        (o = this._normalCapture) === null || o === void 0 || o.disposeAllTargets()
    }
}

export default DiamondPlugin;
