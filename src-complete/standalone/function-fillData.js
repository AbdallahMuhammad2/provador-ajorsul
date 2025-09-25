/* Standalone Function: fillData */

function fillData(d, o) {
    const c = 8 * o.numBlocks
      , h = 259 + 18 * o.numOutputChannels
      , _ = {
        value: h + c
    }
      , b = new Uint8Array(h + c + d.totalSize + 8 * o.numBlocks)
      , _e = new DataView(b.buffer);
    fillHeader(b, d, o);
    for (let nt = 0; nt < d.data.length; ++nt) {
        const it = d.data[nt].dataChunk
          , at = d.data[nt].size;
        setUint32(_e, nt * o.blockLines, _),
        setUint32(_e, at, _),
        b.set(it, _.value),
        _.value += at
    }
    return b
}

export default fillData;
