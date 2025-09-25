/* Standalone Class: ShaderPass */

class ShaderPass extends Pass {
    constructor(o, c) {
        super(),
        this.textureID = c !== void 0 ? c : "tDiffuse",
        o instanceof three_module.BKk ? (this.uniforms = o.uniforms,
        this.material = o) : o && (this.uniforms = three_module.LlO.clone(o.uniforms),
        this.material = new three_module.BKk({
            name: o.name !== void 0 ? o.name : "unspecified",
            defines: Object.assign({}, o.defines),
            uniforms: this.uniforms,
            vertexShader: o.vertexShader,
            fragmentShader: o.fragmentShader
        })),
        this.fsQuad = new FullScreenQuad(this.material),
        this.useExistingRenderTarget = !1
    }
    render(o, c, h) {
        this.uniforms[this.textureID] && h && (this.uniforms[this.textureID].value = h.texture),
        this.fsQuad.material = this.material,
        this.renderToScreen ? (o.setRenderTarget(null),
        this.fsQuad.render(o)) : (this.useExistingRenderTarget || o.setRenderTarget(c || null),
        this.clear && o.clear(o.autoClearColor, o.autoClearDepth, o.autoClearStencil),
        this.fsQuad.render(o))
    }
    dispose() {
        this.material.dispose(),
        this.fsQuad.dispose()
    }
}

export default ShaderPass;
