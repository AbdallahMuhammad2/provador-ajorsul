/* Standalone Function: patchShaderEncodingSupport */

function patchShaderEncodingSupport(d, ...o) {
    const c = d.fragmentShader;
    return new ShaderMaterialEncodingSupport({
        defines: Object.assign({}, d.defines),
        uniforms: d.uniforms,
        vertexShader: d.vertexShader,
        fragmentShader: c
    },o)
}

export default patchShaderEncodingSupport;
