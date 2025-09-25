/* Standalone Class: GroundPlugin */

class GroundPlugin extends BaseGroundPlugin {
    get shadowBaker() {
        return this._shadowBaker
    }
    bakeShadows() {
        var o;
        (o = this._shadowBaker) === null || o === void 0 || o.reset()
    }
    constructor(o={}, c=!1) {
        super(o),
        this.bakedShadows = !0,
        this.groundReflection = !1,
        this.physicalReflections = !1,
        this.autoFrustumSize = !0,
        this.autoBakeShadows = !0,
        this._showDebug = c,
        c && this.dependencies.push(DebugPlugin),
        this._onSceneUpdate = this._onSceneUpdate.bind(this)
    }
    _createMesh() {
        const o = new Reflector2(this._geometry,this._viewer.renderer.createTarget({
            type: three_module.OUM,
            format: three_module.GWd,
            colorSpace: three_module.jf0,
            size: {
                width: 1024,
                height: 1024
            },
            generateMipmaps: !0,
            depthBuffer: !0,
            minFilter: three_module.$_I,
            magFilter: three_module.k6q
        }))
          , c = o.onBeforeRender;
        return o.onBeforeRender = (...h) => {
            var _, b, _e, nt, it;
            let at = (b = (_ = this._viewer) === null || _ === void 0 ? void 0 : _.getPluginByType("SSReflection")) === null || b === void 0 ? void 0 : b.passes.ssr.passObject;
            at && !at.enabled && (at = void 0),
            at && (at.enabled = !1);
            let ut = (it = (nt = (_e = this._viewer) === null || _e === void 0 ? void 0 : _e.getPluginByType("SSBevelPlugin")) === null || nt === void 0 ? void 0 : nt.pass) === null || it === void 0 ? void 0 : it.passObject;
            ut && !ut.enabled && (ut = void 0),
            ut && (ut.enabled = !1),
            c(...h),
            at && (at.enabled = !0),
            ut && (ut.enabled = !0)
        }
        ,
        o
    }
    async onAdded(o) {
        var c, h;
        await super.onAdded(o),
        this._showDebug && ((c = o.getPlugin(DebugPlugin)) === null || c === void 0 || c.addTexture("bake_ground_1", () => {
            var _, b;
            return (b = (_ = this._shadowBaker) === null || _ === void 0 ? void 0 : _.light.shadow.map) === null || b === void 0 ? void 0 : b.texture
        }
        , [100, 100, 200, 200]),
        (h = o.getPlugin(DebugPlugin)) === null || h === void 0 || h.addTexture("bake_ground_2", () => {
            var _, b;
            return (b = (_ = this._shadowBaker) === null || _ === void 0 ? void 0 : _.target) === null || b === void 0 ? void 0 : b.texture
        }
        , [100, 400, 400, 400], "texel = vec4(vec3(unpackRGBAToDepth(texel)), 1.0);"))
    }
    _postFrame() {
        super._postFrame(),
        this._viewer && this.enabled && this._shadowBaker && this.bakedShadows && this._shadowBaker.autoUpdateShadow()
    }
    _preRender() {
        super._preRender(),
        this._viewer && (this._mesh.reflectionTargetNeedsUpdate = this._viewer.renderer.frameCount < 1)
    }
    async onDispose(o) {
        return super.onDispose(o)
    }
    async onRemove(o) {
        return super.onRemove(o)
    }
    _removeMaterial() {
        var o, c, h, _;
        if (this._material) {
            if (this._shadowBaker && this._material.groundMatExtension && ((c = (o = this._material).unregisterMaterialExtensions) === null || c === void 0 || c.call(o, [this._shadowBaker.materialExtension]),
            delete this._material.groundMatExtension),
            this._material.reflectorMatExtension) {
                const b = this._mesh.materialExtension;
                b || console.warn("WebGi GroundPlugin: unable to find the extension to unregister"),
                (_ = (h = this._material).unregisterMaterialExtensions) === null || _ === void 0 || _.call(h, [b]),
                delete this._material.reflectorMatExtension
            }
            super._removeMaterial()
        }
    }
    _onSceneUpdate(o) {
        var c;
        super._onSceneUpdate(o),
        o.geometryChanged !== !1 && this.autoBakeShadows && ((c = this._shadowBaker) === null || c === void 0 || c.reset())
    }
    refreshOptions() {
        if (!this._viewer)
            return;
        this.bakedShadows && !this._shadowBaker ? (this._shadowBaker = new ShadowMapBaker(this._viewer),
        this._shadowBaker.attachedMesh = this._mesh) : !this.bakedShadows && this._shadowBaker && (this._shadowBaker.reset(),
        this._shadowBaker.cleanupMaterial());
        const o = this._mesh;
        o.isReflector2 && (o.enabled = this.groundReflection,
        o.reflectorModePhysical = this.physicalReflections),
        super.refreshOptions(),
        this._viewer.setDirty(this)
    }
    _refreshTransform() {
        if (this.autoFrustumSize) {
            const o = this.shadowBaker;
            if (o) {
                const c = this.size / 2;
                c !== o.light.shadowParams.frustumSize && (o.light.shadowParams.frustumSize = c,
                o.light.updateShadowParams(),
                o.reset())
            }
        }
        super._refreshTransform()
    }
    fromJSON(o, c) {
        return super.fromJSON(o, c) ? (o.autoFrustumSize === void 0 && (this.autoFrustumSize = !1),
        this) : null
    }
    _refreshMaterial() {
        var o, c, h, _;
        if (!this._viewer)
            return !1;
        const b = super._refreshMaterial();
        if (!this._material)
            return b;
        if (this.groundReflection && this._mesh.isReflector2 && !this._material.reflectorMatExtension) {
            const _e = this._mesh.materialExtension;
            _e.updaters = [this._viewer.scene, this._viewer.renderer],
            (c = (o = this._material).registerMaterialExtensions) === null || c === void 0 || c.call(o, [_e]),
            this._material.reflectorMatExtension = !0
        }
        return this.bakedShadows && this._shadowBaker && !this._material.groundMatExtension && ((_ = (h = this._material).registerMaterialExtensions) === null || _ === void 0 || _.call(h, [this._shadowBaker.materialExtension]),
        this._material.groundMatExtension = !0),
        this._material.materialObject.userData.ssreflDisabled = this.groundReflection,
        this._material.materialObject.userData.ssreflNonPhysical = !this.physicalReflections,
        this._viewer.setDirty(this),
        b
    }
    _extraUiConfig() {
        var o, c, h, _, b, _e, nt, it, at, ut, pt, ht, _t, vt, bt, St, At, Et, Pt, It, Dt, Gt, Bt, kt, Ut, Ht, Kt, Jt, or, ir;
        return [{
            label: "Baked Shadows",
            type: "checkbox",
            property: [this, "bakedShadows"]
        }, {
            label: "Shadow Frames",
            type: "input",
            hidden: () => !this._shadowBaker,
            stepSize: 1,
            bounds: [1, 1e3],
            property: [this._shadowBaker, "maxFrameNumber"]
        }, {
            label: "Alpha Vignette",
            type: "checkbox",
            hidden: () => !this._material || this._material.transmission < 1e-4 && !this._material.transparent,
            property: [this._shadowBaker, "alphaVignette"],
            limitedUi: !0,
            onChange: () => {
                var lr, ar;
                return (ar = (lr = this._uiConfig) === null || lr === void 0 ? void 0 : lr.uiRefresh) === null || ar === void 0 ? void 0 : ar.call(lr, "postFrame", !0)
            }
        }, {
            label: "Alpha Vignette Axis",
            type: "dropdown",
            hidden: () => {
                var lr;
                return !(!((lr = this._shadowBaker) === null || lr === void 0) && lr.alphaVignette) || !this._material || this._material.transmission < 1e-4 && !this._material.transparent
            }
            ,
            property: [this._shadowBaker, "alphaVignetteAxis"],
            children: ["x", "y", "xy"].map(lr => ({
                label: lr,
                value: lr
            })),
            limitedUi: !0
        }, {
            label: "Planar Reflections",
            type: "checkbox",
            property: [this, "groundReflection"]
        }, {
            label: "Auto Frustum Size",
            type: "checkbox",
            property: [this, "autoFrustumSize"]
        }, {
            label: "Physical Reflections",
            type: "checkbox",
            property: [this, "physicalReflections"],
            limitedUi: !0
        }, {
            label: "Shadow type",
            type: "dropdown",
            hidden: () => !this._shadowBaker,
            property: [this._shadowBaker, "groundMapMode"],
            children: [{
                label: "aoMap"
            }, {
                label: "map"
            }, {
                label: "alphaMap"
            }],
            limitedUi: !0
        }, {
            label: "Smooth Shadow",
            type: "checkbox",
            property: [this._shadowBaker, "smoothShadow"]
        }, {
            label: "Baked shadow type",
            type: "dropdown",
            children: [["Basic", three_module.bTm], ["PCF", three_module.QP0], ["PCFSoft", three_module.Wk7], ["VSM", three_module.RyA]].map(lr => ({
                label: lr[0].toString(),
                value: lr[1]
            })),
            property: [this._shadowBaker, "shadowMapType"]
        }, {
            type: "folder",
            label: "Randomized Light",
            hidden: () => !this._shadowBaker,
            limitedUi: !0,
            children: [{
                type: "color",
                label: "Color",
                property: [(o = this._shadowBaker) === null || o === void 0 ? void 0 : o.light, "color"]
            }, {
                type: "slider",
                label: "Intensity",
                bounds: [0, 100],
                property: [(c = this._shadowBaker) === null || c === void 0 ? void 0 : c.light, "intensity"]
            }, {
                type: "checkbox",
                label: "Shadow Enabled",
                property: [(_ = (h = this._shadowBaker) === null || h === void 0 ? void 0 : h.light) === null || _ === void 0 ? void 0 : _.shadowParams, "enabled"],
                onChange: [(_e = (b = this._shadowBaker) === null || b === void 0 ? void 0 : b.light) === null || _e === void 0 ? void 0 : _e.updateShadowParams, this._onSceneUpdate]
            }, {
                type: "slider",
                bounds: [0, 1],
                property: [(it = (nt = this._shadowBaker) === null || nt === void 0 ? void 0 : nt.light) === null || it === void 0 ? void 0 : it.randomParams, "focus"],
                onChange: [this._onSceneUpdate]
            }, {
                type: "slider",
                bounds: [0, 1],
                property: [(ut = (at = this._shadowBaker) === null || at === void 0 ? void 0 : at.light) === null || ut === void 0 ? void 0 : ut.randomParams, "spread"],
                onChange: [this._onSceneUpdate],
                limitedUi: !0
            }, {
                type: "slider",
                bounds: [.01, 60],
                property: [(ht = (pt = this._shadowBaker) === null || pt === void 0 ? void 0 : pt.light) === null || ht === void 0 ? void 0 : ht.randomParams, "distanceScale"],
                onChange: [(vt = (_t = this._shadowBaker) === null || _t === void 0 ? void 0 : _t.light) === null || vt === void 0 ? void 0 : vt.updateShadowParams, this._onSceneUpdate]
            }, {
                type: "vec3",
                bounds: [-1, 1],
                property: [(St = (bt = this._shadowBaker) === null || bt === void 0 ? void 0 : bt.light) === null || St === void 0 ? void 0 : St.randomParams, "direction"],
                onChange: [this._onSceneUpdate],
                limitedUi: !0
            }, {
                type: "vec3",
                bounds: [-1, 1],
                property: [(Et = (At = this._shadowBaker) === null || At === void 0 ? void 0 : At.light) === null || Et === void 0 ? void 0 : Et.randomParams, "normalDirection"],
                onChange: [this._onSceneUpdate],
                limitedUi: !0
            }, {
                type: "slider",
                bounds: [.01, 10],
                property: [(It = (Pt = this._shadowBaker) === null || Pt === void 0 ? void 0 : Pt.light) === null || It === void 0 ? void 0 : It.shadowParams, "radius"],
                onChange: [(Gt = (Dt = this._shadowBaker) === null || Dt === void 0 ? void 0 : Dt.light) === null || Gt === void 0 ? void 0 : Gt.updateShadowParams, this._onSceneUpdate]
            }, {
                type: "input",
                property: [(kt = (Bt = this._shadowBaker) === null || Bt === void 0 ? void 0 : Bt.light) === null || kt === void 0 ? void 0 : kt.shadowParams, "frustumSize"],
                hidden: () => this.autoFrustumSize,
                onChange: [(Ht = (Ut = this._shadowBaker) === null || Ut === void 0 ? void 0 : Ut.light) === null || Ht === void 0 ? void 0 : Ht.updateShadowParams, this._onSceneUpdate]
            }, {
                type: "slider",
                bounds: [-.1, .1],
                property: [(Jt = (Kt = this._shadowBaker) === null || Kt === void 0 ? void 0 : Kt.light) === null || Jt === void 0 ? void 0 : Jt.shadowParams, "bias"],
                onChange: [(ir = (or = this._shadowBaker) === null || or === void 0 ? void 0 : or.light) === null || ir === void 0 ? void 0 : ir.updateShadowParams, this._onSceneUpdate]
            }]
        }, ...super._extraUiConfig()]
    }
}

export default GroundPlugin;
