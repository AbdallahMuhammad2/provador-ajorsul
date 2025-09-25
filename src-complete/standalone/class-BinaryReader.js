/* Standalone Class: BinaryReader */

class BinaryReader {
    constructor(o, c) {
        this.dv = new DataView(o),
        this.offset = 0,
        this.littleEndian = c === void 0 || c,
        this._textDecoder = new TextDecoder
    }
    getOffset() {
        return this.offset
    }
    size() {
        return this.dv.buffer.byteLength
    }
    skip(o) {
        this.offset += o
    }
    getBoolean() {
        return !(1 & ~this.getUint8())
    }
    getBooleanArray(o) {
        const c = [];
        for (let h = 0; h < o; h++)
            c.push(this.getBoolean());
        return c
    }
    getUint8() {
        const o = this.dv.getUint8(this.offset);
        return this.offset += 1,
        o
    }
    getInt16() {
        const o = this.dv.getInt16(this.offset, this.littleEndian);
        return this.offset += 2,
        o
    }
    getInt32() {
        const o = this.dv.getInt32(this.offset, this.littleEndian);
        return this.offset += 4,
        o
    }
    getInt32Array(o) {
        const c = [];
        for (let h = 0; h < o; h++)
            c.push(this.getInt32());
        return c
    }
    getUint32() {
        const o = this.dv.getUint32(this.offset, this.littleEndian);
        return this.offset += 4,
        o
    }
    getInt64() {
        let o, c;
        return this.littleEndian ? (o = this.getUint32(),
        c = this.getUint32()) : (c = this.getUint32(),
        o = this.getUint32()),
        2147483648 & c ? (c = 4294967295 & ~c,
        o = 4294967295 & ~o,
        o === 4294967295 && (c = c + 1 & 4294967295),
        o = o + 1 & 4294967295,
        -(4294967296 * c + o)) : 4294967296 * c + o
    }
    getInt64Array(o) {
        const c = [];
        for (let h = 0; h < o; h++)
            c.push(this.getInt64());
        return c
    }
    getUint64() {
        let o, c;
        return this.littleEndian ? (o = this.getUint32(),
        c = this.getUint32()) : (c = this.getUint32(),
        o = this.getUint32()),
        4294967296 * c + o
    }
    getFloat32() {
        const o = this.dv.getFloat32(this.offset, this.littleEndian);
        return this.offset += 4,
        o
    }
    getFloat32Array(o) {
        const c = [];
        for (let h = 0; h < o; h++)
            c.push(this.getFloat32());
        return c
    }
    getFloat64() {
        const o = this.dv.getFloat64(this.offset, this.littleEndian);
        return this.offset += 8,
        o
    }
    getFloat64Array(o) {
        const c = [];
        for (let h = 0; h < o; h++)
            c.push(this.getFloat64());
        return c
    }
    getArrayBuffer(o) {
        const c = this.dv.buffer.slice(this.offset, this.offset + o);
        return this.offset += o,
        c
    }
    getString(o) {
        const c = this.offset;
        let h = new Uint8Array(this.dv.buffer,c,o);
        this.skip(o);
        const _ = h.indexOf(0);
        return _ >= 0 && (h = new Uint8Array(this.dv.buffer,c,_)),
        this._textDecoder.decode(h)
    }
}

export default BinaryReader;
