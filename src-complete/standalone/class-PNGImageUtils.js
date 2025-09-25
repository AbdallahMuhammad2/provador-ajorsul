/* Standalone Class: PNGImageUtils */

class PNGImageUtils {
    match(o) {
        return o.length >= 8 && o[0] === 137 && o[1] === 80 && o[2] === 78 && o[3] === 71 && o[4] === 13 && o[5] === 10 && o[6] === 26 && o[7] === 10
    }
    getSize(o) {
        const c = new DataView(o.buffer,o.byteOffset);
        return index_modern_BufferUtils.decodeText(o.slice(12, 16)) === PNGImageUtils.PNG_FRIED_CHUNK_NAME ? [c.getUint32(32, !1), c.getUint32(36, !1)] : [c.getUint32(16, !1), c.getUint32(20, !1)]
    }
    getChannels(o) {
        return 4
    }
}

export default PNGImageUtils;
