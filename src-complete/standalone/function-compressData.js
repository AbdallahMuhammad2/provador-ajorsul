/* Standalone Function: compressData */

function compressData(d, o) {
    let c, h, _ = 0;
    const b = {
        data: new Array,
        totalSize: 0
    }
      , _e = o.width * o.numOutputChannels * o.blockLines * o.dataSize;
    switch (o.compression) {
    case 0:
        c = compressNONE;
        break;
    case 2:
    case 3:
        c = compressZIP
    }
    o.compression !== 0 && (h = new Uint8Array(_e));
    for (let nt = 0; nt < o.numBlocks; ++nt) {
        const it = c(d.subarray(_e * nt, _e * (nt + 1)), h);
        _ += it.length,
        b.data.push({
            dataChunk: it,
            size: it.length
        })
    }
    return b.totalSize = _,
    b
}

export default compressData;
