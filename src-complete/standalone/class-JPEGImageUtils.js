/* Standalone Class: JPEGImageUtils */

class JPEGImageUtils {
    match(o) {
        return o.length >= 3 && o[0] === 255 && o[1] === 216 && o[2] === 255
    }
    getSize(o) {
        let c, h, _ = new DataView(o.buffer,o.byteOffset + 4);
        for (; _.byteLength; ) {
            if (c = _.getUint16(0, !1),
            validateJPEGBuffer(_, c),
            h = _.getUint8(c + 1),
            h === 192 || h === 193 || h === 194)
                return [_.getUint16(c + 7, !1), _.getUint16(c + 5, !1)];
            _ = new DataView(o.buffer,_.byteOffset + c + 2)
        }
        throw new TypeError("Invalid JPG, no size found")
    }
    getChannels(o) {
        return 3
    }
}

export default JPEGImageUtils;
