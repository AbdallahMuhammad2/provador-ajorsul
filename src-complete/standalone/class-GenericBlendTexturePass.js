/* Standalone Class: GenericBlendTexturePass */

class GenericBlendTexturePass extends ShaderPass2 {
    constructor(o, c="c = a + b;", h="", _, b=120) {
        super({
            vertexShader: CopyShader.vertexShader,
            fragmentShader: fe$1`
                varying vec2 vUv;
                
                ${h}
                
                void blend(in vec4 a, in vec4 b, inout vec4 c){
                
                ${c}
                
                }
                void main() {
                    vec4 texel = vec4(0);
                    blend(tDiffuseTexelToLinear ( texture2D( tDiffuse, vUv ) ), tDiffuse2TexelToLinear ( texture2D( tDiffuse2, vUv ) ), texel);
                    texel = clamp(texel, vec4(0), vec4(MAX_INTENSITY));
                    gl_FragColor = texel;
                    #include <colorspace_fragment>
                }
            `,
            uniforms: {
                tDiffuse: {
                    value: null
                },
                tDiffuse2: {
                    value: _
                },
                ...o
            },
            defines: {
                MAX_INTENSITY: b
            }
        }, "tDiffuse", "tDiffuse2"),
        this.clear = !1,
        this.needsSwap = !0
    }
}

export default GenericBlendTexturePass;
