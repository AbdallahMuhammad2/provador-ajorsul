/* Standalone Function: decodeGeometry */

function decodeGeometry(d, o) {
    const c = new decoderModule.DecoderBuffer;
    try {
        if (c.Init(o, o.length),
        d.GetEncodedGeometryType(c) !== decoderModule.TRIANGULAR_MESH)
            throw new Error(`[${NAME$k}] Unknown geometry type.`);
        const h = new decoderModule.Mesh;
        if (!d.DecodeBufferToMesh(c, h).ok() || h.ptr === 0)
            throw new Error(`[${NAME$k}] Decoding failure.`);
        return h
    } finally {
        decoderModule.destroy(c)
    }
}

export default decodeGeometry;
