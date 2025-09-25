/* Standalone Class: TAAPass */

class TAAPass extends ShaderPass2 {
    constructor(o, c, h=!1) {
        super({
            vertexShader: CopyShader.vertexShader,
            fragmentShader: c + `
` + cameraHelpers + `
` + taa,
            uniforms: {
                currentRT: {
                    value: null
                },
                previousRT: {
                    value: null
                },
                previousRTSize: {
                    value: new three_module.I9Y
                },
                cameraNearFar: {
                    value: new three_module.I9Y
                },
                lastProjectionViewMatrix: {
                    value: new three_module.kn4
                },
                currentProjectionViewMatrix: {
                    value: new three_module.kn4
                },
                projection: {
                    value: new three_module.kn4
                },
                inverseViewMatrix: {
                    value: new three_module.kn4
                },
                jitterSample: {
                    value: new three_module.I9Y
                },
                firstFrame: {
                    value: !0
                },
                tNormalDepth: {
                    value: null
                },
                tVelocity: {
                    value: null
                }
            },
            defines: {
                HAS_VELOCITY_BUFFER: 0,
                QUALITY: 1,
                UNJITTER: 0,
                BACKGROUND_TAA: h ? 1 : 0
            }
        }, "currentRT", "previousRT"),
        this.taaEnabled = !0,
        this.feedBack = new three_module.I9Y(.88,.97),
        this.uiConfig = {
            type: "folder",
            label: "Temporal AA",
            children: [{
                type: "checkbox",
                label: "Enabled",
                property: [this, "enabled"],
                onChange: () => this.onSizeUpdate()
            }, {
                type: "input",
                label: "Feedback",
                stepSize: 1e-4,
                property: [this, "feedBack"],
                onChange: this.setDirty
            }]
        },
        this.onSizeUpdate = this.onSizeUpdate.bind(this),
        this.target = o,
        this.clear = !1,
        this.needsSwap = !0
    }
    render(o, c, h, _, b) {
        var _e, nt;
        if (!this.taaEnabled || !this.enabled)
            return void (this.needsSwap = !1);
        this.needsSwap = !0;
        const it = this.uniforms.tVelocity.value ? 1 : 0;
        it !== this.material.defines.HAS_VELOCITY_BUFFER && (this.material.defines.HAS_VELOCITY_BUFFER = it,
        this.material.needsUpdate = !0),
        this.uniforms.previousRT.value = (nt = (_e = Ee$1(this.target)) === null || _e === void 0 ? void 0 : _e.texture) !== null && nt !== void 0 ? nt : null,
        super.render(o, c, h, _, b),
        this.uniforms.lastProjectionViewMatrix.value.copy(this.uniforms.currentProjectionViewMatrix.value),
        this.uniforms.firstFrame.value = !1
    }
    updateCameraProperties(o) {
        o && (this.uniforms.currentProjectionViewMatrix.value.multiplyMatrices(o.projectionMatrix, o.matrixWorldInverse),
        this.uniforms.inverseViewMatrix.value.copy(o.matrixWorld))
    }
    onSizeUpdate() {
        this.uniforms.firstFrame.value = !0,
        this.setDirty()
    }
    setSize(o, c) {
        super.setSize(o, c),
        this.onSizeUpdate()
    }
}

export default TAAPass;
