/* Standalone Class: UniqueURIGenerator */

class UniqueURIGenerator {
    constructor(o, c) {
        this.multiple = void 0,
        this.basename = void 0,
        this.counter = {},
        this.multiple = o,
        this.basename = c
    }
    createURI(o, c) {
        if (o.getURI())
            return o.getURI();
        if (this.multiple) {
            const h = this.basename(o);
            return this.counter[h] = this.counter[h] || 1,
            `${h}_${this.counter[h]++}.${c}`
        }
        return `${this.basename(o)}.${c}`
    }
}

export default UniqueURIGenerator;
