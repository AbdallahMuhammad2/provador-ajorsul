/* Standalone Class: WEBPImageUtils */

class WEBPImageUtils {
    match(o) {
        return o.length >= 12 && o[8] === 87 && o[9] === 69 && o[10] === 66 && o[11] === 80
    }
    getSize(o) {
        const c = index_modern_BufferUtils.decodeText(o.slice(0, 4))
          , h = index_modern_BufferUtils.decodeText(o.slice(8, 12));
        if (c !== "RIFF" || h !== "WEBP")
            return null;
        const _ = new DataView(o.buffer,o.byteOffset);
        let b = 12;
        for (; b < _.byteLength; ) {
            const _e = index_modern_BufferUtils.decodeText(new Uint8Array([_.getUint8(b), _.getUint8(b + 1), _.getUint8(b + 2), _.getUint8(b + 3)]))
              , nt = _.getUint32(b + 4, !0);
            if (_e === "VP8 ")
                return [16383 & _.getInt16(b + 14, !0), 16383 & _.getInt16(b + 16, !0)];
            if (_e === "VP8L") {
                const it = _.getUint8(b + 9)
                  , at = _.getUint8(b + 10)
                  , ut = _.getUint8(b + 11);
                return [1 + ((63 & at) << 8 | it), 1 + ((15 & _.getUint8(b + 12)) << 10 | ut << 2 | (192 & at) >> 6)]
            }
            b += 8 + nt + nt % 2
        }
        return null
    }
    getChannels(o) {
        return 4
    }
}

export default WEBPImageUtils;
