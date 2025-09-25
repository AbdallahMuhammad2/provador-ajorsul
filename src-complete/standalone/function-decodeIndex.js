/* Standalone Function: decodeIndex */

function decodeIndex(d, o) {
    const c = 3 * o.num_faces();
    let h, _;
    if (o.num_points() <= 65534) {
        const b = c * Uint16Array.BYTES_PER_ELEMENT;
        h = decoderModule._malloc(b),
        d.GetTrianglesUInt16Array(o, b, h),
        _ = new Uint16Array(decoderModule.HEAPU16.buffer,h,c).slice()
    } else {
        const b = c * Uint32Array.BYTES_PER_ELEMENT;
        h = decoderModule._malloc(b),
        d.GetTrianglesUInt32Array(o, b, h),
        _ = new Uint32Array(decoderModule.HEAPU32.buffer,h,c).slice()
    }
    return decoderModule._free(h),
    _
}

export default decodeIndex;
