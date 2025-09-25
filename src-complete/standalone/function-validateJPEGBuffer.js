/* Standalone Function: validateJPEGBuffer */

function validateJPEGBuffer(d, o) {
    if (o > d.byteLength)
        throw new TypeError("Corrupt JPG, exceeded buffer limits");
    if (d.getUint8(o) !== 255)
        throw new TypeError("Invalid JPG, marker table corrupted");
    return d
}

export default validateJPEGBuffer;
