/* Standalone Function: buildInfoRTT */

function buildInfoRTT(d, o={}) {
    const c = d.width
      , h = d.height
      , _ = d.texture.type
      , b = d.texture.format
      , _e = (texture.colorSpace,
    o.compression !== void 0 ? o.compression : ZIP_COMPRESSION)
      , nt = (o.type !== void 0 ? o.type : three_module.ix0) === three_module.RQf ? 2 : 1
      , it = {
        0: 1,
        2: 1,
        3: 16
    }[_e];
    return {
        width: c,
        height: h,
        type: _,
        format: b,
        compression: _e,
        blockLines: it,
        dataType: nt,
        dataSize: 2 * nt,
        numBlocks: Math.ceil(h / it),
        numInputChannels: 4,
        numOutputChannels: 4,
        textureIndex: o.textureIndex || 0
    }
}

export default buildInfoRTT;
