/* Standalone Class: BilateralFilterPass */

class BilateralFilterPass extends ShaderPass2 {
    constructor(o, c, h="rgba") {
        super({
            vertexShader: CopyShader.vertexShader,
            fragmentShader: c + ssaoBilateral,
            uniforms: {
                bilDirection: {
                    value: new three_module.I9Y(1,0)
                },
                tNormalDepth: {
                    value: null
                },
                tDiffuse: {
                    value: o.texture
                },
                tDiffuseSize: {
                    value: new three_module.I9Y
                }
            },
            defines: {
                B_SRC_ACCESSOR: h
            }
        }, "tDiffuse"),
        this.smoothEnabled = !0,
        this.edgeSharpness = .1,
        this._target = o,
        this.clear = !1,
        this.needsSwap = !1
    }
    render(o, c, h, _, b) {
        var _e, nt, it, at;
        this.enabled && (this.uniforms.bilDirection.value.set(1, 0),
        this.uniforms.tDiffuse.value = this._target.texture,
        this.uniforms.tDiffuseSize.value.set(((_e = this.uniforms.tDiffuse.value) === null || _e === void 0 ? void 0 : _e.image.width) || 0, ((nt = this.uniforms.tDiffuse.value) === null || nt === void 0 ? void 0 : nt.image.height) || 0),
        super.render(o, c, this._target, _, b),
        this.uniforms.bilDirection.value.set(0, 1),
        this.uniforms.tDiffuse.value = c.texture,
        this.uniforms.tDiffuseSize.value.set(((it = this.uniforms.tDiffuse.value) === null || it === void 0 ? void 0 : it.image.width) || 0, ((at = this.uniforms.tDiffuse.value) === null || at === void 0 ? void 0 : at.image.height) || 0),
        super.render(o, this._target, c, _, b))
    }
}

export default BilateralFilterPass;
