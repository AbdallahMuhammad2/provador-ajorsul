/* Standalone Function: buildScreenShader */

function buildScreenShader(d) {
    return d != null && d.isShaderPass2 ? d : new ShaderPass2({
        ...CopyShader,
        fragmentShader: `
                       varying vec2 vUv;
                       
                       ${Array.isArray(d) ? d[0] : (d == null ? void 0 : d.pars) || ""}
                       
                       void main() {

                            gl_FragColor = tDiffuseTexelToLinear (texture2D(tDiffuse, vUv));
                            
                            ${Array.isArray(d) ? d[1] : typeof d == "string" ? d : (d == null ? void 0 : d.main) || ""}
                            
                        }`,
        uniforms: {
            tDiffuse: {
                value: null
            }
        }
    },"tDiffuse")
}

export default buildScreenShader;
