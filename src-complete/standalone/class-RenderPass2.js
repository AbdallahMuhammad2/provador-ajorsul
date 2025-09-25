/* Standalone Class: RenderPass2 */

class RenderPass2 extends RenderPass {
    get transparentTarget() {
        return this._transparentTarget || (this._transparentTarget = this._viewer.renderer.getTempTarget({
            sizeMultiplier: 1,
            samples: this._viewer.renderer.composerTarget.samples || 0,
            colorSpace: three_module.jf0,
            type: this._viewer.renderer.rendererObject.extensions.has("EXT_color_buffer_half_float") ? three_module.ix0 : three_module.OUM,
            format: three_module.GWd,
            minFilter: three_module.k6q,
            magFilter: three_module.k6q,
            depthBuffer: !1
        })),
        this._transparentTarget
    }
    _releaseTransparentTarget() {
        this._transparentTarget && this._viewer.renderer.releaseTempTarget(this._transparentTarget),
        this._transparentTarget = void 0
    }
    constructor(o, c=!0) {
        super(),
        this.blurTransmissionTarget = !0,
        this.preserveTransparentTarget = !1,
        this._viewer = o,
        this._doTransmissionFix = c,
        this.clear = !0,
        this.clearColor = new three_module.Q1f(0,0,0),
        this.clearAlpha = 0,
        this.clearDepth = !1,
        this._blendPass = new GenericBlendTexturePass({},"c = vec4(a.rgb * (1. - b.a) + b.rgb * b.a, 1.);",void 0,void 0,o.renderer.maxHDRIntensity)
    }
    render(o, c, h, _, b) {
        var _e;
        let nt = !1;
        if (o.userData.mainRenderPass = !0,
        !this._doTransmissionFix)
            return super.render(o, c, h, _, b),
            this.needsSwap = nt,
            void (o.userData.mainRenderPass = void 0);
        const it = o.userData;
        it || console.error("threejs is not patched?");
        const at = this._viewer.useGBufferDepth;
        let ut;
        if (at) {
            const ht = (_e = this._viewer.getPlugin(GBufferPlugin)) === null || _e === void 0 ? void 0 : _e.getTarget();
            if (ht) {
                const _t = o.properties.get(ht);
                ut = _t.__webglDepthRenderbuffer || _t.__webglDepthbuffer
            } else
                console.warn("No Gbuffer present for depth prepass.")
        }
        let pt = (ht=!1) => {
            super.render(o, void 0, h, _, b, ut)
        }
        ;
        if (this._viewer.useRgbm) {
            if (this._viewer.useRgbm) {
                if (nt = !1,
                o.info && !o.info.autoReset)
                    throw "renderer.info.autoReset must be true";
                {
                    const ht = o.autoClearDepth;
                    o.autoClearDepth = !at,
                    setThreeRendererMode(o, {
                        shadowMapRender: !0,
                        backgroundRender: !0,
                        opaqueRender: !0,
                        transparentRender: !1,
                        transmissionRender: !1
                    }, pt),
                    o.autoClearDepth = ht
                }
                if (!at) {
                    const ht = o.properties.get(h);
                    ut = ht.__webglDepthRenderbuffer || ht.__webglDepthbuffer
                }
                pt = () => {
                    super.render(o, void 0, this.transparentTarget, _, b, ut)
                }
                ;
                {
                    const ht = this.clear
                      , _t = o.autoClearDepth;
                    o.autoClearDepth = !1,
                    this.clear = !0,
                    setThreeRendererMode(o, {
                        shadowMapRender: !1,
                        backgroundRender: !1,
                        opaqueRender: !1,
                        transparentRender: !0,
                        transmissionRender: !1
                    }, pt),
                    this.clear = ht,
                    o.autoClearDepth = _t
                }
                (!o.info || o.info.render.calls > 0) && (this._blendPass.uniforms.tDiffuse2.value = this.transparentTarget.texture,
                this._blendPass.render(o, c, h, _, b),
                nt = !0);
                {
                    const ht = this.clear;
                    this.clear = !1,
                    it.transmissionRenderTarget = nt ? c : h,
                    it.blurTransmissionTarget = this.blurTransmissionTarget && it.transmissionRenderTarget.samples === 0,
                    setThreeRendererMode(o, {
                        shadowMapRender: !1,
                        backgroundRender: !1,
                        opaqueRender: !1,
                        transparentRender: !1,
                        transmissionRender: !0
                    }, pt),
                    it.blurTransmissionTarget = void 0,
                    it.transmissionRenderTarget = void 0,
                    this.clear = ht
                }
                (!o.info || o.info.render.calls > 0) && (this._blendPass.uniforms.tDiffuse2.value = this.transparentTarget.texture,
                this._blendPass.render(o, c, h, _, b),
                nt = !0)
            }
        } else {
            {
                const ht = this.clear
                  , _t = o.autoClearDepth;
                o.autoClearDepth = !at,
                this.clear = !0,
                setThreeRendererMode(o, {
                    shadowMapRender: !0,
                    backgroundRender: !0,
                    opaqueRender: !0,
                    transparentRender: !0,
                    transmissionRender: !1
                }, pt),
                this.clear = ht,
                o.autoClearDepth = _t
            }
            {
                this._viewer.renderer.blit(h.texture, c, {
                    clear: !0
                });
                const ht = this.clear;
                this.clear = !1,
                it.transmissionRenderTarget = c,
                it.blurTransmissionTarget = this.blurTransmissionTarget,
                setThreeRendererMode(o, {
                    shadowMapRender: !1,
                    backgroundRender: !1,
                    opaqueRender: !1,
                    transparentRender: !1,
                    transmissionRender: !0
                }, pt),
                it.blurTransmissionTarget = void 0,
                it.transmissionRenderTarget = void 0,
                this.clear = ht
            }
            nt = !1
        }
        this.preserveTransparentTarget || this._releaseTransparentTarget(),
        this.needsSwap = nt,
        o.userData.mainRenderPass = void 0
    }
    dispose() {
        this._releaseTransparentTarget(),
        super.dispose()
    }
}

export default RenderPass2;
