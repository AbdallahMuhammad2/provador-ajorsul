/* Standalone Function: buildInfoDT */

function buildInfoDT(d, o={}) {
    const c = d.image.width
      , h = d.image.height
      , _ = d.type
      , b = d.format
      , _e = d.colorSpace
      , nt = o.compression !== void 0 ? o.compression : ZIP_COMPRESSION
      , it = (o.type !== void 0 ? o.type : three_module.ix0) === three_module.RQf ? 2 : 1
      , at = {
        0: 1,
        2: 1,
        3: 16
    }[nt];
    return {
        width: c,
        height: h,
        type: _,
        format: b,
        colorSpace: _e,
        compression: nt,
        blockLines: at,
        dataType: it,
        dataSize: 2 * it,
        numBlocks: Math.ceil(h / at),
        numInputChannels: 4,
        numOutputChannels: 4,
        flipY: d.isDataTexture && d.flipY,
        textureIndex: o.textureIndex || 0
    }
}

export default buildInfoDT;
