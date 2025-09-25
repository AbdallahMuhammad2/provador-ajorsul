/* Standalone Class: a */

class a {
    constructor(o, c=s.sfc32) {
        Object.defineProperty(this, "str", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }),
        Object.defineProperty(this, "prng", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }),
        Object.defineProperty(this, "generator", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }),
        this.str = o,
        this.prng = c,
        this.generator = this._initializeGenerator()
    }
    next() {
        return this.generator.next()
    }
    _initializeGenerator() {
        if ((c => c === null)(o = this.str) || (c => c === void 0)(o))
            return this.wrap();
        var o;
        switch (this.prng) {
        case "sfc32":
            return new es_i(this.str);
        case "mulberry32":
            return new t$1(this.str);
        case "xoshiro128ss":
            return new r$1(this.str);
        default:
            return this.wrap()
        }
    }
    wrap() {
        return {
            next: () => Math.random()
        }
    }
}

export default a;
