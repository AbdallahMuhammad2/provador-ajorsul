/* Standalone Class: DepthNormalMaterial */

class DepthNormalMaterial extends ShaderMaterial2 {
    constructor(o=!0) {
        super({
            vertexShader: depthNormalVert,
            fragmentShader: depthNormalFrag,
            uniforms: three_module.LlO.merge([three_module.fCn.common, three_module.fCn.bumpmap, three_module.fCn.normalmap, three_module.fCn.displacementmap, {
                cameraNearFar: {
                    value: new three_module.I9Y(.1,1e3)
                },
                flags: {
                    value: new three_module.IUQ(255,255,255,255)
                }
            }]),
            defines: {
                IS_GLSL3: o ? "1" : "0"
            },
            glslVersion: o ? three_module.Wdf : three_module.Wyr
        }),
        this.normalMapType = three_module.bI3,
        this.flatShading = !1,
        this._updaters = []
    }
    onBeforeRender(o, c, h, _, b) {
        var _e, nt, it, at, ut, pt, ht, _t, vt, bt, St, At, Et;
        super.onBeforeRender(o, c, h, _, b);
        let Pt = b.material;
        Array.isArray(Pt) && (Pt = Pt[0]),
        this.uniforms.map.value = (_e = Pt == null ? void 0 : Pt.map) !== null && _e !== void 0 ? _e : null,
        this.uniforms.map.value && o.materials.refreshTransformUniform(this.uniforms.map.value, this.uniforms.mapTransform),
        this.uniforms.alphaMap.value = (nt = Pt == null ? void 0 : Pt.alphaMap) !== null && nt !== void 0 ? nt : null,
        this.uniforms.alphaMap.value && o.materials.refreshTransformUniform(this.uniforms.alphaMap.value, this.uniforms.alphaMapTransform),
        this.alphaTest = !Pt || !Pt.alphaTest || Pt.alphaTest < 1e-7 ? .001 : Pt.alphaTest,
        this.uniforms.alphaTest.value = this.alphaTest,
        this.uniforms.displacementMap.value = (it = Pt == null ? void 0 : Pt.displacementMap) !== null && it !== void 0 ? it : null,
        this.uniforms.displacementMap.value && o.materials.refreshTransformUniform(this.uniforms.displacementMap.value, this.uniforms.displacementMapTransform),
        this.uniforms.displacementScale.value = (at = Pt == null ? void 0 : Pt.displacementScale) !== null && at !== void 0 ? at : 1,
        this.uniforms.displacementBias.value = (ut = Pt == null ? void 0 : Pt.displacementBias) !== null && ut !== void 0 ? ut : 0,
        this.uniforms.bumpMap.value = (pt = Pt == null ? void 0 : Pt.bumpMap) !== null && pt !== void 0 ? pt : null,
        this.uniforms.bumpMap.value && o.materials.refreshTransformUniform(this.uniforms.bumpMap.value, this.uniforms.bumpMapTransform),
        this.uniforms.bumpScale.value = (ht = Pt == null ? void 0 : Pt.bumpScale) !== null && ht !== void 0 ? ht : 1,
        this.uniforms.normalMap.value = (_t = Pt == null ? void 0 : Pt.normalMap) !== null && _t !== void 0 ? _t : null,
        this.uniforms.normalMap.value && o.materials.refreshTransformUniform(this.uniforms.normalMap.value, this.uniforms.normalMapTransform),
        this.uniforms.normalScale.value && this.uniforms.normalScale.value.copy((vt = Pt == null ? void 0 : Pt.normalScale) !== null && vt !== void 0 ? vt : new three_module.I9Y(1,1)),
        this.normalMapType = (bt = Pt == null ? void 0 : Pt.normalMapType) !== null && bt !== void 0 ? bt : three_module.bI3,
        this.flatShading = (St = Pt == null ? void 0 : Pt.flatShading) !== null && St !== void 0 && St,
        this.uniforms.flags.value.set(255, 255, 255, 255),
        this.uniforms.flags.value.z = (Pt != null && Pt.userData.matId ? Pt == null ? void 0 : Pt.userData.matId : 0) / 255,
        this._updaters.forEach(Dt => {
            Dt(b, this.uniforms.flags.value)
        }
        ),
        this.uniforms.flags.value.y /= 255,
        this.uniforms.flags.value.w /= 255,
        this.uniformsNeedUpdate = !0;
        let It = this.uniforms.alphaMap.value ? 1 : void 0;
        It !== this.defines.USE_ALPHAMAP && (It === void 0 ? (delete this.defines.USE_ALPHAMAP,
        delete this.defines.ALPHAMAP_UV) : (this.defines.USE_ALPHAMAP = It,
        this.defines.ALPHAMAP_UV = "uv"),
        this.needsUpdate = !0),
        It = this.uniforms.map.value ? 1 : void 0,
        It !== this.defines.USE_MAP && (It === void 0 ? (delete this.defines.USE_MAP,
        delete this.defines.MAP_UV) : (this.defines.USE_MAP = It,
        this.defines.MAP_UV = "uv"),
        this.needsUpdate = !0),
        It = this.uniforms.bumpMap.value ? 1 : void 0,
        It !== this.defines.USE_BUMPMAP && (It === void 0 ? (delete this.defines.USE_BUMPMAP,
        delete this.defines.BUMPMAP_UV) : (this.defines.USE_BUMPMAP = It,
        this.defines.BUMPMAP_UV = "uv"),
        this.needsUpdate = !0),
        It = this.uniforms.normalMap.value ? 1 : void 0,
        It !== this.defines.USE_NORMALMAP && (It === void 0 ? (delete this.defines.USE_NORMALMAP,
        delete this.defines.NORMALMAP_UV) : (this.defines.USE_NORMALMAP = It,
        this.defines.NORMALMAP_UV = "uv"),
        this.needsUpdate = !0),
        It = this.uniforms.displacementMap.value ? 1 : void 0,
        It !== this.defines.USE_DISPLACEMENTMAP && (It === void 0 ? (delete this.defines.USE_DISPLACEMENTMAP,
        delete this.defines.DISPLACEMENTMAP_UV) : (this.defines.USE_DISPLACEMENTMAP = It,
        this.defines.DISPLACEMENTMAP_UV = "uv"),
        this.needsUpdate = !0),
        It = Pt.userData.ALPHA_I_RGBA_PACKING ? 1 : void 0,
        It !== this.defines.ALPHA_I_RGBA_PACKING && (It === void 0 ? delete this.defines.ALPHA_I_RGBA_PACKING : this.defines.ALPHA_I_RGBA_PACKING = It,
        this.needsUpdate = !0),
        It = (At = Pt.userData.forcedLinearDepth) !== null && At !== void 0 ? At : void 0,
        It !== this.defines.FORCED_LINEAR_DEPTH && (It === void 0 ? delete this.defines.FORCED_LINEAR_DEPTH : this.defines.FORCED_LINEAR_DEPTH = It,
        this.needsUpdate = !0),
        this.side = (Et = Pt.side) !== null && Et !== void 0 ? Et : three_module.$EB
    }
    addGBufferUpdater(o) {
        this._updaters.push(o)
    }
    removeGBufferUpdater(o) {
        const c = this._updaters.indexOf(o);
        c !== -1 && this._updaters.splice(c, 1)
    }
}

export default DepthNormalMaterial;
