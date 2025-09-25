/* Standalone Class: EffectComposer */

class EffectComposer {
    constructor(o, c) {
        if (this.renderer = o,
        this._pixelRatio = o.getPixelRatio(),
        c === void 0) {
            const h = o.getSize(new three_module.I9Y);
            this._width = h.width,
            this._height = h.height,
            (c = new three_module.nWS(this._width * this._pixelRatio,this._height * this._pixelRatio,{
                type: three_module.ix0
            })).texture.name = "EffectComposer.rt1"
        } else
            this._width = c.width,
            this._height = c.height;
        this.renderTarget1 = c,
        this.renderTarget2 = c.clone(),
        this.renderTarget2.texture.name = "EffectComposer.rt2",
        this.writeBuffer = this.renderTarget1,
        this.readBuffer = this.renderTarget2,
        this.renderToScreen = !0,
        this.passes = [],
        this.copyPass = new ShaderPass(CopyShader),
        this.copyPass.material.blending = three_module.XIg,
        this.clock = new three_module.zD7
    }
    swapBuffers() {
        const o = this.readBuffer;
        this.readBuffer = this.writeBuffer,
        this.writeBuffer = o
    }
    addPass(o) {
        this.passes.push(o),
        o.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio)
    }
    insertPass(o, c) {
        this.passes.splice(c, 0, o),
        o.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio)
    }
    removePass(o) {
        const c = this.passes.indexOf(o);
        c !== -1 && this.passes.splice(c, 1)
    }
    isLastEnabledPass(o) {
        for (let c = o + 1; c < this.passes.length; c++)
            if (this.passes[c].enabled)
                return !1;
        return !0
    }
    render(o) {
        o === void 0 && (o = this.clock.getDelta());
        const c = this.renderer.getRenderTarget();
        let h = !1;
        for (let _ = 0, b = this.passes.length; _ < b; _++) {
            const _e = this.passes[_];
            if (_e.enabled !== !1) {
                if (_e.renderToScreen = this.renderToScreen && this.isLastEnabledPass(_),
                _e.render(this.renderer, this.writeBuffer, this.readBuffer, o, h),
                _e.needsSwap) {
                    if (h) {
                        const nt = this.renderer.getContext()
                          , it = this.renderer.state.buffers.stencil;
                        it.setFunc(nt.NOTEQUAL, 1, 4294967295),
                        this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, o),
                        it.setFunc(nt.EQUAL, 1, 4294967295)
                    }
                    this.swapBuffers()
                }
                MaskPass !== void 0 && (_e instanceof MaskPass ? h = !0 : _e instanceof ClearMaskPass && (h = !1))
            }
        }
        this.renderer.setRenderTarget(c)
    }
    reset(o) {
        if (o === void 0) {
            const c = this.renderer.getSize(new three_module.I9Y);
            this._pixelRatio = this.renderer.getPixelRatio(),
            this._width = c.width,
            this._height = c.height,
            (o = this.renderTarget1.clone()).setSize(this._width * this._pixelRatio, this._height * this._pixelRatio)
        }
        this.renderTarget1.dispose(),
        this.renderTarget2.dispose(),
        this.renderTarget1 = o,
        this.renderTarget2 = o.clone(),
        this.writeBuffer = this.renderTarget1,
        this.readBuffer = this.renderTarget2
    }
    setSize(o, c) {
        this._width = o,
        this._height = c;
        const h = this._width * this._pixelRatio
          , _ = this._height * this._pixelRatio;
        this.renderTarget1.setSize(h, _),
        this.renderTarget2.setSize(h, _);
        for (let b = 0; b < this.passes.length; b++)
            this.passes[b].setSize(h, _)
    }
    setPixelRatio(o) {
        this._pixelRatio = o,
        this.setSize(this._width, this._height)
    }
    dispose() {
        this.renderTarget1.dispose(),
        this.renderTarget2.dispose(),
        this.copyPass.dispose()
    }
}

export default EffectComposer;
