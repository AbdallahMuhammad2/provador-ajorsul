/* Standalone Class: CombinedPostPass */

class CombinedPostPass extends ShaderPass2 {
    constructor(o) {
        super({
            vertexShader: CopyShader.vertexShader,
            uniforms: {
                tDiffuse: {
                    value: null
                },
                tNormalDepth: {
                    value: null
                },
                tGBufferFlags: {
                    value: null
                },
                tTransparent: {
                    value: null
                }
            },
            defines: {},
            fragmentShader: `
                varying vec2 vUv;
                ${o[0]}
                void main() {
                    gl_FragColor = tDiffuseTexelToLinear (texture2D(tDiffuse, vUv));
                    #glMarker
                    ${o[1]}
                    
                    gl_FragColor.rgb *= gl_FragColor.a; // premultiply alpha
                }
                `
        }, "tDiffuse", "tTransparent"),
        this.uiConfig = void 0,
        this.material.transparent = !1,
        this.material.side = three_module.hB5
    }
    render(o, c, h, _, b) {
        super.render(o, c, h, _, b),
        this._lastReadBuffer = h,
        this.needsSwap = !0
    }
    reRender(o, c, h, _) {
        this._lastReadBuffer && this.render(o, c, this._lastReadBuffer, h, _)
    }
    dispose() {
        this._lastReadBuffer = void 0,
        super.dispose()
    }
}

export default CombinedPostPass;
