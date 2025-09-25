/* Standalone Function: supportedRTT */

function supportedRTT(d) {
    if (!d || !d.isWebGLRenderTarget)
        throw Error("EXRExporter.parse: Unsupported second parameter, expected instance of WebGLRenderTarget.");
    if (d.isWebGLCubeRenderTarget || d.isWebGL3DRenderTarget || d.isWebGLArrayRenderTarget)
        throw Error("EXRExporter.parse: Unsupported render target type, expected instance of WebGLRenderTarget.");
    if (d.texture.type !== three_module.RQf && d.texture.type !== three_module.ix0)
        throw Error("EXRExporter.parse: Unsupported WebGLRenderTarget texture type.");
    if (d.texture.format !== three_module.GWd)
        throw Error("EXRExporter.parse: Unsupported WebGLRenderTarget texture format, expected RGBAFormat.")
}

export default supportedRTT;
