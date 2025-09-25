/* Standalone Class: GammaCorrectionExtension */

class GammaCorrectionExtension {
    constructor() {
        this.uiConfig = void 0,
        this.enabled = !0
    }
    shaderExtender(o, c, h) {
        this.enabled && (o.fragmentShader = shaderReplaceString(o.fragmentShader, "#glMarker", ` 
            gl_FragColor = LinearTosRGB(gl_FragColor);
            #glMarker
        `))
    }
    computeCacheKey(o) {
        return this.enabled ? "1" : "0"
    }
    isCompatible(o) {
        return !0
    }
}

export default GammaCorrectionExtension;
