/* Standalone Class: DepthOfFieldPass */

class DepthOfFieldPass extends ShaderPass2 {
    constructor() {
        super(combineDofShader, "colorTexture", "cocTexture", "blurTexture"),
        this.dofBlurMaterial = dofBlurMaterialPoisson,
        this.nearFarBlurScale = new three_module.I9Y(.25,.25),
        this.focalDepthRange = new three_module.I9Y(.5,1.5),
        this.crossCenter = new three_module.I9Y(.5,.5),
        this.crossRadius = .04,
        this.crossAlpha = 1,
        this.crossColor = new three_module.Q1f(16750848),
        this.uiConfig = {
            type: "folder",
            label: "Depth of Field",
            children: [{
                type: "checkbox",
                label: "Enabled",
                limitedUi: !0,
                property: [this, "enabled"]
            }, {
                type: "slider",
                label: "Depth Range",
                bounds: [.5, 3],
                property: [this.focalDepthRange, "y"]
            }, {
                type: "slider",
                label: "Near Blur scale",
                bounds: [0, 1],
                property: [this.nearFarBlurScale, "x"]
            }, {
                type: "slider",
                label: "Far Blur scale",
                bounds: [0, 1],
                property: [this.nearFarBlurScale, "y"]
            }]
        },
        this.material.extensions.derivatives = !0,
        this.computeCocMaterial = patchShaderEncodingSupport({
            uniforms: {
                colorTexture: {
                    value: null
                },
                tNormalDepth: this.uniforms.tNormalDepth,
                cameraNearFar: this.uniforms.cameraNearFar,
                nearFarBlurScale: this.uniforms.nearFarBlurScale,
                focalDepthRange: this.uniforms.focalDepthRange
            },
            vertexShader: defaultVertex,
            fragmentShader: unpackGbuffer + `
` + computeCoCDoF
        }, "colorTexture"),
        this.expandCocMaterial = patchShaderEncodingSupport({
            uniforms: {
                colorTexture: {
                    value: null
                },
                colorTextureSize: {
                    value: new three_module.I9Y
                },
                direction: {
                    value: new three_module.I9Y
                },
                tNormalDepth: this.uniforms.tNormalDepth,
                nearFarBlurScale: this.uniforms.nearFarBlurScale
            },
            vertexShader: defaultVertex,
            fragmentShader: unpackGbuffer + `
` + expandCoCDoF
        }, "colorTexture")
    }
    render(o, c, h, _, b) {
        if (!this.enabled)
            return;
        const _e = o.baseRenderer
          , nt = {
            minFilter: three_module.hxR,
            magFilter: three_module.hxR,
            type: three_module.ix0,
            colorSpace: three_module.Zr2,
            sizeMultiplier: .5,
            format: three_module.GWd,
            depthBuffer: !1,
            generateMipmaps: !1
        }
          , it = _e.getTempTarget(nt)
          , at = _e.getTempTarget(nt);
        if (this.computeCocMaterial.uniforms.colorTexture.value = h.texture,
        _e.blit(void 0, it, {
            material: this.computeCocMaterial
        }),
        this.expandCocMaterial.uniforms.colorTexture.value = it.texture,
        this.expandCocMaterial.uniforms.direction.value.set(1, 0),
        _e.blit(void 0, at, {
            material: this.expandCocMaterial
        }),
        this.expandCocMaterial.uniforms.colorTexture.value = at.texture,
        this.expandCocMaterial.uniforms.direction.value.set(0, 1),
        _e.blit(void 0, it, {
            material: this.expandCocMaterial
        }),
        this.dofBlurMaterial.uniforms.frameCount)
            this.dofBlurMaterial.uniforms.colorTexture.value = it.texture,
            _e.blit(void 0, at, {
                material: this.dofBlurMaterial
            });
        else {
            const ut = _e.getTempTarget(nt);
            this.dofBlurMaterial.uniforms.cocTexture.value = it.texture,
            this.dofBlurMaterial.uniforms.colorTexture.value = it.texture,
            this.dofBlurMaterial.uniforms.direction.value.set(1, 0),
            _e.blit(void 0, ut, {
                material: this.dofBlurMaterial
            }),
            this.dofBlurMaterial.uniforms.colorTexture.value = ut.texture,
            this.dofBlurMaterial.uniforms.direction.value.set(0, 1),
            _e.blit(void 0, at, {
                material: this.dofBlurMaterial
            }),
            _e.releaseTempTarget(ut)
        }
        this.material.uniforms.blurTexture.value = at.texture,
        this.material.uniforms.cocTexture.value = it.texture,
        super.render(o, c, h, _, b),
        _e.releaseTempTarget(it),
        _e.releaseTempTarget(at)
    }
}

export default DepthOfFieldPass;
