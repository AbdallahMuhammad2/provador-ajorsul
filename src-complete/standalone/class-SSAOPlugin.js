/* Standalone Class: SSAOPlugin */

class SSAOPlugin extends MultiFilterPlugin {
    get aoTarget() {
        return this._aoTarget
    }
    constructor() {
        super(),
        this.dependencies = [AssetManagerPlugin, GBufferPlugin],
        this.setDirty = this.setDirty.bind(this),
        this.updateGBuffer = this.updateGBuffer.bind(this)
    }
    async onAdded(o) {
        var c;
        return o.getPluginByType("Ground") && console.error("GroundPlugin must be added after SSAOPlugin"),
        (c = o.getPlugin(GBufferPlugin)) === null || c === void 0 || c.registerGBufferUpdater(this.updateGBuffer),
        super.onAdded(o)
    }
    updateGBuffer(o, c) {
        var h;
        if (o instanceof three_module.eaF && (!((h = o.material) === null || h === void 0) && h.userData)) {
            const _ = o.material.userData.ssaoCastDisabled || o.material.userData.pluginsDisabled
              , b = _ ? 0 : 1;
            c.w = updateBit(c.w, 3, b),
            _ && this.passes.ssao.passObject && this.passes.ssao.passObject.material.defines.CHECK_GBUFFER_FLAG !== 1 && (this.passes.ssao.passObject.material.defines.CHECK_GBUFFER_FLAG = 1,
            this.passes.ssao.passObject.material.needsUpdate = !0)
        }
    }
    createPasses(o) {
        var c, h;
        return this._aoTarget = o.renderer.createTarget({
            sizeMultiplier: 1
        }),
        [makeFilter(o, {
            passId: "ssao",
            after: ["gbuffer"],
            before: ["render"],
            required: ["render", "gbuffer"],
            passObject: new SSAOPass(o.renderer,this._aoTarget,(h = (c = o.getPlugin(GBufferPlugin)) === null || c === void 0 ? void 0 : c.getUnpackSnippet()) !== null && h !== void 0 ? h : ""),
            update() {
                var _;
                const b = Math.max(1, (_ = (o == null ? void 0 : o.scene.activeCamera.modelObject).fov) !== null && _ !== void 0 ? _ : 1)
                  , _e = ((o == null ? void 0 : o.canvas.height) || 1) / (2 * Math.tan(.5 * b * three_module.cj9.DEG2RAD));
                this.passObject.parameters.projScale = _e,
                this.passObject.bilateralPass.updateShaderProperties([o.getPlugin(GBufferPlugin)])
            }
        }, () => [o.getPlugin(GBufferPlugin), o.scene.activeCamera, o.renderer, o.scene])]
    }
    async onRemove(o) {
        return o.renderer.disposeTarget(this._aoTarget),
        super.onRemove(o)
    }
    setDirty() {
        var o;
        (o = this._viewer) === null || o === void 0 || o.setDirty()
    }
    get enabled() {
        var o, c;
        return ((c = (o = this.passes.ssao) === null || o === void 0 ? void 0 : o.passObject) === null || c === void 0 ? void 0 : c.enabled) || !1
    }
    set enabled(o) {
        var c;
        !((c = this.passes.ssao) === null || c === void 0) && c.passObject && (this.passes.ssao.passObject.enabled = o)
    }
    get uiConfig() {
        var o;
        if (this._uiConfig)
            return this._uiConfig;
        const c = this
          , h = c.passes.ssao.passObject;
        return this._uiConfig = {
            type: "folder",
            label: "SS Ambient Occlusion",
            children: [{
                type: "checkbox",
                label: "Enabled",
                property: [h, "enabled"],
                onChange: c.setDirty
            }, {
                type: "checkbox",
                label: "Enable Cavity",
                property: [h.parameters, "useSmallScaleAO"],
                onChange: c.setDirty
            }, {
                type: "slider",
                label: "Cavity Brightness",
                bounds: [0, .5],
                stepSize: .01,
                property: [h.parameters, "intensitySmallAO"],
                onChange: c.setDirty
            }, {
                type: "slider",
                label: "Intensity",
                bounds: [0, 5],
                property: [h.parameters, "intensity"],
                onChange: c.setDirty
            }, {
                type: "slider",
                label: "Radius",
                bounds: [.1, 20],
                property: [h.parameters, "occlusionWorldRadius"],
                onChange: c.setDirty
            }, {
                type: "slider",
                label: "Bias",
                bounds: [1e-5, .01],
                property: [h.parameters, "bias"],
                onChange: c.setDirty
            }, {
                type: "slider",
                label: "Falloff",
                bounds: [.01, 3],
                property: [h.parameters, "falloff"],
                onChange: c.setDirty
            }, {
                type: "slider",
                label: "Num samples",
                stepSize: 1,
                bounds: [1, 11],
                property: [(o = h.material) === null || o === void 0 ? void 0 : o.defines, "NUM_SAMPLES"],
                onChange: [ () => h.material.needsUpdate = !0, c.setDirty]
            }, {
                type: "checkbox",
                property: [h.bilateralPass, "smoothEnabled"],
                onChange: c.setDirty
            }, {
                type: "checkbox",
                property: [h.parameters, "autoRadius"],
                onChange: c.setDirty
            }, {
                type: "vec4",
                property: [h.bilateralPass, "edgeSharpness"],
                onChange: c.setDirty
            }]
        }
    }
}

export default SSAOPlugin;
