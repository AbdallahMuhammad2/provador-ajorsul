/* Standalone Class: ShaderPass2 */

class ShaderPass2 extends ShaderPass {
    constructor(o, ...c) {
        super(o.isMaterial ? o : patchShaderEncodingSupport(o, ...c), c.length < 1 ? ShaderPass2.DEFAULT_TEX_ID : c[0]),
        this.onDirty = [],
        this.isShaderPass2 = !0,
        this.enabled = !0,
        this.setDirty = this.setDirty.bind(this)
    }
    dispose() {
        var o, c, h, _;
        (c = (o = this.material) === null || o === void 0 ? void 0 : o.dispose) === null || c === void 0 || c.call(o),
        (_ = (h = this.fsQuad) === null || h === void 0 ? void 0 : h.dispose) === null || _ === void 0 || _.call(h),
        this.onDirty = []
    }
    setDirty() {
        this.onDirty.forEach(o => o())
    }
    updateShaderProperties(o) {
        o && (Array.isArray(o) || (o = [o]),
        o.forEach(c => c == null ? void 0 : c.updateShaderProperties(this.material)))
    }
    render(o, c, h, _, b) {
        this.enabled && super.render(o, c || null, h, _, b)
    }
}

export default ShaderPass2;
