/* Standalone Class: AVIFImageUtils */

class AVIFImageUtils {
    match(o) {
        return o.length >= 12 && index_modern_BufferUtils.decodeText(o.slice(4, 12)) === "ftypavif"
    }
    getSize(o) {
        if (!this.match(o))
            return null;
        const c = new DataView(o.buffer,o.byteOffset,o.byteLength);
        let h = unbox(c, 0);
        if (!h)
            return null;
        let _ = h.end;
        for (; h = unbox(c, _); )
            if (h.type === "meta")
                _ = h.start + 4;
            else if (h.type === "iprp" || h.type === "ipco")
                _ = h.start;
            else {
                if (h.type === "ispe")
                    return [c.getUint32(h.start + 4), c.getUint32(h.start + 8)];
                if (h.type === "mdat")
                    break;
                _ = h.end
            }
        return null
    }
    getChannels(o) {
        return 4
    }
}

export default AVIFImageUtils;
