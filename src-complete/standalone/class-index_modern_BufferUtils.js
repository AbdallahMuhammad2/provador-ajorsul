/* Standalone Class: index_modern_BufferUtils */

class index_modern_BufferUtils {
    static createBufferFromDataURI(o) {
        if (typeof Buffer > "u") {
            const c = atob(o.split(",")[1])
              , h = new Uint8Array(c.length);
            for (let _ = 0; _ < c.length; _++)
                h[_] = c.charCodeAt(_);
            return h
        }
        {
            const c = o.split(",")[1]
              , h = o.indexOf("base64") >= 0;
            return Buffer.from(c, h ? "base64" : "utf8")
        }
    }
    static encodeText(o) {
        return new TextEncoder().encode(o)
    }
    static decodeText(o) {
        return new TextDecoder().decode(o)
    }
    static concat(o) {
        let c = 0;
        for (const b of o)
            c += b.byteLength;
        const h = new Uint8Array(c);
        let _ = 0;
        for (const b of o)
            h.set(b, _),
            _ += b.byteLength;
        return h
    }
    static pad(o, c=0) {
        const h = this.padNumber(o.byteLength);
        if (h === o.byteLength)
            return o;
        const _ = new Uint8Array(h);
        if (_.set(o),
        c !== 0)
            for (let b = o.byteLength; b < h; b++)
                _[b] = c;
        return _
    }
    static padNumber(o) {
        return 4 * Math.ceil(o / 4)
    }
    static equals(o, c) {
        if (o === c)
            return !0;
        if (o.byteLength !== c.byteLength)
            return !1;
        let h = o.byteLength;
        for (; h--; )
            if (o[h] !== c[h])
                return !1;
        return !0
    }
    static toView(o, c=0, h=1 / 0) {
        return new Uint8Array(o.buffer,o.byteOffset + c,Math.min(o.byteLength, h))
    }
    static assertView(o) {
        if (o && !ArrayBuffer.isView(o))
            throw new Error(`Method requires Uint8Array parameter; received "${typeof o}".`);
        return o
    }
}

export default index_modern_BufferUtils;
