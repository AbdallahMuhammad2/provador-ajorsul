/* Standalone Class: GBufferPlugin */

class GBufferPlugin extends GenericFilterPlugin {
    get material() {
        return this._material
    }
    passCtor(o) {
        var c, h, _;
        const b = ((c = this._viewer) === null || c === void 0 ? void 0 : c.renderer.isWebGL2) && this.renderFlagsBuffer
          , _e = o.renderer.createTarget({
            depthBuffer: !0,
            samples: ((h = this._viewer) === null || h === void 0 ? void 0 : h.useGBufferDepth) && ((_ = this._viewer) === null || _ === void 0 ? void 0 : _.renderer.composerTarget.samples) || 0,
            type: three_module.OUM,
            textureCount: b ? 2 : 1,
            depthTexture: this.renderDepthTexture,
            depthTextureType: this.depthTextureType
        });
        return Array.isArray(_e.texture) ? (_e.texture[0].name = "gbufferDepthNormal",
        _e.texture[1].name = "gbufferFlags",
        this._gbufferTextures = _e.texture) : (_e.texture.name = "gbufferDepthNormal",
        this._gbufferTextures.push(_e.texture)),
        this._gbufferTarget = _e,
        this._material = new DepthNormalMaterial(b),
        this._material.userData.isGBufferMaterial = !0,
        new GBufferRenderPass(_e,this._material)
    }
    _update(o) {
        if (!super._update(o))
            return !1;
        const c = this.pass.passObject;
        return c.scene = o.scene.modelObject,
        o.scene.renderCamera.updateShaderProperties(c.overrideMaterial),
        c.camera = o.scene.renderCamera.cameraObject,
        !0
    }
    constructor(o=!0, c=!1, h=three_module.bkx) {
        super(),
        this.renderFlagsBuffer = o,
        this.renderDepthTexture = c,
        this.depthTextureType = h,
        this.passId = "gbuffer",
        this._beforeFilters = ["render"],
        this._afterFilters = [],
        this._requiredFilters = ["render"],
        this._gbufferTextures = []
    }
    getDepthNormal() {
        return this._gbufferTextures.length > 0 ? this._gbufferTextures[0] : void 0
    }
    getFlagsTexture() {
        return this._gbufferTextures.length > 1 ? this._gbufferTextures[1] : void 0
    }
    async onDispose(o) {}
    async onRemove(o) {
        return this._gbufferTarget && (o.renderer.disposeTarget(this._gbufferTarget),
        this._gbufferTarget = void 0),
        super.onRemove(o)
    }
    getTarget() {
        return this._gbufferTarget
    }
    getDepthTexture() {
        var o;
        return (o = this._gbufferTarget) === null || o === void 0 ? void 0 : o.depthTexture
    }
    getUnpackSnippet() {
        return unpackGbuffer
    }
    updateShaderProperties(o) {
        var c, h, _;
        if (o.uniforms.tNormalDepth ? o.uniforms.tNormalDepth.value = (c = this.getDepthNormal()) !== null && c !== void 0 ? c : void 0 : (h = this._viewer) === null || h === void 0 || h.console.warn("BaseRenderer: no uniform: tNormalDepth"),
        o.uniforms.tGBufferFlags) {
            o.uniforms.tGBufferFlags.value = (_ = this.getFlagsTexture()) !== null && _ !== void 0 ? _ : void 0;
            const b = o.uniforms.tGBufferFlags.value ? 1 : 0;
            b !== o.defines.GBUFFER_HAS_FLAGS && (o.defines.GBUFFER_HAS_FLAGS = b,
            o.needsUpdate = !0)
        }
        return this
    }
    registerGBufferUpdater(o) {
        this._material && this._material.addGBufferUpdater(o)
    }
}

export default GBufferPlugin;
