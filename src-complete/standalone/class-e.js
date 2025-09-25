/* Standalone Class: e */

class e {
    static _xfnv1a(o) {
        let c = 2166136261;
        for (let h = 0; h < o.length; h++)
            c = Math.imul(c ^ o.charCodeAt(h), 16777619);
        return () => (c += c << 13,
        c ^= c >>> 7,
        c += c << 3,
        c ^= c >>> 17,
        (c += c << 5) >>> 0)
    }
}

export default e;
