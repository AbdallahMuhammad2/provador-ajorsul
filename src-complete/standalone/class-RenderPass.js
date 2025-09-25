/* Standalone Class: RenderPass */

class RenderPass extends Pass {
    constructor(o, c, h=null, _=null, b=null) {
        super(),
        this.scene = o,
        this.camera = c,
        this.overrideMaterial = h,
        this.clearColor = _,
        this.clearAlpha = b,
        this.clear = !0,
        this.clearDepth = !1,
        this.needsSwap = !1,
        this._oldClearColor = new three_module.Q1f
    }
    render(o, c, h, _, b, _e) {
        if (!this.scene || !this.camera)
            return;
        const nt = o.autoClear;
        let it, at;
        if (o.autoClear = !1,
        this.overrideMaterial !== null && (at = this.scene.overrideMaterial,
        this.scene.overrideMaterial = this.overrideMaterial),
        this.clearColor !== null && (o.getClearColor(this._oldClearColor),
        o.setClearColor(this.clearColor)),
        this.clearAlpha !== null && (it = o.getClearAlpha(),
        o.setClearAlpha(this.clearAlpha)),
        this.clearDepth == 1 && o.clearDepth(),
        o.setRenderTarget(this.renderToScreen ? null : h),
        _e) {
            const ut = o.getContext();
            ut.framebufferRenderbuffer(ut.FRAMEBUFFER, ut.DEPTH_ATTACHMENT, ut.RENDERBUFFER, _e)
        }
        if (this.clear === !0 && o.clear(o.autoClearColor, o.autoClearDepth, o.autoClearStencil),
        o.render(this.scene, this.camera),
        _e) {
            const ut = o.getContext();
            ut.framebufferRenderbuffer(ut.FRAMEBUFFER, ut.DEPTH_ATTACHMENT, ut.RENDERBUFFER, null)
        }
        this.clearColor !== null && o.setClearColor(this._oldClearColor),
        this.clearAlpha !== null && o.setClearAlpha(it),
        this.overrideMaterial !== null && (this.scene.overrideMaterial = at),
        o.autoClear = nt
    }
}

export default RenderPass;
