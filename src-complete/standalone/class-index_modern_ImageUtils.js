/* Standalone Class: index_modern_ImageUtils */

class index_modern_ImageUtils {
    static registerFormat(o, c) {
        this.impls[o] = c
    }
    static getMimeType(o) {
        for (const c in this.impls)
            if (this.impls[c].match(o))
                return c;
        return null
    }
    static getSize(o, c) {
        return this.impls[c] ? this.impls[c].getSize(o) : null
    }
    static getChannels(o, c) {
        return this.impls[c] ? this.impls[c].getChannels(o) : null
    }
    static getVRAMByteLength(o, c) {
        if (!this.impls[c])
            return null;
        if (this.impls[c].getVRAMByteLength)
            return this.impls[c].getVRAMByteLength(o);
        let h = 0;
        const _ = this.getSize(o, c);
        if (!_)
            return null;
        for (; _[0] > 1 || _[1] > 1; )
            h += _[0] * _[1] * 4,
            _[0] = Math.max(Math.floor(_[0] / 2), 1),
            _[1] = Math.max(Math.floor(_[1] / 2), 1);
        return h += 4,
        h
    }
    static mimeTypeToExtension(o) {
        return o === "image/jpeg" ? "jpg" : o.split("/").pop()
    }
    static extensionToMimeType(o) {
        return o === "jpg" ? "image/jpeg" : o ? `image/${o}` : ""
    }
}

export default index_modern_ImageUtils;
