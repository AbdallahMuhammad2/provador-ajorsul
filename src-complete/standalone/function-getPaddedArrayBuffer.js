/* Standalone Function: getPaddedArrayBuffer */

function getPaddedArrayBuffer(d, o=0) {
    const c = getPaddedBufferSize(d.byteLength);
    if (c !== d.byteLength) {
        const h = new Uint8Array(c);
        if (h.set(new Uint8Array(d)),
        o !== 0)
            for (let _ = d.byteLength; _ < c; _++)
                h[_] = o;
        return h.buffer
    }
    return d
}

export default getPaddedArrayBuffer;
