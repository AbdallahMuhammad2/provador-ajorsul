/* Standalone Class: es_i */

class es_i extends e {
    constructor(o) {
        super(),
        Object.defineProperty(this, "a", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }),
        Object.defineProperty(this, "b", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }),
        Object.defineProperty(this, "c", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }),
        Object.defineProperty(this, "d", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        });
        const c = es_i._xfnv1a(o);
        this.a = c(),
        this.b = c(),
        this.c = c(),
        this.d = c()
    }
    next() {
        this.a >>>= 0,
        this.b >>>= 0,
        this.c >>>= 0,
        this.d >>>= 0;
        let o = this.a + this.b | 0;
        return this.a = this.b ^ this.b >>> 9,
        this.b = this.c + (this.c << 3) | 0,
        this.c = this.c << 21 | this.c >>> 11,
        this.d = this.d + 1 | 0,
        o = o + this.d | 0,
        this.c = this.c + o | 0,
        (o >>> 0) / 4294967296
    }
}

export default es_i;
