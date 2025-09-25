/* Standalone Class: EXRExporter2 */

class EXRExporter2 extends EXRExporter {
    async parseAsync(o, c) {
        const h = o;
        if (h.isWebGLRenderTarget && !o.renderer)
            throw new Error("No renderManager on renderTarget");
        if (!h.isWebGLRenderTarget && !o.isDataTexture)
            throw new Error("Invalid object type");
        h.isWebGLMultipleRenderTargets && c.textureIndex === void 0 && console.warn("No textureIndex specified for WebGLMultipleRenderTargets");
        const _ = h.isWebGLRenderTarget ? this.parse(o.renderer.rendererObject, h, c) : this.parse(o, c);
        return new Blob([_],{
            type: "image/x-exr"
        })
    }
}

export default EXRExporter2;
