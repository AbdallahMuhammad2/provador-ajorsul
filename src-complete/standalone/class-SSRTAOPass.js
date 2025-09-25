/* Standalone Class: SSRTAOPass */

class SSRTAOPass extends ShaderPass2 {
    get ssgiEnabled() {
        return parseInt(this.material.defines.SSGI_ENABLED) > .5
    }
    set ssgiEnabled(o) {
        o = o && this._giActivated,
        this.material.defines.SSGI_ENABLED = o ? 1 : 0,
        this.material.needsUpdate = !0
    }
    constructor(o, c, h, _=!1) {
        super({
            vertexShader: defaultVertex,
            fragmentShader: `

${basicHelpers}
${cameraHelpers}
${randomHelpers}
${samplePointHelpers}
${h}

${ssrt}

${ssrtao}

            `,
            uniforms: {
                tLastThis: {
                    value: null
                },
                tDiffuse: {
                    value: null
                },
                tNormalDepth: {
                    value: null
                },
                tLastFrame: {
                    value: null
                },
                opacity: {
                    value: 1
                },
                intensity: {
                    value: 2.14
                },
                rayCount: {
                    value: .1
                },
                objectRadius: {
                    value: 1
                },
                autoRadius: {
                    value: !_
                },
                power: {
                    value: 1.1
                },
                bias: {
                    value: .015
                },
                falloff: {
                    value: .7
                },
                tolerance: {
                    value: 1.5
                },
                frameCount: {
                    value: 0
                },
                frameCount2: {
                    value: 0
                },
                projection: {
                    value: new three_module.kn4
                },
                screenSize: {
                    value: new three_module.I9Y
                },
                cameraPositionWorld: {
                    value: new three_module.Pq0
                },
                cameraNearFar: {
                    value: new three_module.I9Y(.1,1e3)
                }
            },
            defines: {
                PERSPECTIVE_CAMERA: 1,
                SSGI_ENABLED: _ ? 1 : 0
            }
        }, "tDiffuse", "tLastFrame", "tLastThis"),
        this.materialExtension = {
            shaderExtender: (b, _e, nt) => {
                var it;
                if (!b.defines.SSRTAO_ENABLED)
                    return;
                this.materialExtension.extraUniforms.tSSGIMap.value = (it = this._target) === null || it === void 0 ? void 0 : it.texture;
                const at = _e.materialObject;
                let ut = this.material.defines.SSGI_ENABLED;
                at.defines.SSGI_ENABLED !== ut && (at.defines.SSGI_ENABLED = ut,
                at.needsUpdate = !0),
                ut = this._target.texture,
                this.materialExtension.extraUniforms.tSSGIMap.value !== ut && (this.materialExtension.extraUniforms.tSSGIMap.value = ut,
                at.needsUpdate = !0);
                const pt = "vec3 totalDiffuse ="
                  , ht = `
            
            ${giPatch}
            
            // reflectedLight.directDiffuse = vec3(0.);
            // reflectedLight.indirectDiffuse = vec3(0.);
            // reflectedLight.directSpecular = vec3(0.);
            // reflectedLight.indirectSpecular = vec3(0.);
            
            `;
                b.fragmentShader = b.fragmentShader.replace(pt, `
${ht}
${pt}`),
                b.fragmentShader = b.fragmentShader.replace("#include <aomap_fragment>", ""),
                b.defines.USE_UV = ""
            }
            ,
            onObjectRender: (b, _e, nt) => {
                var it, at, ut;
                const pt = _e.materialObject
                  , ht = !pt.transparent && pt.transmission < .001
                  , _t = this.enabled && ht && (this.renderWithCamera || this._renderer.frameCount > 1) && nt.userData.screenSpaceRendering !== !1 && !(!((it = pt.userData) === null || it === void 0) && it.ssrtaoDisabled) && !(!((at = pt.userData) === null || at === void 0) && at.ssaoDisabled) && !(!((ut = pt.userData) === null || ut === void 0) && ut.pluginsDisabled) ? 1 : 0;
                pt.defines.SSRTAO_ENABLED !== _t && (pt.defines.SSRTAO_ENABLED = _t,
                pt.needsUpdate = !0)
            }
            ,
            parsFragmentSnippet: b => {
                var _e;
                return fe$1`
            uniform float ssaoPower;
            uniform float ssgiIntensity;
            uniform sampler2D tSSGIMap;
            ${getTexelDecoding("tSSGIMap", (_e = this._target) === null || _e === void 0 ? void 0 : _e.texture.colorSpace)}

            ${simpleCameraHelpers}

        `
            }
            ,
            extraUniforms: {
                tSSGIMap: {
                    value: null
                },
                ssaoPower: this.material.uniforms.power,
                ssgiIntensity: this.material.uniforms.intensity
            },
            computeCacheKey: b => {
                var _e, nt, it, at;
                return this.enabled ? "1" : "0" + ((nt = (_e = this._target) === null || _e === void 0 ? void 0 : _e.texture) === null || nt === void 0 ? void 0 : nt.colorSpace) + ((at = (it = this._target) === null || it === void 0 ? void 0 : it.texture) === null || at === void 0 ? void 0 : at.uuid) + this.material.defines.SSGI_ENABLED
            }
            ,
            isCompatible: b => {
                var _e;
                return !(!((_e = b.materialObject.userData) === null || _e === void 0) && _e.ssaoDisabled) && b.isMeshStandardMaterial2
            }
        },
        this.intensity = 2,
        this.power = 1.1,
        this.autoRadius = !0,
        this.objectRadius = 2,
        this.tolerance = 1,
        this.bias = .15,
        this.falloff = .7,
        this.rayCount = 2,
        this.stepCount = 4,
        this.smoothEnabled = !0,
        this.renderWithCamera = !0,
        this.uiConfig = {
            type: "folder",
            label: "SS Global illumination (Dev)",
            children: [...generateUiConfig(this), {
                type: "checkbox",
                label: "GI Enabled",
                hidden: () => !this._giActivated,
                property: [this, "ssgiEnabled"]
            }]
        },
        this._renderer = o,
        this._target = c,
        this.needsSwap = !0,
        this._giActivated = _,
        this.ssgiEnabled = _,
        this.bilateralPass = new BilateralFilterPass(this._target,h,"rgba")
    }
    render(o, c, h, _, b) {
        this.needsSwap = !1,
        !this.renderWithCamera && this._renderer.frameCount < 2 || (this._renderer.blit(this._target.texture, c),
        this.uniforms.tLastThis.value = c.texture,
        super.render(o, this._target, h, _, b),
        this.smoothEnabled && this.bilateralPass.render(o, c, h, _, b))
    }
}

export default SSRTAOPass;
