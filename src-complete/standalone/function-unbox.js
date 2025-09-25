/* Standalone Function: unbox */

function unbox(d, o) {
    if (d.byteLength < 4 + o)
        return null;
    const c = d.getUint32(o);
    return d.byteLength < c + o || c < 8 ? null : {
        type: index_modern_BufferUtils.decodeText(new Uint8Array(d.buffer,d.byteOffset + o + 4,4)),
        start: o + 8,
        end: o + c
    }
}

export default unbox;
