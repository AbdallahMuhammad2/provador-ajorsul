/* Standalone Function: isFbxFormatBinary */

function isFbxFormatBinary(d) {
    return d.byteLength >= 21 && convertArrayBufferToString(d, 0, 21) === "Kaydara FBX Binary  \0"
}

export default isFbxFormatBinary;
