/* Standalone Function: convertArrayBufferToString */

function convertArrayBufferToString(d, o, c) {
    return o === void 0 && (o = 0),
    c === void 0 && (c = d.byteLength),
    new TextDecoder().decode(new Uint8Array(d,o,c))
}

export default convertArrayBufferToString;
