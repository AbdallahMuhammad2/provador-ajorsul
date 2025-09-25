/* Standalone Class: BufferReader */

class BufferReader {
    constructor(o, c, h, _) {
        this._dataView = void 0,
        this._littleEndian = void 0,
        this._offset = void 0,
        this._dataView = new DataView(o.buffer,o.byteOffset + c,h),
        this._littleEndian = _,
        this._offset = 0
    }
    _nextUint8() {
        const o = this._dataView.getUint8(this._offset);
        return this._offset += 1,
        o
    }
    _nextUint16() {
        const o = this._dataView.getUint16(this._offset, this._littleEndian);
        return this._offset += 2,
        o
    }
    _nextUint32() {
        const o = this._dataView.getUint32(this._offset, this._littleEndian);
        return this._offset += 4,
        o
    }
    _nextUint64() {
        const o = this._dataView.getUint32(this._offset, this._littleEndian) + 4294967296 * this._dataView.getUint32(this._offset + 4, this._littleEndian);
        return this._offset += 8,
        o
    }
    _nextInt32() {
        const o = this._dataView.getInt32(this._offset, this._littleEndian);
        return this._offset += 4,
        o
    }
    _skip(o) {
        return this._offset += o,
        this
    }
    _scan(o, c=0) {
        const h = this._offset;
        let _ = 0;
        for (; this._dataView.getUint8(this._offset) !== c && _ < o; )
            _++,
            this._offset++;
        return _ < o && this._offset++,
        new Uint8Array(this._dataView.buffer,this._dataView.byteOffset + h,_)
    }
}

export default BufferReader;
