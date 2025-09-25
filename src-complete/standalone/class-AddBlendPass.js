/* Standalone Class: AddBlendPass */

class AddBlendPass extends ShaderPass2 {
    constructor(o, c=120) {
        super({
            vertexShader: CopyShader.vertexShader,
            fragmentShader: fe$1`
                uniform vec4 weight;
                uniform vec4 weight2;
                varying vec2 vUv;
                void main() {
                    vec4 texel = clamp(weight * tDiffuseTexelToLinear ( texture2D( tDiffuse, vUv ) ) + weight2 * tDiffuse2TexelToLinear ( texture2D( tDiffuse2, vUv ) ), vec4(0), vec4(MAX_INTENSITY));
                    gl_FragColor = texel;
                    #include <colorspace_fragment>
                }
            `,
            uniforms: {
                tDiffuse: {
                    value: null
                },
                tDiffuse2: {
                    value: o
                },
                weight: {
                    value: new three_module.IUQ(1,1,1,1)
                },
                weight2: {
                    value: new three_module.IUQ(1,1,1,1)
                }
            },
            defines: {
                MAX_INTENSITY: c
            }
        }, "tDiffuse", "tDiffuse2"),
        this.clear = !1,
        this.needsSwap = !0
    }
    set weights2(o) {
        this.uniforms.weight2.value.copy(o)
    }
    get weights2() {
        return this.uniforms.weight2.value
    }
    set weights1(o) {
        this.uniforms.weight.value.copy(o)
    }
    get weights1() {
        return this.uniforms.weight.value
    }
    set blendTexture(o) {
        this.uniforms.tDiffuse2.value = o
    }
}

export default AddBlendPass;
