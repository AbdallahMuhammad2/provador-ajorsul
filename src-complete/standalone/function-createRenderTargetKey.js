/* Standalone Function: createRenderTargetKey */

function createRenderTargetKey(d={}) {
    var o, c;
    return [d.sizeMultiplier, d.samples, d.colorSpace, d.type, d.format, d.depthBuffer, d.depthTexture, (o = d.size) === null || o === void 0 ? void 0 : o.width, (c = d.size) === null || c === void 0 ? void 0 : c.height].join(";")
}

export default createRenderTargetKey;
