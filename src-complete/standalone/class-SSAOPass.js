/* Standalone Class: SSAOPass */

class SSAOPass extends ShaderPass2 {
    constructor(o, c, h) {
        super({
            defines: {
                LINEAR_DEPTH: 1,
                NUM_SAMPLES: 11,
                NUM_SPIRAL_TURNS: 3,
                DEPTH_NORMAL_TEXTURE: 1,
                DEPTH_PACKING_MODE: 2,
                PERSPECTIVE_CAMERA: 1,
                CHECK_GBUFFER_FLAG: 0
            },
            uniforms: {
                tLastThis: {
                    value: null
                },
                tNormalDepth: {
                    value: null
                },
                tGBufferFlags: {
                    value: null
                },
                screenSize: {
                    value: new three_module.I9Y(512,512)
                },
                saoData: {
                    value: new three_module.IUQ
                },
                frameCount: {
                    value: 0
                },
                cameraNearFar: {
                    value: new three_module.I9Y(.1,1e3)
                },
                projection: {
                    value: new three_module.kn4
                },
                saoBiasEpsilon: {
                    value: new three_module.IUQ(1,1,1,1)
                },
                sceneBoundingRadius: {
                    value: 0
                }
            },
            vertexShader: defaultVertex,
            fragmentShader: `

${randomHelpers}

${h}

${ssao}

            `
        }, "tDiffuse"),
        this.parameters = {
            intensity: .25,
            occlusionWorldRadius: 1,
            bias: .001,
            falloff: 1.3,
            useSmallScaleAO: !1,
            intensitySmallAO: .2,
            autoRadius: !1,
            projScale: 1
        },
        this._smoothEnabled = !0,
        this.materialExtension = {
            shaderExtender: (_, b, _e) => {
                _.defines.SSAO_ENABLED && (_.fragmentShader = shaderReplaceString(_.fragmentShader, "#include <aomap_fragment>", ssaoPatch))
            }
            ,
            onObjectRender: (_, b, _e) => {
                var nt, it;
                this.materialExtension.extraUniforms.tSSAOMap.value = (nt = this._target) === null || nt === void 0 ? void 0 : nt.texture;
                const at = b.materialObject;
                let ut = this.enabled && _e.userData.screenSpaceRendering !== !1 && !(!((it = b.userData) === null || it === void 0) && it.ssaoDisabled) ? 1 : 0;
                at.defines.SSAO_ENABLED !== ut && (at.defines.SSAO_ENABLED = ut,
                at.needsUpdate = !0),
                ut = this._target.texture,
                this.materialExtension.extraUniforms.tSSAOMap.value !== ut && (this.materialExtension.extraUniforms.tSSAOMap.value = ut,
                at.needsUpdate = !0)
            }
            ,
            parsFragmentSnippet: _ => {
                var b, _e;
                return fe$1`
             uniform sampler2D tSSAOMap;
             ${getTexelDecoding("tSSAOMap", (_e = (b = this._target) === null || b === void 0 ? void 0 : b.texture) === null || _e === void 0 ? void 0 : _e.colorSpace)}
            ${simpleCameraHelpers}
        `
            }
            ,
            extraUniforms: {
                tSSAOMap: {
                    value: null
                }
            },
            computeCacheKey: _ => {
                var b, _e;
                return this.enabled ? "1" : "0" + ((_e = (b = this._target) === null || b === void 0 ? void 0 : b.texture) === null || _e === void 0 ? void 0 : _e.colorSpace)
            }
            ,
            isCompatible: _ => {
                var b;
                return !(!((b = _.materialObject.userData) === null || b === void 0) && b.ssaoDisabled) && _.isMeshStandardMaterial2
            }
        },
        this._renderer = o,
        this._target = c,
        this.needsSwap = !1,
        this.clear = !0,
        this.bilateralPass = new BilateralFilterPass(this._target,h,"rrrr")
    }
    get smoothEnabled() {
        return this._smoothEnabled
    }
    set smoothEnabled(o) {
        this._smoothEnabled = o,
        this.bilateralPass.enabled = o,
        this.bilateralPass.uniforms.smoothEnabled.value = o
    }
    render(o, c, h, _, b) {
        this.enabled && (this._updateParameters(),
        this._renderer.blit(this._target.texture, c, {}),
        this.uniforms.tLastThis.value = c.texture,
        super.render(o, this._target, h, _, b),
        this._smoothEnabled && this.bilateralPass.render(o, c, h, _, b))
    }
    _updateParameters() {
        const o = this.material.uniforms.saoData.value;
        o.x = this.parameters.intensitySmallAO,
        o.y = this.parameters.intensity,
        o.z = this.parameters.occlusionWorldRadius,
        o.w = this.parameters.useSmallScaleAO,
        o.z *= this.parameters.projScale;
        const c = this.material.uniforms.saoBiasEpsilon.value;
        if (c.x = this.parameters.bias,
        c.y = .001,
        c.z = this.parameters.falloff,
        this.parameters.autoRadius) {
            const h = this.material.uniforms.sceneBoundingRadius.value;
            c.w = h
        } else
            c.w = 1
    }
}

export default SSAOPass;
