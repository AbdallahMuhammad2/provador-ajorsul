/* Standalone Class: TypeBackedArray */

class TypeBackedArray {
    constructor(o, c=500) {
        this.expansionFactor = 1.5,
        this.type = o,
        this.length = 0,
        this.array = null,
        this.setSize(c)
    }
    setType(o) {
        if (this.length !== 0)
            throw new Error("TypeBackedArray: Cannot change the type while there is used data in the buffer.");
        const c = this.array.buffer;
        this.array = new o(c),
        this.type = o
    }
    setSize(o) {
        if (this.array && o === this.array.length)
            return;
        const c = this.type
          , h = new c(new (areSharedArrayBuffersSupported() ? SharedArrayBuffer : ArrayBuffer)(ceilToFourByteStride(o * c.BYTES_PER_ELEMENT)));
        this.array && h.set(this.array, 0),
        this.array = h
    }
    expand() {
        const {array: o, expansionFactor: c} = this;
        this.setSize(o.length * c)
    }
    push(...o) {
        let {array: c, length: h} = this;
        h + o.length > c.length && (this.expand(),
        c = this.array);
        for (let _ = 0, b = o.length; _ < b; _++)
            c[h + _] = o[_];
        this.length += o.length
    }
    clear() {
        this.length = 0
    }
}

export default TypeBackedArray;
