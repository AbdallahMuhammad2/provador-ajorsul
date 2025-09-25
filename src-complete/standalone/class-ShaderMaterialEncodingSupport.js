/* Standalone Class: ShaderMaterialEncodingSupport */

class ShaderMaterialEncodingSupport extends ShaderMaterial2 {
    constructor(o, c) {
        super(o),
        this.typeSlug = "shaderMat",
        this.textures = [],
        this.setTextureIds(c)
    }
    setTextureIds(o) {
        this.textures.map(c => c.id).join(";") !== o.join(";") && (this.textures = o.map(c => ({
            id: c,
            colorSpace: three_module.jf0
        })),
        this.setDirty())
    }
    _setUniformTexSize(o, c) {
        var h, _, b, _e;
        if (!c || !o)
            return;
        const nt = (_ = (h = c.image) === null || h === void 0 ? void 0 : h.width) !== null && _ !== void 0 ? _ : 512
          , it = (_e = (b = c.image) === null || b === void 0 ? void 0 : b.height) !== null && _e !== void 0 ? _e : 512
          , at = o.value;
        at.isVector2 || console.warn("uniform is not a Vector2"),
        at && Math.abs(at.x - nt) + Math.abs(at.y - it) > .1 && (at.x = nt,
        at.y = it,
        this.uniformsNeedUpdate = !0)
    }
    onBeforeRender(o, c, h, _, b) {
        var _e, nt;
        this._setUniformTexSize(this.uniforms.screenSize, (_e = o.getRenderTarget()) === null || _e === void 0 ? void 0 : _e.texture);
        for (const it of this.textures) {
            const at = it.id
              , ut = (nt = this.uniforms[at]) === null || nt === void 0 ? void 0 : nt.value;
            ut && (this._setUniformTexSize(this.uniforms[at + "Size"], ut),
            ut.colorSpace !== it.colorSpace && (it.colorSpace = ut.colorSpace,
            this.needsUpdate = !0))
        }
        super.onBeforeRender(o, c, h, _, b)
    }
    onBeforeCompile(o, c) {
        o.fragmentShader = this.textures.map(h => {
            var _, b;
            return `uniform sampler2D ${h.id}; 
` + getTexelDecoding((_ = h.id) !== null && _ !== void 0 ? _ : "input", (b = h.colorSpace) !== null && b !== void 0 ? b : three_module.jf0)
        }
        ).join(`
`) + o.fragmentShader,
        super.onBeforeCompile(o, c)
    }
    customProgramCacheKey() {
        return super.customProgramCacheKey() + this.textures.map(o => o.id + o.colorSpace).join(";")
    }
}

export default ShaderMaterialEncodingSupport;
