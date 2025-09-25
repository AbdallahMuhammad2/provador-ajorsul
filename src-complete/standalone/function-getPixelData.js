/* Standalone Function: getPixelData */

function getPixelData(d, o, c) {
    let h;
    return h = c.type === three_module.RQf ? new Float32Array(c.width * c.height * c.numInputChannels) : new Uint16Array(c.width * c.height * c.numInputChannels),
    d.readRenderTargetPixels(o, 0, 0, c.width, c.height, h, void 0, c.textureIndex),
    h
}

export default getPixelData;
