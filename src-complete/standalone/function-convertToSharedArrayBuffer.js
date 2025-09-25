/* Standalone Function: convertToSharedArrayBuffer */

function convertToSharedArrayBuffer(d) {
    if (d.buffer instanceof SharedArrayBuffer)
        return d;
    const o = d.constructor
      , c = d.buffer
      , h = new SharedArrayBuffer(c.byteLength)
      , _ = new Uint8Array(c);
    return new Uint8Array(h).set(_, 0),
    new o(h)
}

export default convertToSharedArrayBuffer;
